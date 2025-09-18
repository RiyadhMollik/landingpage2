/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern Purple-Pink-Blue Theme
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        success: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
        'gradient-hero': 'linear-gradient(135deg, #581c87 0%, #9333ea 50%, #ec4899 100%)',
        'gradient-card': 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
        'gradient-button': 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'bounce-soft': 'bounce 2s infinite',
        'pulse-soft': 'pulse 3s infinite',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(147, 51, 234, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
        'card': '0 10px 25px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
