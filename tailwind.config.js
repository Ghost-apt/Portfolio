/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg-primary)',
          'bg-secondary': 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          'card-hover': 'var(--bg-card-hover)',
          text: 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-muted': 'var(--text-muted)',
          border: 'var(--border-color)',
          accent: 'var(--accent-color)',
        },
        background: {
          primary: '#050816',
          secondary: '#0B1120',
          card: '#101A30',
          'card-hover': '#162244',
        },
        accent: {
          blue: '#3B82F6',
          indigo: '#6366F1',
          cyan: '#22D3EE',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        border: {
          subtle: 'rgba(59, 130, 246, 0.15)',
          glow: 'rgba(34, 211, 238, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.18), rgba(34, 211, 238, 0.08) 35%, transparent 70%)',
        'card-glow': 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59, 130, 246, 0.1), transparent 40%)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 9s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-2deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
