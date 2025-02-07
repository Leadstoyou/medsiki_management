module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      maxWidth: {
        '1/2': '50%',
      },
    },
  },
  variants: {},
  plugins: [],
  important: true,
};
