let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack')


// 一些小插件介绍
// 1) cleanWebpackPlugin  每次打包之后都产生新的dist目录，清除之前保留的
// 2) copyWebpackPlugin   拷贝插件, 可以将其他一些文件也打包到dist文件夹里
// 3) bannerPlugin 内置插件 版权声明插件

module.exports = {
  mode: "development",
  entry: { //多入口
    index: './src/index.js',
  },
  output: {
    //[name] 多文件出口
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist')
  },
  // 1) 源码映射，会单独生成一个sourcemap文件  报错会标识源文件  具体到行和列
  // devtool: 'source-map', //增加映射文件,帮助我们调试源代码
  // 2) 不会产生单独的文件, 但是可以显示行和列
  // devtool: 'eval-source-map', 
  // 3) 不会产生列  但是是一个单独的映射文件
  // devtool: 'cheap-module-source-map', //产生后你可以保留起来
  // 4) 不会产生文件，集成后在打包后的文件中  只会定位到行 不会产生列
  // devtool: "cheap-module-eval-source-map",

  watch: true, //监控文件 实时编译打包
  watchOptions: {
    poll: 1000, //每秒 问我1000次
    aggregateTimeout: 500, //防抖  我一直输入代码
    ignored: /node_modules/ //不需要监控那个文件
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [
    // 多入口需要多个实例
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'doc',
        to: "./"
      }]
    }),
    new webpack.BannerPlugin('make 2020 by xlw')
  ]
}