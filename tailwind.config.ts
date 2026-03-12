import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kumbil: {
          primary: {
            DEFAULT: "#1A531B", // Deep professional green
            light: "#287D2A",
            dark: "#123C13",
            surface: "#F4F9F4",
          },
          secondary: "#F8FAF8", // Clean grayish green
          accent: {
            DEFAULT: "#8BC34A", // Fresh vibrant green
            light: "#A4D270",
            dark: "#689F38",
          },
          slate: {
            900: "#0F172A",
            800: "#1E293B",
            700: "#334155",
            600: "#475569",
          }
        }
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        premium: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [typography]
} satisfies Config;
