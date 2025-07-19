// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary)', // #0074D9
          secondary: 'var(--color-secondary)', // #003B49
          accent: 'var(--color-accent)', // #00BFA6
          bg: 'var(--color-bg)', // #F8F9FA
          text: 'var(--color-text)', // #212529
        },
      },
    },
  },
  plugins: [],
};
