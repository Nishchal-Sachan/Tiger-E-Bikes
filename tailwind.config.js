/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "matte-black": "#000000",
        "stark-white": "#FFFFFF",
        "tiger-yellow": "#FACC15", // Vibrant Tiger Yellow
        "tiger-green": "#10B981",  // Forest Green/Emerald
      },
    },
  },
  plugins: [],
};
