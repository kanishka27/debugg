const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

// const aa = "aa";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: ["babel-polyfill", "./src/index"],
  output: {
    path: path.resolve(__dirname, "../server/public/build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ttf|eot|svg|gif|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,

        use: ["file-loader"]
      }
    ]
  }
};
