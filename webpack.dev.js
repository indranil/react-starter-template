const path = require("path");
const { DefinePlugin } = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./build"),
    },
    liveReload: true,
    client: {
      logging: "info",
    },
    devMiddleware: {
      publicPath: "/",
    },
    historyApiFallback: true,
    port: 8000,
    host: "0.0.0.0",
  },
  plugins: [
    new DefinePlugin({
      __COMMIT_HASH__: JSON.stringify(commitHash),
    }),
  ],
});
