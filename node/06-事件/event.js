let events = require('events');
let e = new events.EventEmitter(); 
let fs = require('fs');
const { EEXIST } = require('constants');

e.on("success", function(eventMsg){
  console.log(1)
  console.log(eventMsg)
})
e.on("success", function(eventMsg){
  console.log(2)
})
e.on("success", function(eventMsg){
  console.log(3)
})
e.on("success", function(eventMsg){
  console.log(4)
})

function xlwReadFile(path){
  return new Promise(function(reslove, reject){
    fs.readFile( path , {encoding: "utf-8"},function(err, data){
      if(err){
        reject(err)
      } else {
        reslove(data)
      }
    })
  })
}

xlwReadFile("hello.txt").then((data)=>{
  e.emit("success", data)
})


async function test(){
  let data = await xlwReadFile("hello.txt")
  e.emit("success", data)
}

test()