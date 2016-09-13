import firebase from "firebase";

let username = "initU"


export default class Storage {
  constructor(){
    const firebaseConfig = {
      authDomain: "linksaverdb.firebaseapp.com",
      databaseURL: "https://linksaverdb.firebaseio.com",
    }
    try{
      firebase.initializeApp(firebaseConfig);
    } catch(err){
      // mostly already initialized
    }
  }
  readData(){
    let userData =
    firebase.database().ref('/users/' + username)
      .once("value").then(snapshot =>
        { this.readData_done(snapshot.val()) } );
  }
  readData_done(data){
    // console.log(JSON.parse(JSON.stringify(data)));
  }
  writeData(name, email, imageUrl) {
    firebase.database().ref('users/' + username).set(
      {
        email: "a@a.a",
        id: 0,
        name: name,
        pic: "https://placekitten.com/300/300",
        pin: "0000",
        folders_goto: [
           {
             id: 123,
             name: "WORK",
             shared: [],
             links: [
                {
                  id: 1234,
                  name: "Google",
                  url: "http://google.com",
                  description: "no1 search engine",
                  date_added: "12/12/2012 12:12:12",
                  date_expire: "28/08/2016 16:00:00",
                  stars: 4,
                  parent: { id: 123, name: "Work" }
                }
              ]
            }
        ]
      }
    );
  }
}
