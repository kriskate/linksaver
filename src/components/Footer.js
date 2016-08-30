import React, { Component } from 'react';
import { red800 } from 'material-ui/styles/colors'


const styles = {
  footer: {
    fontSize: '14px',
    textAlign: 'center',
    paddingTop: '5em',
    paddingBottom: '3em',
  },
  heart: {
    color: red800,
  },
}
class Footer extends Component {
  render() {
    return (
      <div style={styles.footer}>
        Linksaver - bookmark all your <span style={styles.heart}>♥</span> links
      </div>
    );
  }
}
export default Footer
