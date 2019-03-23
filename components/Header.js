import React, { Component } from 'react'
import Link from 'next/link'
import { view, store } from 'react-easy-state'

class Header extends Component {
  render() {
    const { children } = this.props
    const loggedIn = true

    return (
      <div className={'header'}>
        <div className={'wrapper'}>
          <Link href={'/'}>
            <div className={'logo'}>
              <b>Wise</b>
              <span>Decider</span>
            </div>
          </Link>
          <div className={'menu'}>
            {children}
            <div className={'menu-right'}>
              {!loggedIn && (
                <a className={'link'} href={'/worksheet'}>
                  Pricing
                </a>
              )}
              {!loggedIn && (
                <a className={'link '} href={'/worksheet'}>
                  Log in
                </a>
              )}
              {!loggedIn && (
                <a className={'link featured'} href={'/worksheet'}>
                  Register
                </a>
              )}
              {loggedIn && (
                <a className={'link'} href={'/logout'}>
                  Logout
                </a>
              )}
              {loggedIn && (
                <a className={'link'} href={'/homepage'}>
                  Your Worksheets
                </a>
              )}
              {loggedIn && (
                <a className={'new-btn'} href={'/worksheet'} target="_blank">
                  NEW
                </a>
              )}
            </div>
          </div>
          {loggedIn && (
            <div className={'profile'}>
              <img
                src={'https://cdn-images-1.medium.com/fit/c/64/64/1*UuZygjKcOW9DKNMar0eEYQ.jpeg'}
                className={'profilePhoto'}
              />
            </div>
          )}
        </div>
        <style jsx>{`
          .header {
            position: sticky;
            top: 0;
            min-height: 120px;
            background-image: linear-gradient(white, rgba(255, 255, 255, 0));
            z-index: 2;
            pointer-events: none;
          }
          .header .wrapper {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-between;
            max-width: 1080px;
            margin-left: auto;
            margin-right: auto;
          }
          .logo {
            background: #0984e3;
            border: none;
            padding: 16px;
            padding-right: 24px;
            padding-left: 24px;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
            pointer-events: auto;
            cursor: pointer;
          }
          .logo span,
          .logo b {
            color: white;
            font-size: 24px;
          }
          .profile {
            display: flex;
            justify-self: flex-end;
            pointer-events: auto;
            cursor: pointer;
            vertical-align: middle;
          }
          .profilePhoto {
            border-radius: 50%;
            width: 32px;
            height: 32px;
          }
          .menu {
            flex: 1;
            padding-left: 20px;
            padding-right: 20px;
            justify-content: flex-end;
            vertical-align: middle;
            align-items: center;
            display: flex;
          }
          .menu .menu-right {
            margin-left: auto;
          }
          .menu .link {
            padding: 4px;
            padding-right: 24px;
            padding-left: 24px;
            color: #333;
            text-decoration: none;
            font-size: 13px;
            vertical-align: middle;
            cursor: pointer;
            pointer-events: all;
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
            font-size: 16px;
            color: #3f3f3f;
          }
          .menu .link.featured {
            color: #0984e3;
          }
          .menu .new-btn {
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
            border: 2px solid #0984e3;
            background: #ffffffdd;
            border-radius: 50px;
            padding: 4px;
            padding-right: 16px;
            padding-left: 16px;
            color: #0984e3;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 13px;
            vertical-align: middle;
            cursor: pointer;
            pointer-events: all;
            align-self: flex-end;
            vertical-align: middle;
          }
          @media (max-width: 600px) {
            .logo {
              padding-right: 20px;
              padding-left: 20px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default view(Header)
