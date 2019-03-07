import React, { Component } from 'react'

class Wrapper extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="wrapper">
        {children}
        <style jsx global>
          {`
            .wrapper {
              max-width: 960px;
              margin-left: auto;
              margin-right: auto;
              padding-right: 16px;
              padding-left: 16px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Wrapper
