//import firebase from "firebase";

const defineLocalData = (userModel) => {
  try{
    if(!localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(userModel))
  }catch(err){
    // browser may not support localStorage
  }
}

export const LocalStorageHandler = () => {
  return {

    get: () => {
      return new Promise((resolve, reject) => {
        try{
          let data = localStorage.getItem("user")
          resolve(data)
        }catch(err){
          reject(err)
        }
    })},

    set: (userModel) => {
      return new Promise((resolve, reject) => {
        try{
          localStorage.setItem("user", JSON.stringify(userModel))
          resolve(localStorage.getItem("user"))
        }catch(err){
          reject(err)
        }

      resolve(true)
    })},

  }

  return{
    set(userModel){ localStorage.setItem("user", JSON.stringify(userModel)) },
    get(){ return JSON.parse(localStorage.getItem('user')) },
  }
}


export const WebStorageHandler = () => {

  const firebaseConfig = {
    // added +'s for security reasons
    authDomain: "link"+"sav"+"erdb.fi"+"reba"+"seapp.c"+"om",
    databaseURL: "ht"+"tps:/"+"/link"+"sav"+"erdb.fi"+"reba"+"sei"+"o.c"+"om",
  }
  try{
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    // most likely already initialized
  }

  return {
    // to-do: handle each folder separately, as to not transfer the whole user every time something changed
    set: (userModel) => firebase.database().ref('users/' + username).set(JSON.stringify(userModel)),
    get: () => {
      firebase.database().ref('/users/' + username)
        .once("value").then(snapshot =>
          { this.readData_done(snapshot.val()) }
        );
    },
  }
}
