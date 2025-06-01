/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff914d',
          dark: '#e07d3a',
          light: '#ffa366',
        },
        background: {
          DEFAULT: '#383a2c',
          light: '#4a4d3c',
          dark: '#2a2c21',
        },
        accent: {
          DEFAULT: '#ffffff',
          dark: '#e6e6e6',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['"Times New Roman"', 'serif'],
        logo: ['Arimo', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
