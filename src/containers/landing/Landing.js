import React, { Component } from 'react';

import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { logInChange } from '../../actions'



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
  },
  version: {
    position: "fixed",
    right: 3,
    bottom: 3,
    fontSize: 9,
    color: "#999"
  },
}

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    goLogin: (e, refs) => { e.preventDefault();
      input_user = refs.input_user.getValue();
      input_pass = refs.input_pass.getValue();
      if (!input_user.trim() && !input_pass.trim()) {
        return;
      }
    },
    goSignup: (ev) => dispatch(logInChange({signUpNeeded:true})),
    goGuest: (ev) => dispatch(logInChange({offline:true})),
  }
}


let input_user, input_pass;

class Landing extends Component{
  render(){
    const { goLogin, goSignup, goGuest } = this.props
    return (
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={2}>
          <h1>Welcome to <i>linksaver</i></h1><h3>Please log-in to continue</h3><div>(only <b>guest</b> available ATM)</div>
    {/*      <TextField disabled={true} ref="input_user" floatingLabelText="username" /> <br/>
          <TextField disabled={true} ref="input_pass" floatingLabelText="password" />
          <br/><br/>
          <RaisedButton label="GO" secondary={true} disabled={true} onTouchTap={(e) => goLogin(e, this.refs)} />*/}
        </Paper>
        {/*<Paper style={styles.paper2} zDepth={2}>
          <h3>OR</h3>
          <RaisedButton primary={true} label = "SIGN UP" onTouchTap={goSignup} />
        </Paper>*/}
        <Paper style={styles.paper2} zDepth={2}>
          <h3>{/*OR */}continue as <b>guest</b></h3><br/>
          <RaisedButton primary={true} label = "GUEST" onTouchTap={goGuest}/> <br/><br/>
          <div><i>(you data will be saved locally, and will sync when you log-in)</i></div>
        </Paper>

        <div style={styles.version}>v 0.0.1</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
