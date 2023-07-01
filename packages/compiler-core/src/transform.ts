import { NodeTypes } from './ast'

export function transform(root) {
  // eslint-disable-next-line no-console
  console.log(root)
  const { children } = root
  if (root.type === NodeTypes.TEXT)
    root.content = `${root.content}naux`

  if (!children)
    return
  for (let i = 0; i < children.length; i++)
    transform(children[i])
}
