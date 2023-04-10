import { createVNode } from './../vnode'
export const renderSlots = (slots) => {
  slots = Array.isArray(slots) ? slots : [slots]
  return createVNode('div', {}, slots)
}
