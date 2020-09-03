class B{
  constructor(name){
    this.name = name;
    this.age = 17;
  }
  get(){
    return this.age;
  }
}

class A extends B {
  constructor(id, name){
    super(name)
    this.id = id;
    this.age = 12;
  }
  getId(){ return this.age}
  getAge(){ return this.age}
}

console.log(new A(1, "ss").get())
console.log(new A(1, "ss").getId())