import { describe } from 'vitest'
import { transform } from '../src/transform'
import { NodeTypes } from '../src/ast'
import { baseParse } from './../src/parse'
describe('transform', () => {
  it('happy path', () => {
    const ast = baseParse('<div>hello, {{message}}</div>')
    const plugin = (node) => {
      if (node.type === NodeTypes.TEXT)
        node.content = `${node.content}naux`
    }
    transform(ast, {
      nodeTransforms: [plugin],
    })
    const textNode = ast.children[0].children[0]
    expect(textNode.content).toBe('hello, naux')
  })
})
