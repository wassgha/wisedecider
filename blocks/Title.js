import ContentEditable from 'react-contenteditable'
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import sanitizeHtml from 'sanitize-html'

// Store
import worksheet from '../stores/worksheetStore'

// Components
import Block from '../components/Block'

const DEFAULT_PLACEHOLDER = 'Insert your title here...'

class Title extends Component {
  constructor(props) {
    super(props)

    const { title = '' } = this.props
    this.contentEditable = React.createRef()
    this.titleStore = store({
      title,
      editing: false
    })
  }

  onBlur = () => {
    const { id } = this.props
    this.titleStore.editing = false
    this.titleStore.title = sanitizeHtml(this.titleStore.title, {
      allowedTags: [],
      allowedAttributes: {}
    })
    worksheet.editBlock(id, { title: this.titleStore.title })
  }

  onEdit = evt => {
    const { id } = this.props
    this.titleStore.editing = true
    this.titleStore.title = evt.target.value
    worksheet.editBlock(id, { title: this.titleStore.title })
  }

  handleKeyPress = e => {
    this.titleStore.editing = true
    const { setCurrentBlock, id } = this.props
    if (e.key === 'Enter') {
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

  render() {
    const { placeholder = DEFAULT_PLACEHOLDER, tag = 'h1' } = this.props
    return (
      <Block>
        <ContentEditable
          innerRef={this.contentEditable}
          html={this.titleStore.title}
          disabled={false}
          onChange={this.onEdit}
          onBlur={this.onBlur}
          tagName={tag}
          onKeyDown={this.handleKeyPress}
          className={'title'}
          style={{
            color: '#333',
            cursor: 'text'
          }}
          placeholder={placeholder}
        />
      </Block>
    )
  }
}

export default view(Title)
