import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'


const
  LABEL_TITLE="Add new folder",
  LABEL_NAME="Name",
  LABEL_ISGOTO="Go-to",
  LABEL_ADD = "Add",
  styles={
    main: {
      padding:20
    },
    addButton: { width: "100%" }
    /*floatingLabelFocusStyle: { color: blue500, },*/
  }


const NewFolder = ({name}) => (
  <div style={styles.main}>
    {LABEL_TITLE}
    <TextField fullWidth={true}
      onClick={(ev)=>ev.stopPropagation()}
      /*onChange={handleChange}*/
      hintText={LABEL_NAME}
      defaultValue={name || ""} />

    <Checkbox label={LABEL_ISGOTO} style={styles.checkbox} labelPosition="left"/>

    <FlatButton label={LABEL_ADD} primary={true} icon={<AddIcon />} style={styles.addButton}/>

  </div>
)

export default NewFolder
