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
          DEFAULT: '#0F172A',
          navy: '#0F172A',
          blue: '#1E40AF',
          modern: '#2563EB',
          dark: '#0A0F1D',
          light: '#EFF6FF',
        },
        secondary: {
          DEFAULT: '#D97706',
          gold: '#F59E0B',
          light: '#FEF3C7',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          container: '#F1F5F9',
          high: '#E2E8F0',
        },
        carbon: '#0F172A',
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
