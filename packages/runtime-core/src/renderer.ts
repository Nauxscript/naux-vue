import { ShapeFlags } from '@naux-vue/shared'
import { effect } from './../../reactivity/src/effect'
import { createAppAPI } from './createApp'
import { PublicInstanceProxyHandlers } from './componentPublicInstances'
import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    createTextNode: hostCreateTextNode,
    setElementText: hostSetElementText,
  } = options

  function render(vnode, container) {
    patch(vnode, container, null)
  }

  function patch(vnode, container, parentComponent) {
    switch (vnode.type) {
      case Fragment:
        processFragment(vnode, container, parentComponent)
        break
      case Text:
        processText(vnode, container)
        break

      default:
      // Do different processing according to different types
      // Dom element, Vue component, text, fragment, etc.
      // if vnode is a Component (type), go into it
        if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT)
          processComponent(vnode, container, parentComponent)
        // process element dom
        if (vnode.shapeFlag & ShapeFlags.ELEMENT)
          processElement(vnode, container, parentComponent)
        // TODO: process text...
        break
    }
  }

  function processText(vnode, container) {
    const el = (vnode.el = hostCreateTextNode(vnode.children))
    hostInsert(el, container)
  }

  function processFragment(vnode: any, container: any, parentComponent) {
    mountChildren(vnode, container, parentComponent)
  }

  function processElement(vnode: any, container: any, parentComponent) {
    const { type, props, children } = vnode
    const el = (vnode.el = hostCreateElement(type as string))

    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN)
      hostSetElementText(el, children)

    else
      mountChildren(vnode, el, parentComponent)

    for (const key in props) {
      const val = props[key]
      hostPatchProp(el, key, val)
    }

    hostInsert(el, container)
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children?.forEach((v) => {
      patch(v, container, parentComponent)
    })
  }

  function processComponent(vnode: any, container: any, parentComponent) {
    mountComponent(vnode, container, parentComponent)
  }

  function mountComponent(initialVnode: any, container: any, parentComponent) {
    // create component instance
    const instance = createComponentInstance(initialVnode, parentComponent)
    // setup component: props, slots, render, etc...
    setupComponent(instance)

    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers) as any

    // setup render effect
    setupRenderEffect(instance, initialVnode, container)
  }

  function setupRenderEffect(instance, initialVnode, container) {
    effect(() => {
      if (!instance.isMounted) {
        // get virtual node tree
        const subTree = instance.render.call(instance.proxy)
        // recur to patch instance inner vnode tree
        patch(subTree, container, instance)
        initialVnode.el = subTree.el
        instance.isMounted = true
      }
      else {
        // eslint-disable-next-line no-console
        console.log('updated')
      }
    })
  }

  return {
    createApp: createAppAPI(render),
  }
}
