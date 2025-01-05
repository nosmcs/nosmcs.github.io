/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      colors: {
        'primary': '#00ebff',
        'secondary': '#ff00e5',
        'background': '#0a0a0a',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'brightness(100%)' },
          '50%': { filter: 'brightness(150%)' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00ebff",
          "secondary": "#ff00e5",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#0a0a0a",
        },
      },
    ],
  },
}

