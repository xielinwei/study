let str = "{{school.name}}{{school.teacher}}{{student.age}}";

str.replace(/\{\{(.+?)\}\}/g, (...args)=>{
  console.log(args)
  console.log(args[1])
})