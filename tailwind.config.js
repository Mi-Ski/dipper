/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
	darkMode: 'class',
	important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			zIndex: {
        '100': '100',
      },
			dropShadow: {
        'logo': [
            '-3px -3px 5px rgba(68, 253, 252, 0.15)',
            '3px 3px 5px rgba(88, 46, 255, 0.15)'
        ],
        'input': [
            '-3px -3px 5px rgba(68, 253, 252, 0.25)',
            '3px 3px 5px rgba(88, 46, 255, 0.25)'
        ]

      }
		},
		screens: {
			'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
		colors: {
			...colors,
			"bgcol-main-dark": "#07070A",
			"bgcol-ui-dark": "#0C0D11",
			"contrast-posts": "#040406",
			"post-input-bg": "#292C35",

			"border-dark": "#33333A",
			"border-neon": "rgba(60, 252, 249, .7)",

			"textcol-main-dark": "#EFEFEF",
			"text-chill": "#979797",

			"shadow": "#000000",
			"neon-accent": "rgba(103, 60, 255, .3)",
			"neon-accent2": "rgba(62, 252, 247, .1)",
			"button-like": "#fff",
			"brand-accent": "#5d2ff6",
		},
		fontFamily: {
			"sans": ["Montserrat", "ui-sans-serif"],
		},
  },
  plugins: [],
}
