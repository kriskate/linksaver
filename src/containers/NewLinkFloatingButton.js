import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LinkModel, FolderModel } from '../constants/Models'

import { handleLink_DialogOpen, toggleAddOpen } from '../actions'

import { lockScrolling, THEME2, THEME3 } from '../utils/Utils'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentFolder from 'material-ui/svg-icons/file/folder';
import { linkAdd } from '../actions'

const padding = 20, separator = 90
const hideButtons = { right: "-100%" }, showButtons = { right: padding }

const styles = {
  main: {/* position:"absolute", width:"100%",height:"100%", top:0, left: 0, */zIndex:1 },
  add: { position:"fixed", bottom: padding, },
  folder: { position:"fixed", bottom: separator, },
  link: { position:"fixed", bottom: padding, },
  cover: { position:"fixed", top:0, left: 0, width:"100%", height: "100%", backgroundColor:"rgba(0, 0, 0, 0.541176)", }
}
class NewLinkFloatingButton extends Component {
  render(){
    const { openLink_Dialog, getLink, getFolder, open, toggleOpen, hidden } = this.props

    lockScrolling(open)

    return(
      <div style={styles.main}>
        <div onTouchTap={toggleOpen} className="material-animated-skip-left" style={Object.assign({}, styles.cover, open ? {} : { left: "-100%" })} />
        <FloatingActionButton className="material-animated" onTouchTap={toggleOpen}
          style={Object.assign({}, styles.add, open || hidden ? hideButtons : showButtons )}>
          <ContentAdd /></FloatingActionButton>
        <FloatingActionButton className="material-animated" onTouchTap={() => openLink_Dialog({link: getLink()})}
          style={Object.assign({}, styles.link, open ? showButtons : hideButtons )}
          backgroundColor={THEME3}>
          <ContentLink /></FloatingActionButton>
        <FloatingActionButton className="material-animated" onTouchTap={() => openLink_Dialog({folder: getFolder()})}
          style={Object.assign({}, styles.folder, open ? showButtons : hideButtons )}
          backgroundColor={THEME2}>
          <ContentFolder /></FloatingActionButton>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    open: state.local.addOpen,
    getLink: () => {
      let toR = Object.keys(state.local.link_dialog.link).length > 0 ? state.local.link_dialog.link : new LinkModel({parent: {id: state.folders.current.id, name: state.folders.current.name}})
      return toR
    },
    getFolder: () => {
      let toR = Object.keys(state.local.link_dialog.folder).length > 0 ? state.local.link_dialog.folder : new FolderModel({})
      return toR
    }
  }
}
function mapDispatchToProps(dispatch){
  return{
    toggleOpen: () => { dispatch(toggleAddOpen()); },
    openLink_Dialog: (dialogLink) => {dispatch(toggleAddOpen(false)); dispatch(handleLink_DialogOpen(dialogLink, true))},
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewLinkFloatingButton)
