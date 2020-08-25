// let a = "ss";
// 被引入的模块首先会执行一次(仅执行一次)，然后才引入进来
let a = require("./index1")
let b = require("./index1")
console.log(a)