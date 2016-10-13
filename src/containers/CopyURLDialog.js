import React, { Component } from 'react'

import { lockScrolling } from '../utils/Utils'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'


class CopyURLDialog extends Component{
  render() {
    const { link, open, closeHandler } = this.props
    const action_buttons = [<FlatButton primary={true} label="Close" onTouchTap={closeHandler} />]

    lockScrolling(open)

    return(
      <Dialog
        contentStyle={{maxWidth:400}} actions={action_buttons}
        modal={false} open={open} onRequestClose={closeHandler} >
        <TextField id="0" fullWidth={true} value={link ? link.url : ""}
            ref={node => {
            open && setTimeout(() => {
            //node && open && node.input.select()
            node && open && node.input.focus()
            node && open && node.input.setSelectionRange(0, 3)
            }, 700)
          }} />
      </Dialog>
    )
  }
}


export default CopyURLDialog
