import { ShapeFlags } from '@naux-vue/shared'

export const createVNode = (type, props?, children?) => {
  const vnode = {
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type),
  }

  if (typeof children === 'string')
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  else if (Array.isArray(children))
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN

  // it is a slot component 
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof vnode.children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
    }
  }
  return vnode
}

function getShapeFlag(type) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}
