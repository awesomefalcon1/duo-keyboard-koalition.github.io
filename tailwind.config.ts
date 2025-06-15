import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFA500",
        secondary: "#4A4A4A",
      },
    },
  },
  plugins: [],
}

export default config
