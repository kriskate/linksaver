import {
  SNACKBAR_OPEN, LINK_DIALOG_OPEN, LINK_DIALOG_CLOSE, LINK_DIALOG_CHANGE, LINK_SAVE,
  TOGGLE_DRAWER_DOCK, TOGGLE_DRAWER_OPEN, TOGGLE_ADD_OPEN, LOG_IN_CHANGE, SYNCH_CHANGE } from '../constants/ActionTypes';
import { VIEW_LIST, VIEW_CARD, SORT_USER, SORT_URL, SORT_DATE_ADDED, SORT_RATING, SORT_DATE_EXPIRE, SORT_ALPHABETICAL } from '../constants/SortAndView'
import { UserModel, LinkModel } from '../constants/Models'

const initialState = {
  synchronized: false,
  loggedIn: false,
  offline: false,
  user: new UserModel({}),
  autoLogCookie: true,
  drawerOpen: false,
  addOpen: false,
  viewMode: VIEW_LIST,
  sortType: SORT_DATE_ADDED,
  snackbar: { duration: 4000, message: "", open: false },

  addButtonExpanded: false,
  link_dialog: { isSaveActive: false, open: false, edit: false, link: {}, folder: {} },
}


const dialog_linkChangedState = (state, {link, folder, open, edit, isSaveActive, removeDataL, removeDataF}) => {
  open = open === undefined ? state.link_dialog.open : open
  edit = edit === undefined ? state.link_dialog.edit : edit
  isSaveActive = isSaveActive === undefined ? state.link_dialog.isSaveActive : isSaveActive
  return Object.assign({}, state, {
    link_dialog: {
      open, edit, isSaveActive,
      link: removeDataL ? {} : Object.assign({}, state.link_dialog.link, link || {}),
      folder: removeDataF ? {} : Object.assign({}, state.link_dialog.folder, folder || {}),
    }
  })

}

export default function localReducer (state = initialState, action){
  console.log(action)
  switch (action.type) {
    case TOGGLE_DRAWER_DOCK:
      return Object.assign({}, state, { drawerDocked: !state.drawerDocked })
    case TOGGLE_DRAWER_OPEN:
      return Object.assign({}, state, { drawerOpen: !state.drawerOpen })
    case SYNCH_CHANGE:
      return Object.assign({}, state, { synchronized: action.payload })
    case LOG_IN_CHANGE:
      return Object.assign({}, state, { loggedIn: action.payload })
    case SNACKBAR_OPEN:
      return Object.assign({}, state, { snackbar: Object.assign({}, state.snackbar, action.payload, {open: action.payload.open == false ? false : true}) })
    case TOGGLE_ADD_OPEN:
      return Object.assign({}, state, { addOpen: action.payload === false ? false : !state.addOpen })



    case LINK_DIALOG_OPEN:
      return Object.assign({}, state, {link_dialog: {
        link: action.payload.link, folder: action.payload.folder, open: true, edit: !action.payload.isNew,
      }})
    case LINK_DIALOG_CLOSE:
      let removeDataL = action.link ? action.edit : false
      let removeDataF = action.folder ? action.edit : false
      return dialog_linkChangedState(state, {open: false, edit: action.edit, removeDataL, removeDataF })
    case LINK_DIALOG_CHANGE:
      return dialog_linkChangedState(state, {link:action.payload.link, folder:action.payload.folder, isSaveActive: action.payload.isSaveActive})
    case LINK_SAVE:
      return dialog_linkChangedState(state, {removeDataL: action.link, removeDataF: action.folder})

    default:
      return state
  }
}
