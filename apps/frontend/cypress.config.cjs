const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config
    },
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173'
  },
  component: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config
    },
    specPattern: 'src/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
