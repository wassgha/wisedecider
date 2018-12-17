import { Component } from 'react'

class InlineButton extends Component {
  render() {
    const { onClick, content = '+' } = this.props
    return (
      <div className={'btn'} onClick={onClick}>
        {content}
        <style jsx>{`
          .btn {
            background: white;
            border: 1px solid #bbb;
            color: #444;
            border-radius: 100px;
            font-size: 24px;
            display: inline-flex;
            width: 42px;
            height: 42px;
            margin-left: 5px;
            margin-right: 5px;
            vertical-align: middle;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}

export default InlineButton
