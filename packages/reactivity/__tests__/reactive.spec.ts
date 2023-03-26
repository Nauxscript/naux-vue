import { isProxy } from 'util/types'
import { describe, expect, test } from 'vitest'
import { isReactive, reactive } from '../src/reactive'

describe('reactive', () => {
  test('happy path', () => {
    const origin = { foo: 1 }
    const reactiveObj = reactive(origin)
    expect(origin).not.toBe(reactiveObj)
    expect(reactiveObj.foo).toBe(1)
  })
  test('isReactive / isProxy helper function', () => {
    const origin = { foo: 1 }
    const reactiveObj = reactive(origin)
    expect(isReactive(reactiveObj)).toBe(true)
    expect(isProxy(reactiveObj)).toBe(true)
    expect(isReactive(origin)).toBe(false)
    expect(isProxy(origin)).toBe(false)
  })

  test('nested reactives', () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
