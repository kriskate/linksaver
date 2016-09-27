import {
  deepOrange500,
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
  deepPurpleA700,
  blue500, blue700,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';

// RUN

injectTapEventPlugin();

const theme =
getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
      primary1Color: /*deepPurpleA700,*/blue500,//cyan500,
      primary2Color: blue700/*cyan700*/,
      primary3Color: grey400,
      accent1Color: pinkA200,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: blue500/*cyan500*/,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,

  },
})

export default theme;
