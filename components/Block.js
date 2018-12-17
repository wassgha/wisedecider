import React, { Component } from 'react'
import { view, store } from 'react-easy-state'

class Block extends Component {
  render() {
    const { children } = this.props

    return <div>{children}</div>
  }
}

export default view(Block)
