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

module.exports = {
  entry: {
    popup: path.join(__dirname, 'popup', 'index.js'),
    options: path.join(__dirname, 'options', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'ext/[name]'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [onboardConfig, popupConfig],
};
