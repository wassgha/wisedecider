import React, { Component } from 'react'
import Link from 'next/link'
import { view, store } from 'react-easy-state'

class Header extends Component {
  render() {
    const { children } = this.props

    return (
      <div className={'header'}>
        <div className={'wrapper'}>
          <Link href={'/'}>
            <div className={'logo'}>
              <span>Wise</span>
              <b>Decider</b>
            </div>
          </Link>
          <div className={'menu'}>
            {children}
            <a className={'new-btn'} href={'/worksheet'} target="_blank">
              NEW
            </a>
          </div>
          <div className={'profile'}>
            <img
              src={'https://cdn-images-1.medium.com/fit/c/64/64/1*UuZygjKcOW9DKNMar0eEYQ.jpeg'}
              className={'profilePhoto'}
            />
          </div>
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
            background: #94bcff;
            border: none;
            padding: 20px;
            padding-right: 32px;
            padding-left: 32px;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
            pointer-events: auto;
            cursor: pointer;
          }
          .logo span,
          .logo b {
            color: white;
          }
          .profile {
            display: flex;
            justify-self: flex-end;
            pointer-events: auto;
            cursor: pointer;
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
            justify-content: space-between;
            align-items: center;
            display: flex;
          }
          .new-btn {
            border: 2px solid #427dde;
            background: #ffffffdd;
            border-radius: 50px;
            padding: 4px;
            padding-right: 16px;
            padding-left: 16px;
            color: #427dde;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 13px;
            vertical-align: middle;
            cursor: pointer;
            pointer-events: all;
            align-self: flex-end;
            margin-left: auto;
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
