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
                150: "#D4FFB2",
                350: "#BBF670",
            },
            yellow:  {
                350: "#FEF98C",
            },
          }
        },
  },

  plugins: [],
}

