// async 函数的返回值为 new Promise()
// await 相当于返回一个 Promise.resolve()
// await就是then的语法糖

// 2 await表达式 
// await右侧的表达式一般为promsie对象，但也可以是其他的值
// 如果是promsie对象，await返回的是promsie成功的值, 需要用then接收
// 如果是其他值， 直接将此值作为await的返回值

// 3 await的失败，会抛出异常，需要通过try...catach来捕获处理
// async function queue() {
//     let a = await new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("ss")
//         }, 2000)
//     });
//     console.log(a)
// }


// async function xlw() {
//   let a = await "22";
//   console.log(a)
//   return Promise.resolve("ss")
// }
// console.log("11")
// xlw().then(v => console.log(v))
// console.log(33)

async function xlw(){
  let user =  await "sss";
  return user
}
xlw().then(v=>console.log(v))