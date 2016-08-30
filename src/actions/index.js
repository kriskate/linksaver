import {
  LINK_ADD, LINK_DELETE,
  FOLDER_ADD, FOLDER_DELETE, FOLDER_SELECTED,
  TOGGLE_DRAWER_DOCK, TOGGLE_DRAWER_OPEN,
  SYNCH_CHANGE, LOG_IN_CHANGE
} from '../constants/ActionTypes'

export const linkAdd = ({ url, id, name, description, date_added, date_expire, stars, archived, parent }) => {
  return {
    type: LINK_ADD, id,
    url, name, description,
    date_added, date_expire, stars, archived, parent
  }
}
export const linkDelete = ({ id }) => {
  return { type: LINK_DELETE, id }
}


export const folderAdd = ({ id, name, subfolders, links, shared, isGoto }) => {
  return {
    type: FOLDER_ADD, id,
    name, subfolders, links, shared, isGoto
  }
}
export const folderDelete = ({ id }) => {
  return { type: FOLDER_DELETE, id }
}
export const folderSelected = (folder) => {
  return { type: FOLDER_SELECTED, folder }
}


export const toggleDrawerDock = () => {
  return { type: TOGGLE_DRAWER_DOCK }
}
export const toggleDrawerOpen = (payload) => {
  return { type: TOGGLE_DRAWER_OPEN, payload }
}


export const synchChange = (payload) => {
  return { type: SYNCH_CHANGE, payload }
}

export const logInChange = (payload) => {
  return { type: LOG_IN_CHANGE, payload }
}
