/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2563eb",
        accent: "#f97316",
        success: "#22c55e",
        alert: "#dc2626",
        lightgray: "#f9fafb",
        neutral: {
          DEFAULT: "#6b7280",
          light: "#e5e7eb",
        },
      },
    },
  },
  plugins: [],
}

