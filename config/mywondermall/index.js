const pwa = {
  manifest: {
    short_name: 'Mywondermall',
    name: 'Mywondermall',
    description: 'Mywondermall Shop',
    theme_color: '#FB7801',
  },
}
const colors = {
  primary: {
    500: '#FB7801', // brown
  },
  secondary: {
    100: '#dff7d5', // very light green
    200: '#32CD32', // green
    500: '#000000', // black
  },
  accent: {
    100: '#faebeb', // very light red
    500: '#ff8c00', // light-orange
    900: '#FF461B;', // red
  },
}
const fontFamily = {
  sans: ['Inter'],
}
module.exports = { pwa, colors, fontFamily }
