import React from 'react'
import { connect } from 'react-redux'

import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper';

import { syncChange } from '../../actions'
import Storage from './Storage'


//let DB = new Storage();

const styles = {
  container: {
  },
  paper: {
    textAlign: 'center',
    padding: 25,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'perspective(1px) translate(-50%, -50%)'
  },
}

let storageInitialized

const mapStateToProps = (state) => {
  return {
    storageInitialized: state.local.storageInitialized,
    loggedIn: state.local.loggedIn,
    offline: state.local.offline,
  }
}
const mapDispatchToProps = (dispatch) => ({
    sync: (payload) => dispatch(syncChange(payload))
})
const Synchronize = ({ loggedIn, offline, sync, storageInitialized, }) => {

  if(!storageInitialized)Storage.init({ loggedIn, offline, sync })

  return(
    <div style={styles.container}>
      <Paper style={styles.paper}>
        <CircularProgress size={1} / >
        <br/>synchronizing data
      </Paper>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Synchronize)
