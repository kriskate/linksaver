import { LINK_SAVE, LINK_DELETE, FOLDER_ADD, FOLDER_DELETE, FOLDER_SELECTED } from '../constants/ActionTypes';
import { FolderModel, LinkModel } from '../constants/Models'
import uuid from 'node-uuid'

let initialState = {
  arr: [],
  current: null,
}

/* to-do: these are just tests */

initialState.arr.push(new FolderModel({name:"WORK", isGoto: true, id: "v4-1"}))
initialState.arr.push(new FolderModel({name:"HEALTH", isGoto: true, id: "v4-2"}))
initialState.arr.push(new FolderModel({name:"ENTERTAINMENT", isGoto: true, id: "v4-3"}))

initialState.arr.push(new FolderModel({name:"RANDOM", id: "v4-4"}))
initialState.arr.push(new FolderModel({name:"AMUZANTE" }))
initialState.current = initialState.arr[0]

let min = 20
let max = 100
for(let i = 0; i < min + Math.floor(Math.random()*(max-min)); i++){
  let r = String(Math.floor(Math.random() * (400-40) + 40))
  let q = i<10 ? 0 : i<15 ? 1 : i<16 ? 2 : 3
  let { id, name } = initialState.arr[q]
  let parent = {id, name}

  initialState.arr[q].links.push(new LinkModel({
    url: "https://www.seedrs.com/invest",
    pic: `https://placekitten.com/${r}/${r}`,
    name: "Link name " + String(i),
    description: " Description " + String(i) + ": " + uuid.v4(),
    parent,
  })
  )
}
//initialState.arr.find(({id}) => id == "v4-1").links.push("https://www.seedrs.com/invest")
// end to-do


export default function folders (state = initialState, action){
  //console.log(action)
  let { arr, current } = state
  switch (action.type) {
    case FOLDER_ADD:
      return Object.assign({}, state, {current, arr: [...arr, action.folder]} )
    case FOLDER_SELECTED:
      return Object.assign({}, state, {arr, current: action.folder} )
    case LINK_DELETE:
      let nD = JSON.parse(JSON.stringify(state))

      let linkD = action.payload.link,
      fldD = nD.current
      fldD.links.splice(fldD.links.findIndex(li => li.id == linkD.id), 1)

      return nD
    break
    case LINK_SAVE:
      let nC = JSON.parse(JSON.stringify(state))

      let link = action.payload.link,
      fld = nC.current
      if(action.payload.edit)
        fld.links[fld.links.findIndex(li => li.id == link.id)] = link
      else{
        window.scrollTo(0,0)
        fld.links.unshift(link)
      }
      return nC
    default:
      return state;
  }
}
