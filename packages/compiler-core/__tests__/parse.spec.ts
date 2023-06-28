import { describe, expect, it } from 'vitest'
import { baseParse } from '../src/parse'
import { NodeTypes } from '../src/ast'
describe('parse', () => {
  describe('parse text', () => {
    it('simple text', () => {
      const template = 'simple text'
      const ast = baseParse(template)
      const textObj = ast.children[0]
      expect(textObj).toStrictEqual({
        type: NodeTypes.TEXT,
        content: template,
      })
    })
    it('interpolation', () => {
      const template = '{{ message }}'
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

  describe('parse element', () => {
    it('simple element', () => {
      const template = '<div></div>'
      const ast = baseParse(template)
      const interpolation = ast.children[0]
      expect(interpolation).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div',
      })
    })
  })
})
