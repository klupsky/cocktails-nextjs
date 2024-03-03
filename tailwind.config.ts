import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        apfel: ['Apfel', 'sans-serif'],
        messapia: ['Messapia', 'sans-serif'],
      },
      colors: {
        purple: '#BBBAF9',
        red: '#E75C3C',
        blue: '#BEEBF6',
        pink: '#FFC6DC',
        yellow: '#E0EA79',
      },
      width: {
        'fit-content': 'fit-content',
      },
      height: {
        'fit-content': 'fit-content',
      },
      maxWidth: {
        'fit-content': 'fit-content',
      },
      maxHeight: {
        'fit-content': 'fit-content',
      },
      borderWidth: {
        default: '1px',
        0: '0',
        2: '2px',
        4: '4px',
      },
      borderRadius: {
        default: '0',
        0: '0',
        30: '30px',
        50: '50px',
      },
      animation: {
        swing: 'swing 15s both infinite',
      },
      keyframes: {
        swing: {
          '20%': { transform: 'rotate3d(0, 0, 1, 10deg)' },
          '40%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 7deg)' },
          '80%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
