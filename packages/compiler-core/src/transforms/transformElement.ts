import { NodeTypes } from '../ast'
import { CREATE_ELEMENT_VNODE } from '../runtimeHelpers'

export const transformElement = (node, context) => {
  if (node.type !== NodeTypes.ELEMENT)
    return
  return () => {
    context.helper(CREATE_ELEMENT_VNODE)

    const { children } = node
    // transform tag
    const vnodeTag = `"${node.tag}"`
    // transform props
    const vnodeProps = null
    const len = children.length
    let vnodeChildren = null
    if (len > 0) {
      if (len === 1)
        vnodeChildren = children[0]
    }

    node.codegenNode = {
      type: NodeTypes.ELEMENT,
      props: vnodeProps,
      tag: vnodeTag,
      children: vnodeChildren,
    }
  }
}
