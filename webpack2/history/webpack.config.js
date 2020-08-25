let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development",
  entry: { //多入口
    home: './src/index.js',
    other: './src/other.js'
  },
  output:{
    //[name] 多文件出口
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // 多入口需要多个实例
    new HtmlWebpackPlugin({
      template:"./index.html",
      filename: 'home.html',
      chunks:['home']  //各自引用各自的文件
    }),
    new HtmlWebpackPlugin({
      template:"./index.html",
      filename: 'other.html',
      chunks: ['other']
    })
  ]
}