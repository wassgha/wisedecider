import ContentEditable from 'react-contenteditable'
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import sanitizeHtml from 'sanitize-html'
import ReactDOMServer from 'react-dom/server'

// Store
import worksheet from '../store'

// Components
import Choice from '../components/Choice'
import Value from '../components/Value'
import Block from '../components/Block'

const DEFAULT_PLACEHOLDER = 'Insert your text here...'

class Text extends Component {
  constructor(props) {
    super(props)

    this.contentEditable = React.createRef()
    const { content } = this.props
    this.textStore = store({
      content: content || '',
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

  onEdit = evt => {
    const { id } = this.props
    this.textStore.editing = true
    this.textStore.content = evt.target.value
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
        <ContentEditable
          innerRef={this.contentEditable}
          html={
            this.textStore.editing
              ? this.textStore.content
              : this.textStore.content.replace(/@([CV])(\d+)/g, (match, p1, p2) => {
                  const type = p1
                  const index = Number(p2) - 1
                  if (type == 'C') {
                    const choice = worksheet.choices[index]
                    return choice
                      ? ReactDOMServer.renderToStaticMarkup(
                          <Choice
                            index={index}
                            id={choice.id}
                            value={choice.name}
                            color={choice.color}
                          />
                        ) + '&nbsp;'
                      : '@C' + p2
                  } else {
                    const value = worksheet.values[index]
                    return value
                      ? ReactDOMServer.renderToStaticMarkup(
                          <Value index={index} id={value.id} value={value.name} />
                        ) + '&nbsp;'
                      : '@V' + p2
                  }
                })
          }
          disabled={false}
          onChange={this.onEdit}
          onBlur={this.onBlur}
          onClick={this.onFocus}
          onKeyDown={this.handleKeyPress}
          tagName={'p'}
          className={'text'}
          style={{
            color: '#333',
            cursor: 'text'
          }}
          placeholder={placeholder}
        />
        {/* <div
          dangerouslySetInnerHTML={{
            __html: this.textStore.content.replace(/@([CV])([0-9+])/g, (match, p1, p2) => {
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
                  ? ReactDOMServer.renderToStaticMarkup(
                      <Value index={index} value={value.name} />
                    ) + '&nbsp;'
                  : '@V' + p2
              }
            })
          }}
          style={{
            color: '#333',
            cursor: 'text'
          }}
          onClick={this.onFocus}
        /> */}
      </Block>
    )
  }
}

export default view(Text)
