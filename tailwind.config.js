/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#243624",
        "primary-container": "#3a4d39",
        "deep-forest": "#3A4D39",
        "on-primary": "#ffffff",
        "on-primary-container": "#a7bda4",
        "primary-fixed": "#d2e9ce",
        "primary-fixed-dim": "#b7cdb2",

        "secondary": "#97472e",
        "secondary-container": "#fe997a",
        "terracotta": "#C86D51",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#772f18",
        "secondary-fixed": "#ffdbd0",
        "secondary-fixed-dim": "#ffb59f",

        "tertiary": "#3f2e21",
        "tertiary-container": "#574436",
        "walnut": "#2C1D11",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#ccb29f",
        "tertiary-fixed": "#faddca",
        "tertiary-fixed-dim": "#dcc1af",

        "background": "#fef8f3",
        "on-background": "#1d1b19",
        "raw-linen": "#F4EFEA",

        "surface": "#fef8f3",
        "surface-bright": "#fef8f3",
        "surface-dim": "#ded9d4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f8f3ee",
        "surface-container": "#f2ede8",
        "surface-container-high": "#ece7e2",
        "surface-container-highest": "#e6e2dd",
        "surface-variant": "#e6e2dd",
        "on-surface": "#1d1b19",
        "on-surface-variant": "#434842",
        "surface-tint": "#50634e",

        "outline": "#747871",
        "outline-variant": "#c3c8bf",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px"
      },
      spacing: {
        unit: "8px",
        gutter: "24px",
        "container-max": "1280px",
        "margin-mobile": "16px",
        "margin-desktop": "64px"
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        headline: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Fira Sans", "sans-serif"],
        label: ["IBM Plex Sans", "sans-serif"],
        slogan: ["Fira Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
