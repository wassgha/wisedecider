import React, { Component } from 'react'

class Layout extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="container">
        {children}
        <style jsx>
          {`
            .container {
              font-size: 18px;
              font-family: Open Sans, sans-serif;
              font-weight: 400;
              color: #333;
              background: white;
              margin: 0px;
              line-height: 2;
              overflow: hidden;
              position: relative;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Layout
