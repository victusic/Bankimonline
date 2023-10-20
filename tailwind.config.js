const customTheme = require('./src/styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      //при необходимости разнести модули в разные файлы
      colors: customTheme.colors,
      fontFamily: customTheme.fontFamily,
      screens: customTheme.screens,
      width: customTheme.width,
      borderRadius: customTheme.borderRadius,
      maxHeight: customTheme.maxHeight,
      top: customTheme.top,
      spacing: customTheme.spacing,
      maxWidth: customTheme.maxWidth,
    },
  },
  plugins: [ 
    require ('tailwind-scrollbar'), 
  ],
}

