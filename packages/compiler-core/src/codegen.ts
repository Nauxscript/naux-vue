export function generate(root) {
  const content = root.codegenNode.content
  const functionName = 'render'
  const signtures = ['_ctx', '_cache']
  const code = `function ${functionName}(${signtures.join(',')}) {
    return "${content}"
  }`

  return {
    code,
  }
}
