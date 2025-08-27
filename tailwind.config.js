/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Encode Sans Semi Expanded"', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        encode: ['"Encode Sans Semi Expanded"', 'sans-serif'],
      },
      colors: {
        primary: '#695CCD',
        secondary: '#1C1930',
        heading: '#1F1283',
        text: '#717171',
        background: '#F4F2FF', 
        white: '#FFFFFF',
        primaryDisabled: '#B2A8FF',
        error: '#D32F2F',
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '20px',
        xl: '26px',
        full: '9999px',
      },
      fontSize: {
        xs: '14px',
        base: '18px',
        lg: '22px',
        xl: '24px',
      },
      lineHeight: {
        tight: '22px',
        '100p': '100%',
      },
      boxShadow: {
        header: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        header: '80px',
      },
    },
  },
  plugins: [],
}
