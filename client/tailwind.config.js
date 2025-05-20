module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          900: '#4B0082',
          800: '#6A0DAD',
        },
        indigo: {
          900: '#2F2E5A',
          800: '#4B4A8A',
        },
        teal: {
          500: '#14B8A6',
          600: '#0D9488',
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(20, 184, 166, 0.5)',
      },
    },
  },
  plugins: [],
};