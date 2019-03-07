import { Component } from 'react'

export default class DecisionTableCell extends Component {
  render() {
    const { data } = this.props
    const { cellData } = data
    return (
      <div className={'cell'}>
        {cellData}
        <style jsx>{`
          .cell {
            display: flex;
            flex: 1;
            padding: 16px;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
