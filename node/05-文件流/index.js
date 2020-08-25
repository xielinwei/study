let fs = require("fs");
const { on } = require("process");

let {log} = console;

// 创建写入流
// let ws = fs.WriteStream("hello.txt", { flags: "w", encoding: "utf-8"},function(err, res){
//   if(err){
//     console.log(err)
//   } else {
//     console.log(res)
//   }
// })
// // 文件流式写入
// ws.write("helloword", function(err){
//   if(err){
//     console.log(err)
//   } else {
//     console.log("内容流入完成")
//   }
// })
// ws.write("helloword222", function(err){
//   if(err){
//     console.log(err)
//   } else {
//     console.log("内容流入完成")
//   }
// })
// // 文件打开
// ws.on("open", function(){
//   console.log("文件打开")
// })
// // 文件准备写入
// ws.on("ready", function(){
//   console.log("文件写入进入准备状态")
// })

// // 文件写入完成
// ws.end(function(){
//   log("文件写入完成")
// })

// 文件关闭
// ws.on("close", function(){
//   console.log("文件关闭")
// })

let ws = fs.createWriteStream('a.mp4',{flags: "w"} ,function(){

})
let rs = fs.createReadStream('video.mp4', function(){

})

rs.on('open', function(){
  log("读取文件已打开")
})
// 每一批数据读取完成
rs.on('data', function(chunk){
  ws.write(chunk, ()=>{
    log("单批数据流入完成")
  })
})

