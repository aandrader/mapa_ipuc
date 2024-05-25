import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-ipuc": {
          "100": "#DFE6F1",
          "200": "#BFCCE3",
          "300": "#9FB3D4",
          "400": "#8099C6",
          "500": "#6080B8",
          "600": "#4066AA",
          "700": "#204D9B",
          "800": "#00338D",
          "900": "#224073",
        },
      },
    },
  },
  plugins: [],
};
export default config;
