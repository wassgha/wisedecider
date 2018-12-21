import React, { Component } from 'react'
import { view } from 'react-easy-state'

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
    return (
      <div className={'container'}>
        {/* Header */}
        <div className={'header'}>
          <div className={'wrapper'}>
            <div className={'logo'}>
              <span>Wise</span>
              <b>Decider</b>
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
          {worksheet.blocks.map(block => {
            switch (block.type) {
              case 'text':
                return (
                  <Text
                    ref={ref => this.setBlockRef(block.id, ref)}
                    setCurrentBlock={this.setCurrentBlock}
                    id={block.id}
                    {...block.data}
                  />
                )
              case 'title':
                return (
                  <Title
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

          {/* Choices */}
          <h2>Choices</h2>
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

          {/* Values */}
          <h2>Values</h2>
          {worksheet.values.map((value, index) => (
            <Value index={index} id={value.id} value={value.name} editable />
          ))}
          <InlineButton onClick={() => worksheet.addValue()} />
          {worksheet.values.length == 0 && (
            <span style={{ color: '#999', marginLeft: '10px' }}>
              This decision currently has no values
            </span>
          )}

          {/* Decision Table */}
          <h2>Decision Table</h2>
          <p style={{ color: '#999' }}>
            First reorganize the columns based on which values are more important to this decision,
            then reorganize the rows based on which choices ranked higher on the ordered values.
          </p>
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
        `}</style>
      </div>
    )
  }
}

export default view(Worksheet)
