import { Component } from 'react'
import Color from 'color'

class InlineReference extends Component {
  render() {
    const {
      prefix = 'C',
      value,
      index = 0,
      color = '#D0021B',
      onClick,
      draggable = false
    } = this.props
    return (
      <div className={'container'}>
        {draggable && <div className={'dragHandle'}>.. .. ..</div>}
        <button className={'reference'} contentEditable={'false'} onClick={onClick}>
          <div className={'index'}>
            {prefix}
            {index + 1}
          </div>
          <div className={'separator'} />
          <div className={'value'}>{value}</div>
        </button>
        <style jsx>{`
          .container {
            margin: 5px;
            max-width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .reference {
            background: ${Color(color)
              .alpha(0.2)
              .rgb()};
            border: none;
            border-radius: 100px;
            font-size: 16px;
            display: inline-flex;
            padding-left: 10px;
            padding-right: 10px;
            flex: 1;
            max-width: 100%;
            vertical-align: middle;
          }
          .separator {
            width: 1px;
            background: ${Color(color)
              .darken(0.6)
              .alpha(0.2)
              .rgb()};
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .index {
            padding: 10px;
            color: ${Color(color)
              .darken(0.2)
              .rgb()};
            font-weight: bold;
          }
          .value {
            font-size: 16px;
            padding: 10px;
            flex: 1;
            color: ${color};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .dragHandle {
            min-width: 20px;
            max-width: 20px;
            width: 20px;
            display: block;
            white-space: normal;
            line-height: 6px;
            padding-bottom: 6px;
            cursor: move;
            font-size: 16px;
            font-weight: normal;
            font-family: sans-serif;
            letter-spacing: 4px;
            color: #cccccc;
            height: auto;
            vertical-align: middle;
          }
        `}</style>
      </div>
    )
  }
}

export default InlineReference
