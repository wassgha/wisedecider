import React, { Component } from 'react'
import { store, view } from 'react-easy-state'

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

    const { value } = this.props
    this.dialogState = store({
      value
    })
    this.dialogElement = React.createRef()
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (prevProps.value != value) {
      this.reset()
    }
  }

  open = () => {
    this.reset()
    this.dialogElement &&
      this.dialogElement.current &&
      this.dialogElement.current.open &&
      this.dialogElement.current.open()
  }

  close = e => {
    this.reset()
    this.dialogElement &&
      this.dialogElement.current &&
      this.dialogElement.current.close &&
      this.dialogElement.current.close(e)
  }

  reset = () => {
    const { value } = this.props
    this.dialogState.value = value
  }

  handleDelete = e => {
    if (e) e.preventDefault()
    const { id } = this.props
    worksheet.removeValue(id)
    this.close(e)
  }

  handleSave = e => {
    if (e) e.preventDefault()
    const { id } = this.props
    const { value } = this.dialogState
    worksheet.editValue(id, value)
    this.close(e)
  }

  render() {
    const { value } = this.dialogState
    return (
      <Dialog
        ref={this.dialogElement}
        title={'Editing Value'}
        actions={[
          {
            action: this.close,
            color: 'default',
            text: 'Close'
          },
          {
            action: this.handleDelete,
            color: 'secondary',
            text: 'Delete'
          },
          {
            action: this.handleSave,
            color: 'primary',
            text: 'Save'
          }
        ]}
      >
        <DialogContent>
          <DialogContentText>
            Edit the properties of this value by changing the content of the following parameters:
          </DialogContentText>
          <form noValidate autoComplete="off" onSubmit={this.handleSave}>
            <FormGroup>
              <TextField
                className={'text-field'}
                label="Name/Description"
                value={value}
                onChange={evt => (this.dialogState.value = evt.target.value)}
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
