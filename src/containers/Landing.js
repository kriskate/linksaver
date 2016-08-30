import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Storage from "../store/Storage";


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

let DB = new Storage();
export default class Landing extends Component{
  loadData(){

  }

  render(){
    let input_user, input_pass;
    return (
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={2}>
          <h1>Welcome to <i>linksaver</i></h1>
          <h2>Please log-in to continue</h2>
          <div>
            <TextField
              ref="input_user"
              floatingLabelText="username" />
            <br/>
            <TextField
              ref="input_pass"
              floatingLabelText="password" />
          </div>
          <RaisedButton label="GO" secondary={true}
            onClick={(e) => {
              input_user = this.refs.input_user.getValue();
              input_pass = this.refs.input_pass.getValue();
              e.preventDefault()
              if (!input_user.trim() && !input_pass.trim()) {
                return;
              }

            DB.writeData(input_user)
          }} />
        </Paper>
        <Paper style={styles.paper2} zDepth={2}>
          <div>OR</div>
          <RaisedButton primary={true} label = "SIGN UP"
            onClick={()=>{DB.readData()}}
            />
        </Paper>
      </div>

    )
  }

}
