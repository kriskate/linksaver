import React, { Component } from 'react';

import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { logInChange } from '../../actions'

import Storage from "./Storage";


let styles = {
  container: {
    textAlign: 'center',
    /*width: 425,
    height: 300,*/
  },
  paper: {
    margin: 50,
    padding: 15,
  },
  paper2: {
    margin: 50,
    marginTop: 25,
    padding: 15,
  }
}

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    goGuest: (ev) => dispatch(logInChange({offline:true})),
  }
}


let input_user, input_pass;

class SignUp extends Component{
  render(){
    const { goGuest, goLogin, } = this.props
    return (
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={2}>
          <h1>Sign-up in order to use <i>linksaver</i></h1>
          <TextField disabled={true} ref="input_user" floatingLabelText="username" /> <br/>
          <TextField disabled={true} ref="input_pass" floatingLabelText="password" />
          <br/><br/>
          <RaisedButton label="GO" secondary={true} disabled={true} onTouchTap={(e) => goLogin(e, this.refs)} />
        </Paper>
        <Paper style={styles.paper2} zDepth={2}>
          <h3>OR continue as <b>guest</b></h3><br/>
          <RaisedButton primary={true} label = "GUEST" onTouchTap={goGuest}/> <br/><br/>
          <div><i>(you data will be saved offline, and will synch when you log-in)</i></div>
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
