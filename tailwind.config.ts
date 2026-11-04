import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        cinzel: ["'Cinzel'", "'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        obsidian: {
          950: "#040711",
          900: "#070B16",
          850: "#0A1020",
          800: "#0D1426",
          700: "#131C35",
          600: "#1E2A4A",
          border: "#1C2640",
        },
        gold: {
          300: "#F6E5B8",
          400: "#E5C07B",
          500: "#D4AF37",
          600: "#C5A880",
          700: "#A2833F",
          800: "#755D28",
        },
        brand: {
          navy: "#070B16",
          slate: "#0A1020",
          dark: "#0D1426",
          blue: "#2563EB",
          lightBlue: "#3B82F6",
          accent: "#0EA5E9",
          gold: "#D4AF37",
          champagne: "#E5C07B",
          bg: "#070B16",
          card: "#0D1426",
          border: "#1C2640",
        },
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.6), 0 0 20px 0 rgba(212, 175, 55, 0.08)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'gold-glow': '0 0 25px -3px rgba(212, 175, 55, 0.25)',
        'gold-subtle': '0 0 15px -3px rgba(212, 175, 55, 0.12)',
        'luxury-glow': '0 20px 40px -15px rgba(212, 175, 55, 0.15)',
      },
      borderRadius: {
        'card': '16px',
        'badge': '8px',
      }
    },
  },
  plugins: [],
};

export default config;
