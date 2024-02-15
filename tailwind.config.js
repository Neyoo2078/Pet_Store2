/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        Nunitos: ['Nunito Sans', 'Roboto'],
        Roboto: ['Roboto', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        display: ['Oswald'],
        body: ['"Open Sans"'],
      },
      backgroundImage: {
        learnMore: "url('../public/zwstock-image-91.jpg')",
        ActivityPhoto: 'url(../public/zwstock-image-92.png)',
      },
    },
  },
  plugins: [],
};
