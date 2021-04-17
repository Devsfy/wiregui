const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const assets = ["icons"];

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  ...assets.map(asset => {
    return new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets", asset),
          to: path.resolve(__dirname, ".webpack/renderer", asset)
        }
      ],
    })
  })
];
