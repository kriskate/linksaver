import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'
import Divider from 'material-ui/Divider';


const
  LABEL_TITLE="Add new folder",
  LABEL_NAME="Name",
  LABEL_ISGOTO="Go-to",
  LABEL_SUBFOLDER="Should be subfolder of ",
  LABEL_ADD = "Add",
  styles={
    main: {
      padding:20
    },
    addButton: { width: "100%" },
    checkbox: {
      /*width: 50px;*/
    }
    /*floatingLabelFocusStyle: { color: blue500, },*/
  }


const mapStateToProps = (state) => (
  {
    parentFolder: state.folders.current
  }
)

const NewFolder = ({name, parentFolder}) => (
  <div style={styles.main}>
    {LABEL_TITLE}
    <TextField fullWidth={true}
      onClick={(ev)=>ev.stopPropagation()}
      /*onChange={handleChange}*/
      hintText={LABEL_NAME}
      defaultValue={name || ""} />

    <Divider/>
    <Checkbox label={LABEL_ISGOTO} style={styles.checkbox} />
    <Divider/>
    <Checkbox label={LABEL_SUBFOLDER + parentFolder.name} style={styles.checkbox} />

    <FlatButton label={LABEL_ADD} primary={true} icon={<AddIcon />} style={styles.addButton}/>

  </div>
)


export default connect(mapStateToProps, null)(NewFolder)
