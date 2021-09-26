const pwa = {
  manifest: {
    short_name: 'Edeal',
    name: 'Edeal',
    description: 'Edeal Shop',
    theme_color: '#000000',
  },
}
const colors = {
  primary: {
    500: '#000000', // golden
  },
  secondary: {
    100: '#dff7d5', // very light green
    200: '#32CD32', // green
    500: '#353535', // blue
  },
  accent: {
    100: '#faebeb', // very light red
    500: '#B33D0B', // light-orange
    900: '#FF0000', // red
  },
}
const fontFamily = {
  sans: ['Inter'],
}
module.exports = { pwa, colors, fontFamily }
