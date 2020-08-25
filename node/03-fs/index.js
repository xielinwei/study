let fs = require("fs");

function fsRead(path){
  return new Promise(function(resolve, reject){
    fs.readFile(path, function(error, data) {
      resolve(data);
    });
  })
}

async function readList(){
  var file1 = await fsRead("1.txt");
  console.log(file1.toString())
}

readList()