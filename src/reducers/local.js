import {
  SNACKBAR_OPEN, LINK_DIALOG_OPEN, LINK_DIALOG_CLOSE, LINK_DIALOG_CHANGE,
  TOGGLE_DRAWER_DOCK, TOGGLE_DRAWER_OPEN, LOG_IN_CHANGE, SYNCH_CHANGE } from '../constants/ActionTypes';
import { VIEW_LIST, VIEW_CARD, SORT_USER, SORT_URL, SORT_DATE_ADDED, SORT_STARS, SORT_DATE_EXPIRE, SORT_ALPHABETICAL } from '../constants/SortAndView'
import { UserModel, LinkModel } from '../constants/Models'

const initialState = {
  synchronized: false,
  loggedIn: false,
  offline: false,
  user: new UserModel({}),
  autoLogCookie: true,
  drawerOpen: false,
  viewMode: VIEW_LIST,
  sortType: SORT_DATE_ADDED,
  snackbar: { duration: 4000, message: "", open: false },
  link_dialog: { isSaveActive: false, open: false, edit: false, link: {} },
}


const dialog_linkChangedState = (state, {data, open, edit, isSaveActive}) => {
  open = open === undefined ? state.link_dialog.open : open
  edit = edit === undefined ? state.link_dialog.edit : edit
  isSaveActive = isSaveActive === undefined ? state.link_dialog.isSaveActive : isSaveActive
  return Object.assign({}, state, {
    link_dialog: {
      open, edit, isSaveActive,
      link: Object.assign({}, state.link_dialog.link, data || {})
    }
  })

}

export default function localReducer (state = initialState, action){
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
      return Object.assign({}, state, { snackbar: Object.assign({}, state.snackbar, action.payload, {open: true}) })



    case LINK_DIALOG_OPEN:
      return Object.assign({}, state, {link_dialog: {
        link: action.payload.link, open: true, edit: !action.payload.isNew,
      }})
    case LINK_DIALOG_CLOSE:
    // to-do: pick action.edit and play with it
      return dialog_linkChangedState(state, {open: false})
    case LINK_DIALOG_CHANGE:
      return dialog_linkChangedState(state, {data:action.payload.link, isSaveActive: action.payload.isSaveActive})


    default:
      return state
  }
}
