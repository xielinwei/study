class Compile {
  constructor(node, vm) {
    this.node = node;
    this.vm = vm;
    this.htmlParse(this.node, this.vm)
  }
  htmlParse(node, vm) {
    [...node.childNodes].forEach((node) => {
      if (node.nodeType == 3) { //文本节点
        this.compileText(node, vm)
      } else { //元素节点
        this.compileElement(node, vm)
      }
    })
  }
  compileElement(node, vm){
    let attrs = node.attributes; //类数组
    [...attrs].forEach(element => {
      
    });
    let [,directive] = attr;

  }
  compileText(){

  }
}
CompileUtil = {
  text(node, vm) { // {{school.name}}{{school.age}}
    // node.replace(/\{\{(.+?)\}\}/, () => {
    //   return [...args].reduce(()=>{
    //   })
    // })
  },
  model(node, vm) { //v-model
   
   
  },
  html() {

  }
}
// vue
class Vue {
  constructor(option) {
    this.$data = option.data;
    this.$el = typeof option.el == "string" ? document.querySelector(option.el) : option.el;
    this.complier(this.$el)
  }
  complier(node) {
    let fragment = document.createDocumentFragment();
    while (node.firstChild) {
      fragment.appendChild(node.firstChild)
    }
    new Compile(fragment, this);

  }
}