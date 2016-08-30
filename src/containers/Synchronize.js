import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper';

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
const Synchronize = () => {
  return(
    <div style={styles.container}>
      <Paper style={styles.paper}>
        <CircularProgress size={1} / >
        <br/>synchronizing data
      </Paper>
    </div>
  )
}


export default Synchronize
