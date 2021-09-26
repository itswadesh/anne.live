const pwa = {
  manifest: {
    short_name: 'Anne',
    name: 'Anne',
    description: 'Anne ecommerce',
    theme_color: '#FB7801',
  },
}
const colors = {
  primary: {
    500: '#FB7801', // Brand Primary Color
  },
  secondary: {
    100: '#dff7d5', // Used for gradient button making
    200: '#32CD32', // green
    500: '#000000', // Brand Secondary Color
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
