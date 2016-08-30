import { LOG_IN_CHANGE, TOGGLE_DRAWER_DOCK, TOGGLE_DRAWER_OPEN, SYNCH_CHANGE } from '../constants/ActionTypes';
import { SMALL, MEDIUM, LARGE } from 'material-ui/utils/withWidth'
import { UserModel } from '../constants/Models'

const initialState = {
  synchronized: false,
  loggedIn: false,
  offline: false,
  user: new UserModel({}),
  autoLogCookie: true,
  drawerOpen: false,
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
    default:
      return state
  }
}
