/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        button: "0px 2px 2px rgba(0, 0, 0, 0.06)",
        card: "0px 0px 25px rgba(0, 0, 0, 0.11)",
        chatInput: "0px 2px 4px 0px #0000000F;"
      },
      colors: {
        teal: {
          100: "#DBF5F4",
          300: "#70DFDB",
          400: "#4DD0E1",
          500: "#0FC3BD",
          900: "#008884",
        },
        primary: {
          100: "#FBFAFE",
          300: "#E5DDFD",
          600: "#6E43F8",
          900: "#412B88"
        },
        status: {
          processing: "#412B88",
          completed: "#0FC3BD",
          failed: "#B93131"
        }
      },
      borderRadius: {
        md: "8px",
      },
      borderWidth: {
        1: "1px",
      },
      backgroundImage: theme => ({
        'button-gradient': 'linear-gradient(90deg, #5534B7 0%, #2F235D 100%)',
        'metric-entry': 'linear-gradient(0deg, #F3F4F6, #F3F4F6), linear-gradient(0deg, #E5DDFD, #E5DDFD)',
        'question-entry': 'linear-gradient(0deg, #DBF5F4, #DBF5F4),linear-gradient(0deg, #70DFDB, #70DFDB)',
        'user-entry': 'linear-gradient(0deg, rgba(0, 136, 132, 0.26), rgba(0, 136, 132, 0.26)),linear-gradient(0deg, #DBF5F4, #DBF5F4);',
      }),
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // changed back from false
  }
};
