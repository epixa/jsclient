var webpack = require('webpack'),
  path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "jsclient.js"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
};
