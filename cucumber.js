module.exports = {
  default: {
    require: [
      "./src/support/world.ts",
      "./src/step-definitions/**/*.ts",
      "./src/support/**/*.ts",
    ],
    requireModule: ["ts-node/register"],
    paths: ["features/**/*.feature"],
    format: ["@cucumber/pretty-formatter"],
  },
};
