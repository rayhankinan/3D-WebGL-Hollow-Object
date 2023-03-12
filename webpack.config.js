const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      Main: path.resolve(__dirname, "src/"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/dist"),
  },
};
