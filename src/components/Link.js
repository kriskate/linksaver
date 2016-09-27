import React, { PropTypes } from 'react'

// material-ui
import withWidth, { SMALL } from 'material-ui/utils/withWidth'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconCopy from 'material-ui/svg-icons/content/content-copy';

const styles = {
  rightIconMenu: {
    position:"absolute",
    right: 5,
  },
  rightIconMenuExpanded: {
    /* bugfix for last button's tooltip */
    right: 5,
    position:'absolute',
  },
  menuExpanded: {
    paddingRight: 5,

  }
}
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

let RightIconMenuExpanded = ({ linkEdit, linkCopyURL, linkDelete }) => (
  <div style={styles.rightIconMenuExpanded}>
    <IconButton onTouchTap={linkEdit} tooltip="Edit"><IconEdit/></IconButton>
    <IconButton onTouchTap={linkCopyURL} tooltip="Copy URL"><IconCopy/></IconButton>
    <IconButton onTouchTap={linkDelete} tooltip="Delete"><IconDelete/></IconButton>
  </div>
)
let RightIconMenu = ({ linkEdit, linkCopyURL, linkDelete }) => (
  <IconMenu  style={styles.rightIconMenu}
  iconButtonElement={iconButtonElement}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}>
    <MenuItem onTouchTap={linkEdit} >Edit</MenuItem>
    <MenuItem onTouchTap={linkCopyURL} >Copy to clipboard</MenuItem>
    <MenuItem onTouchTap={linkDelete} >Delete</MenuItem>
  </IconMenu>
);

let Link = ({ width,
    name, url, pic, description, date_expire, card,
    linkEdit, linkCopyURL, linkDelete,
  }) => (
  // to-do
  card ?
  <Card className="material-animated">
    <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="images/ok-128.jpg"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText>
      dsa
    </CardText>
  </Card>
  :
  <div className="material-animated">
   <ListItem href={url} target="_blank"
    leftAvatar={<Avatar src={pic} />}
    rightIconButton={ width <= SMALL ?
        <IconMenu iconButtonElement={iconButtonElement}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem onTouchTap={linkEdit} >Edit</MenuItem>
          <MenuItem onTouchTap={linkCopyURL} >Copy to clipboard</MenuItem>
          <MenuItem onTouchTap={linkDelete} >Delete</MenuItem>
        </IconMenu>
        :
        <div style={styles.rightIconMenuExpanded}>
          <IconButton onTouchTap={linkEdit} tooltip="Edit"><IconEdit/></IconButton>
          <IconButton onTouchTap={linkCopyURL} tooltip="Copy URL"><IconCopy/></IconButton>
          <IconButton onTouchTap={linkDelete} tooltip="Delete"><IconDelete/></IconButton>
        </div>
     }
    primaryText={name}
    secondaryText={
      <p>
        <span style={{color: darkBlack}}>{url}</span><br />
        <span style={{}}> { description } </span>
      </p>
    }
    secondaryTextLines={2}
  />
  </div>
)
Link.propTypes = {
  url: PropTypes.string.isRequired
}

export default withWidth()(Link)
