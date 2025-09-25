import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6ba6ff',
          DEFAULT: '#0070f3',
          dark: '#0053b3',
        },
        secondary: {
          light: '#ff79b0',
          DEFAULT: '#ff4081',
          dark: '#c60055',
        },
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
      },
    },
  },
  plugins: [],
}
export default config
