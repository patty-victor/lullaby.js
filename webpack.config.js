var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/lullaby.js',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
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
            },
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader'
            }
        ]
    },
    stats: {
        colors: true
    },
};