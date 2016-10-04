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

const transition = "all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
      transitionLeft = "left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
      hideButtons = { right: "-100%", opacity: 0 }

const padding = 20, separator = 90
const styles = {
  main: {/* position:"absolute", width:"100%",height:"100%", top:0, left: 0, */zIndex:1 },
  add: { position:"fixed", right: padding, bottom: padding, transition, },
  folder: { position:"fixed", right: padding, bottom: separator, transition, },
  link: { position:"fixed", right: padding, bottom: padding, transition, },
  cover: { position:"fixed", top:0, left: 0, width:"100%", height: "100%", backgroundColor:"rgba(0, 0, 0, 0.541176)", transition: transitionLeft }
}
class NewLinkFloatingButton extends Component {
  render(){
    const { openLink_Dialog, getLink, getFolder, open, toggleOpen } = this.props

    lockScrolling(open)

    return(
      <div style={styles.main}>
        <div onTouchTap={toggleOpen} style={Object.assign({}, styles.cover, open ? {} : { left: "-100%" })} />
        <FloatingActionButton style={Object.assign({}, styles.add, !open ? {} : hideButtons )}
          onTouchTap={toggleOpen}>
          <ContentAdd /></FloatingActionButton>
        <FloatingActionButton style={Object.assign({}, styles.link, open ? {} : hideButtons )}
          backgroundColor={THEME3} onTouchTap={() => openLink_Dialog({link: getLink()})}>
          <ContentLink /></FloatingActionButton>
        <FloatingActionButton style={Object.assign({}, styles.folder, open ? {} : hideButtons )}
          backgroundColor={THEME2} onTouchTap={() => openLink_Dialog({folder: getFolder()})}>
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
