import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from '../components/Link'
import LinkModel from '../constants/Models'

// material-ui
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';


let LinkList = ({ currentFID, links }) => (
  <List style={{backgroundColor:"white"}}>
        <Subheader>4 stars</Subheader>
    { links.filter((link) => link.parent.id == currentFID).map((link, id) =>
        <Link key={id} {...link} />
    )}
  </List>
)
LinkList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string.isRequired }))
}

const mapStateToProps = (state, ownProps) => {
  return {
    links: ownProps.links,
    currentFID: state.folders.current.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /*onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }*/
  }
}

LinkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkList)

export default LinkList
