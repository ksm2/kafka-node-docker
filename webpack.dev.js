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
    port: 8080,
    proxy: {
      '/commands': {
        target: 'http://command.local:8081',
        pathRewrite: { '^/commands': '' },
      },
      '/queries': {
        target: 'http://query.local:8082',
        pathRewrite: { '^/queries': '' },
      },
    },
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
