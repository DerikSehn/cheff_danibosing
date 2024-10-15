import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
import fontFamily from "./styles/fonts/fonts.json";
const svgToDataUri = require("mini-svg-data-uri");

/* https://coolors.co/a30000-fea82f-fbfbff-040f16 */
const colors = {
  secondary: {
    DEFAULT: "#4f5d2f",
    100: "#101209",
    200: "#1f2512",
    300: "#2f371c",
    400: "#3e4925",
    500: "#4f5d2f",
    600: "#788d47",
    700: "#9eb46a",
    800: "#becd9c",
    900: "#dfe6cd",
  },
  primary: {
    DEFAULT: "#fea82f",
    100: "#3c2300",
    200: "#784601",
    300: "#b46901",
    400: "#f08c01",
    500: "#fea82f",
    600: "#feb959",
    700: "#fecb82",
    800: "#ffdcac",
    900: "#ffeed5",
  },
  white: {
    DEFAULT: "#fff0db",
    100: "#5f3700",
    200: "#be6f00",
    300: "#ffa11e",
    400: "#ffc97c",
    500: "#fff0db",
    600: "#fff3e2",
    700: "#fff6ea",
    800: "#fff9f1",
    900: "#fffcf8",
  },
  black: {
    DEFAULT: "#040f16",
    100: "#010304",
    200: "#020609",
    300: "#02090d",
    400: "#030c11",
    500: "#040f16",
    600: "#134767",
    700: "#227fb9",
    800: "#5baee1",
    900: "#add6f0",
  },
};

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/onborda/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily,

      colors,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "modal-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "modal-fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "logo-carousel": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 2rem))" },
        },
      },
      //Adjust duration as your needs
      animation: {
        marquee: "marquee var(--duration, 30s) linear infinite",

        "logo-carousel": "logo-carousel 16s linear infinite",
        "modal-fade-in": "modal-fade-in 500ms ease-out",
        "modal-fade-out": "modal-fade-out 500ms ease-in",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    addSvgToDataUri,
  ],
};
export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

function addSvgToDataUri({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
}
