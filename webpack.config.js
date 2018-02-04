var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/lullaby.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'lullaby.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
};