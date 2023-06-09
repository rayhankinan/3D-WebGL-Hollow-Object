const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      Main: path.resolve(__dirname, "src/"),
      Utils: path.resolve(__dirname, "src/Utils/"),
      Operations: path.resolve(__dirname, "src/Operations/"),
      Objects: path.resolve(__dirname, "src/Objects/"),
      Interfaces: path.resolve(__dirname, "src/Interfaces"),
      Files: path.resolve(__dirname, "src/Files"),
      Types: path.resolve(__dirname, "src/Types"),
      Factories: path.resolve(__dirname, "src/Factories"),
      Constants: path.resolve(__dirname, "src/Constants"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 80,
  },
};
