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


import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const styles = {
  floatingButton: { position: "fixed", marginRight: 20, marginBottom: 20, },
}
export class App extends Component {
  render() {
    const {
      loggedIn, synchronized,
      drawerDocked, drawerOpen,
      folders,
      width, lastWidth,
      user,
    } = this.props;

    let _drawerDocked = width > MEDIUM,
        _drawerOpen = _drawerDocked ? true : drawerOpen
    return (
      loggedIn
      ? synchronized
        ? <div>
            <AppNavDrawer
              /*location={location}*/
              user={user} folders={folders}
              docked={_drawerDocked} open={_drawerOpen} />
            <div
              className="material-animated-simple" /* will only be noticed when resizing the window on desktops */
              style={{ paddingLeft: !_drawerDocked ? 0 : 256 }} >
              <Content current={folders.current} showMenuIconButton={!_drawerDocked} />
              <Footer />

              <FloatingActionButton style={styles.floatingButton}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
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
  //console.log(state, state.local.user)
  return {
    loggedIn: state.local.loggedIn,
    drawerDocked: state.local.drawerDocked,
    drawerOpen: state.local.drawerOpen,
    synchronized: state.local.synchronized,
    user: state.local.user,
    folders: state.folders,
  };
}


function mapDispatchToProps(dispatch) {
  // to-do - these are tests; remove actions import after removing this
  let inc = 1
  setTimeout(function(){ dispatch(actions.logInChange(true)) }, inc)
  setTimeout(function(){ dispatch(actions.synchChange(true))}, inc*2)
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(App));
