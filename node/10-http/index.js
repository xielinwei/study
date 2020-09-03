// http内置模块
const http = require("http");

// 创建服务器对象
let server = http.createServer();
server.on("request", function(req, res){
  console.log(req.url)
  console.log(req.headers)
  res.setHeader("Content-Type", "text/html;charset=UTF-8")
  if(req.url == "/"){
    res.end("sss")
  }
  if(req.url == "/gnxw"){
    res.end("<h1>国内新dsadas闻</h1>")
  } else{
    res.end("404")
  }
})   

server.listen(3000, function(){
  console.log("服务起启动完成")
})