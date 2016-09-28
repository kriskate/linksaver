import React, { Component } from 'react'
import { connect } from 'react-redux'
//import Utils from '../utils/Utils'
import { getURLTitle, isValidURL } from '../utils/Utils'

import { LinkModel } from '../constants/Models'
import { linkSave, handleLink_DialogClose, handleLink_DialogChange } from '../actions'

import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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
  LABEL_NAME = "title", LABEL_NAME_HINT = "If empty, will try to autocomplete",
  LABEL_DESC = "description", LABEL_DESC_HINT="leave blank for no description",
  LABEL_RATE = "Rating:",
  LABEL_EXPY_EDIT = "Expires at:", LABEL_EXPY = "This will be the expiry date (5 days from now as default):",
// errors
  ERROR_VALIDHTTP = "Must be a valid url",
  ERROR_REQUIRED = "Required",
// warnings
  WARN_TOOMUCHDESCRIPTION = "Warning! the description will be cut at two rows",

  styles = {
    url: {  minWidth:20, marginRight:15, },
    add: { zIndex: 2,  },
    errorStyle: { color: orange500, },
    floatingLabelFocusStyle: { color: blue500, },
  }
/*} end CONSTANTS */


function composeLink_DialogLink(edit){
  // to-do: if editing, clear state.local.link_dialog for a fresh link; else, leave the fields pre-completed
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
      let changedProp
      if(!e){
        changedProp = "date"
        let activate = tempState.date_expire !== payload
        tempState.date_expire = payload
      } else if(e && e.rating){
        if(e.originalEvent.type === 'click'){
          changedProp = "rating"
          payload = e.rating
        }
         //console.log('rated',e.rating, e.lastRating)
      } else {
        // material-ui components
        let cid = e.target.id,
            activate = tempState[cid] !== payload
        switch(e.target.id){
          case ATTR_LINK:
            tempState.url = payload
            changedProp = "url"
            // to-do: separate linkDialog state in a separate reducer
            // to-do(maybe): after separation, add name_blurred and url_blurred, in order to display errors only after the field have beed de-focused
            if(isValidURL(payload))
              tempState.name
              ? dispatch(handleLink_DialogChange({isSaveActive:true}))
              : getURLTitle(payload).then((name) => {
                if(name){
                  tempState.name = name
                  let isSaveActive = true// to-do: investigate why checkValid() fails
                  dispatch(handleLink_DialogChange({link:{name}, isSaveActive}))
                }
              })
          break
          case ATTR_NAME:
            tempState.name = payload
            changedProp = "name"
          break
          case ATTR_DESC:
            tempState.description = payload
            changedProp = "description"
          break
        }
      }
      if(!changedProp) return
      let isSaveActive = checkValid()
      let link = {}; link[changedProp] = payload
      dispatch(handleLink_DialogChange({link,isSaveActive}))
    },
  }
}

function checkValid (){
  return (JSON.stringify(tempState) !== JSON.stringify(initState)) && isValidURL(tempState.url) && (tempState.name)
}
function mapStateToProps(state){
  return { currentFolder: state.folders.current }
}

class NewLinkDialog extends Component{
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
          <TextField style={styles.url} fullWidth={true}
            id={ATTR_LINK} onChange={handleChange}
            floatingLabelText={LABEL_LINK} floatingLabelStyle={styles.errorStyle}
            errorText={isValidURL(url) ? "" : ERROR_REQUIRED + ". " + ERROR_VALIDHTTP }
            value={url || ""} />
          <TextField style={styles.url} fullWidth={true}
            id={ATTR_NAME} onChange={handleChange}
            floatingLabelText={LABEL_NAME} floatingLabelStyle={styles.floatingLabelFocusStyle}
            hintText={LABEL_NAME_HINT}
            errorText={name ? "" : ERROR_REQUIRED }
            value={name || ""} />
        </div>
<br/>
            <Card>
               <CardHeader
                 title="More options"
                 actAsExpander={true}
                 showExpandableButton={true} />
               <CardText expandable={true}>
                  <TextField multiLine={true} rows={1} rowsMax={4} fullWidth={true}
                    id={ATTR_DESC} onChange={handleChange}
                    floatingLabelText={LABEL_DESC} floatingLabelStyle={styles.floatingLabelFocusStyle} floatingLabelFixed={true}
                    hintText={LABEL_DESC_HINT}
                    defaultValue={description || ""}/><br/><br/>
                <div>
                  { edit ? LABEL_EXPY_EDIT : LABEL_EXPY }
                  <DatePicker container="inline" mode="portrait" autoOk={true}
                      id={ATTR_EXPY} onChange={handleChange} defaultDate={date_expire} />
                  LABEL_RATE
                  <Rater id={ATTR_RATE} onRate={handleChange} rating={stars}/>
                </div>
               </CardText>
             </Card>
      </Dialog>
    )
  }
}


NewLinkDialog = connect(mapStateToProps, mapDispatchToProps)(NewLinkDialog)
export default NewLinkDialog
