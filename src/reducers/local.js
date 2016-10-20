import {
  ASSIGN_DEFAULTS, SNACKBAR_OPEN, LINK_DIALOG_OPEN, LINK_DIALOG_CLOSE, LINK_DIALOG_CHANGE, LINK_SAVE, LINK_COPYURL, FOLDER_SAVE, TOGGLE_DRAWER_DOCK, TOGGLE_DRAWER_OPEN, TOGGLE_ADD_OPEN, LOG_IN_CHANGE, SYNC_CHANGE } from '../constants/ActionTypes';
import { VIEW_LIST, VIEW_CARD, SORT_USER, SORT_URL, SORT_DATE_ADDED, SORT_RATING, SORT_DATE_EXPIRE, SORT_ALPHABETICAL } from '../constants/SortAndView'
import { UserModel, LinkModel, FolderModel } from '../constants/Models'

const initialState = {
  signUpNeeded: false,
  loggedIn: false,
  offline: false,
  username: "",
  synchronized: false,
  storageInitialized: false,

  user: null,
  autoLogCookie: true,
  drawerOpen: false,
  addOpen: false,
  viewMode: VIEW_LIST,
  sortType: SORT_DATE_ADDED,
  snackbar: { duration: 4000, message: "", open: false },

  addButtonExpanded: false,
  link_dialog: { isSaveActive: false, open: false, edit: false, link: {}, folder: {} },
  linkcopy_dialog: { open: false },
}


const dialog_linkChangedState = (state, {link, folder, open, edit, isSaveActive, removeDataL, removeDataF, type}, defaults) => {
  open = open === undefined ? state.link_dialog.open : open
  edit = edit === undefined ? state.link_dialog.edit : edit
  isSaveActive = isSaveActive === undefined ? state.link_dialog.isSaveActive : isSaveActive
  if(link && link.name && link.name.length > 50) link.name = link.name.substring(0, 60)

  return Object.assign({}, state, {
    link_dialog: {
      open, edit, isSaveActive,
      link: removeDataL ? {} : Object.assign({}, state.link_dialog.link, link || {}),
      folder: removeDataF ? new FolderModel({}) : Object.assign({}, state.link_dialog.folder, folder || {}),
      type: type || state.link_dialog.type,
    }
  })

}

export default function localReducer (state = initialState, action){
  switch (action.type) {
    case LOG_IN_CHANGE:
      const { signUpNeeded, loggedIn, offline, username, } = action.payload
      return Object.assign({}, state, { signUpNeeded, loggedIn, offline, username, })

    case SYNC_CHANGE:
      const { synchronized, userModel, storageInitialized } = action.payload
      if(userModel)
        return Object.assign({}, state, { synchronized, user:userModel, storageInitialized })
      else
        return Object.assign({}, state, { synchronized, storageInitialized })

    case SNACKBAR_OPEN:
      return state
      return Object.assign({}, state, { snackbar: Object.assign({}, state.snackbar, action.payload, {open: action.payload.open == false ? false : true}) })

    case TOGGLE_DRAWER_DOCK:
      return Object.assign({}, state, { drawerDocked: !state.drawerDocked })
    case TOGGLE_DRAWER_OPEN:
      return Object.assign({}, state, { drawerOpen: !state.drawerOpen })
    case TOGGLE_ADD_OPEN:
      return Object.assign({}, state, { addOpen: action.payload === false ? false : !state.addOpen })

    case ASSIGN_DEFAULTS:
      return dialog_linkChangedState(state, action.payload)

    case LINK_DIALOG_OPEN:
      let type = action.payload.link ? "link" : "folder"
      return dialog_linkChangedState(state, Object.assign({}, action.payload, { link: action.payload.link, folder: action.payload.folder, open: true, edit: !action.payload.isNew, type}))
    case LINK_DIALOG_CLOSE:
      let removeDataL = action.payload.type == "link" ? action.payload.edit : false
      let removeDataF = action.payload.type == "folder"
      return dialog_linkChangedState(state, {open: false, edit: action.payload.edit, removeDataL, removeDataF })
    case LINK_DIALOG_CHANGE:
      return dialog_linkChangedState(state, {link:action.payload.link, folder:action.payload.folder, isSaveActive: action.payload.isSaveActive})
    case LINK_COPYURL:
      return Object.assign({}, state, {linkcopy_dialog:{ open: action.payload.open, link: action.payload.link || {} }})
    case LINK_SAVE:
      return dialog_linkChangedState(state, {removeDataL: true})
    case FOLDER_SAVE:
      return dialog_linkChangedState(state, {removeDataF: true})

    default:
      return state
  }
}
