import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { linkDelete, linkCopyURL, handleLink_DialogOpen, snackbar } from '../actions'
import Link from '../components/Link'
import LinkModel from '../constants/Models'
import NewLink from '../components/NewLink'

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

let LinkList = ({
  currentF, links,
  actions,
  link_dialog
 }) => (
  <List style={styles.list}>
        {/*<Subheader>{currentF.name}</Subheader>*/}
      <NewLink link={Object.assign({}, link_dialog.link, {edit:false})} quick={true}/>
    { links.filter((link) => link.parent.id == currentF.id).map((link, id) =>
        <Link card={false} key={id} {...link}
          linkEdit={ (ev) => { ev.stopPropagation(); ev.preventDefault(); actions.handleLink_DialogOpen({link});} }
          linkDelete={ () => { actions.linkDelete({link});
          actions.snackbar({ message: "Link deleted!" }); }}
          linkCopyURL={ () => { actions.linkCopyURL(link);
          actions.snackbar({ message: "Link copied to clipboard!" }); }}
        />
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
    link_dialog: state.local.link_dialog,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({handleLink_DialogOpen, linkDelete, linkCopyURL, snackbar}, dispatch)
  }
}

LinkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkList)

export default LinkList
