import React, { Component } from 'react'
import { connect } from 'react-redux'
import Utils from '../utils/Utils'

import { LinkModel } from '../constants/Models'
import { linkSave, handleLink_DialogClose, handleLink_DialogChange } from '../actions'

import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import Rater from 'react-rater'


/* CONSTANTS { */
const
// element id's
  ATTR_LINK = "ATTR_LINK",
  ATTR_NAME = "ATTR_NAME",
  ATTR_DESC = "ATTR_DESC",
  ATTR_RATE = "ATTR_RATE",
  ATTR_EXPY = "ATTR_EXPY",
// labels
  LABEL_CANCEL="Cancel", LABEL_SAVE="Save", LABEL_ADD="Add",
  LABEL_TITLE_EDIT="Edit the current link", LABEL_TITLE="Add a new link",
  LABEL_LINK = "URL (link)",
  LABEL_NAME = "title",
  LABEL_DESC = "description", LABEL_DESC_HINT="leave blank for no description",
  LABEL_RATE = "Rating:",
  LABEL_EXPY_EDIT = "Expires at:", LABEL_EXPY = "This will be the expiry date (5 days from now as default):",

  styles = {
    url: {  minWidth:20, marginRight:15, },
    add: { zIndex: 2,  },
    errorStyle: { color: orange500, },
    floatingLabelFocusStyle: { color: blue500, },
  }
/*} end CONSTANTS */


function composeLink_DialogLink(edit){
  //console.log(tempState)
  // if editing, clear state.local.link_dialog for a fresh link; else, leave the fields pre-completed
  if(edit) return {}
  return tempState
}

let tempState, initState = null

function mapDispatchToProps(dispatch){
  return{
    handleClose: (edit, save) => {
      save && dispatch(linkSave({link: tempState, edit}))
      dispatch(handleLink_DialogClose(composeLink_DialogLink(edit)))
      tempState = null
    },
    handleChange: (e, payload) => {
      if(!e){
        // date
        let activate = tempState.date_expire !== payload
        tempState.date_expire = payload
      } else if(e && e.rating){
        // rating component
        if(e.originalEvent.type === 'click'){}
         //console.log('rated',e.rating, e.lastRating)
      } else {
        // material-ui components
        let cid = e.target.id
        let activate = tempState[cid] !== payload
        switch(e.target.id){
          case ATTR_LINK:
            tempState.url = payload
            Utils.getURLTitle(payload)
          break
          case ATTR_NAME:
            tempState.name = payload
          break
          case ATTR_DESC:
            tempState.description = payload
          break
        }
      }

      let isSaveActive = JSON.stringify(tempState) !== JSON.stringify(initState)
      if(!tempState.url || !tempState.name) isSaveActive = false

      dispatch(handleLink_DialogChange({isSaveActive}))
    },
  }
}
function mapStateToProps(state){
  return { currentFolder: state.folders.current }
}

class LinkDialog extends Component{
  constructor(props,context){
    super(props,context)
    //console.log(props,context)
  }
  render(){
    const { fullHeightFields, isSaveActive, edit, open, handleClose, handleOpen, handleChange, currentFolder } = this.props
    initState = this.props.link
    if(Object.keys(initState).length === 0) return null

    const { id, name, url, pic, description, date_added, date_expire, stars, archived, parent } = initState
    if(!tempState) tempState = Object.assign({}, initState)

    const action_buttons = [
      <FlatButton
        label={LABEL_CANCEL}
        primary={true}
        onTouchTap={() => handleClose(edit)}
      />,
      <FlatButton
        label={ edit ? LABEL_SAVE : LABEL_ADD }
        primary={true}
        disabled={!isSaveActive}
        onTouchTap={() => handleClose(edit, true)}
      />,
    ]
    return(
      <Dialog
        title={ edit ? LABEL_TITLE_EDIT : LABEL_TITLE }
        actions={action_buttons}
        modal={false}
        open={open}
        onRequestClose={() => handleClose(edit)} >
        <div style={styles.add}>
          <TextField style={styles.url} fullWidth={fullHeightFields}
            id={ATTR_LINK} onChange={handleChange}
            floatingLabelText={LABEL_LINK} floatingLabelStyle={styles.errorStyle}
            defaultValue={url || ""} />
          <TextField style={styles.url} fullWidth={fullHeightFields}
            id={ATTR_NAME} onChange={handleChange}
            floatingLabelText={LABEL_NAME} floatingLabelStyle={styles.floatingLabelFocusStyle}
            defaultValue={name || ""} /><br/>

          <TextField multiLine={true} rows={1} rowsMax={4} fullWidth={true}
            id={ATTR_DESC} onChange={handleChange}
            floatingLabelText={LABEL_DESC} floatingLabelStyle={styles.floatingLabelFocusStyle}
            hintText={LABEL_DESC_HINT}
            defaultValue={description || ""}/>
        </div><br/><br/>
        <div>
          { edit ? LABEL_EXPY_EDIT : LABEL_EXPY }
          <DatePicker container="inline" mode="portrait" autoOk={true}
              id={ATTR_EXPY} onChange={handleChange} defaultDate={date_expire} />
          LABEL_RATE
          <Rater id={ATTR_RATE} onRate={handleChange} rating={stars}/>
        </div>
      </Dialog>
    )
  }
}


LinkDialog = connect(mapStateToProps, mapDispatchToProps)(LinkDialog)
export default LinkDialog
