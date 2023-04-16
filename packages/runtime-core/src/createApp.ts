import { createVNode } from './vnode'

export const createAppAPI = (render) => {
  return function (rootComponent: Record<string | number | symbol, any>) {
    return {
      mount(rootContainer) {
      // get the root component virtual node,
      // if root component has <template>, it will be convert to vnode by runtime-dom module
        const vnode = createVNode(rootComponent)
        render(vnode, rootContainer)
      },
    }
  }
}
