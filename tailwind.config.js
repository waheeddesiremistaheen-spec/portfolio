/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070c',
          900: '#0a0a12',
          850: '#0d0d17',
          800: '#12121e',
          700: '#1a1a2a',
        },
        paper: {
          50: '#fafaf9',
          100: '#f4f4f3',
          200: '#e7e5e4',
        },
        accent: {
          violet: '#8b5cf6',
          indigo: '#6366f1',
          cyan: '#22d3ee',
          emerald: '#34d399',
          amber: '#fbbf24',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -12px rgba(139, 92, 246, 0.45)',
        'glow-cyan': '0 0 40px -12px rgba(34, 211, 238, 0.4)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)',
        'gradient-text':
          'linear-gradient(120deg, #a78bfa 0%, #22d3ee 55%, #34d399 100%)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
      },
    },
  },
  plugins: [],
}
