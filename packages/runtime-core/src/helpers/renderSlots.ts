import { Fragment, createVNode } from './../vnode'
export const renderSlots = (slots, name: string, scope) => {
  const slot = slots[name]
  if (slot && typeof slot === 'function')
    return createVNode(Fragment, {}, slot(scope))
}
