import { Component } from 'react'

export default class DecisionTableCell extends Component {
  render() {
    const { data } = this.props
    const { cellData } = data
    return <div className={'cell'}>{cellData}</div>
  }
}
