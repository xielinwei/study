let fs = require('fs')
let rs = fs.createReadStream("./video.mp4",{flags: "r"}, function(){

})
let ws = fs.createWriteStream("b.mp4", {flags: "w"},function(){

})

rs.pipe(ws)