import { SYNC_CHANGE, LINK_SAVE, LINK_DELETE, FOLDER_SAVE, FOLDER_DELETE, FOLDER_SELECTED } from '../constants/ActionTypes';


let initialState = {}
import Storage from '../containers/landing/Storage'



export default function folders (state = initialState, action){
  let { arr, current } = state

  switch (action.type) {

    case SYNC_CHANGE:
      let userModel = action.payload.userModel
      if(userModel)
        return Object.assign({}, state, {arr: userModel.folders, current:userModel.folders[0]})
      else
        return state
    break;

    case FOLDER_SAVE:
      let fS = action.payload.folder
      if(action.payload.edit == true)
        arr.splice(arr.indexOf(current), 1, action.payload.folder)
      else
        action.payload.folder.isSubFolder ? current.subfolders.push(fS) : arr.push(fS)
      return Object.assign({}, state, {current: fS, arr: [...arr]} )
    case FOLDER_SELECTED:
      return Object.assign({}, state, {arr, current: action.folder} )
    case LINK_DELETE:
      let nD = JSON.parse(JSON.stringify(state))

      let linkD = action.payload.link,
      fldD = nD.current
      fldD.links.splice(fldD.links.findIndex(li => li.id == linkD.id), 1)

      Storage.saveData({folders: nD.arr})

      return nD
    break
    case LINK_SAVE:
      let nf = JSON.parse(JSON.stringify(current))
      let link = action.payload.link
      link.parent = { id: current.id, name: current.name }

      if(action.payload.edit)
        nf.links[nf.links.findIndex(li => li.id == link.id)] = link
      else{
        window.scrollTo(0,0)
        nf.links.unshift(link)
      }
      arr.splice(arr.indexOf(current),1,nf)

      let newState = Object.assign({}, state, {arr, current: nf})

      Storage.saveData({folders: arr})

      return newState
    default:
      return state;

  }
}
