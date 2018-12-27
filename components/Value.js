import React, { Component } from 'react'
import InlineReference from './InlineReference'
import { view } from 'react-easy-state'

// Components
import ValueEditDialog from '../dialogs/ValueEditDialog'

class Value extends Component {
  constructor(props) {
    super(props)

    this.dialog = React.createRef()
  }

  render() {
    const { value, index = 0, id, editable = false, draggable } = this.props
    return (
      <div className={'value'}>
        <InlineReference
          prefix={'V'}
          color={'#D0021B'}
          value={value}
          index={index}
          onClick={() =>
            editable && this.dialog && this.dialog.current && this.dialog.current.open
              ? this.dialog.current.open()
              : undefined
          }
          draggable={draggable}
        />
        {editable && <ValueEditDialog ref={this.dialog} id={id} value={value} index={index} />}
        <style jsx>{`
          .value {
            display: inline-block;
            max-width: 100%;
            margin: 5px;
          }
          .text-field {
            margin-left: 16px;
            margin-right: 16px;
          }
        `}</style>
      </div>
    )
  }
}

export default view(Value)
