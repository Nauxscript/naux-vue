import { describe, expect, test } from 'vitest'
import { baseParse } from '../src/parse'
import { NodeTypes } from '../src/ast'
describe('parse', () => {
  describe('parse text', () => {
    test('simple text', () => {
      const template = 'simple text'
      const ast = baseParse(template)
      const textObj = ast.children[0]
      expect(textObj).toStrictEqual({
        type: NodeTypes.TEXT,
        content: template,
      })
    })
    test('interpolation', () => {
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
    test('simple element', () => {
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
    test('complex template: <div>hello, {{message}}</div>', () => {
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

    test('complex template: nested html elements with interpolation', () => {
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

    test('complex template: nested html elements but without correct closed tag', () => {
      expect(() => {
        baseParse('<div><p></div>')
      }).toThrowError('missing closed tag: p')
    })
  })
})
