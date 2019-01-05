import React, { Component } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import _ from 'lodash'
import randomColor from 'randomcolor'

// Constants
import { SERVER_HOST } from '../constants'

// Components
import Header from '../components/Header'

// Material UI Components
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

class IndexPage extends Component {
  static async getInitialProps({ res, query }) {
    const { data } = await axios.get(`${SERVER_HOST}api/worksheet`)
    return { data }
  }

  render() {
    const { data } = this.props
    return (
      <div className={'container'}>
        <Head>
          <title>WiseDecider Worksheets</title>
        </Head>
        {/* Header */}
        <Header />
        <div className={'wrapper'}>
          <h2>Your Worksheets</h2>
          <List component="nav" disablePadding={true}>
            {data.map(worksheet => {
              const titleBlock = _.find(worksheet.blocks || [], { type: 'title' })
              const title =
                titleBlock && titleBlock.data && titleBlock.data.title
                  ? titleBlock.data.title
                  : 'Unnamed'

              return (
                <Link href={`/worksheet/${worksheet._id}`} passHref>
                  <ListItem component={'a'} button>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: randomColor({ luminosity: 'dark' }) }}>
                        <Icon>{'insert_drive_file'}</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={title == 'Unnamed' ? <i>{title}</i> : title}
                      secondary={'Draft'}
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Icon>{'delete'}</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              )
            })}
          </List>
        </div>
      </div>
    )
  }
}

export default IndexPage
