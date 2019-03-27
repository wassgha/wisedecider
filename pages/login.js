import React, { Component } from 'react'
import Head from 'next/head'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'

// Material UI Components
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none',
    border: 'none',
    padding: 14
  }
})

class Login extends Component {
  static async getInitialProps({ req }) {
    return { user: req && req.user }
  }

  render() {
    const { classes, user } = this.props
    return (
      <Layout>
        <Head>
          <title>WiseDecider Worksheets</title>
        </Head>
        {/* Header */}
        <Header user={user} />
        <div className={'form-wrapper'}>
          <Wrapper>
            <h2>Login</h2>

            <form className={classes.form} action={'/api/login'} method={'POST'}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Wrapper>
          <style jsx>{`
            .form-wrapper {
              max-width: 480px;
              margin: auto;
              margin-top: 10%;
            }
          `}</style>
        </div>
        <Footer />
      </Layout>
    )
  }
}

export default withStyles(styles)(Login)
