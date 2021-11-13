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
    100: '#ffefe6' /* light orange */,
    500: '#fc7019' /* orange */,
    700: '#e25903' /* lit darker orange */,
  },

  secondary: {
    100: '#fffae6' /* light yellow */,
    500: '#ffcc00' /* yellow */,
    700: '#c2c20a' /* lit darker yellow */,
  },

  accent: '#000000' /* black */,

  success: '#32CD32' /* lime green */,

  error: '#eb0000' /* red */,
}
const fontFamily = {
  sans: ['Inter'],
}
module.exports = { pwa, colors, fontFamily }
