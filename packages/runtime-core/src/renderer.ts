import { ShapeFlags } from '@naux-vue/shared'
import { PublicInstanceProxyHandlers } from './componentPublicInstances'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  // Do different processing according to different types
  // Dom element, Vue component, text, fragment, etc.
  // if vnode is a Component (type), go into it
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT)
    processComponent(vnode, container)
  // process element dom
  if (vnode.shapeFlag & ShapeFlags.ELEMENT)
    processElement(vnode, container)
  // TODO: process text...
}

function processElement(vnode: any, container: any) {
  const { type, props, children } = vnode
  const el = (vnode.el = document.createElement(type as string))
  for (const key in props) {
    if (key.match(/^on[A-Z]/)) {
      const eventName = key.slice(2).toLowerCase()
      el.addEventListener(eventName, props[key])
    }
    else { el.setAttribute(key, props[key]) }
  }

  if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN)
    el.innerText = children

  else
    mountChildren(vnode, el)

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container)
  })
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(initialVnode: any, container: any) {
  // create component instance
  const instance = createComponentInstance(initialVnode)
  // setup component: props, slots, render, etc...
  setupComponent(instance)

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers) as any

  // setup render effect
  setupRenderEffect(instance, initialVnode, container)
}

function setupRenderEffect(instance, initialVnode, container) {
  // get virtual node tree
  const subTree = instance.render.call(instance.proxy)
  // recur to patch instance inner vnode tree
  patch(subTree, container)
  initialVnode.el = subTree.el
}
