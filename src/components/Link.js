import React, { PropTypes } from 'react'
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

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);
const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Copy to clipboard</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const Link = ({ name, url, pic, description, date_expire }) => (
  <ListItem
    leftAvatar={<Avatar src={pic} />}
    rightIconButton={rightIconMenu}
    primaryText={name}
    secondaryText={
      <p>
        <span style={{color: darkBlack}}>{url}</span><br />
        <span style={{}}> { description } </span>
      </p>
    }
    secondaryTextLines={2}
  >
  </ListItem>
)
Link.propTypes = {
  url: PropTypes.string.isRequired
}

export default Link
