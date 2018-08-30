const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
// const CompressionPlugin = require("compression-webpack-plugin") // gzip compression 🤔
const UglifyJsPlugin = require("uglifyjs-webpack-plugin") // have to use if optimizing css with OptimizeCSSAssetsPlugin
// const MiniCssExtractPlugin = require("mini-css-extract-plugin") // extracts css into separate files 🤔
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "client"),
    compress: true,
    port: 9000,
    https: true, // force https url
    index: "index.html",
    overlay: {
      warnings: true,
      errors: true
    }
    //publicPath: "/"
  },
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "client"),
    filename: devMode // this is just for keeping everything in one file
      ? "[name].[hash].bundle.js"
      : "[name][contenthash].bundle.js"
  },
  optimization: {
    /*    namedChunks: true,
    minimizer: [
      /!*      new UglifyJsPlugin({
        // webpack 4 use UglifyJsPlugin internally, but we have to declare it again with the minimizer option
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})*!/
    ]*/
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
          /*devMode ? "style-loader" : MiniCssExtractPlugin.loader,*/
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
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
    extensions: [".js", ".jsx", ".scss"],
    modules: ["node_modules"],
    alias: {
      Components: path.resolve(__dirname, "src/Components"),
      utils: path.resolve(__dirname, "src/utils")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    /*    new DotenvPlugin({
      sample: "./.env.dist",
      path: "./.env"
    }),*/
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    /*    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),*/
    devMode ? () => ({}) : new CleanWebpackPlugin(["client"])
    /*    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/
    })*/
  ]
}
