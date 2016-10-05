import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'
import Divider from 'material-ui/Divider';

import { folderSave, handleLink_DialogChange, snackbar } from '../actions'


const
  ATTR_NAME="ATTR_NAME", ATTR_SUBFOLDER="ATTR_SUBFOLDER", ATTR_GOTO="ATTR_GOTO",
  LABEL_TITLE_QUICKADD="Quick add folder:",
  LABEL_NAME="Name",
  LABEL_ISGOTO="Go-to",
  LABEL_SUBFOLDER="Should be subfolder of ",
  LABEL_ADD = "Add",

  styles={
    main: {
      padding:20,
      maxWidth: 300,
      position: "relative",
    },
    addButton: { width: "100%" },
    checkbox: {
      /*width: 50px;*/
    }
    /*floatingLabelFocusStyle: { color: blue500, },*/
  }

let tempState, initState = null




const mapStateToProps = (state) => (
  {
    currentFolder: state.folders.current,
  }
)


function mapDispatchToProps(dispatch){
  return{
    save: (edit) => {
      dispatch(folderSave({ edit, folder: tempState }))
      dispatch(snackbar({ message: "Folder saved!" }))

      if(typeof(edit) == 'function') edit()
    },
    handleChange: (e, payload) => {
      let changedProp
        // material-ui components
      let cid = e.target.id,
          activate = tempState[cid] !== payload
      switch(e.target.id){
        case ATTR_NAME:
          tempState.name = payload
          changedProp = "name"
        break
        case ATTR_GOTO:
          tempState.isGoto = payload
          changedProp = "isGoto"
        break
        case ATTR_SUBFOLDER:
          tempState.isSubFolder = payload
          changedProp = "isSubFolder"
        break
      }

      if(!changedProp) return
      let isSaveActive = checkValid()
      let folder = {}; folder[changedProp] = payload
      dispatch(handleLink_DialogChange({folder, isSaveActive}))
    },
  }
}
function checkValid (){
  return (JSON.stringify(tempState) !== JSON.stringify(initState)) && (tempState.name) ? true : false
}


class NewFolder extends Component{
  reset() { tempState = null }
  render(){
    const { edit, handleChange, currentFolder, save, quick } = this.props
    this.save = save // for calling from parent
    initState = this.props.folder
    if(!initState || Object.keys(initState).length === 0) return <div/>

    const { id, name, subfolders, links, shared, isGoto, isSubFolder } = initState
    if(!tempState) tempState = Object.assign({}, initState)

    return(
      <div style={styles.main}>
        <TextField fullWidth={true} id={ATTR_NAME}
          onChange={handleChange}
          hintText={!quick ? LABEL_NAME : LABEL_TITLE_QUICKADD}
          value={name} />
        { quick ? null :
        <div>
          <Toggle id={ATTR_GOTO} onToggle={handleChange} label={LABEL_ISGOTO}
                  style={styles.checkbox} toggled={isGoto} />
          <Toggle id={ATTR_SUBFOLDER} onToggle={handleChange} label={LABEL_SUBFOLDER + currentFolder.name}
                  style={styles.checkbox} toggled={isGoto ? false : isSubFolder} disabled={isGoto} />
        </div>
        }

        {!quick
          ? <div style={{marginTop:30}}>
              <div><b>subfolders</b></div>
              <div>shared</div>
          </div>
          : <FlatButton label={LABEL_ADD} primary={true} icon={<AddIcon />} style={styles.addButton} onTouchTap={() => save(this.reset)}/>}

      </div>)
  }
}


export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(NewFolder)
