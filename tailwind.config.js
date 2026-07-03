/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12131A',
        'ink-soft': '#1D202B',
        paper: '#EEF0EA',
        'paper-dim': '#E2E5DC',
        pine: {
          DEFAULT: '#2B6E5E',
          light: '#3E8F7A',
          dark: '#1D4E42'
        },
        amber: {
          DEFAULT: '#E0A339',
          light: '#F0C170',
          dark: '#B77F22'
        },
        rust: {
          DEFAULT: '#C1502E',
          light: '#D97D5F'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      backgroundImage: {
        contour: "radial-gradient(circle at 1px 1px, rgba(18,19,26,0.06) 1px, transparent 0)"
      }
    }
  },
  plugins: []
}
