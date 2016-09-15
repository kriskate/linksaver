import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */
import './styles/main.scss';

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import { configureStore } from './store/configureStore';
import { Root } from './containers/root/Root';

// Needed for material-ui
import muiTheme from './utils/muiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

let domRoot = document.getElementById('root');

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Root store={store} />
  </MuiThemeProvider>,
  domRoot
);
domRoot.removeAttribute("style")
