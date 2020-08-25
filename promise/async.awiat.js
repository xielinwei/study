async function queue() {
  let a = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("ss")
    }, 2000)
  });
  console.log(a)
}
queue()