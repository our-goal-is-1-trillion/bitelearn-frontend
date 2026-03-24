/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"A2Z"', '"Tossface"', 'sans-serif'],
      serif: ['var(--family-serif)', 'serif'],
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        popover: 'hsl(var(--popover))',
        primary: {
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          DEFAULT: 'hsl(var(--primary))',
          400: 'hsl(var(--primary))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          950: 'hsl(var(--primary-950))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'primary-bg': 'hsl(var(--primary-50))',
        'primary-darker': 'hsl(var(--primary-600))',

        secondary: 'hsl(var(--secondary))',
        'secondary-bg': colors.slate[100],
        'secondary-darker': colors.slate[600],

        placeholder: 'hsl(var(--placeholder))',
        subtle: 'hsl(var(--subtle))',

        emphasis: {
          DEFAULT: 'hsl(var(--emphasis))',
          bg: colors.orange[50],
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          bg: colors.red[50],
          darker: colors.red[600],
        },

        success: {
          DEFAULT: colors.green[400],
          bg: colors.green[50],
          darker: colors.green[600],
        },

        quiz: '#7F84EB',
        'foreground-muted': colors.slate[500],

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      boxShadow: {
        'bl-sm': '0 2px 6px 0 rgba(30, 42, 142, 0.05)',
        'bl-md':
          '0 4px 6px 0 rgba(30, 42, 142, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'bl-lg': '0 12px 16px rgba(30, 42, 142, 0.08)',
        'bl-hero': 'inset 0 0 4px rgba(254, 215, 170, 1)',
        'bl-card': '0 8px 12px 0 rgba(30, 42, 142, 0.06)',
        'bl-popover': '0 -4px 20px 0 rgba(30, 42, 142, 0.08)',
        'bl-active': '0 4px 8px 0 rgba(30, 42, 142, 0.08)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        pop: 'pop 0.3s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
