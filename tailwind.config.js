/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*.{js,jsx}', './src/**/*.{js,jsx}', "./node_modules/flowbite/dist/*.js"],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode:false,
  variants:{
    extends:{}
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

