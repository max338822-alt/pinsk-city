import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff8ff",
          100: "#dbeefe",
          200: "#bfe0fe",
          300: "#93ccfd",
          400: "#60b0fa",
          500: "#3b8ff6",
          600: "#2570eb",
          700: "#1d5bd8",
          800: "#1e4baf",
          900: "#1e418a",
          950: "#172a54",
        },
        cyber: {
          green:  "#00ff41",
          red:    "#ff0040",
          blue:   "#00d4ff",
          purple: "#bf00ff",
          dark:   "#0a0a0f",
        },
        pinsk: {
          sky:    "#4A90D9",
          river:  "#2E86AB",
          forest: "#2D6A4F",
          night:  "#1A1A2E",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in":    "fadeIn 0.6s ease-out forwards",
        "fade-up":    "fadeUp 0.8s ease-out forwards",
        "float":      "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "morphing":   "morphing 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:   { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp:   { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float:    { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-15px)" } },
        shimmer:  { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        morphing: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%":      { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
