import { LINK_ADD } from '../constants/ActionTypes';

// end


export default function links (state = initialState, action){
  switch (action.type) {
    case LINK_ADD:
      return [...state, !state.drawerDocked]
    default:
      return state
  }
}
