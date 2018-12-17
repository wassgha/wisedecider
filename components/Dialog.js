import { Component } from 'react'
import { view, store } from 'react-easy-state'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

class DialogComponent extends Component {
  constructor(props) {
    super(props)

    this.dialogState = store({
      open: false
    })
  }

  open = () => {
    this.dialogState.open = true
  }

  close = e => {
    if (e) e.preventDefault()
    this.dialogState.open = false
  }

  render() {
    const { open } = this.dialogState
    const { children = '', title = '', actions = [] } = this.props
    return (
      <Dialog
        open={open}
        onClose={this.close}
        aria-labelledby="responsive-dialog-title"
        scroll="body"
        PaperProps={{
          style: {
            overflow: 'visible',
            overflowY: 'visible',
            overflowX: 'visible'
          }
        }}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        {children}
        <DialogActions>
          {actions.map(({ text, action, color }) => (
            <Button onClick={action} color={color}>
              {text}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    )
  }
}

export default view(DialogComponent)
