import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/'
import { connect } from 'react-redux';

import Landing from './Landing';

import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';

import AppNavDrawer from '../components/AppNavDrawer'
import Content from '../containers/Content'
import Synchronize from '../containers/Synchronize'
import Footer from '../components/Footer';

import NewLinkPage from './NewLinkPage'
import NewLinkDialog from './NewLinkDialog'
import NewLinkFloatingButton from './NewLinkFloatingButton'

import Snackbar from 'material-ui/Snackbar';


export class App extends Component {
  render() {
    const {
      loggedIn, synchronized, user,
      drawerDocked, drawerOpen,
      folders,
      width, lastWidth,
      link_dialog,
      snackbar, snackbarClose,
    } = this.props

    let _drawerDocked = width > MEDIUM,
        _drawerOpen = _drawerDocked ? true : drawerOpen

    return (
      loggedIn
      ? synchronized
        ? <div>
            {
              (_drawerDocked
              ? <NewLinkDialog {...link_dialog} />
              : <NewLinkPage {...link_dialog} />)
            }
            <AppNavDrawer /*location={location}*/
              user={user} folders={folders}
              docked={_drawerDocked} open={_drawerOpen} />
            {link_dialog.open ? null : <NewLinkFloatingButton />}
            <div /*1 = animation will only be noticed when resizing the window width on desktops */
                className="material-animated-simple" /*1*/
                style={{ paddingLeft: !_drawerDocked ? 0 : 256 }} >
              <Content current={folders.current} showMenuIconButton={!_drawerDocked} />
              <Footer />
            </div>
            <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              autoHideDuration={snackbar.duration}
              onRequestClose={snackbarClose}
            />
          </div>
        : <Synchronize />
      : <Landing />
    )
  }
}

App.propTypes = {
  // to-do - declare propTypes used in App
};



function mapStateToProps(state) {
  return {
    loggedIn: state.local.loggedIn,
    drawerDocked: state.local.drawerDocked,
    drawerOpen: state.local.drawerOpen,
    synchronized: state.local.synchronized,
    user: state.local.user,
    snackbar: state.local.snackbar,
    link_dialog: state.local.link_dialog,
    folders: state.folders,
  };
}


function mapDispatchToProps(dispatch) {
  // to-do - these are tests; remove actions import after removing this
  let inc = 1
  setTimeout(function(){ dispatch(actions.logInChange(true)) }, inc)
  setTimeout(function(){ dispatch(actions.synchChange(true))}, inc*2)

  return{
    snackbarClose: (reason) => dispatch(actions.snackbar({open:false})),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(App));
