import React, { Component } from 'react'
import {ListItem} from 'material-ui/List'


const FolderItem = (folder) => (
  <ListItem key={folder.id} primaryText={folder.name} value={folder} nestedItems={
    folder.subfolders.map((subfolder) => (
    FolderItem(subfolder)
   ))}
  />
)

class NewFolderItem extends Component{

  render(){
    const { folder } = this.props

    return(
      FolderItem(folder)
    )
  }
}


export default NewFolderItem
