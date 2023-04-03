import { isObject } from '@naux-vue/shared'
import { PublicInstanceProxyHandlers } from './componentPublicInstances'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  // Do different processing according to different types
  // Dom element, Vue component, text, fragment, etc.
  // if vnode is a Component (type), go into it
  if (isObject(vnode.type))
    processComponent(vnode, container)
  // process element dom
  if (typeof vnode.type === 'string')
    processElement(vnode, container)
  // TODO: process text...
}

function processElement(vnode: any, container: any) {
  // eslint-disable-next-line no-console
  console.log(vnode)

  const { type, props, children } = vnode
  const el = (vnode.el = document.createElement(type as string))
  for (const key in props)
    el.setAttribute(key, props[key])

  if (typeof children === 'string') {
    el.innerText = children
  }
  else {
    children.forEach((v) => {
      patch(v, el)
    })
  }
  container.append(el)
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
