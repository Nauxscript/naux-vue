import { createVNode } from './vnode'

export const h = (type, props?, children?) => {
  createVNode(type, props, children)
}
