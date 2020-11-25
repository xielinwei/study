/**
 * 
 * @param {*} vnode  用户写的虚拟节点
 * @param {*} container 要渲染的容器
 */
export function render(vnode, container){
  let domElement = createDomElementFromVnode(vnode)
  container.appendChild(domElement);
}

function createDomElementFromVnode(vnode){
  let{type, key, props, children, text} = vnode;
}