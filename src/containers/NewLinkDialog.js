import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewLink from '../components/NewLink'
import { handleLink_DialogClose } from '../actions'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const
  LABEL_CANCEL="Cancel", LABEL_SAVE="Save", LABEL_ADD="Add",
  LABEL_TITLE_EDIT="Edit the current link", LABEL_TITLE="Add a new link"


function mapDispatchToProps(dispatch){
  return{
    handleClose: (edit) => {
      dispatch(handleLink_DialogClose({edit}))
    },
  }
}

class NewLinkDialog extends Component{
  handleExit(close, edit, shouldSave){
    close(edit)
    shouldSave && this.refs.newlink.getWrappedInstance().save(edit) && this.refs.newlink.getWrappedInstance().reset()
  }
  render() {
    const { isSaveActive, edit, open, handleClose } = this.props
    const action_buttons = [
      <FlatButton primary={true} label={LABEL_CANCEL}
        onTouchTap={() => this.handleExit(handleClose, edit)} />,
      <FlatButton primary={true} label={ edit ? LABEL_SAVE : LABEL_ADD } disabled={!isSaveActive}
        onTouchTap={() => this.handleExit(handleClose, edit, true)} />,
    ]
    return(
      <Dialog
        title={ edit ? LABEL_TITLE_EDIT : LABEL_TITLE } actions={action_buttons}
        modal={false}
        open={open} onRequestClose={() => this.handleExit(handleClose, edit)} >

        <NewLink ref="newlink" {...this.props} />
      </Dialog>
    )
  }
}


export default connect(null, mapDispatchToProps)(NewLinkDialog)
