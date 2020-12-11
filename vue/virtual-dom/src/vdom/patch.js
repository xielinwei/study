import {
  vnode
} from "./vnode";

/**
 * 
 * @param {*} vnode  用户写的虚拟节点
 * @param {*} container 要渲染的容器
 */
export function render(vnode, container) {
  let elem = createDomElementFromVnode(vnode)
  container.appendChild(elem);
}

function createDomElementFromVnode(vnode) {
  let {
    type,
    key,
    props,
    children,
    text
  } = vnode;
  if (type) {
    vnode.domElement = document.createElement(type);
    updateProperties(vnode);
    children.forEach(childVnode => render(childVnode, vnode.domElement));
    // console.log(vnode.domElement)
  } else {
    vnode.domElement = document.createTextNode(text)
  }
  return vnode.domElement;
}
// 节点更新属性
function updateProperties(newVnode, oldProps = {}) {
  let domElement = newVnode.domElement;
  let newProps = newVnode.props;

  // 老属性有，新属性没，说明属性被移除了
  for (let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      // delete domElement[oldPropName]
      domElement.removeAttribute(oldPropName)
    }
  }
  // 如果属性为style的话
  let newStyleObj = newProps.style || {};
  let oldStyleObj = oldProps.style || {};

  // style在新属性中被移除
  for (let style in oldStyleObj) {
    if (!newStyleObj[style]) {
      domElement.style[style] = "";
    }
  }
  // 老属性没有，新属性有 或者 新属性更新
  for (let newPropName in newProps) {
    if (newPropName === "style") { //属性为style时的处理
      let styleObj = newProps.style;
      for (let s in styleObj) {
        domElement.style[s] = styleObj[s]
      }
    } else {
      // domElement[newPropName] = newProps[newPropName]
      domElement.setAttribute(newPropName, newProps[newPropName])
    }
  }
}

export function patch(oldVnode, newVnode) {
  // 类型不同
  if (oldVnode.type !== newVnode.type) {
    return oldVnode.domElement.parentNode.replaceChild(createDomElementFromVnode(newVnode), oldVnode.domElement)
  }
  // 类型相同且为文本标签
  if (oldVnode.text) {
    return oldVnode.domElement.textContent = newVnode.text
  }
  // 类型一样  并且为元素标签  
  let domElement = newVnode.domElement = oldVnode.domElement;
  updateProperties(newVnode, oldVnode.props);

  let oldChildren = oldVnode.children;
  let newChildren = newVnode.children;
  // 老儿子和新儿子都有
  if (oldChildren.length && newChildren.length) {
    updateChildren(domElement, oldChildren, newChildren)
    // 老的有儿子，新的没有 
  } else if (oldChildren.length) {
    domElement.innerHTML = "";
    // 老的没儿子，新的有
  } else if (newChildren.length){
    newChildren.forEach((item)=>{
      domElement.appendChild(createDomElementFromVnode(item))
    })
  }
}
// diff
function updateChildren(parent, oldChildren, newChildren){

}