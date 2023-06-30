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
        children: [],
      })
    })
  })

  describe('complex template: html element with text and interpolation', () => {
    it('complex template: <div>hello, {{message}}</div>', () => {
      const template = '<div>hello, {{message}}</div>'
      const ast = baseParse(template)
      const interpolation = ast.children[0]
      expect(interpolation).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div',
        children: [
          {
            type: NodeTypes.TEXT,
            content: 'hello, ',
          },
          {
            type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
              content: 'message',
            },
          },
        ],
      })
    })

    it.only('complex template: nested html elements with interpolation', () => {
      const template = '<div><p>hello, </p>{{message}}</div>'
      const ast = baseParse(template)
      const interpolation = ast.children[0]
      expect(interpolation).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div',
        children: [
          {
            type: NodeTypes.ELEMENT,
            tag: 'p',
            children: [{
              type: NodeTypes.TEXT,
              content: 'hello, ',
            }],
          },
          {
            type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
              content: 'message',
            },
          },
        ],
      })
    })
  })
})
