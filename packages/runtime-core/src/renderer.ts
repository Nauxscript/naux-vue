import { EMPTY_OBJ, ShapeFlags } from '@naux-vue/shared'
import { effect } from '@naux-vue/reactivity/src/effect'
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
    patch(null, vnode, container, null)
  }

  // n1: previous vnode
  // n2: current vnode
  function patch(n1, n2, container, parentComponent) {
    switch (n2.type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break

      default:
      // Do different processing according to different types
      // Dom element, Vue component, text, fragment, etc.
      // if vnode is a Component (type), go into it
        if (n2.shapeFlag & ShapeFlags.STATEFUL_COMPONENT)
          processComponent(n1, n2, container, parentComponent)
        // process element dom
        if (n2.shapeFlag & ShapeFlags.ELEMENT)
          processElement(n1, n2, container, parentComponent)
        // TODO: process text...
        break
    }
  }

  function processText(n1, n2, container) {
    const el = (n2.el = hostCreateTextNode(n2.children))
    hostInsert(el, container)
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent)
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    if (!n1)
      mountElement(n2, parentComponent, container)
    else
      patchElement(n1, n2, container)
  }

  function patchElement(n1, n2, container) {
    // eslint-disable-next-line no-console
    console.log(n1, n2, container)
    // eslint-disable-next-line no-console
    console.log('patchElement')
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    n2.el = n1.el
    patchProps(n2.el, oldProps, newProps)
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevVal = oldProps[key]
        const nextVal = newProps[key]
        hostPatchProp(el, key, prevVal, nextVal)
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps))
            hostPatchProp(el, key, oldProps[key], null)
        }
      }
    }
  }

  function mountElement(vnode: any, parentComponent: any, container: any) {
    const { type, props, children } = vnode
    const el = (vnode.el = hostCreateElement(type as string))

    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN)
      hostSetElementText(el, children)

    else
      mountChildren(vnode, el, parentComponent)

    for (const key in props) {
      const val = props[key]
      hostPatchProp(el, key, null, val)
    }

    hostInsert(el, container)
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children?.forEach((v) => {
      patch(null, v, container, parentComponent)
    })
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {
    mountComponent(n2, container, parentComponent)
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
        const subTree = instance.subTree = instance.render.call(instance.proxy)
        // recur to patch instance inner vnode tree
        patch(null, subTree, container, instance)
        initialVnode.el = subTree.el
        instance.isMounted = true
      }
      else {
        // eslint-disable-next-line no-console
        console.log('updated')
        const prevSubTree = instance.subTree
        const subTree = instance.subTree = instance.render.call(instance.proxy)
        patch(prevSubTree, subTree, container, instance)
        initialVnode.el = subTree.el
      }
    })
  }

  return {
    createApp: createAppAPI(render),
  }
}
