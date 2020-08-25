// express
// 模拟服务端起一个接口  并在此接口下面启动服务端和webapck  两者在同一接口下面，就不会有跨域问题
let express = require('express');
let app = express();
let webpack = require('webpack');
let middle = require('webpack-dev-middleware')
let config = require("./webpack.base")
let complier = webpack(config)
app.use(middle(complier))
app.get('/user', (req, res) => {
  res.json({
    name: "xlw"
  })
})
app.listen(3000);

// 用node写一个接口
// let express = require('express');
// let app = express();
// app.get('/user', (req, res) => {
//   res.json({
//     name: "xlw"
//   })
// })
// app.listen(3000);