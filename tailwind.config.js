/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Vietnam Flag & Banner Color Palette - Tầng lớp trung lưu Việt Nam
        vietnam: {
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#B22222', // Primary Vietnam Red (Huyết)
            600: '#ac0705', // Vietnam Flag Red
            700: '#8b1a1a', // Deep Red
            800: '#7f1d1d',
            900: '#450a0a',
          },
          gold: {
            50: '#fffef7',
            100: '#fefce8',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#FFD700', // Primary Gold (Ánh Kim)
            600: '#C9A227', // Antique Gold
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
          },
        },
        // Semantic colors for the project
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#B22222',
          600: '#ac0705',
          700: '#8b1a1a',
          800: '#7f1d1d',
          900: '#450a0a',
        },
        // Middle Class Theme - Modern & Progressive
        middle: {
          blue: '#1e40af', // Stability, Trust
          green: '#15803d', // Growth, Prosperity  
          amber: '#d97706', // Aspiration
        }
      },
      fontFamily: {
        sans: ["Atkinson Hyperlegible", "Inter", "system-ui", "sans-serif"],
        display: ["Crimson Pro", "Geist", "Inter", "system-ui", "sans-serif"],
        serif: ["Crimson Pro", "Playfair Display", "Georgia", "serif"],
        crimson: ["Crimson Pro", "serif"],
        atkinson: ["Atkinson Hyperlegible", "sans-serif"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.7s ease-out forwards",
        "scale-fade-in": "scaleFadeIn 0.6s ease-out forwards",
        "bounce-gentle": "bounceGentle 2s infinite ease-in-out",
        "star-pulse": "starPulse 1.5s ease-in-out infinite",
        "wave": "wave 2s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite",
        "hero-zoom": "heroZoom 20s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleFadeIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        starPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(-5%)" },
          "50%": { transform: "translateX(5%)" },
        },
        shimmer: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        heroZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      boxShadow: {
        'vietnam': '0 4px 14px 0 rgba(178, 34, 34, 0.39)',
        'vietnam-lg': '0 10px 25px -3px rgba(178, 34, 34, 0.3), 0 4px 6px -2px rgba(178, 34, 34, 0.15)',
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.39)',
        'gold-lg': '0 10px 25px -3px rgba(255, 215, 0, 0.3), 0 4px 6px -2px rgba(255, 215, 0, 0.15)',
      },
      backgroundImage: {
        'vietnam-gradient': 'linear-gradient(135deg, #B22222 0%, #d32f2f 50%, #ac0705 100%)',
        'vietnam-gradient-radial': 'radial-gradient(ellipse at center, rgba(139, 26, 26, 0.3) 0%, transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #C9A227 50%, #a16207 100%)',
      },
    },
  },
  plugins: [],
};
