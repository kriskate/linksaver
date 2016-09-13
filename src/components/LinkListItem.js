import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

// material-ui
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

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenuExpanded = (
  <div>
    <IconButton tooltip="Edit"><IconEdit/></IconButton>
    <IconButton tooltip="Delete"><IconDelete/></IconButton>
    <IconButton tooltip={<span>Copy Link to <br/>clipboard</span>}><IconCopy/></IconButton>
  </div>
)
const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Copy to clipboard</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

let Link = ({ name, url, pic, description, date_expire, card }) => (
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
  : <div className="material-animated">
   <ListItem
    leftAvatar={<Avatar src={pic} />}
    rightIconButton={rightIconMenuExpanded}
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

export default Link
