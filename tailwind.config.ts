import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#0E0C0A',
        red:     '#C8A45A',
        'red-dim':'rgba(200,164,90,0.12)',
        surface: '#1A1714',
        border:  '#2E2B27',
        cream:   '#EDE8DF',
        dim:     '#6B665E',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
      },
      animation: {
        'rec':   'rec-blink 1s steps(1) infinite',
        'grain': 'grain-shift 0.18s steps(3) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
