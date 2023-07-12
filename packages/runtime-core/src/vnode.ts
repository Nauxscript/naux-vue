import { ShapeFlags } from '@naux-vue/shared'

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')

export const createVNode = (type, props?, children?) => {
  const vnode = {
    el: null,
    type,
    props: props || {},
    children,
    component: null,
    key: props && props.key,
    shapeFlag: getShapeFlag(type),
  }

  if (typeof children === 'string')
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  else if (Array.isArray(children))
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN

  // it is a slot component
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof vnode.children === 'object')
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
  }
  return vnode
}

export {
  createVNode as createElementVNode,
}

export const createTextVnode = (text: string) => {
  return createVNode(Text, {}, text)
}

export const normalizeVNode = (child) => {
  if (typeof child === 'string' || typeof child === 'number')
    return createVNode(Text, null, child)
  else
    return child
}

function getShapeFlag(type) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}
