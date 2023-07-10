import { NodeTypes, createVNodeCall } from '../ast'

export const transformElement = (node, context) => {
  if (node.type !== NodeTypes.ELEMENT)
    return
  return () => {
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

    node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren)
  }
}
