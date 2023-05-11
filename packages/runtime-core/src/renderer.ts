/* eslint-disable no-console */
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
    remove: hostRemove,
  } = options

  function render(vnode, container) {
    patch(null, vnode, container, null, null)
  }

  // n1: previous vnode
  // n2: current vnode
  function patch(n1, n2, container, anchor, parentComponent) {
    switch (n2.type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent, anchor)
        break
      case Text:
        processText(n1, n2, container, anchor)
        break

      default:
      // Do different processing according to different types
      // Dom element, Vue component, text, fragment, etc.
      // if vnode is a Component (type), go into it
        if (n2.shapeFlag & ShapeFlags.STATEFUL_COMPONENT)
          processComponent(n1, n2, container, parentComponent, anchor)
        // process element dom
        if (n2.shapeFlag & ShapeFlags.ELEMENT)
          processElement(n1, n2, container, parentComponent, anchor)
        // TODO: process text...
        break
    }
  }

  function processText(n1, n2, container, anchor) {
    const el = (n2.el = hostCreateTextNode(n2.children))
    hostInsert(el, container, anchor)
  }

  function processFragment(n1, n2: any, container: any, parentComponent, anchor) {
    mountChildren(n2, container, parentComponent, anchor)
  }

  function processElement(n1, n2: any, container: any, parentComponent, anchor) {
    if (!n1)
      mountElement(n2, parentComponent, container, anchor)
    else
      patchElement(n1, n2, parentComponent, anchor)
  }

  function patchElement(n1, n2, parentComponent, anchor) {
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    n2.el = n1.el
    patchProps(n2.el, oldProps, newProps)
    patchChildren(n1, n2, n2.el, parentComponent, anchor)
  }

  function patchChildren(n1, n2, container, parentComponent, anchor) {
    const { shapeFlag: oldShapeFlag, children: c1 } = n1
    const { shapeFlag, children: c2 } = n2
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // change array children to text children
      if (oldShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // remove old children
        unmountChildren(c1)
      }

      // change text children to text children (content changed)
      if (c1 !== c2) {
        // set new text children
        hostSetElementText(container, c2)
      }
    }
    else {
      // change text children to array children
      if (oldShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // empty the old text
        hostSetElementText(container, '')
        mountChildren(n2, container, parentComponent, anchor)
      }
      else {
        // change array children to array children
        patchKeyedChildren(c1, c2, container, parentComponent, anchor)
      }
    }
  }

  function patchKeyedChildren(c1, c2, container, parentcomponent, parentAnchor) {
    let i = 0
    const l2 = c2.length
    let e1 = c1.length - 1
    let e2 = l2 - 1
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameNodeType(n1, n2))
        patch(n1, n2, container, parentAnchor, parentcomponent)
      else
        break
      i++
    }
    console.log('now i is:', i)
    while (e1 >= i && e2 >= i) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameNodeType(n1, n2))
        patch(n1, n2, container, parentAnchor, parentcomponent)
      else
        break
      e1--
      e2--
    }
    console.log('now e1 is:', e1)
    console.log('now e2 is:', e2)
    if (i > e1 && i <= e2) {
      // new array children is longer than the old's
      const nextPos = e2 + 1
      const anchor = nextPos > l2 - 1 ? null : c2[nextPos].el
      while (i <= e2) {
        patch(null, c2[i], container, anchor, parentcomponent)
        i++
      }
    }
    else if (i > e2) {
      console.log('??')
      while (i <= e1) {
        hostRemove(c1[i].el)
        i++
      }
    }
  }

  function isSameNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key
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

  function mountElement(vnode: any, parentComponent: any, container: any, anchor) {
    const { type, props, children } = vnode
    const el = (vnode.el = hostCreateElement(type as string))

    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN)
      hostSetElementText(el, children)

    else
      mountChildren(vnode, el, parentComponent, anchor)

    for (const key in props) {
      const val = props[key]
      hostPatchProp(el, key, null, val)
    }

    hostInsert(el, container, anchor)
  }

  function unmountChildren(children) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el
      hostRemove(el)
    }
  }

  function mountChildren(vnode, container, parentComponent, anchor) {
    vnode.children?.forEach((v) => {
      patch(null, v, container, anchor, parentComponent)
    })
  }

  function processComponent(n1, n2: any, container: any, parentComponent, anchor) {
    mountComponent(n2, container, parentComponent, anchor)
  }

  function mountComponent(initialVnode: any, container: any, parentComponent, anchor) {
    // create component instance
    const instance = createComponentInstance(initialVnode, parentComponent)
    // setup component: props, slots, render, etc...
    setupComponent(instance)

    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers) as any

    // setup render effect
    setupRenderEffect(instance, initialVnode, container, anchor)
  }

  function setupRenderEffect(instance, initialVnode, container, anchor) {
    effect(() => {
      if (!instance.isMounted) {
        // get virtual node tree
        const subTree = instance.subTree = instance.render.call(instance.proxy)
        // recur to patch instance inner vnode tree
        patch(null, subTree, container, anchor, instance)
        initialVnode.el = subTree.el
        instance.isMounted = true
      }
      else {
        console.log('updated')
        const prevSubTree = instance.subTree
        const subTree = instance.subTree = instance.render.call(instance.proxy)
        patch(prevSubTree, subTree, container, anchor, instance)
        initialVnode.el = subTree.el
      }
    })
  }

  return {
    createApp: createAppAPI(render),
  }
}
