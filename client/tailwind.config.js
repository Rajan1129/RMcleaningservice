/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0f0a1c', // Deep midnight violet-black
          900: '#170f2b', // Royal plum dark
          800: '#23173f', // Midnight violet surface
        },
        skyline: {
          50: '#f5f3ff',  // Softest lavender
          100: '#ede9fe', // Light lavender
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Vivid violet
          600: '#7c3aed', // Primary royal violet
          700: '#6d28d9', // Deep royal violet
          800: '#5b21b6',
          900: '#4c1d95',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        cyan: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['"Manrope"', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(124, 58, 237, 0.12)',
        'glass-lg': '0 20px 60px rgba(124, 58, 237, 0.18)',
        gold: '0 8px 25px rgba(245, 158, 11, 0.25)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(circle at top, rgba(124, 58, 237, 0.12), rgba(245, 158, 11, 0.05) 45%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
