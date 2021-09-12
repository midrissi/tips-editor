module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        sm: {
          css: {
            h1: {
              color: theme('colors.white'),
              fontSize: 18,
            },
            h2: {
              color: theme('colors.white'),
              fontSize: 16,
            },
            h3: {
              color: theme('colors.white'),
              'margin-top': '0px',
              fontSize: 14,
            },
            p: {
              color: theme('colors.white'),
              fontSize: 12,
            },
            h4: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            a: {
              color: theme('colors.blue.200'),
            },
            blockquote: {
              color: theme('colors.gray.100'),
            },
            img: {
              'margin-top': '-1.14em',
              'margin-bottom': '-1.14em',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
