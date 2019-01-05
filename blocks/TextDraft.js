import ContentEditable from 'react-contenteditable'
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import sanitizeHtml from 'sanitize-html'
import ReactDOMServer from 'react-dom/server'
import { Editor, EditorState, RichUtils } from 'draft-js'

// Store
import worksheet from '../store'

// Components
import Choice from '../components/Choice'
import Value from '../components/Value'

const DEFAULT_PLACEHOLDER = 'Insert your text here...'

class Text extends Component {
  constructor({ content, placeholder }) {
    super()

    this.contentEditable = React.createRef()
    this.textStore = store({
      content: content || '',
      placeholder: placeholder || DEFAULT_PLACEHOLDER,
      editing: false,
      editorState: EditorState.createEmpty()
    })
  }

  onBlur = () => {
    this.textStore.editing = false
    console.log('this.textStore.content before ', this.textStore.content)
    this.textStore.content = sanitizeHtml(this.textStore.content, {
      allowedTags: [],
      allowedAttributes: {}
    })
    console.log('this.textStore.content after', this.textStore.content)
  }

  onEdit = evt => {
    this.textStore.editing = true
    this.textStore.content = evt.target.value
  }

  handleKeyPress = e => {
    const { setCurrentBlock } = this.props
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const insertedId = worksheet.addBlock()
      setCurrentBlock(insertedId)
    }
  }

  focus = () => {
    this.contentEditable &&
      this.contentEditable.current &&
      this.contentEditable.current.focus &&
      this.contentEditable.current.focus()
  }

  onChange = editorState => {
    this.textStore.editorState = editorState
  }

  handleKeyCommand = (command, editorState) => {
    var newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  render() {
    {
      /*<ContentEditable
      innerRef={this.contentEditable}
      html={this.textStore.content.replace(/@([CV])([0-9+])/g, (match, p1, p2) => {
        const type = p1
        const index = Number(p2) - 1
        if (type == 'C') {
          const choice = worksheet.choices[index]
          return choice
            ? ReactDOMServer.renderToStaticMarkup(
                <Choice index={index} value={choice.name} color={choice.color} />
              ) + '&nbsp;'
            : '@C' + p2
        } else {
          const value = worksheet.values[index]
          return value
            ? ReactDOMServer.renderToStaticMarkup(<Value index={index} value={value.name} />) +
                '&nbsp;'
            : '@V' + p2
        }
      })}
      disabled={false}
      onChange={this.onEdit}
      onBlur={this.onBlur}
      onKeyDown={this.handleKeyPress}
      tagName={'p'}
      className={'text'}
      style={{
        color: '#333',
        cursor: 'text'
      }}
      placeholder={this.textStore.placeholder}
    /> */
    }
    return (
      <Editor
        blockRendererFn={this._blockRenderer}
        editorState={this.textStore.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
        placeholder="Start a document..."
        ref="editor"
        spellCheck={true}
      />
    )
  }
}

export default view(Text)
