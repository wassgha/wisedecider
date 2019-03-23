import React, { Component } from 'react'
import Head from 'next/head'
import Typist from 'react-typist'
import TypistLoop from 'react-typist-loop'

// Components
import Header from '../components/Header'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({})

class LandingPage extends Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>WiseDecider® - Online Decision Making Tool</title>
        </Head>
        {/* Header */}
        <Header />
        <div className={'section'}>
          <Wrapper>
            <h2>
              Decisions, made{' '}
              <TypistLoop interval={1000}>
                {['simple', 'easy', 'efficient', 'precise', 'fast', 'accurate'].map(text => (
                  <Typist
                    className={'typist'}
                    key={text}
                    startDelay={0}
                    cursor={{
                      show: true,
                      blink: true
                    }}
                  >
                    {text}
                  </Typist>
                ))}
              </TypistLoop>
            </h2>
            <p>
              Getting decisions right is critical to success, try the easiest, most efficient way to
              make decisions on the fly!
            </p>
            <form className={'signup-form'}>
              <input type="text" placeholder="Enter your email to start…" />
              <input type="submit" value="Get started" />
              <div className={'note'}>
                Already on WiseDecider? <a>Log in</a>
              </div>
            </form>
          </Wrapper>
          {/** Features (3 columns) */}
          {/** Pricing page (start for free) */}
          {/** Feature the book */}
          {/** Screenshots / demo */}
          {/** Featured Worksheets (examples from different fields) */}
          {/** Trusted by these companies */}
          {/** Big start now button */}
          {/** Footer */}
          <style jsx>
            {`
              .section {
                background: white;
                display: flex;
                padding-top: 48px;
                padding-bottom: 48px;
                justify-content: center;
                align-items: center;
              }
              .section h2 {
                font-size: 3rem;
                line-height: 1.125;
                color: #333;
                margin: 0px;
                padding: 0px;
                margin-block-start: 0.67em;
                margin-block-end: 0.67em;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
                font-weight: 700;
              }
              .section p {
                font-size: 1.5rem;
                line-height: 1.8;
                color: #888;
                margin: 0px;
                padding: 0px;
              }
              .signup-form {
                margin-top: 48px;
                margin-bottom: 48px;
              }
              .signup-form input[type='text'] {
                background: #ededed;
                border-radius: 8px;
                font-family: 'Open Sans', sans-serif;
                font-weight: 400;
                font-size: 18px;
                color: #928f8f;
                border: none;
                padding: 8px;
                padding-left: 16px;
                padding-right: 16px;
                height: 48px;
                min-width: 256px;
                margin-right: 16px;
                vertical-align: middle;
              }
              .signup-form input[type='submit'] {
                background: #0984e3;
                border-radius: 8px;
                font-family: 'Open Sans', sans-serif;
                font-weight: 600;
                font-size: 18px;
                color: #ffffff;
                text-align: center;
                border: none;
                padding: 8px;
                height: 48px;
                vertical-align: middle;
                padding-left: 16px;
                padding-right: 16px;
              }
              .signup-form .note {
                padding-top: 16px;
                font-size: 16px;
                display: block;
                font-family: 'Open Sans', sans-serif;
                color: #6f6e6e;
              }
              .signup-form .note a {
                font-family: 'Open Sans', sans-serif;
                font-weight: 600;
                color: #555;
                border-bottom: 2px dashed #6f6e6e;
              }
            `}
          </style>
          <style>{`
            .Typist {
              color: #0984e3;
              display: inline-block;
            }
            .Typist .Cursor {
              display: inline-block;
            }
            .Typist .Cursor--blinking {
              opacity: 1;
              animation: blink 1s linear infinite;
            }

            @keyframes blink {
              0% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(LandingPage)
