/* eslint-disable no-console */
import { EMPTY_OBJ, ShapeFlags } from '@naux-vue/shared'
import { effect } from '@naux-vue/reactivity/src/effect'
import { createAppAPI } from './createApp'
import { PublicInstanceProxyHandlers } from './componentPublicInstances'
import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'
import { getLongestInsreasingSubsequence } from './helpers/getSequence'
import { shouldUpdateComponent } from './helpers/componenUpdateUtils'

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
      while (i <= e1) {
        hostRemove(c1[i].el)
        i++
      }
    }
    else {
      // handle with the most complicated case:
      // after diff both ends, can find the shortest changed children,
      // and should patch the changed children, remove the deleted children and add the new's
      const s1 = i
      const s2 = i

      // if all the items of the new changed children have been patched,
      // the rest of old children should be remove
      // eg: A B C D E F G => A B D C F G
      const toBePatched = e2 - s2 + 1
      let patchedTime = 0

      // setup a key map of the changed part of new children
      const newChildKey2IndexMap = new Map()

      // initialize a array to store the index of new children item in the old children array
      const newIndex2OldIndexMap = new Array(toBePatched)
      for (let i = 0; i < toBePatched; i++) newIndex2OldIndexMap[i] = 0

      let currMaxNewIndex = 0
      let hasNodeToBeMoved = false

      for (let i = s2; i <= e2; i++)
        newChildKey2IndexMap.set(c2[i].key, i)

      for (let i = s1; i <= e1; i++) {
        const prevNode = c1[i]

        if (patchedTime >= toBePatched) {
          hostRemove(prevNode.el)
          continue
        }

        let index
        if (prevNode.key != null) {
          index = newChildKey2IndexMap.get(prevNode.key)
        }
        else {
          for (let j = s2; j <= e2; j++) {
            if (isSameNodeType(prevNode, c2[j])) {
              index = j
              break
            }
          }
        }

        if (index !== undefined) {
          patch(prevNode, c2[index], container, null, parentcomponent)
          patchedTime++
          if (index >= currMaxNewIndex)
            currMaxNewIndex = index

          else
            hasNodeToBeMoved = true

          // item of newIndex2OldIndexMap shouldn't be 0, cause' 0 is the initial state.
          newIndex2OldIndexMap[index - s2] = i + 1
        }
        else {
          hostRemove(prevNode.el)
        }
      }

      const longestSubsequence = hasNodeToBeMoved ? getLongestInsreasingSubsequence(newIndex2OldIndexMap) : []
      console.log(longestSubsequence)
      let sequenceIndex = longestSubsequence.length - 1
      // insert the moved item by reversed loop
      for (let i = toBePatched - 1; i >= 0; i--) {
        // the real index of the item in e2
        const currIndex = s2 + i
        const anchor = currIndex + 1 < l2 ? c2[currIndex + 1].el : null
        const currNode = c2[currIndex]
        if (newIndex2OldIndexMap[i] === 0) {
          patch(null, currNode, container, anchor, parentcomponent)
        }
        else if (hasNodeToBeMoved) {
          if (sequenceIndex < 0 || i !== longestSubsequence[sequenceIndex]) {
            hostInsert(currNode.el, container, anchor)
            console.log('anchor node:', anchor)
            console.log('move:', currNode)
          }
          else {
            console.log('stay:', currNode)
            patch(c1[newIndex2OldIndexMap[i] - 1], currNode, container, anchor, parentcomponent)
            sequenceIndex--
          }
        }
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
    if (!n1)
      mountComponent(n2, container, parentComponent, anchor)
    else
      updateComponent(n1, n2)
  }

  function updateComponent(n1, n2) {
    const instance = (n2.component = n1.component)
    if (shouldUpdateComponent(n1, n2)) {
      instance.next = n2
      instance.props = n2.props
      instance.update()
    }
    else {
      n2.el = n1.el
      instance.vnode = n2
    }
  }

  function mountComponent(initialVnode: any, container: any, parentComponent, anchor) {
    // create component instance
    const instance = (initialVnode.component = createComponentInstance(initialVnode, parentComponent))
    // setup component: props, slots, render, etc...
    setupComponent(instance)

    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers) as any

    // setup render effect
    setupRenderEffect(instance, initialVnode, container, anchor)
  }

  function setupRenderEffect(instance, initialVnode, container, anchor) {
    instance.update = effect(() => {
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
        const { next, vnode } = instance

        if (next) {
          next.el = vnode.el
          updateComponentPreRender(instance, next)
        }

        const prevSubTree = instance.subTree
        const subTree = instance.subTree = instance.render.call(instance.proxy)
        patch(prevSubTree, subTree, container, anchor, instance)
        initialVnode.el = subTree.el
      }
    })
  }

  function updateComponentPreRender(instance: any, nextVNode: any) {
    instance.vnode = nextVNode
    instance.next = null
    instance.props = nextVNode.props
  }
  return {
    createApp: createAppAPI(render),
  }
}
