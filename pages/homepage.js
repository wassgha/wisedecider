import React, { Component } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import _ from 'lodash'
import randomColor from 'randomcolor'

// Components
import Header from '../components/Header'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'

// Material UI Components
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({})

class HomePage extends Component {
  static async getInitialProps({ req }) {
    const { data } = await axios.get(`${process.env.SERVER_HOST}api/worksheet`)
    return {
      data,
      user: req && req.user
    }
  }

  deleteWorksheet(id) {
    if (!id) return
    axios.delete(`${process.env.SERVER_HOST}api/worksheet/${id}`)
    if (window) window.location.reload(false)
  }

  render() {
    const { data, user } = this.props
    return (
      <Layout>
        <Head>
          <title>WiseDecider Worksheets</title>
        </Head>
        {/* Header */}
        <Header user={user} />
        <Wrapper>
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
                      <Avatar
                        style={{
                          backgroundColor: worksheet.color || randomColor({ luminosity: 'dark' })
                        }}
                      >
                        <Icon>{'insert_drive_file'}</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={title == 'Unnamed' ? <i>{title}</i> : title}
                      secondary={'Draft'}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.deleteWorksheet(worksheet._id)}>
                        <Icon>{'delete'}</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              )
            })}
          </List>
        </Wrapper>
      </Layout>
    )
  }
}

export default withStyles(styles)(HomePage)
