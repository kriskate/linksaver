import React, { Component } from 'react'
import { connect } from 'react-redux'

import { linkSave, handleLink_DialogChange, snackbar } from '../actions'

import Rater from 'react-rater'

import { getURLTitle, isValidURL } from '../utils/Utils'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {orange500, blue500} from 'material-ui/styles/colors'

import withWidth, {MEDIUM} from 'material-ui/utils/withWidth';



const
  // element id's
  ATTR_LINK = "ATTR_LINK",
  ATTR_NAME = "ATTR_NAME",
  ATTR_DESC = "ATTR_DESC",
  ATTR_RATE = "ATTR_RATE",
  ATTR_EXPY = "ATTR_EXPY",
  // labels
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
    add: { zIndex: 2, marginBottom:10 },
    errorStyle: { color: orange500, },
    floatingLabelFocusStyle: { color: blue500, },
  }


let tempState, initState = null




function mapDispatchToProps(dispatch){
  return{
    save: (edit, closeDialog) => {
      if(!checkValid()) return

      closeDialog && dispatch(handleLink_DialogClose(tempState))
      dispatch(linkSave({ edit, link: tempState }))
      dispatch(snackbar({ message: "Link saved!" }))
    },
    handleChange: (e, payload) => {
      let changedProp
      if(!e){
        changedProp = "date"
        let activate = tempState.date_expire !== payload
        tempState.date_expire = payload
      } else if(e && e.rating){
        if(e.originalEvent.type === 'click'){
          payload = e.rating
          tempState.rating = payload
          changedProp = "rating"
        } else return // else it will continue the stack - the rating component constantly triggers
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
                  let isSaveActive = true
                  dispatch(handleLink_DialogChange({link:{name}, isSaveActive}))
                }
              }).catch((err) => { })
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
  return (JSON.stringify(tempState) !== JSON.stringify(initState)) && isValidURL(tempState.url) && (tempState.name) ? true : false
}


function mapStateToProps(state){
  return { currentFolder: state.folders.current }
}


class NewLink extends Component {
  reset() { tempState = null }
  render(){
    const { edit, handleChange, currentFolder, save, quick, width } = this.props
    this.save = save // for calling from parent
    initState = this.props.link
    if(Object.keys(initState).length === 0) return null

    const { id, name, url, pic, description, date_added, date_expire, rating, archived, parent } = initState
    if(!tempState) tempState = Object.assign({}, initState)


    return (
      <div>
        <form style={styles.add}
            onSubmit={(ev) => {console.log('ere');ev.preventDefault(); save(edit, !quick)}}>
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
        </form>
        <Card>
          <CardText>
          <i>details:</i>
            <TextField multiLine={true} rows={1} rowsMax={4} fullWidth={true}
            id={ATTR_DESC} onChange={handleChange}
            floatingLabelText={LABEL_DESC} floatingLabelStyle={styles.floatingLabelFocusStyle} floatingLabelFixed={true}
            hintText={LABEL_DESC_HINT}
            value={description || ""}/>
            <div>
              { edit ? LABEL_EXPY_EDIT : LABEL_EXPY }
              <DatePicker container={width < MEDIUM ? "dialog" : "inline"} mode="portrait" autoOk={true}
              id={ATTR_EXPY} onChange={handleChange} defaultDate={date_expire} />
              <div>{LABEL_RATE}</div>
              <Rater id={ATTR_RATE} onRate={handleChange} rating={rating}/>
            </div>
          </CardText>
       </Card>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(withWidth()(NewLink))
