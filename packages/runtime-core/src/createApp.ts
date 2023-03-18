import { render } from './renderer'
import { createVNode } from './vnode'

export const createApp = (rootComponent: Record<string | number | symbol, any>) => {
  return {
    mount(rootContainer) {
      // get the root component virtual node,
      // if root component has <template>, it will be convert to vnode by runtime-dom module
      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    },
  }
}
