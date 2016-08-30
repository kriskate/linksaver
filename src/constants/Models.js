import uuid from 'node-uuid'

export function UserModel ({ id, username, pass, folders, pic, email }) {
  let defPics = ["http://www.netanimations.net/Animated-head-bobbing-cat-with-headphones-3.GIF",
   "http://orig14.deviantart.net/1fed/f/2013/065/e/a/ea1d75621a30ff9e9b5361ddd8ca2a82-d5x5gb6.gif"]
  let _pic = defPics[Math.round(Math.random())]

  let uid = id || uuid.v4()
  return {
    id: uid,                              // id
    username: username || "guest-" + uid, // string
    pass: pass || "",                     // string of 4 numbers
    folders: folders || [],               // array of FolderModels
    pic: pic || `${_pic}`,                 // string url to a profile pic
    email: email || ""                    // string
  }
}

export function FolderModel ({ id, name, links, shared, isGoto }) {
  return {
    id: id || uuid.v4(),       // id
    name: name || "add name",  // string
    subfolders: [],            // array of FolderModels
    links: links || [],        // array of LinkModels
    shared: shared || [],      // array of usernames/ e-mails to which this folder is shared
    isGoto,                    // the category of folders it belongs to, true if GO-TO
  }
}

export function LinkModel ({ id, name, url, pic, description, date_added, date_expire, stars, archived, parent }) {
  return {
    id: id || "",                           // id
    name: name || "",                       // string
    url: url || "",                         // http string
    pic: pic || "",
    description: description || "",         // string
    date_added: date_added || new Date(),   // Date()
    // to-do - not random, but new Date() + 5 days
    date_expire: date_expire || new Date(Math.random()), // Date()
    stars: stars || 5,                      // 0 - 5
    archived: archived || false,            // boolean
    parent: parent || { id: "", name: "" }, // actual folder in which this link resides
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
