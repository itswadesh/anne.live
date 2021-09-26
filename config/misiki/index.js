const pwa = {
  manifest: {
    short_name: 'Misiki',
    name: 'Misiki Store',
    description: 'Misiki store front',
    theme_color: '#6366f1',
  },
}
const colors = {
  primary: {
    100: '#e0e7ff' /* indigo-100 */,
    200: '#c7d2fe' /* indigo-200 */,
    500: '#6366f1' /* indigo-500 */,
    600: '#4f46e5' /* indigo-800 */,
    700: '#3730a3' /* indigo-800 */,
  },
  secondary: {
    100: '#d1fae5' /* green-300  */,
    500: '#55C451' /* lightgreen */,
    600: '#3db340' /* just-dark-green  */,
  },
  accent: {
    100: '#fee2e2' /* light-red */,
    500: '#f59e0b' /* yellow-500 */,
    900: '#eb0000;', // red
  },
}
const fontFamily = {
  sans: ['Inter'],
}
module.exports = { pwa, colors, fontFamily }
