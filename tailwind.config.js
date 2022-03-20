const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: '#FFFFFF',
        },
        night: {
          DEFAULT: '#111111',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', ...fontFamily.mono],
        sans: ['IBM Plex Mono', ...fontFamily.sans],
        serif: ['Source Serif', ...fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
