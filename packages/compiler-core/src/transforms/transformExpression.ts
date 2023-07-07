import { NodeTypes } from './../ast'
export const transformExpression = (node) => {
  if (node.type !== NodeTypes.INTERPOLATION)
    return
  node.content = processExpression(node.content)
}

function processExpression(node: any): any {
  node.content = `_ctx.${node.content}`
  return node
}
