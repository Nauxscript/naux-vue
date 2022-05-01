import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // patch fn can recursive handle the vnode tree
  patch(vnode, container)
}

function patch(vnode, container) {
  // judge if the type of vnode is [element], if so, should be call mount fn
  processComponent(vnode, container)
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render()

  // subTree is vnode, so its should be keep calling the patch fn
  // here the vnode is actually a [element] type
  // so when the virtual node become element，they thould been mount
  // vnode => element => mountElement

  patch(subTree, container)
}
