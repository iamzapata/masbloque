const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const devMode = process.env.NODE_ENV !== "production"
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
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          { loader: "postcss-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
    alias: {
      Components: path.resolve(__dirname, "src/Components"),
      Styles: path.resolve(__dirname, "src/styles")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[name].css" : "[name].[hash].css"
    }),
    devMode ? () => null : new CleanWebpackPlugin("client")
  ]
}
