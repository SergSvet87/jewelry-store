/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#a76f53',
        main: '#f0ece9',
        'brown-dark': '#1d110a',
        grey: '#727272',
        button: '#5b242a',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        heading1: '54px',
        heading2: '36px',
        heading3: '24px',
        text: '20px',
        'section-indent': '140px',
      },
      container: {
        center: true,
        padding: '60px',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      backgroundImage: {
        'banner-mobile': "url('/images/banner-mobile.png')",
        'banner-desktop': "url('/images/Banner.png')",
      },
      container: false,
    },
  },
  plugins: [],
};

// export default config;
