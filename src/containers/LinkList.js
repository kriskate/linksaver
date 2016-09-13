import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from '../components/Link'
import LinkModel from '../constants/Models'

// material-ui
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';



const styles = {
  list: {
    position: "relative",
    backgroundColor: "white",
  },
}

let LinkList = ({ currentF, links }) => (
  <List style={styles.list}>
        <Subheader>{currentF.name}</Subheader>
    { links.filter((link) => link.parent.id == currentF.id).map((link, id) =>
        <Link card={false} key={id} {...link} />
    )}
  </List>
)
LinkList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string.isRequired }))
}

const mapStateToProps = (state, ownProps) => {
  return {
    links: ownProps.links,
    currentF: state.folders.current,
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
