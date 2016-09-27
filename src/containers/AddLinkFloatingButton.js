import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LinkModel } from '../constants/Models'

import { handleLink_DialogOpen } from '../actions'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { linkAdd } from '../actions'



const styles = {
  floatingButton: { position: "fixed", right: 20, bottom: 20, zIndex: 3 },
}
class AddLinkFloatingButton extends Component {
  render(){
    const { openLink_Dialog, getLink, } = this.props

    return(
      <div>
      <FloatingActionButton onTouchTap={() => openLink_Dialog(getLink())} style={styles.floatingButton}>
        <ContentAdd />
      </FloatingActionButton>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    getLink: () => {
      let toR = state.local.link_dialog.link instanceof LinkModel ? state.local.link_dialog : new LinkModel({parent: {id: state.folders.current.id, name: state.folders.current.name}})
      return toR
    }
  }
}
function mapDispatchToProps(dispatch){
  return{
    openLink_Dialog: (dialogLink) => dispatch(handleLink_DialogOpen(dialogLink, true))
  }
}

AddLinkFloatingButton = connect(mapStateToProps, mapDispatchToProps)(AddLinkFloatingButton)

export default AddLinkFloatingButton
