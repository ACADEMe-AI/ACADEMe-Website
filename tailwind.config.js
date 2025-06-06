/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: '#4b68ff',
        
        // Secondary & Supporting
        secondary: '#00d2d3',
        coral: '#ff6e6e',
        success: '#00c48c',
        warning: '#f6c90e',
        error: '#ff4d4f',
        
        // Dark Theme
        background: '#0e0e10',
        surface: '#1a1c22',
        border: '#2a2d34',
        'text-primary': '#ffffff',
        'text-secondary': '#c2c7d0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};