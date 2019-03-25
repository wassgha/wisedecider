import React, { Component } from 'react'
import Head from 'next/head'
import Typist from 'react-typist'
import TypistLoop from 'react-typist-loop'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'

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
        <Wrapper>
          <div className={'hero'}>
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
              <button>Get started</button>
              <div className={'note'}>
                Already on WiseDecider? <a>Log in</a>
              </div>
            </form>
          </div>
        </Wrapper>
        <Wrapper>
          <div className={'section'}>
            <div className={'rects'}>
              <div className={'rect1'} />
              <div className={'rect2'} />
            </div>
            <Grid container spacing={16}>
              <Grid item xs>
                <div className={'text'}>
                  <h3>How does it work?</h3>
                  <p>
                    Explore simple screencast that show you exactly how decision making is done
                    through WiseDecider&reg;.
                  </p>
                  <a className={'more'}>
                    <span>Youtube Channel</span> <Icon>{`chevron_right`}</Icon>
                  </a>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className={'video'}>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/4D_tyoJUIqo?controls=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Wrapper>
        <Wrapper>
          <div className={'section'}>
            <Grid container spacing={16}>
              <Grid item xs>
                <div className={'sample'}>
                  <img src="/static/images/university.png" />
                  <a>Deciding Between Colleges</a>
                </div>
              </Grid>
              <Grid item xs>
                <div className={'sample'}>
                  <img src="/static/images/marketing.png" />
                  <a>Choosing Marketing Strategies</a>
                </div>
              </Grid>
              <Grid item xs>
                <div className={'text'}>
                  <h3>Sample use cases</h3>
                  <p>
                    Take a look at sample worksheets that demonstrate the decision making process
                    with Wisedecider&reg;.
                  </p>
                  <a className={'more'}>
                    <span>Explore samples</span> <Icon>{`chevron_right`}</Icon>
                  </a>
                </div>
              </Grid>
            </Grid>
          </div>
        </Wrapper>
        {/** Features (3 columns) */}
        {/** Pricing page (start for free) */}
        {/** Feature the book */}
        {/** Screenshots / demo */}
        {/** Featured Worksheets (examples from different fields) */}
        {/** Trusted by these companies */}
        {/** Big start now button */}
        {/** Footer */}
        <Wrapper>
          <div className={'section centered'}>
            <div className={'rects2'}>
              <div className={'rect1'} />
              <div className={'rect2'} />
            </div>
            <h3>Trusted by hundreds of organizations</h3>
            <img src="https://3suxxy8wyhp1vv6ln2ofn5a148f-wpengine.netdna-ssl.com/wp-content/uploads/png/logo-application-and-OS-1024x300.png" />
          </div>
        </Wrapper>
        <Wrapper>
          <div className={'section centered'}>
            <form className={'signup-form'}>
              <h3>Get started with WiseDecider&reg; now</h3>
              <input type="text" placeholder="Enter your email to start…" />
              <button>Get started</button>
              <div className={'note'}>
                Already on WiseDecider? <a>Log in</a>
              </div>
            </form>
          </div>
        </Wrapper>
        <Footer />
        <style jsx>
          {`
            .rects,
            .rects2 {
              position: absolute;
              overflow: hidden;
              width: 1400px;
              height: 600px;
              z-index: 0;
            }
            .rects {
              transform: translateX(-80px) translateY(-780px) rotate(-45deg);
              transform-origin: top right;
            }
            .rects2 {
              transform: translateX(-200px) translateY(100px) rotate(45deg);
              transform-origin: top left;
            }
            .rects .rect1,
            .rects2 .rect1,
            .rects .rect2,
            .rects2 .rect2 {
              background: rgba(9, 132, 227, 0.43);
              border-radius: 126px;
              width: 600px;
              height: 600px;
              display: inline-block;
              z-index: 0;
            }
            .rects .rect2,
            .rects2 .rect2 {
              background: rgba(9, 132, 227, 0.09);
              margin-left: 126px;
            }
            .hero {
              max-width: 680px;
            }
            .hero,
            .section {
              display: flex;
              padding-top: 60px;
              padding-bottom: 60px;
              justify-content: center;
              align-items: flex-start;
              flex-direction: column;
              position: relative;
            }
            .section.centered {
              text-align: center;
              align-items: center;
            }
            .hero h2 {
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
            .hero p {
              font-size: 1.5rem;
              line-height: 1.8;
              color: #888;
              margin: 0px;
              padding: 0px;
            }
            .section .text {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              height: 100%;
            }
            .section .text h3 {
              font-size: 24px;
              color: #333;
              margin: 0px;
              padding: 0px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .section .text p {
              font-size: 16px;
              color: #888;
              margin: 0px;
              padding: 0px;
              margin-bottom: 8px;
            }
            .section .text .more {
              display: flex;
              align-items: center;
              color: #0984e3;
              font-size: 16px;
              font-weight: 600;
            }
            .video {
              background: white;
              border: 12px solid rgba(245, 245, 245, 0.4);
              -moz-background-clip: padding;
              -webkit-background-clip: padding;
              background-clip: padding-box;
              border-radius: 22px;
              overflow: hidden;
              padding-top: 56.25%;
              position: relative;
            }
            .video iframe {
              position: absolute;
              top: 0px;
            }
            .signup-form {
              margin-top: 48px;
              margin-bottom: 48px;
            }
            .signup-form input[type='text'] {
              outline: none;
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
              margin-bottom: 16px;
              -webkit-appearance: none;
            }
            .signup-form input[type='submit'],
            .signup-form button {
              outline: none;
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
              margin-bottom: 16px;
              -webkit-appearance: none;
            }
            .signup-form .note {
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
            .sample {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding-right: 16px;
              padding-left: 16px;
            }
            .sample a {
              font-family: 'Open Sans', sans-serif;
              font-weight: 600;
              color: #555;
              font-size: 16px;
              text-transform: uppercase;
              text-align: center;
            }
            .sample img {
              max-width: 200px;
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
      </Layout>
    )
  }
}

export default withStyles(styles)(LandingPage)
