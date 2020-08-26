// async 相当于 new Promise()
// await 相当于返回一个 Promise.resolve()
// await就是then的语法糖

async function queue() {
    let a = await new Promise((resolve) => {
        setTimeout(() => {
            resolve("ss")
        }, 2000)
    });
    console.log(a)
}


async function xlw() {
  let a = await "22";
  console.log(a)
  return Promise.resolve("ss")
}
console.log("11")
xlw().then(v => console.log(v))
console.log(33)
