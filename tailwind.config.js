/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2E6B3F',
          dark: '#1F472B',
          light: '#3E8E53',
          kelly: '#5B7E3C',
        },
        warmOrange: {
          DEFAULT: '#F28C28',
          light: '#FF9D23',
          dark: '#D17316',
        },
        cherryRed: {
          DEFAULT: '#D92243',
          coral: '#EA5252',
          dark: '#B01833',
        },
        warmCream: {
          DEFAULT: '#F6F3EB',
          dark: '#ECE8DD',
          light: '#FAF8F3',
        },
        deepCharcoal: '#26332B',
        mutedGrey: '#68736C',
        softSage: '#DCE5DC',
        statusGreen: '#25834A',
        statusWarning: '#E58B20',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(38, 51, 43, 0.05)',
        'elevated': '0 8px 30px rgba(38, 51, 43, 0.08)',
        'modal': '0 20px 40px rgba(38, 51, 43, 0.15)',
      }
    },
  },
  plugins: [],
}
