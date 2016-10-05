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

export function FolderModel ({ id=uuid.v4(), name="", subfolders=[], links=[], shared=[], isGoto=false }) {
  return {
    id,                // id
    name,              // string
    subfolders,        // array of FolderModels
    links,             // array of LinkModels
    shared,      // array of usernames/ e-mails to which this folder is shared
    isGoto,      // the category of folders it belongs to, true if GO-TO
  }
}



function newMaxDate (DAYS_UNTIL_EXPIRE=5) {
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + DAYS_UNTIL_EXPIRE);
  maxDate.setHours(0, 0, 0, 0);

  return maxDate
}

// written with this.prop in order to get typeof hash
export function LinkModel ({
  id=uuid.v4(), name="", url="", pic="", description="",
  date_added=new Date(), date_expire=newMaxDate(),
  rating=3, archived=false, parent
}) {
    this.id = id                      // id
    this.name = name                  // string
    this.url = url                    // http string
    this.pic = pic                    // http string
    this.description = description    // string
    this.date_added = date_added      // Date()
    this.date_expire = date_expire    // Date()
    this.rating = rating                // 0 - 5
    this.archived = archived          // boolean
    this.parent = parent              // actual folder in which this link resides - set in at LinkModel init
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
