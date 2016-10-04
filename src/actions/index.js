import {
  SNACKBAR_OPEN,
  LINK_DIALOG_OPEN, LINK_DIALOG_CLOSE, LINK_DIALOG_CHANGE,
  LINK_SAVE, LINK_DELETE, LINK_COPYURL,
  FOLDER_ADD, FOLDER_DELETE, FOLDER_SELECTED,
  TOGGLE_DRAWER_DOCK, TOGGLE_DRAWER_OPEN, TOGGLE_ADD_OPEN,
  SYNCH_CHANGE, LOG_IN_CHANGE
} from '../constants/ActionTypes'

export const snackbar = (payload) => ({type: SNACKBAR_OPEN, payload})


export const handleLink_DialogOpen = ({link, folder}, isNew) => ({ type: LINK_DIALOG_OPEN, payload: {link, folder, isNew} })
export const handleLink_DialogClose = ({edit}) => ({ type: LINK_DIALOG_CLOSE, edit })
export const handleLink_DialogChange = (payload) => ({ type: LINK_DIALOG_CHANGE, payload })
// linkData {link, edit}
export const linkSave = (payload) => { return { type: LINK_SAVE, payload }}
export const linkDelete = (link) => { return { type: LINK_DELETE, payload:{link} }}
export const linkCopyURL = (link) => { return { type: LINK_COPYURL, link }}


export const folderAdd = (folder) => ({ type: FOLDER_ADD, folder })
export const folderDelete = (folder) => ({ type: FOLDER_DELETE, folder })
export const folderSelected = (folder) => ({ type: FOLDER_SELECTED, folder })

export const toggleDrawerDock = () => ({ type: TOGGLE_DRAWER_DOCK })
export const toggleDrawerOpen = (payload) => ({ type: TOGGLE_DRAWER_OPEN, payload })

export const toggleAddOpen = (payload) => ({ type: TOGGLE_ADD_OPEN, payload })

export const synchChange = (payload) => ({ type: SYNCH_CHANGE, payload })

export const logInChange = (payload) => ({ type: LOG_IN_CHANGE, payload })
