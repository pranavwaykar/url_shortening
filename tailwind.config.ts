import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Poppins"', "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "form-pattern": "url('/images/bg-shorten-desktop.svg')",
        "form-pattern-m": "url('/images/bg-shorten-mobile.svg')",
        "boost-pattern": "url('/images/bg-boost-desktop.svg')",
        "boost-pattern-m": "url('/images/bg-boost-mobile.svg')",
      },
      colors: {
        cyan: "hsl(180, 66%, 49%)",
        darkviolet: "hsl(257, 27%, 26%)",

        red: "hsl(0, 87%, 67%)",
        subtlegray: "hsl(230, 25%, 95%)",

        gray: "hsl(0, 0%, 75%)",
        grayishviolet: "hsl(257, 7%, 63%)",
        verydarkblue: "hsl(255, 11%, 22%)",

        verydarkviolet: "hsl(260, 8%, 14%)",
      },
    },
  },
  plugins: [],
};
export default config;
