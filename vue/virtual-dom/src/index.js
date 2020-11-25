// 先实现虚拟DOM  createElement
/**
 * <div id="wrapper"  a=1>
 *  <span style="color: red">hello</span>
 *  "zf"
 * </div>
 */
import {h, render} from "./vdom"

let vnode = h("div", {
  id: "wrapper",
  a: 1,
  key: "xx"
}, h("span", {
  style: {
    color: "red"
  }
}, "hello"), "zf");

// 将虚拟节点转换为真实的DOM节点，最后插入到app元素中
render(vnode, app)