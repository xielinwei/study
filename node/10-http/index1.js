let Myapp = require('./封装server');

let app = new Myapp();

app.on("/", (req,res)=>{
  res.setHeader("Content-type", "text/html;charset=UTF-8")
  res.end("这是首页")
})
app.on("/news", (req,res)=>{
  res.setHeader("Content-type", "text/html;charset=UTF-8")
  res.end("这是国内新闻")
})
app.run(3000, function(){
  console.log("服务已启动")
})