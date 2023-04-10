import { createVNode } from './../vnode'
export const renderSlots = (slots) => {
  return createVNode('div', {}, slots)
}
