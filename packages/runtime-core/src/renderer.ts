import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  // Do different processing according to different types
  // Dom element, Vue component, text, fragment, etc.

  // if vnode is a Component (type), go into it
  processComponent(vnode, container)

  // TODO: process dom, process text...
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container: any) {
  // create component instance
  const instance = createComponentInstance(vnode)

  // setup component: props, slots, render, etc...
  setupComponent(instance)

  // setup render effect
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  // get virtual node tree
  const subTree = instance.render()

  // recur to patch instance inner vnode tree
  patch(subTree, container)
}
