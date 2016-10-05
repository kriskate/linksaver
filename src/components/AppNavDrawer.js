import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { toggleDrawerOpen, folderSelected } from '../actions'


import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NewFolder from './NewFolder'

import { FolderModel } from '../constants/Models'

import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500,grey900,blue500} from 'material-ui/styles/colors';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
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

  const editBtn = (
    <IconButton>
      <EditorModeEdit />
    </IconButton>
  )
class AppNavDrawer extends Component {

  render() {
    const { folders, location, docked,
            drawerNav, drawerChangeList,
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
          leftAvatar={<Avatar src={user.pic} />} primaryText={"profile"}
        nestedItems={[
          <ListItem key={0} rightIconButton={editBtn} primaryText={user.username}/>,
          <ListItem key={1} rightIcon={<EditorModeEdit />} primaryText={user.email}/>,
        ]}
          />
        <SelectableList
          value={folders.current}
          onChange={drawerChangeList}
        >
          <Subheader style={styles.subheader}>GO-TOs</Subheader>
            {folders.arr.filter(folder => folder.isGoto).map((folder) =>
              <ListItem key={folder.id} primaryText={folder.name} value={folder} />
            )}
          <Divider />
          <Subheader style={styles.subheader}>REGULARs</Subheader>
            {folders.arr.filter(folder => !folder.isGoto).map((folder) =>
              <ListItem key={folder.id} primaryText={folder.name} value={folder} />
            )}

        </SelectableList>
        <Divider />
        <NewFolder folder={link_dialog.folder} quick={true}/>
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
    /* triggered when black overlay is clicked */
    drawerNav: () => dispatch(toggleDrawerOpen()),
    /* triggered when a menu item is clicked */
    drawerChangeList: (event, folder) => {
      dispatch(folderSelected(folder));
      dispatch(toggleDrawerOpen(false));
    }
  }
}

AppNavDrawer = connect(mapStateToProps, mapDispatchToProps)(AppNavDrawer);

export default AppNavDrawer;
