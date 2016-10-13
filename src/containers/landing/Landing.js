import React, { Component } from 'react';

import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import CheckBox from 'material-ui/CheckBox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';


import { logInChange } from '../../actions'



let styles = {
  wrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
        /*marginBottom: 40,
        marginTop: 40,*/
  },
  container: {
      paddingBottom: 40,
      paddingTop: 20,

    maxWidth:600,
    width:"100%",
    maxHeight: "100%",

    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    textAlign: "center",
  },
  paper: {
    margin: 20,
    padding: 20,
  },
  remember: {
    textAlign: "left",

    maxWidth: 220,
    position: "relative",
    left: "50%",
    transform: "translate(-50%, 0)",
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
const remember = (checked, what) => {
  what = checked ? what : null
  try{
    localStorage.setItem("autologin", what)
  }catch(err){ /* browser does not support localStorage */ }
}

let input_user, input_pass;

class Landing extends Component{
  constructor(props, context){
    super(props, context)
    try{
      let autologin = localStorage.getItem("autologin")
      if(autologin == "offline")
        props.goGuest()
    }catch (err){}
  }
  render(){
    const { goLogin, goSignup, goGuest } = this.props
    return (
      <div style={styles.wrapper}>
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={2}>
          <h1>Welcome to <i>linksaver</i></h1><h3>Please log-in to continue</h3><div>(only <b>guest</b> available ATM)</div>
          <TextField disabled={true} ref="input_user" floatingLabelText="username" /> <br/>
          <TextField disabled={true} ref="input_pass" floatingLabelText="password" />
          <br/><br/>
          <Divider/>
          <br/>
    {/*      <RaisedButton label="GO" secondary={true} disabled={true} onTouchTap={(e) => goLogin(e, this.refs)} />*/}
        {/*<Paper style={styles.paper2} zDepth={2}>
          <h3>OR</h3>
          <RaisedButton primary={true} label = "SIGN UP" onTouchTap={goSignup} />
        </Paper>*/}
          <h3>{/*OR */}continue as <b>guest</b></h3><br/>
          <RaisedButton primary={true} label = "GUEST" onTouchTap={goGuest}/>
          <br/><br/><CheckBox label="remember this choice" style={styles.remember} inputStyle={styles.rememberInput} onCheck={(ev, checked) => remember(checked, "offline")} />
          <br/><br/>
          <div><i>(your data will be saved locally, and will sync when you log-in)</i></div>

          <FlatButton primary={false} onTouchTap={() => {
            try{
              localStorage.clear()
            }catch(err){}
            alert("Locally saved data has been removed!")
            console.log("Locally saved data has been removed!")
          }}><span style={{fontSize:10, color:"red"}}>Delete local data</span></FlatButton>
        </Paper>
      </div>

      <div style={styles.version}>v 0.0.1</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
