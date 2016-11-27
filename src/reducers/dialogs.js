import {
  ASSIGN_DEFAULTS,
  LINK_DIALOG_OPEN, LINK_DIALOG_CLOSE, LINK_DIALOG_CHANGE,
  LINK_SAVE, LINK_COPYURL, FOLDER_SAVE
} from '../constants/ActionTypes';
import { UserModel, LinkModel, FolderModel } from '../constants/Models'

const initialState = {
  dialog:{ isSaveActive: false, open: false, edit: false, type:'' },
  link: {},
  folder: {},
  linkcopy_dialog: { open: false },
}


const dialog_linkChangedState = (state, {
  link=state.link, folder=state.link,
  open=state.dialog.open, edit=state.dialog.edit, isSaveActive=state.dialog.isSaveActive, type=state.dialog.type,
  removeDataL, removeDataF,
}) => {
  console.log('er', link, folder)
  // here we will restrict the link title
  if(link && link.name && link.name.length > 60) link.name = link.name.substring(0, 60)
//console.log('ere', link, removeDataL)
  return Object.assign({}, state, {
    dialog: {
      open, edit, isSaveActive, type,
    },
    link: removeDataL ? {} : link,
    folder: removeDataF ? new FolderModel({}) : folder,
  })

}

export default function dialogs (state = initialState, action){
  switch (action.type) {
    case ASSIGN_DEFAULTS:
      return dialog_linkChangedState(state, action.payload)

    // link/ folder dialog
    case LINK_DIALOG_OPEN:
      let type = action.payload.link ? "link" : "folder"
      return dialog_linkChangedState(state, {
        link: action.payload.link, folder: action.payload.folder,
        open: true, edit: !action.payload.isNew, type,
      })
    case LINK_DIALOG_CLOSE:
      let removeDataL = action.payload.type == "link" ? action.payload.edit : false
      let removeDataF = action.payload.type == "folder"
      return dialog_linkChangedState(state, {
        open: false, edit: action.payload.edit,
        removeDataL, removeDataF,
      })
    case LINK_DIALOG_CHANGE:
    console.log("change", state)
    console.log("ddd",dialog_linkChangedState(state, {
      link:action.payload.link, folder:action.payload.folder, isSaveActive: action.payload.isSaveActive
    }))
      return dialog_linkChangedState(state, {
        link:action.payload.link, folder:action.payload.folder, isSaveActive: action.payload.isSaveActive
      })

    // remove all data assigned to link/ folder dialog
    case LINK_SAVE:
      return dialog_linkChangedState(state, {removeDataL: true})
    case FOLDER_SAVE:
      return dialog_linkChangedState(state, {removeDataF: true})

    // copyUrl dialog
    case LINK_COPYURL:
      let { open, link } = action.payload.link
      return Object.assign({}, state, {
        linkcopy_dialog: { open, link }
      })
      case ASSIGN_DEFAULTS:
        action.payload.link.parent = action.payload.folder
        return dialog_linkChangedState(state, action.payload)


    default:
      return state
  }
}
