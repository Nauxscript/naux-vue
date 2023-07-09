import { NodeTypes } from './ast'
import { TO_DISPLAY_STRING } from './runtimeHelpers'

export function transform(root, options: Record<any, any> = {}) {
  const context = createTransformContext(root, options)
  traverseNode(root, context)
  createRootCodegen(root)
  createRootHelpler(root, context)
}

function traverseNode(node, context) {
  const { nodeTransforms } = context
  if (nodeTransforms) {
    for (let i = 0; i < nodeTransforms.length; i++)
      nodeTransforms[i](node)
  }
  switch (node.type) {
    case NodeTypes.ROOT:
    case NodeTypes.ELEMENT:
      traverseChildren(node, context)
      break
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING)
      break
    default:
      break
  }
}

function traverseChildren(node: any, context: any) {
  for (let i = 0; i < node.children.length; i++)
    traverseNode(node.children[i], context)
}

function createTransformContext(root: any, options: Record<any, any>) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms,
    helpers: new Map(),
    helper(name: string) {
      context.helpers.set(name, 1)
    },
  }
  return context
}

function createRootCodegen(root: any) {
  root.codegenNode = root.children[0]
}

function createRootHelpler(root: any, context) {
  root.helpers.push(...context.helpers.keys())
}
