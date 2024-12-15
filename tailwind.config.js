/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto, sans-serif'],
        lucida: ['Lucida Bright, sans-serif']
      },
      colors: {
        'dark-400': '#1E1E1E',
        'dark-300': '#323232',
        'dark-200': '#464646',
        'dark-100': '#5A5A5A',
        'light-100': '#FFFFFFE3',
        'light-200': '#FFFFFFB2',
        'light-300': '#FFFFFF99',
        'accent-100': '#AFD3E2',
        'accent-200': '#19A7CE',
        'accent-300': '#005880',
        'accent-400': '#00264E',
      },
    },
  },
  plugins: [],

}

