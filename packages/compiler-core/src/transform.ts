export function transform(root, options: Record<any, any> = {}) {
  const context = createTransformContext(root, options)
  traverseNode(root, context)
  createRootCodegen(root)
}

function traverseNode(node, context) {
  const { nodeTransforms } = context
  if (nodeTransforms) {
    for (let i = 0; i < nodeTransforms.length; i++)
      nodeTransforms[i](node)
  }
  if (!node.children)
    return
  for (let i = 0; i < node.children.length; i++)
    traverseNode(node.children[i], context)
}

function createTransformContext(root: any, options: Record<any, any>) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms,
  }
  return context
}

function createRootCodegen(root: any) {
  root.codegenNode = root.children[0]
}
