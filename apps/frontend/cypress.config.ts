import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  component: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config
    },
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
