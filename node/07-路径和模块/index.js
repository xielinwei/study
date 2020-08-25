let path = require("path");

// 获取路径信息的后缀名(扩展名)
// path.extname()


let arr = ["dsak", "dsa", "fsca"]
let info = path.resolve(...arr); //在当前的目录之后拼接参数生成一个新的目录名
console.log(info)

//  __dirname : 获取当前执行文件的所在目录
console.log(__dirname)

//  __filename : 获取当前执行文件的绝对路径的完整文件名
console.log(__filename)

// path.parse() 解析路径

console.log(path.parse(__filename))

let os = require('os')
console.log(os.cpus()) //查看cpu信息
console.log(os.totalmem()) //查看内存
