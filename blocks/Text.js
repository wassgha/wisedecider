import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import sanitizeHtml from 'sanitize-html'
import { Editor } from 'slate-react'
import { KeyUtils, Value } from 'slate'

// Store
import worksheet from '../store'

// Components
import InlineChoice from '../components/Choice'
import InlineValue from '../components/Value'
import Block from '../components/Block'

const DEFAULT_PLACEHOLDER = 'Insert your text here...'

class Text extends Component {
  constructor(props) {
    super(props)

    KeyUtils.resetGenerator()
    this.editor = React.createRef()

    const { content } = this.props
    this.textStore = store({
      content: Value.fromJSON(content || {}),
      editing: false
    })
  }

  onBlur = () => {
    const { id } = this.props
    this.textStore.editing = false
    this.textStore.content = sanitizeHtml(this.textStore.content, {
      allowedTags: ['img'],
      allowedAttributes: { img: ['src', 'width', 'height'] }
    })
    worksheet.editBlock(id, { content: this.textStore.content })
  }

  onEdit = ({ value }) => {
    const { id } = this.props
    this.textStore.editing = true
    this.textStore.content = value
    worksheet.editBlock(id, { content: this.textStore.content })
  }

  onFocus = () => {
    this.textStore.editing = true
    // setTimeout(() => this.focus(), 10)
  }

  handleKeyPress = e => {
    this.textStore.editing = true
    const { setCurrentBlock, id } = this.props
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // if (this.contentEditable.current) return this.blur()
      const nextBlock = worksheet.getNextBlock(id)
      if (nextBlock && nextBlock.type == 'text') {
        setCurrentBlock(nextBlock.id)
      } else {
        const insertedId = worksheet.addBlock()
        setCurrentBlock(insertedId)
      }
    } else if (e.key === 'Backspace' && this.currentText() == '') {
      const previousBlockId = worksheet.removeBlock(id)
      if (previousBlockId) setCurrentBlock(previousBlockId)
    }
  }

  currentText = () => {
    return (
      (this.contentEditable &&
        this.contentEditable.current &&
        this.contentEditable.current.innerText &&
        this.contentEditable.current.innerText) ||
      ''
    )
  }

  focus = () => {
    this.contentEditable &&
      this.contentEditable.current &&
      this.contentEditable.current.focus &&
      this.contentEditable.current.focus()
  }

  blur = () => {
    this.contentEditable &&
      this.contentEditable.current &&
      this.contentEditable.current.blur &&
      this.contentEditable.current.blur()
  }

  render() {
    const { placeholder = DEFAULT_PLACEHOLDER } = this.props

    return (
      <Block>
        <Editor placeholder={placeholder} value={this.textStore.content} onChange={this.onEdit} />
        <style jsx global>
          {`
            [contenteditable='true']:empty:before {
              content: attr(placeholder);
              display: block;
              color: #aaa;
            }
          `}
        </style>
      </Block>
    )
  }
}

export default view(Text)
