import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { completeDefaults, toggleDrawerOpen, folderSelected, logInChange, syncChange, } from '../actions'

import Storage from '../containers/landing/Storage'

import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NewFolder from './NewFolder'

import { FolderModel, LinkModel } from '../constants/Models'
import { rememberLogin } from '../utils/Utils'

import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500,grey900,blue500} from 'material-ui/styles/colors';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconHome from 'material-ui/svg-icons/action/home'
import IconButton from 'material-ui/IconButton'

let SelectableList = MakeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: grey900,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
  subheader: {
    color: blue500,
  },
};

  const editBtn = (edit) => (
      <EditorModeEdit /*onTouchTap={edit}*/ />
  )
  const FolderItem = (folder) => (
    <ListItem key={folder.id} initiallyOpen={true} primaryText={folder.name} value={folder}
    nestedItems={
      folder.subfolders.map((subfolder) => (
      FolderItem(subfolder)
     ))}
    />
  )
class AppNavDrawer extends Component {

  render() {
    const { folders, location, docked,
            drawerNav, drawerChangeList, goLanding,
            open, user,
            link_dialog,
    } = this.props;
    return (
      <Drawer
        docked={docked}
        open={open}
        onRequestChange={drawerNav}
        containerStyle={{zIndex: zIndex.drawer - 100}} >
        <div style={styles.logo}>
          Linksaver
        </div>
        <Divider />
        <ListItem key={0}
          leftAvatar={<Avatar src={user.pic} />} primaryText={user.username}
        nestedItems={[
          /*<ListItem key={0} rightIconButton={<editBtn/>} primaryText={user.username}/>,
          <ListItem key={1} rightIcon={<EditorModeEdit />} primaryText={user.email}/>,*/
          <ListItem key={1} rightIcon={<IconHome />} primaryText={"Log-in"} onTouchTap={goLanding}/>,
        ]}
          />
        <SelectableList
          value={folders.current}
          onChange={drawerChangeList}
        >
          <Subheader style={styles.subheader}>GO-TOs</Subheader>
            {folders.arr.filter(folder => folder.isGoto).map((folder) =>
              FolderItem(folder)
            )}
          <Divider />
          <Subheader style={styles.subheader}>REGULARs</Subheader>
            {folders.arr.filter(folder => !folder.isGoto).map((folder) =>
              FolderItem(folder)
            )}

        </SelectableList>
        <Divider />
        <NewFolder folder={Object.assign({}, link_dialog.folder, {edit:false})} quick={true}/>
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    link_dialog: state.local.link_dialog,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    goLanding: (ev) => {
      rememberLogin(false)
      dispatch(syncChange({synchronized: false, storageInitialized: false, }))
      dispatch(logInChange({signUpNeeded: false, offline: false, loggedIn: false}))
    },
    /* triggered when black overlay is clicked */
    drawerNav: () => dispatch(toggleDrawerOpen()),
    /* triggered when a menu item is clicked */
    drawerChangeList: (event, folder) => {
      dispatch(completeDefaults({link: new LinkModel({}), folder}))
      dispatch(folderSelected(folder))
      dispatch(toggleDrawerOpen(false))
    }
  }
}

AppNavDrawer = connect(mapStateToProps, mapDispatchToProps)(AppNavDrawer);

export default AppNavDrawer;
