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
      draggable = false,
      direction = 'row'
    } = this.props
    return (
      <div className={'container'}>
        {draggable && <span className={'dragHandle'}>.. .. ..</span>}
        <div className={'reference'} contentEditable={'false'} onClick={onClick}>
          <div className={'index'}>
            {prefix}
            {index + 1}
          </div>
          <div className={'value'}>{value}</div>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            width: 100%;
            align-items: center;
            vertical-align: middle;
          }
          .reference {
            background: ${Color(color)
              .alpha(0.2)
              .rgb()};
            border: none;
            border-radius: 100px;
            font-weight: normal;
            text-transform: none;
            font-size: 16px;
            display: flex;
            padding-left: 10px;
            padding-right: 10px;
            flex: 1;
            vertical-align: middle;
            cursor: ${draggable ? (direction == 'row' ? 'ew-resize' : 'ns-resize') : 'auto'};
            max-width: ${draggable ? 'calc(100% - 34px)' : '100%'};
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
            text-align: left;
          }
          .dragHandle {
            width: 20px;
            white-space: normal;
            line-height: 6px;
            padding-bottom: 6px;
            cursor: ${direction == 'row' ? 'ew-resize' : 'ns-resize'};
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
