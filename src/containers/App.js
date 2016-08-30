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

export class App extends Component {
  render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
    const {
      loggedIn, synchronized,
      drawerDocked, drawerOpen,
      folders,
      actions, dispatch,
      width, lastWidth,
      drawerChangeList, drawerNav,
      user,
    } = this.props;
console.log(folders)
console.log(folders.current.links)
    let _drawerDocked = width > MEDIUM,
        _drawerOpen = _drawerDocked ? true : drawerOpen
    return (
      loggedIn
      ? synchronized
        ? <div>
            <AppNavDrawer
              /*location={location}*/
              user={user}
              docked={_drawerDocked} open={_drawerOpen}
              folders={folders}
              drawerNav={actions.toggleDrawerOpen}
              drawerChangeList={(event, folder) => { actions.folderSelected(folder); actions.toggleDrawerOpen(false); }} />
            <div style={{paddingLeft: !_drawerDocked ? 0 : 256, transition: 'all 100ms'}} >
              <Content current={folders.current} showMenuIconButton={!_drawerDocked} />
              <Footer />
            </div>
          </div>
        : <Synchronize />
      : <Landing />
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  console.log(state, state.local.user)
  return {
    loggedIn: state.local.loggedIn,
    drawerDocked: state.local.drawerDocked,
    drawerOpen: state.local.drawerOpen,
    synchronized: state.local.synchronized,
    user: state.local.user,
    folders: state.folders,
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  let inc = 1
  setTimeout(function(){ dispatch(actions.logInChange(true)) }, inc)
  setTimeout(function(){ dispatch(actions.synchChange(true))}, inc*2)
  //setTimeout(function(){ dispatch(actions.toggleDrawerDock())}, inc*3)
  return {
    actions: bindActionCreators(/*CounterActions,*/actions, dispatch)
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(App));
