import { MyTheme } from '../navigation/index';

//Justin: made this a .js file so I could colorize. Hope that's alright
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';


// Exports our different color options
export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  c: {
    black: '#000000',

    gray: '#434345',
    gray2: '#666969',

    darkGray: '#2D2D2D',

    lightGray: '#b3b4b5',
    lightGray2: '#D8DADA',
    lightGray3: '#ECEBEA',


    white: '#fff',
    white2: '#fffef9',

    red: '#E23939',
    green: '#1FA511',
    purple: '#968DA5',
    darkPurple: '#504B82',
    blue: '#1877f2'
  },

  newColors: {
    primary: "rgb(100, 110, 218)",
    secondary: "rgb(85, 89, 92)",
    background: "rgb(35, 39, 42)",
    background2: "rgb(40, 44, 47)",
    card: "rgb(48, 52, 55)",
    text: "rgb(255, 255, 255)",
    grayText: "rgb(200, 200, 200)",
    border: "rgb(35, 39, 42)",
    notification: "rgb(241, 95, 75)",

    //SWEETEST BLUE-GREEN
    bluegreen: "rgb(10, 137, 218)",
  }

  
};
