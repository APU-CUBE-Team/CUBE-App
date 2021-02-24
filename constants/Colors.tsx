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
    gray2: '#666757',

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

  }
};