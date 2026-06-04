import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FFF0F5',
          100: '#FFD6E7',
          200: '#FFC2D9',
          300: '#FFB3C6',
          400: '#FF8FAB',
          500: '#FB6F92',
          600: '#E8577E',
          700: '#D1446A',
          800: '#A63456',
          900: '#7A2442',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-gentle': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(251, 111, 146, 0.3)',
        'glow-lg': '0 0 50px rgba(251, 111, 146, 0.4)',
      },
      backgroundImage: {
        'gradient-pink': 'linear-gradient(135deg, #FFF0F5 0%, #FFD6E7 100%)',
        'gradient-pink-intense': 'linear-gradient(135deg, #FFB3C6 0%, #FB6F92 100%)',
      },
    },
  },
  plugins: [],
}

export default config
