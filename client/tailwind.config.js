// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this line correctly targets your component files
    "./public/index.html" // Include if you use Tailwind classes directly in index.html (less common)
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          primary: '#007AFF',
          light: '#58AFFF',
          dark: '#005ECC',
        },
        gray: { // Using Tailwind's default grays is often fine, but you can customize
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#0d1117',
        },
      },
      boxShadow: {
        'card': '0 4px 12px -1px rgba(0, 0, 0, 0.07), 0 2px 8px -2px rgba(0, 0, 0, 0.05)', // Slightly softer
        'card-hover': '0 10px 20px -3px rgba(0, 0, 0, 0.07), 0 4px 10px -4px rgba(0, 0, 0, 0.05)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};