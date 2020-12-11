const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devtool: 'eval-source-map', 
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true,
    overlay: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}