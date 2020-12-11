const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    noParse: /jquery/, //优化点1 不去解析此依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //优化项   排除此目录
        include: path.resolve('src'), //优化项   只在这里面找
        use:{
          loader: "babel-loader",
          options:{
            presets:['@babel/preset-env','@babel/preset-react']
          }
        }
      }
    ]
  },
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins:[
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), //优化项 不引入包
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}