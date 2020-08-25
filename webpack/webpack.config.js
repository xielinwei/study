// webpack是node写出来的
let path = require('path'); //内置的模块  (path.resolve可以将相对路径改成绝对路径)
let HtmlWebpackPlugin = require('html-webpack-plugin'); //配置html
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  devServer: { //开发服务器的配置 (执行npm run dev后的文件是看不到的，存在缓存中, 可以通过本地端口访问项目,所以称为开发环境)
    port: 3000, //端口
    progress: true, //是否进度条
    contentBase: "./dist", //开发的路径
    compress: false
  },
  mode: "development", //模式 默认两种  production(生产环境打包后的文件是在dist目录中,能看到的)  或者 development
  entry: "./src/index.js", //入口
  output: {
    filename: "bundle.js", //打包后的文件名 eg：bundle.[hash:8].js  加hash是为了每次更改源文件打包都产生一个新的文件，防止覆盖
    path: path.resolve(__dirname, 'dist'), //打包后的路径(必须是一个绝对路径)(__dirname以当前目录为基础)
    // publicPath: "http://www.xyhsoft.com/" //上线之后统一加的路径
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [ //数组，存放所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', //打包前的模板
      filename: "index.html", //打包后的文件名
      minify: false
      // minify: { //压缩
      //   removeAttributeQuotes: true, //删除双引号
      //   collapseWhitespace: true //删除空行
      // },
      // hash: true //为了清除缓存加一个哈希戳
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
  ],
  module: { //模块
    // loader 
    rules: [{
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            esModule: false, //url-loader版本升级之后  防止在上面html里的src属性会生成defaults对象
            limit: 1,  //低于此大小用base64显示，可以减少请求
            outputPath: 'img/',
            publicPath: "http://www.xyhsoft.com/"
          }
        }]
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [{
      //     loader: "file-loader",
      //     options: {
      //       esModule: false
      //     }
      //   }]
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { //规则： css-loader 帮我们处理特殊的css文件 eg：解析@importz这种语法
        // style-loder 将处理好的css插入到header标签里。默认是最后面
        // loader数组是倒序加载执行的
        // loader也可以是一个对象可以传参
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}