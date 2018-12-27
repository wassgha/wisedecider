import React, { Component } from 'react'
import { view } from 'react-easy-state'
import Head from 'next/head'
import _ from 'lodash'
import ReactPlaceholder from 'react-placeholder'
import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape
} from 'react-placeholder/lib/placeholders'
import 'react-placeholder/lib/reactPlaceholder.css'

// Store
import worksheet from '../stores/worksheetStore'

// Components
import Choice from '../components/Choice'
import Value from '../components/Value'
import InlineButton from '../components/InlineButton'
import DecisionTable from '../components/DecisionTable'

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
        <div className={'header'}>
          <div className={'wrapper'}>
            <div className={'logo'}>
              <span>Wise</span>
              <b>Decider</b>
            </div>
            <div className={'menu'}>
              <span className={'save-indicator'}>
                <Icon className={'save-indicator-icon'}>
                  {worksheet.isLoading ? 'hourglass_empty' : worksheet.isSaving ? 'sync' : 'cloud'}
                </Icon>
                <span className={'save-text'}>
                  {worksheet.isLoading ? 'Loading...' : worksheet.isSaving ? 'Saving...' : 'Saved'}
                </span>
              </span>
              <a className={'new-btn'} href={'/'} target="_blank">
                NEW
              </a>
            </div>
            <div className={'profile'}>
              <img
                src={'https://cdn-images-1.medium.com/fit/c/64/64/1*UuZygjKcOW9DKNMar0eEYQ.jpeg'}
                className={'profilePhoto'}
              />
            </div>
          </div>
        </div>

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
          .header {
            position: sticky;
            top: 0;
            min-height: 120px;
            background-image: linear-gradient(white, rgba(255, 255, 255, 0));
            z-index: 2;
            pointer-events: none;
          }
          .header .wrapper {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-between;
            max-width: 1080px;
            margin-left: auto;
            margin-right: auto;
          }
          .logo {
            background: #94bcff;
            border: none;
            padding: 20px;
            padding-right: 32px;
            padding-left: 32px;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
            pointer-events: auto;
            cursor: pointer;
          }
          .logo span,
          .logo b {
            color: white;
          }
          .profile {
            display: flex;
            justify-self: flex-end;
            pointer-events: auto;
            cursor: pointer;
          }
          .profilePhoto {
            border-radius: 50%;
            width: 32px;
            height: 32px;
          }
          .wrapper {
            max-width: 960px;
            margin-left: auto;
            margin-right: auto;
          }
          .menu {
            flex: 1;
            padding-left: 20px;
            padding-right: 20px;
            justify-content: space-between;
            align-items: center;
            display: flex;
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

          .new-btn {
            border: 2px solid #427dde;
            background: #ffffffdd;
            border-radius: 50px;
            padding: 4px;
            padding-right: 16px;
            padding-left: 16px;
            color: #427dde;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 13px;
            vertical-align: middle;
            cursor: pointer;
            pointer-events: all;
          }
        `}</style>
      </div>
    )
  }
}

export default view(Worksheet)
