import { isObject } from '@naux-vue/shared'
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
  const el = document.createElement(type as string)
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

function mountComponent(vnode: any, container: any) {
  // create component instance
  const instance = createComponentInstance(vnode)

  // setup component: props, slots, render, etc...
  setupComponent(instance)

  const proxy = new Proxy({}, {
    get(target, key) {
      if (key in instance.setupState)
        return instance.setupState[key]
    },
  })

  // setup render effect
  setupRenderEffect(instance, proxy, container)
}

function setupRenderEffect(instance, proxy, container) {
  // get virtual node tree
  const subTree = instance.render.call(proxy)
  // recur to patch instance inner vnode tree
  patch(subTree, container)
}
