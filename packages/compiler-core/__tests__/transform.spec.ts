import { describe } from 'vitest'
import { transform } from '../src/transform'
import { baseParse } from './../src/parse'
describe('transform', () => {
  it('happy path', () => {
    const ast = baseParse('<div>hello, {{message}}</div>')
    transform(ast)
    const textNode = ast.children[0].children[0]
    expect(textNode.content).toBe('hello, naux')
  })
})
