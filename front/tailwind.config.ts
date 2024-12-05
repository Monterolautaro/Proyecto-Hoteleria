import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseBg: {
          "0%": { backgroundColor: "rgba(0, 147, 117, 0.1)" }, // Color base
          "50%": { backgroundColor: "rgba(0, 147, 117, 0.2)" }, // Color intermedio
          "100%": { backgroundColor: "rgba(0, 147, 117, 0.1)" }, // Regresa al base
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        pulseBg: "pulseBg 1s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
