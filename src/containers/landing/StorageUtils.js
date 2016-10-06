

export const LocalStorageHandler = (_userModel) => {
  if(!localStorage.getItem("user"))
  localStorage.setItem("user", JSON.stringify(_userModel));

  return{
    set(_userModel){ localStorage.setItem("user", JSON.stringify(_userModel)) },
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
    set: (_userModel) => firebase.database().ref('users/' + username).set(JSON.stringify(_userModel)),
    get: () => {},
  }
}
