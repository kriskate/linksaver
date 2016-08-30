import React from 'react'
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';


const styles = {
  add: { zIndex: 2, paddingLeft:15, marginTop: -48, position: 'fixed', },
  errorStyle: { color: orange500, },
  floatingLabelFocusStyle: { color: blue500, },
}

let AddLink = () => (
    <div style={styles.add}>
      add a new link: &nbsp;
      <TextField
        hintText="URL (link)"
        hintStyle={styles.errorStyle}
      />&nbsp;
      <TextField
        hintText="title (will try to auto-generate)"
        hintStyle={styles.floatingLabelFocusStyle}
      />
    </div>
)

export default AddLink
