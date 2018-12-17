import React, { Component } from 'react'
import { view } from 'react-easy-state'

import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'

// Store
import worksheet from '../stores/worksheetStore'

// Components
import Dialog from '../components/Dialog'

class ValueEditDialog extends Component {
  constructor(props) {
    super(props)

    this.dialogElement = React.createRef()
  }

  open = () => {
    this.dialogElement &&
      this.dialogElement.current &&
      this.dialogElement.current.open &&
      this.dialogElement.current.open()
  }

  close = e => {
    this.dialogElement &&
      this.dialogElement.current &&
      this.dialogElement.current.close &&
      this.dialogElement.current.close(e)
  }

  handleDelete = e => {
    if (e) e.preventDefault()
    const { id } = this.props
    worksheet.removeValue(id)
    this.close(e)
  }

  render() {
    const { value, id } = this.props
    return (
      <Dialog
        ref={this.dialogElement}
        title={'Editing Choice'}
        actions={[
          {
            action: this.handleDelete,
            color: 'secondary',
            text: 'Delete'
          },
          {
            action: this.close,
            color: 'primary',
            text: 'Close'
          }
        ]}
      >
        <DialogContent>
          <DialogContentText>
            Edit the properties of this value by changing the content of the following parameters:
          </DialogContentText>
          <form noValidate autoComplete="off" onSubmit={this.close}>
            <FormGroup>
              <TextField
                className={'text-field'}
                label="Name/Description"
                value={value}
                onChange={evt => worksheet.editValue(id, evt.target.value)}
                margin="normal"
                variant="outlined"
              />
            </FormGroup>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default view(ValueEditDialog)
