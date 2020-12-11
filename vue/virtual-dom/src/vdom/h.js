/**
 * 
 * @param {类型} type 
 * @param {属性} props 
 * @param  {子节点} args 
 */
import {vnode} from "./vnode"
 export default function createElement(type, props={}, ...children) {
  let key;
  if (props.key) {
    key = props.key;
    delete props.key;
  }
  // 将不是虚拟节点的转换为虚拟节点
  children = children.map(child => {
    if(typeof child === "string"){
      return vnode(undefined, undefined, undefined, undefined, child)
    } else {
      return child;
    }
  })
  return vnode(type, key, props, children)
}
