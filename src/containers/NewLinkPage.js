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
  LABEL_TITLE_EDIT="Edit the current link", LABEL_TITLE="Add a new link",

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
    handleClose: (edit) => {
      dispatch(handleLink_DialogClose({edit}))
    },
  }
}

class NewLinkPage extends Component{
  handleExit(close, edit, shouldSave){
    close(edit)
    shouldSave && this.refs.newlink.getWrappedInstance().save(edit) && this.refs.newlink.getWrappedInstance().reset()
  }
  render() {
    const { isSaveActive, edit, open, handleClose, link, folder } = this.props
    const mainStyle = {
      top: open ? 0 : getPageHeight(),
      opacity: open ? 1 : 0,
    }
    let Content = link ? NewLink : NewFolder

    lockScrolling(open)
    !open && changeChromeThemeColor(THEME1);
    open && folder && changeChromeThemeColor(THEME2);
    open && link && changeChromeThemeColor(THEME3);

    return(
      <div className="material-animated" style={Object.assign({}, styles.main, mainStyle)}>
        <AppBar style={{backgroundColor: link ? THEME3 : THEME2 }} zDepth={0} title={ edit ? LABEL_TITLE_EDIT : LABEL_TITLE }
          iconElementLeft={<IconButton onTouchTap={() => this.handleExit(handleClose, edit)}>
            <IconBack/></IconButton>}
          iconElementRight={<IconButton disabled={!isSaveActive} onTouchTap={() => this.handleExit(handleClose, edit, true)}>
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
