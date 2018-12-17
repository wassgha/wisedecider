import React, { Component } from 'react'
import InlineReference from './InlineReference'
import { view } from 'react-easy-state'

// Components
import ChoiceEditDialog from '../dialogs/ChoiceEditDialog'

class Choice extends Component {
  constructor(props) {
    super(props)

    this.dialog = React.createRef()
  }

  render() {
    const { id, value, index = 0, color = '#7FB049', editable = false, draggable } = this.props
    return (
      <div className={'container'}>
        <InlineReference
          prefix={'C'}
          color={color}
          value={value}
          index={index}
          onClick={() =>
            editable && this.dialog && this.dialog.current && this.dialog.current.open
              ? this.dialog.current.open()
              : undefined
          }
          draggable={draggable}
        />
        {editable && (
          <ChoiceEditDialog ref={this.dialog} id={id} color={color} value={value} index={index} />
        )}
        <style jsx>{`
          .container {
            display: inline-flex;
            max-width: 100%;
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

export default view(Choice)
