module.exports = {
    content: [
        './src/**/*.{svelte,js,tsx}',
        './index.html'
    ],
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
          "light", 
          "dracula"
        ],
      },
};
  