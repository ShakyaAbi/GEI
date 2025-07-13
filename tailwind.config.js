/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0089ef', // Medium Blue
        'brand-dark-blue': '#243e89', // Dark Blue
        // Optionally keep other colors if still used elsewhere
        // 'base-blue': '#2e76ea',
        // 'light-blue': '#8ab3f3',
        // 'dark-blue': '#1048a2',
        // 'muted-blue': '#527ec5',
        'analogous-teal': '#2ed4ea',
        'analogous-indigo': '#7e2eea',
        'amber': '#eab72e',
        'neutral-100': '#f2f2f2',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};