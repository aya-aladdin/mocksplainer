import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#f9fafb',
        panel: '#ffffff',
        'panel-2': '#f8f9fa',
        ink: '#212529',
        muted: '#6b7280',
        accent: '#2563eb',
        'accent-hover': '#1d4ed8',
        border: '#e9ecef',
      },
      boxShadow: {
        ring: '0 0 0 3px rgba(37, 99, 235, 0.1)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        kanit: ['var(--font-kanit)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config