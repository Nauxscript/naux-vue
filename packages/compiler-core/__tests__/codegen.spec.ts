import { describe, it } from 'vitest'
import { transform } from '../src/transform'
import { generate } from '../src/codegen'
import { transformElement } from './../src/transforms/transformElement'
import { transformExpression } from './../src/transforms/transformExpression'
import { baseParse } from './../src/parse'
describe('codegen', () => {
  it('basic string', () => {
    const ast = baseParse('hello, naux')
    transform(ast)
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })

  it('interpolation', () => {
    const ast = baseParse('{{message}}')
    transform(ast, {
      nodeTransforms: [transformExpression],
    })
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })

  it('element', () => {
    const ast = baseParse('<div>hi naux</div>')
    transform(ast, {
      nodeTransforms: [transformElement],
    })
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })
})
