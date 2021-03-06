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
}



export default function local (state = initialState, action){
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


    default:
      return state
  }
}
