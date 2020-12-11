// 先实现虚拟DOM  createElement
/**
 * <div id="wrapper"  a=1>
 *  <span style="color: red">hello</span>
 *  "zf"
 * </div>
 */
import {h, render, patch} from "./vdom"

let oldVnode = h("div", {id: "wrapper"}, 
  h("li", {style: {color: "red"}, key: "a"}, "a"), 
  h("li", {style: {color: "yellow"}, key: "b"}, "b"), 
  h("li", {style: {color: "blue"}, key: "c"}, "c"), 
  h("li", {style: {color: "green"}, key: "d"}, "d"), 
);


let newVnode = h("div", {id: "b"}, );


// 将虚拟节点转换为真实的DOM节点，最后插入到app元素中
render(oldVnode, app)

setTimeout(()=>{
  // patch(oldVnode, newVnode)
},2000)