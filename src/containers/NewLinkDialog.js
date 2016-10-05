import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewLink from '../components/NewLink'
import NewFolder from '../components/NewFolder'
import { handleLink_DialogClose } from '../actions'

import { lockScrolling } from '../utils/Utils'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const
  LABEL_CANCEL="Cancel", LABEL_SAVE="Save", LABEL_ADD="Add",
  LABEL_TITLE_EDITF="Edit the current folder", LABEL_TITLEF="Add a new folder",
  LABEL_TITLE_EDITL="Edit the current link", LABEL_TITLEL="Add a new link"


function mapDispatchToProps(dispatch){
  return{
    handleClose: (payload) => {
      dispatch(handleLink_DialogClose(payload))
    },
  }
}

class NewLinkDialog extends Component{
  handleExit(payload, shouldSave){
    this.props.handleClose(payload)
    shouldSave && this.refs.newlink.getWrappedInstance().save(payload.edit)
    shouldSave && this.refs.newlink.getWrappedInstance().reset()
  }
  render() {
    const { isSaveActive, edit, open, handleClose, link, folder, type } = this.props
    const action_buttons = [
      <FlatButton primary={true} label={LABEL_CANCEL}
        onTouchTap={() => this.handleExit({type, edit})} />,
      <FlatButton primary={true} label={ edit ? LABEL_SAVE : LABEL_ADD } disabled={!isSaveActive}
        onTouchTap={() => this.handleExit({type, edit}, true)} />,
    ]
    let Content = type == "link" ? NewLink : NewFolder
    let LABEL = type == "link" ? edit ? LABEL_TITLE_EDITL : LABEL_TITLEL : edit ? LABEL_TITLE_EDITF : LABEL_TITLEF

    lockScrolling(open)
    return(
      <Dialog
        contentStyle={type == "link" ? {} : {maxWidth:400}}
        title={LABEL} actions={action_buttons}
        modal={false}
        open={open} onRequestClose={() => this.handleExit({type, edit})} >

        <Content ref="newlink" {...this.props} />
      </Dialog>
    )
  }
}


export default connect(null, mapDispatchToProps)(NewLinkDialog)
