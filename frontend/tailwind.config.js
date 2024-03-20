/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
            green : {
                100: "#DFF0D8",
                150: "#D4FFB2",
                350: "#BBF670",
                450: "#A1DF51",
                600: "#79BD44",
                900: "#2B542C",
            },
            yellow:  {
                350: "#FEF98C",
                500: "#F1BE0A",
            },
            pink: {
                100: "#FBE5E6",
                200: "#F7C8CC",
                400: "#F18D97",
                500: "#E25463",
            },
            gray: {
                100: "#F2F2F2",
                200: "#E5E5E5",
                300: "#D9D9D9",
                400: "#B3B3B3",
                500: "#808080",
                600: "#666666",
                700: "#4D4D4D",
                800: "#333333",
                900: "#1A1A1A",
            },
          }
        },
  },

  plugins: [],
}

