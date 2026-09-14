/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A507FA',
          purple: '#A507FA',
          hover: '#8B00D9',
          dark: '#7A00BD',
          deep: '#12021E',
          midnight: '#1A032A',
          light: '#FAF2FF',
          tint: '#F3E0FF',
          border: '#D48FFF',
        },
        brand: {
          purple: '#A507FA',
          darkPurple: '#7A00BD',
          deep: '#12021E',
          light: '#FAF2FF',
          white: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          purple: '#8B00D9',
          gold: '#F59E0B',
          light: '#FAF2FF',
        },
        surface: {
          DEFAULT: '#FAF2FF',
          container: '#F3E0FF',
          high: '#E5B8FF',
          dark: '#12021E',
          card: '#1A032A',
        },
        carbon: '#12021E',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-plus-jakarta)', 'Montserrat', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['var(--font-playfair)', 'var(--font-manrope)', 'Playfair Display', 'Manrope', 'serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        body: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0px 4px 20px rgba(15,23,42,0.06)',
        'premium-hover': '0px 12px 30px rgba(15,23,42,0.12)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
