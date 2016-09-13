import LinkList from './LinkList'
import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import { connect } from 'react-redux'
import { toggleDrawerOpen } from '../actions'





const styles = {
  all: { transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', },
  appBar: { zIndex: 2, position: 'fixed', top: 0, },
  content: { zIndex: 0, marginTop: 64/* appbar height */, },
}

let Content = ({
  /* AppNavDrawer */ onLeftIconButtonTouchTap, showMenuIconButton,
  /* content */ current,
}) => (
  <div>
    <AppBar zDepth={0} style={styles.appBar}
      title={current.name}
      iconElementRight={
        <IconButton
          iconClassName="muidocs-icon-custom-github"
          href="https://github.com/callemall/material-ui"
        />
      }
      onLeftIconButtonTouchTap={ onLeftIconButtonTouchTap }
      showMenuIconButton={ showMenuIconButton }
    />
    <main style={ styles.content }>
      <LinkList links={current.links} />
    </main>
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return { onLeftIconButtonTouchTap: () => dispatch(toggleDrawerOpen()) }
}

Content = connect(null, mapDispatchToProps)(Content);

export default Content
