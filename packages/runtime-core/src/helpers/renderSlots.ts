import { createVNode } from './../vnode'
export const renderSlots = (slots, name: string) => {
  return createVNode('div', {}, slots[name])
}
