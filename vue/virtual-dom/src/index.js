// 先实现虚拟DOM  createElement
/**
 * <div id="wrapper"  a=1>
 *  <span style="color: red">hello</span>
 *  "zf"
 * </div>
 */
import {h, render, patch} from "./vdom"

let oldVnode = h("div", {}, 
  h("li", {style: {background: "red"}, key: "a"}, "a"), 
  h("li", {style: {background: "yellow"}, key: "b"}, "b"), 
  h("li", {style: {background: "blue"}, key: "c"}, "c"), 
  h("li", {style: {background: "green"}, key: "d"}, "d")
);


let newVnode = h("div", {}, 
  h("li", {style: {background: "red"}, key: "G"}, "G"), 
  h("li", {style: {background: "yellow"}, key: "F"}, "F"), 
  h("li", {style: {background: "yellow"}, key: "c"}, "c1"), 
  h("li", {style: {background: "green"}, key: "d"}, "d1"), 
  h("li", {style: {background: "yellow"}, key: "b"}, "b1"), 
  h("li", {style: {background: "blue"}, key: "a"}, "a1")
);


// 将虚拟节点转换为真实的DOM节点，最后插入到app元素中
render(oldVnode, app)

setTimeout(()=>{
  patch(oldVnode, newVnode)
},2000)