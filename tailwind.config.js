/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // We map the CSS variables we defined in layout.js
        serif: ['var(--font-cinzel)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        brand: {
          900: '#0F172A', // Navy (Slate-900)
          800: '#1E293B', // Lighter Navy
          700: '#334155', // Slate Text
          gold: '#C5A059', // Gold Accent
          cream: '#F8F7F4', // Light Background
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Ensure you have this for the Rich Text
  ],
}