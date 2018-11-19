const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: '[name].[hash].js',
    hashDigestLength: 6,
  },

  optimization: {
    minimize: true,
    concatenateModules: true,
  },

  plugins: [
    new CompressionPlugin(),
  ],
})
