import { describe, expect, test } from 'vitest'
import { transform } from '../src/transform'
import { generate } from '../src/codegen'
import { transformText } from '../src/transforms/transformText'
import { transformElement } from './../src/transforms/transformElement'
import { transformExpression } from './../src/transforms/transformExpression'
import { baseParse } from './../src/parse'
describe('codegen', () => {
  test('basic string', () => {
    const ast = baseParse('hello, naux')
    transform(ast)
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })

  test('interpolation', () => {
    const ast = baseParse('{{message}}')
    transform(ast, {
      nodeTransforms: [transformExpression],
    })
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })

  test('element', () => {
    const ast = baseParse('<div>hi naux</div>')
    transform(ast, {
      nodeTransforms: [transformElement],
    })
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })

  test('element and interpolation', () => {
    const ast: any = baseParse('<div>hi,{{msg}}</div>')
    transform(ast, {
      nodeTransforms: [transformElement, transformText, transformExpression],
    })
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })
})
