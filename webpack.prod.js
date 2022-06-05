const { DefinePlugin } = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new DefinePlugin({
      __COMMIT_HASH__: JSON.stringify(commitHash),
    }),
  ],
});
