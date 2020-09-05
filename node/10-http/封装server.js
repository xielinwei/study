let http = require('http');
let path = require('path');
let url = require("url")
class Myapp{
  constructor(){
    this.server = http.createServer();
    this.reqEvent = {

    }
    this.server.on('request',(req,res)=>{
      // 解析路径
      let pathObj = url.parse(req.url);
      console.log(pathObj)
      if(pathObj.pathname in this.reqEvent){
        this.reqEvent[pathObj.pathname](req,res)
      } else{
        res.setHeader("Content-type", "text/html;charset=UTF-8")
        res.end("404!找不到页面")
      }
    })
  }
  on(url, fn){
    this.reqEvent[url] = fn;
  }
  run(port, callback){
    this.server.listen(port, callback)
  }
}
module.exports = Myapp;