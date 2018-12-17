import React, { Component } from 'react'
import { store, view } from 'react-easy-state'

import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import InputLabel from '@material-ui/core/InputLabel'

// Store
import worksheet from '../stores/worksheetStore'

// Components
import Dialog from '../components/Dialog'
import ColorPicker from '../components/ColorPicker'

class ChoiceEditDialog extends Component {
  constructor(props) {
    super(props)

    const { color = '#7FB049', value } = this.props
    this.dialogState = store({
      color,
      value
    })
    this.dialogElement = React.createRef()
  }

  componentDidUpdate(prevProps) {
    const { color = '#7FB049', value } = this.props
    if (prevProps.color != color || prevProps.value != value) {
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
    const { color = '#7FB049', value } = this.props
    this.dialogState.color = color
    this.dialogState.value = value
  }

  handleDelete = e => {
    if (e) e.preventDefault()
    const { id } = this.props
    worksheet.removeChoice(id)
    this.close(e)
  }

  handleSave = e => {
    if (e) e.preventDefault()
    const { id } = this.props
    const { color, value } = this.dialogState
    worksheet.editChoice(id, value, color)
    this.close(e)
  }

  render() {
    const { color, value } = this.dialogState
    return (
      <Dialog
        ref={this.dialogElement}
        title={'Editing Choice'}
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
            Edit the properties of this choice by changing the content of the following parameters:
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
            <InputLabel>Color</InputLabel>
            <ColorPicker color={color} onChange={color => (this.dialogState.color = color.hex)} />
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default view(ChoiceEditDialog)
