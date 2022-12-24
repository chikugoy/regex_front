module.exports = {
  darkMode: false, // or 'media' or 'class'
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
}
