import { Component } from 'react'
import { connect } from 'react-redux'
import firebase from "firebase";
import uuid from 'node-uuid'

import { UserModel } from '../../constants/Models'

import { LocalStorageHandler, WebStorageHandler } from './StorageUtils'


let _instance = new Storage(),
    _userModel = new UserModel(),
    _localStorage = new LocalStorageHandler()
    console.log(_userModel)

class Storage extends Component {
  constructor(props, context){
    const firebaseConfig = {
      authDomain: "linksaverdb.firebaseapp.com",
      databaseURL: "https://linksaverdb.firebaseio.com",
    }
    try{
      firebase.initializeApp(firebaseConfig);
    } catch(err){
      // mostly already initialized
    }
    super(props, context)
  }


  readData(){
    let userData =
    firebase.database().ref('/users/' + username)
      .once("value").then(snapshot =>
        { this.readData_done(snapshot.val()) } );
  }
  readData_done(data){
    //console.log(JSON.parse(JSON.stringify(data)));
  }
  writeData(name, email, imageUrl) {
  }
}


export default _instance
