module.exports = {
  content: [
    './src/**/*.{html,ts,css}',
    './src/**/*.html',
    './src/**/*.ts'
  ],
  theme: {
    extend: {
      colors: {
        fond: 'var(--color-fond)',
        'orange-flash': 'var(--color-orange-flash)',
        'marron-medium': 'var(--color-marron-medium)',
        'marron-dark': 'var(--color-marron-dark)',
        'beige-medium': 'var(--color-beige-medium)',
        'vert-bois': 'var(--color-vert-bois)',
      },
    },
  },
  plugins: [],
};
