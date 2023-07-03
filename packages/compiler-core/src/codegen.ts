export function generate(root) {
  const content = root.children[0].content
  const params = ['_ctx', '_cache']
  const code = `function render(${params.join(',')}) {
    return "${content}"
  }`

  return {
    code,
  }
}
