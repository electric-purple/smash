const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    })
  ],
  entry: ["./src/index.js"],
  devtool: "cheap-module-source-map",
  devServer: {
    port: 8080,
    contentBase: "./public",
    publicPath: "/",
    historyApiFallback: {
      disableDotRule: true
    }
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf|jpg|png|json)$/,
        use: "file-loader?name=[name].[ext]"
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "smash.js"
  }
};
