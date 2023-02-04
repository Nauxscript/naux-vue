import { describe, expect, test } from 'vitest'
import { isReadonly, readonly } from '..'
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
})
