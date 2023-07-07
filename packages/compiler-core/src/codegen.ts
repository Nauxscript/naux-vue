export function generate(ast) {
  const context = createCodegenContext()
  const { push } = context
  const functionName = 'render'
  const signtures = ['_ctx', '_cache']


  push('export ')
  push(`function ${functionName}`)
  push(`(${signtures.join(',')}){`)
  push('return ')
  genNode(ast.codegenNode, context)
  push('}')

  return {
    code: context.code,
  }
}

function createCodegenContext() {
  const context = {
    code: '',
    push(source) {
      context.code += source
    },
  }
  return context
}

function genNode(ast: any, context) {
function genNode(node: any, context) {
  switch (node.type) {
      genText(context, node)
  const { push } = context
  const node = ast.codegenNode.content
  push(`return '${node}'`)
  push(`'${node.content}'`)
}
