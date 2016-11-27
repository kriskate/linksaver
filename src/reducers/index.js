import { combineReducers } from 'redux';
import local from './local';
import folders from './folders';
import dialogs from './dialogs';

const rootReducer = combineReducers({
  folders, local, dialogs
});

export default rootReducer;
