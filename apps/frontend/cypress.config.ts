import { defineConfig } from "cypress";
import registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  component: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      return config
    },
    specPattern: 'src/**/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
