export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505",
          dark: "#111111",
          blue: "#00E5FF",
          purple: "#7B2EFF",
          gold: "#FFD700",
          white: "#FFFFFF",
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        bebas: ["'Bebas Neue'", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 229, 255, 0.4)',
        'neon-purple': '0 0 15px rgba(123, 46, 255, 0.4)',
        'neon-gold': '0 0 15px rgba(255, 215, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
