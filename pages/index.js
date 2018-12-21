import React, { Component } from 'react'
import Router from 'next/router'

// Store
import worksheet from '../stores/worksheetStore'

// Components
import Worksheet from '../components/Worksheet'

class App extends Component {
  static async getInitialProps({ res, query }) {
    let { id } = query
    if (!id) {
      const id = await worksheet.new()
      if (res) {
        res.writeHead(302, {
          Location: '/worksheet/' + id
        })
        res.end()
      } else {
        Router.push('/worksheet/' + id)
      }
    }
    return { id }
  }

  render() {
    const { id } = this.props
    return (
      <div className={'wrapper'}>
        <Worksheet id={id} />
      </div>
    )
  }
}

export default App
