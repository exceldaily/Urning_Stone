import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F3',
        cream: '#FFFDFA',
        linen: '#F2ECE1',
        taupe: '#E4DACB',
        hairline: '#DCD2C2',
        ink: '#332F29',
        ink2: '#5F574B',
        muted: '#6E665A',
        sage: '#75846E',
        'sage-deep': '#5C6A56',
        'sage-wash': '#EDF0EA',
        bronze: '#96794E',
        'bronze-deep': '#7A6039',
        rose: '#B4837C',
      },
      fontFamily: {
        display: ['Newsreader', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['Karla', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(51,47,41,0.04), 0 12px 32px -20px rgba(51,47,41,0.28)',
        lift: '0 2px 4px rgba(51,47,41,0.05), 0 24px 48px -28px rgba(51,47,41,0.34)',
      },
      maxWidth: { shell: '78rem' },
      transitionTimingFunction: { calm: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    },
  },
  plugins: [],
};
export default config;
