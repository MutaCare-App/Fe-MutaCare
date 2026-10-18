/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        foreground: "#262626",
        background: "#FFFFFF",
        "muted-foreground": "#737373",
        input: "#E5E5E5",
        border: "#E5E5E5",
        primary: {
          100: "#EDF1D6",
          200: "#9DC08B",
          300: "#609966",
          400: "#40513B",
        },
        secondary: {
          100: "#C2FFC7",
          200: "#9EDF9C",
          300: "#62825D",
          400: "#526E48",
        },
        brand: {
          highlight: "#F1E979",
          light: "#EDEC80",
          base: "#F4DB6B",
          medium: "#F6C75A",
          accent: "#F9B145",
        },
        mint: {
          100: "#19BD9E",
          200: "#20BF91",
          300: "#27C284",
          400: "#2EC477",
        },
      },
      fontFamily: {
        "feather-bold": ["Feather Bold"],
        "poppins-black": ["Poppins-Black"],
        "poppins-black-italic": ["Poppins-BlackItalic"],
        "poppins-bold": ["Poppins-Bold"],
        "poppins-bold-italic": ["Poppins-BoldItalic"],
        "poppins-extrabold": ["Poppins-ExtraBold"],
        "poppins-extrabold-italic": ["Poppins-ExtraBoldItalic"],
        "poppins-extralight": ["Poppins-ExtraLight"],
        "poppins-extralight-italic": ["Poppins-ExtraLightItalic"],
        "poppins-italic": ["Poppins-Italic"],
        "poppins-light": ["Poppins-Light"],
        "poppins-light-italic": ["Poppins-LightItalic"],
        "poppins-medium": ["Poppins-Medium"],
        "poppins-medium-italic": ["Poppins-MediumItalic"],
        poppins: ["Poppins-Regular"], 
        "poppins-regular": ["Poppins-Regular"],
        "poppins-semibold": ["Poppins-SemiBold"],
        "poppins-semibold-italic": ["Poppins-SemiBoldItalic"],
        "poppins-thin": ["Poppins-Thin"],
        "poppins-thin-italic": ["Poppins-ThinItalic"],
      }
    },
  },
  plugins: [],
};
