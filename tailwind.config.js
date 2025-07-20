/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        glitchRed: {
          DEFAULT: '#ff003c', // warna merah terang glitch
          deep: '#b3002d',     // versi lebih gelap
        },
        darkBg: {
          DEFAULT: '#0b0c10',  // latar belakang gelap utama
          soft: '#1f1f1f',     // elemen sekunder
        },
        goldAccent: '#d4af37', // opsional jika masih ingin aksen emas
      },
      fontFamily: {
        serif: ['"Crimson Text"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        gothic: ['"UnifrakturCook"', 'serif'], // opsional untuk judul medieval
      }
    },
  },
  plugins: [],
}

