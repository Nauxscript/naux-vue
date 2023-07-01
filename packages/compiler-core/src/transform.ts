export function transform(root, options: Record<any, any> = {}) {
  const { nodeTransforms } = options
  if (nodeTransforms) {
    for (let i = 0; i < nodeTransforms.length; i++)
      nodeTransforms[i](root)
  }
  traverseNode(root, options)
}

function traverseNode(node, options) {
  if (!node.children)
    return
  for (let i = 0; i < node.children.length; i++)
    transform(node.children[i], options)
}
