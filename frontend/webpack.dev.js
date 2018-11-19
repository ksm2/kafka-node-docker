const fs = require('fs')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: true,
          plugins: [
            'react-hot-loader/babel',
          ],
        },
      },
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
  ],
})
