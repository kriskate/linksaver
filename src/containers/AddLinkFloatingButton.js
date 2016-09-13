import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



const styles = {
  floatingButton: { position: "fixed", right: 20, bottom: 20, zIndex: 3 },
}
let AddLinkFloatingButton = () => (
  <FloatingActionButton style={styles.floatingButton}>
    <ContentAdd />
  </FloatingActionButton>
)




export default AddLinkFloatingButton
