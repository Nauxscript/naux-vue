import { render } from "./renderer"
import { createVNode } from "./vnode"

export function createApp(rootComponent) {
  
  return {
    mount(rootContainer) {
      // parse everything to virtual node (vnode) 
      // component => vnode
      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    }
  }
}
