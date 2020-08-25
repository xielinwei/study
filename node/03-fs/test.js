function* f() {
  console.log('执行了！')
  console.log('执行了！')
  console.log('执行了！')
  console.log('执行了！')
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);