const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const onboardConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, 'onboard', 'index.html'),
  filename: 'index.html',
  chunks: ['onboard']
});
const popupConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, 'popup', 'index.html'),
  filename: 'index.html',
  chunks: ['popup']
});

const alias = {};

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];


module.exports = {
  entry: {
    popup: path.join(__dirname, 'popup', 'index.jsx'),
    options: path.join(__dirname, 'onboard', 'index.jsx')
  },
  output: {
    path: __dirname + 'ext',
    filename: '[name]/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions.map(extension => ("." + extension)).concat([".jsx", ".js", ".css"])
  },
  plugins: [onboardConfig, popupConfig],
};
