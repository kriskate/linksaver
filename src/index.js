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
import { Root } from './containers/Root';

// Needed for material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';

// RUN

injectTapEventPlugin();

const store = configureStore();

// material-ui config
import {deepOrange500} from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Root store={store} />
  </MuiThemeProvider>,
  document.getElementById('root')
);
