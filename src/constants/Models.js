import uuid from 'node-uuid'

let defPics = ["http://www.netanimations.net/Animated-head-bobbing-cat-with-headphones-3.GIF",
   "http://orig14.deviantart.net/1fed/f/2013/065/e/a/ea1d75621a30ff9e9b5361ddd8ca2a82-d5x5gb6.gif"]
let _pic = defPics[Math.round(Math.random())]
export function UserModel ({ id, username, pass="", folders=[], pic, email="" }) {
  let uid = id || uuid.v4()
  return {
    id: uid,                              // id
    username: username || "guest-" + uid, // string
    pass,                     // string of 4 numbers
    folders,               // array of FolderModels
    pic: pic || _pic,                 // string url to a profile pic
    email,                   // string
  }
}

export function FolderModel ({ id=uuid.v4(), name="new folder", subfolders=[], links=[], shared=[], isGoto=false }) {
  return {
    id,                // id
    name,              // string
    subfolders,        // array of FolderModels
    links,             // array of LinkModels
    shared,      // array of usernames/ e-mails to which this folder is shared
    isGoto,      // the category of folders it belongs to, true if GO-TO
  }
}

export function LinkModel ({
  id="", name="", url="", pic="", description="",
  date_added=new Date(), date_expire=new Date(Math.random()),
  stars=5, archived=false, parent={id:"",name:""}
}) {
  return {
    id ,                        // id
    name,                       // string
    url,                        // http string
    pic,                        // http string
    description,                // string
    date_added,                 // Date()
    // to-do - not random, but new Date() + 5 days
    date_expire,                // Date()
    stars,                      // 0 - 5
    archived,                   // boolean
    parent,            // actual folder in which this link resides
  }
}


let db_struct_example = {
  users: {
    username: {
      email: "",
      id: "",
      pic: "https://placekitten.com/300/300",
      password: "",
      folders_goto: [
         {
           id: "",
           name: "WORK",
           shared: [],
           links: [
              {
                id: "1234",
                name: "Google",
                url: "http://google.com",
                description: "no1 search engine",
                date_added: "12/12/2012 12:12:12",
                date_expire: "28/08/2016 16:00:00",
                stars: 4,
                parent: {id: "123", name: "Work" }
              }
            ]
          }
      ]
    }
  }
}
