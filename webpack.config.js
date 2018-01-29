const webpack = require("webpack");
const path = require("path");

module.exports = {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  entry: ["src/index.js"],
  devtool: "cheap-module-source-map",
  devServer: {
    port: 8080,
    contentBase: "./dist",
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
    path: path.resolve(__dirname, "dist", "generated"),
    filename: "bundle.js",
    publicPath: "/generated/"
  }
};
