import { Component } from 'react'

class DecisionTableCell extends Component {
  render() {
    const { data } = this.props
    const { cellData } = data
    return <div className={'cell'}>{cellData}</div>
  }
}

export default data => {
  return <DecisionTableCell data={data} />
}
