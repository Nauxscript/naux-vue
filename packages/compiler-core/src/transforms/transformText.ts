import { NodeTypes } from '../ast'

export const transformText = (node) => {
  if (node.type !== NodeTypes.ELEMENT)
    return
  return () => {
    const { children } = node

    let currCompound

    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (isText(child)) {
        for (let j = i + 1; j < children.length; j++) {
          const next = children[j]
          if (isText(next)) {
            if (!currCompound) {
              currCompound = children[i] = {
                type: NodeTypes.COMPOUND_EXPRESSION,
                children: [child],
              }
            }
            currCompound.children.push(' + ', next)
            children.splice(j, 1)
            j--
          }
        }
      }
      else {
        currCompound = undefined
        break
      }
    }
  }
}

function isText(node) {
  return node.type === NodeTypes.INTERPOLATION || node.type === NodeTypes.TEXT
}
