import { describe, it } from 'vitest'
import { transform } from '../src/transform'
import { generate } from '../src/codegen'
import { baseParse } from './../src/parse'
describe('codegen', () => {
  it('basic string', () => {
    const ast = baseParse('hello, nau')
    transform(ast)
    const { code } = generate(ast)
    expect(code).toMatchSnapshot()
  })
})
