export function generate(root) {
  const content = root.codegenNode.content
  const params = ['_ctx', '_cache']
  const code = `function render(${params.join(',')}) {
    return "${content}"
  }`

  return {
    code,
  }
}
