import { describe, expect, test } from 'vitest'
import { isReactive, isReadonly, readonly, shallowReadonly } from '..'
describe('readonly tests', () => {
  test('readonly', () => {
    const origin = {
      foo: 1,
    }
    const obj = readonly(origin)
    expect(obj).not.toBe(origin)
    obj.foo++
    expect(obj.foo).toBe(1)
  })

  test('warning when readonly obj is being set', () => {
    console.warn = vi.fn()
    const obj = readonly({
      boo: 1,
    })
    obj.boo++
    expect(console.warn).toBeCalled()
  })

  test('isReadonly helper function', () => {
    const origin = {
      foo: 1,
    }
    const obj = readonly(origin)
    expect(isReadonly(obj)).toBe(true)
    expect(isReadonly(origin)).toBe(false)
  })

  test('nested reactives', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReactive(wrapped)).toBe(false)
    expect(isReadonly(wrapped.bar)).toBe(true)
  })

  test('basic shallowReadonly', () => {
    const original = { foo: {} }
    const shallowProxy = shallowReadonly(original)
    const reactiveProxy = readonly(original)
    expect(shallowProxy).not.toBe(reactiveProxy)
    expect(isReadonly(shallowProxy.foo)).toBe(false)
    expect(isReadonly(reactiveProxy.foo)).toBe(true)
  })
})
