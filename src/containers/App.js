import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/'
import { connect } from 'react-redux';

import Landing from './landing/Landing';
import SignUp from './landing/SignUp';
import Synchronize from './landing/Synchronize'

import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';

import { LinkModel, FolderModel } from '../constants/Models'

import AppNavDrawer from '../components/AppNavDrawer'
import Content from './Content'
import Footer from '../components/Footer';

import NewLinkPage from './NewLinkPage'
import NewLinkDialog from './NewLinkDialog'
import NewLinkFloatingButton from './NewLinkFloatingButton'

import CopyURLDialog from './CopyURLDialog'
import Snackbar from 'material-ui/Snackbar';

let defaultsAssigned
export class App extends Component {
  render() {
    const {
      signUpNeeded, loggedIn, offline, synchronized, user,
      drawerDocked, drawerOpen,
      folders,
      width, lastWidth,
      link_dialog, linkcopy_dialog, closeHandler_linkCopy,
      snackbar, snackbarClose,
      assignDefaultModels,
    } = this.props

    let _drawerDocked = width > MEDIUM,
        _drawerOpen = _drawerDocked ? true : drawerOpen,
        _mobile = width < MEDIUM

    // HACK - calling this here because we need state.folders.current
    if(!defaultsAssigned){
      assignDefaultModels({
        link: new LinkModel({}),
        folder: new FolderModel({})
      })
      defaultsAssigned = true
    }

    return (
      loggedIn || offline
      ? synchronized
        ? <div>
            {
              _mobile
              ? <NewLinkPage {...link_dialog} />
              : <NewLinkDialog {...link_dialog} />
            }
            <CopyURLDialog {...linkcopy_dialog} closeHandler={closeHandler_linkCopy}/>
            <AppNavDrawer /*location={location}*/
              user={user} folders={folders}
              docked={_drawerDocked} open={_drawerOpen} />
            <div /*1 = animation will only be noticed when resizing the window width on desktops */
                className="material-animated-simple" /*1*/
                style={{ paddingLeft: !_drawerDocked ? 0 : 256 }} >
              <Content current={folders.current} showMenuIconButton={!_drawerDocked} />
              <Footer />
            </div>
              <NewLinkFloatingButton hidden={link_dialog.open} />
            <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              autoHideDuration={snackbar.duration}
              onRequestClose={snackbarClose}
            />
          </div>
        : <Synchronize />
      : signUpNeeded ? <SignUp /> : <Landing />
    )
  }
}

App.propTypes = {
  // to-do - declare propTypes used in App
};



function mapStateToProps(state) {
  //console.log('state',state)
  return {
    signUpNeeded: state.local.signUpNeeded,
    loggedIn: state.local.loggedIn,
    offline: state.local.offline,

    drawerDocked: state.local.drawerDocked,
    drawerOpen: state.local.drawerOpen,
    synchronized: state.local.synchronized,
    user: state.local.user,
    snackbar: state.local.snackbar,
    link_dialog: state.local.link_dialog,
    linkcopy_dialog: state.local.linkcopy_dialog,

    folders: state.folders,
  };
}


function mapDispatchToProps(dispatch) {
  // to-do - these are tests; remove actions import after removing this
  let inc = 1
  /*setTimeout(function(){ dispatch(actions.logInChange(true)) }, inc)
  setTimeout(function(){ dispatch(actions.syncChange(true))}, inc*2)*/

  return{
    closeHandler_linkCopy: () => dispatch(actions.linkCopyURL({open:false})),
    assignDefaultModels: ({link, folder}) => dispatch(actions.completeDefaults({link, folder})),
    snackbarClose: (reason) => dispatch(actions.snackbar({open:false})),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(App));
