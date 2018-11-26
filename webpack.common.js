const HTMLPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const TypeScriptCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './frontend/main',

  output: {
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-hot-loader' },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:6].[ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    new CleanPlugin(['./dist/']),

    new HTMLPlugin({
      template: './frontend/index.html',
      inject: true,
      favicon: './frontend/favicon.png',
      minify: {
        collapseWhitespace: true,
      },
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new TypeScriptCheckerPlugin(),
  ],
}
