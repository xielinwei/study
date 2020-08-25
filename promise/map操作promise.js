function queue(num){
  let promise = Promise.resolve();
  num.map((n)=>{
    promise = promise.then(()=>{
      return new Promise((resolve)=>{
        setTimeout(() =>{
          console.log(n);
          resolve();
        }, 1000)
      })
    })
  })
}

queue([1,2,3,4,5])