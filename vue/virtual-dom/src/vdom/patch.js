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
    if (oldVnode.text === newVnode.text) return;
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
  } else if (newChildren.length) {
    newChildren.forEach((item) => {
      domElement.appendChild(createDomElementFromVnode(item))
    })
  }
}
// 将oldChildren生成一个键值对的对象，便于新节点比对搜索查找
function createMapByKeyToIndex(oldChildren) {
  let map = {};
  for (let i = 0; i < oldChildren.length; i++) {
    let current = oldChildren[i];
    if (current.key) {
      map[current.key] = i;
    }
  }
  return map
}
// 判断新老虚拟节点是否相同
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
  // return oldVnode.type === newVnode.type
}
// diff  列表对比
function updateChildren(parent, oldChildren, newChildren) {
  let oldStartIndex = 0;
  let oldEndIndex = oldChildren.length - 1;
  let oldStartVnode = oldChildren[0];
  let oldEndVnode = oldChildren[oldEndIndex];

  let oldMapChildren = createMapByKeyToIndex(oldChildren)

  let newStartIndex = 0;
  let newEndIndex = newChildren.length - 1;
  let newStartVnode = newChildren[0];
  let newEndVnode = newChildren[newEndIndex];
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // type key
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex]
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex];

    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      // 先比较头是否相等
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];

    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // 头和头不相等，再比较尾巴
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];

    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // 头对尾
      patch(oldStartVnode, newEndVnode);
      parent.insertBefore(oldStartVnode.domElement, oldEndVnode.domElement.nextSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];

    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // 尾对头
      patch(oldEndVnode, newStartVnode);
      parent.insertBefore(oldEndVnode.domElement, oldStartVnode.domElement);
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else {
      // 暴力比对
      // 拿到新的节点 去老的中查找  如果存在就复用  不存在就重复创建插入
      let index = oldMapChildren[newStartVnode.key];
      if (index == null) {
        parent.insertBefore(createDomElementFromVnode(newStartVnode), oldStartVnode.domElement)
      } else {
        let toMoveNode = oldChildren[index]
        patch(toMoveNode, newStartVnode)
        parent.insertBefore(toMoveNode.domElement, oldStartVnode.domElement)
        oldChildren[index] = undefined;
      }
      newStartVnode = newChildren[++newStartIndex];
    }
  }
  // 只有小于或者等于  说明才有剩余的节点
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      let beforeElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement;
      parent.insertBefore(createDomElementFromVnode(newChildren[i]), beforeElement)
    }
  }
  // 多余的老节点
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i]) {
        parent.removeChild(oldChildren[i].domElement)
      }
    }
  }
}