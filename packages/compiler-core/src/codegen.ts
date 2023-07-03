export function generate(root) {
  const content = root.children[0].content
  const code = `function render(_ctx, _cache) {
    return "${content}"
  }`

  return {
    code,
  }
}
