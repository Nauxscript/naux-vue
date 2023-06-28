import { describe, expect, it } from 'vitest'
import { baseParse } from '../src/parse'
describe('parse', () => {
    it('interpolation', () => {
      const template = '{{message}}'
      const ast = baseParse(template)
      const interpolation = ast.children[0]
      expect(interpolation).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: 'message',
        },
      })
    })
  })
})
