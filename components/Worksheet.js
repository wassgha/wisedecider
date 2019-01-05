import React, { Component } from 'react'
import { view } from 'react-easy-state'
import Head from 'next/head'
import _ from 'lodash'
import ReactPlaceholder from 'react-placeholder'
import { TextBlock, TextRow, RectShape } from 'react-placeholder/lib/placeholders'
import 'react-placeholder/lib/reactPlaceholder.css'

// Store
import worksheet from '../store'

// Components
import Choice from '../components/Choice'
import Value from '../components/Value'
import InlineButton from '../components/InlineButton'
import DecisionTable from '../components/DecisionTable'
import Header from '../components/Header'

// Blocks
import Title from '../blocks/Title'
import Text from '../blocks/TextVanilla'

// Icons
import Icon from '@material-ui/core/Icon'

class Worksheet extends Component {
  constructor(props) {
    super(props)
    this.blockRefs = {}
    this.state = {
      focusedBlockID: null
    }
    this.oldFocusedBlockID = null
    this.focusedBlockID = null
  }

  async componentDidMount() {
    const { id } = this.props
    worksheet.load(id)
  }

  componentDidUpdate(prevProps, prevState) {
    const { focusedBlockID } = this.state
    if (focusedBlockID && focusedBlockID != prevState.focusedBlockID) {
      const currentBlock = this.getBlock(focusedBlockID)
      currentBlock && currentBlock.focus && currentBlock.focus()
    }
  }

  setBlockRef = (id, ref) => {
    this.blockRefs[id] = ref
  }

  getBlock = id => {
    return this.blockRefs[id]
  }

  setCurrentBlock = id => {
    this.setState({
      focusedBlockID: id
    })
  }

  render() {
    const titleBlock = _.find(worksheet.blocks || [], { type: 'title' })
    const title =
      titleBlock && titleBlock.data && titleBlock.data.title ? titleBlock.data.title : 'Unnamed'
    return (
      <div className={'container'}>
        <Head>
          <title>{title} WiseDecider Worksheet</title>
        </Head>
        {/* Header */}
        <Header>
          <span className={'save-indicator'}>
            <Icon className={'save-indicator-icon'}>
              {worksheet.isLoading ? 'hourglass_empty' : worksheet.isSaving ? 'sync' : 'cloud'}
            </Icon>
            <span className={'save-text'}>
              {worksheet.isLoading ? 'Loading...' : worksheet.isSaving ? 'Saving...' : 'Saved'}
            </span>
          </span>
        </Header>

        {/* Content */}
        <div className={'wrapper'}>
          {/* Blocks */}
          <ReactPlaceholder
            ready={!worksheet.isLoading}
            customPlaceholder={
              <div>
                <TextRow
                  rows={1}
                  color={'#CDCDCD'}
                  style={{ height: '36px', marginTop: '24px', marginBottom: '24px' }}
                />
                <br />
                <RectShape color={'#CDCDCD'} style={{ width: '100%', height: 300 }} />
                <br />
                <TextBlock rows={4} color={'#CDCDCD'} />
                <br />
                <TextBlock rows={3} color={'#CDCDCD'} />
              </div>
            }
          >
            {worksheet.blocks.map(block => {
              switch (block.type) {
                case 'text':
                  return (
                    <Text
                      key={block.id}
                      ref={ref => this.setBlockRef(block.id, ref)}
                      setCurrentBlock={this.setCurrentBlock}
                      id={block.id}
                      {...block.data}
                    />
                  )
                case 'title':
                  return (
                    <Title
                      key={block.id}
                      ref={ref => this.setBlockRef(block.id, ref)}
                      setCurrentBlock={this.setCurrentBlock}
                      id={block.id}
                      {...block.data}
                      editable
                    />
                  )
                default:
              }
            })}
          </ReactPlaceholder>

          {/* Choices */}
          <h2>Choices</h2>
          <ReactPlaceholder ready={!worksheet.isLoading} type="text" rows={4}>
            <div>
              {worksheet.choices.map((choice, index) => (
                <Choice
                  index={index}
                  id={choice.id}
                  value={choice.name}
                  color={choice.color}
                  editable
                />
              ))}
              <InlineButton onClick={() => worksheet.addChoice()} />
              {worksheet.choices.length == 0 && (
                <span style={{ color: '#999', marginLeft: '10px' }}>
                  This decision currently has no choices
                </span>
              )}
            </div>
          </ReactPlaceholder>

          {/* Values */}
          <h2>Values</h2>
          <ReactPlaceholder ready={!worksheet.isLoading} type="text" rows={4}>
            <div>
              {worksheet.values.map((value, index) => (
                <Value index={index} id={value.id} value={value.name} editable />
              ))}
              <InlineButton onClick={() => worksheet.addValue()} />
              {worksheet.values.length == 0 && (
                <span style={{ color: '#999', marginLeft: '10px' }}>
                  This decision currently has no values
                </span>
              )}
            </div>
          </ReactPlaceholder>

          {/* Decision Table */}
          <h2>Decision Table</h2>
          <ReactPlaceholder ready={!worksheet.isLoading} type="text" rows={7}>
            <p style={{ color: '#999' }}>
              First reorganize the columns based on which values are more important to this
              decision, then reorganize the rows based on which choices ranked higher on the ordered
              values.
            </p>
          </ReactPlaceholder>
        </div>
        <DecisionTable
          scores={worksheet.scores}
          values={worksheet.values}
          choices={worksheet.choices}
        />

        <style jsx>{`
          .container {
          }

          .save-indicator {
            color: #afafaf;
            vertical-align: middle;
            justify-content: flex-start;
            display: flex;
            align-items: center;
            background: #ffffffdd;
            padding: 0px 16px;
            border-radius: 50px;
          }

          .save-text {
            margin-left: 6px;
          }
        `}</style>
      </div>
    )
  }
}

export default view(Worksheet)
