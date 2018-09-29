const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "client"),
    index: "index.html",
    overlay: {
      warnings: true,
      errors: true
    }
  },
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "client"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
    alias: {
      Components: path.resolve(__dirname, "src/Components")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
