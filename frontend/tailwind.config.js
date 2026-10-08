/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00f0ff',
          blue: '#0066ff',
          pink: '#ff00a0',
          purple: '#9900ff',
          dark: '#030712',
          card: 'rgba(5, 12, 30, 0.85)',
          border: 'rgba(0, 240, 255, 0.35)',
        },
      },
      boxShadow: {
        'cyber-blue': '0 0 25px rgba(0, 240, 255, 0.35)',
        'cyber-pink': '0 0 25px rgba(255, 0, 160, 0.35)',
        'cyber-card': '0 12px 40px 0 rgba(0, 0, 0, 0.85), inset 0 0 20px rgba(0, 240, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
