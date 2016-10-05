import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewFolder from '../components/NewFolder'
import NewLink from '../components/NewLink'
import { handleLink_DialogClose } from '../actions'

import { getPageHeight, lockScrolling, changeChromeThemeColor, THEME1, THEME2, THEME3 } from '../utils/Utils'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import IconCheck from 'material-ui/svg-icons/navigation/check'
import IconBack from 'material-ui/svg-icons/navigation/arrow-back'

const
  LABEL_CANCEL="Cancel", LABEL_SAVE="Save", LABEL_ADD="Add",
  LABEL_TITLE_EDITF="Edit the current folder", LABEL_TITLEF="Add a new folder",
  LABEL_TITLE_EDITL="Edit the current link", LABEL_TITLEL="Add a new link",

  styles = {
    main:{
      position: 'fixed',
      zIndex: 199,
      backgroundColor: 'white',
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
    },
    content: {
      paddingLeft:25,
      paddingRight:25,
      paddingBottom:25,
    }
  }

function mapDispatchToProps(dispatch){
  return{
    handleClose: (payload) => {
      dispatch(handleLink_DialogClose(payload))
    },
  }
}

class NewLinkPage extends Component{
  handleExit(payload, shouldSave){
    this.props.handleClose(payload)
    shouldSave && this.refs.newlink.getWrappedInstance().save(payload.edit)
    shouldSave && this.refs.newlink.getWrappedInstance().reset()
  }
  render() {
    const { isSaveActive, edit, open, handleClose, link, folder, type } = this.props
    const mainStyle = {
      top: open ? 0 : getPageHeight(),
      opacity: open ? 1 : 0,
    }

    let Content = type == 'link' ? NewLink : NewFolder
    let LABEL = type == 'link' ? edit ? LABEL_TITLE_EDITL : LABEL_TITLEL : edit ? LABEL_TITLE_EDITF : LABEL_TITLEF

    lockScrolling(open)
    !open && changeChromeThemeColor(THEME1);
    open && folder && changeChromeThemeColor(THEME2);
    open && type == 'link' && changeChromeThemeColor(THEME3);

    return(
      <div className="material-animated" style={Object.assign({}, styles.main, mainStyle)}>
        <AppBar style={{backgroundColor: type == 'link' ? THEME3 : THEME2 }} zDepth={0} title={LABEL}
          iconElementLeft={<IconButton onTouchTap={() => this.handleExit({type, edit})}>
            <IconBack/></IconButton>}
          iconElementRight={<IconButton disabled={!isSaveActive} onTouchTap={() => this.handleExit({type, edit}, true) }>
            <IconCheck/></IconButton>}
        />
        <div style={styles.content}>
          <Content ref="newlink" {...this.props} />
        </div>
      </div>
    )
  }
}


export default connect(null, mapDispatchToProps)(NewLinkPage)
