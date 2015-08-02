var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    }
};
