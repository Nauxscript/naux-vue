import { readonly, isProxy, isReadonly } from "../reactive"

describe('readonly', () => {
  test('the nested value should be readonly', () => {
    const origin = {
      foo: 1,
      bar: {
        baz: 2
      }
    }
    const wrapped = readonly(origin)
    expect(wrapped).not.toBe(origin)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(origin)).toBe(false)
    expect(isReadonly(origin.bar)).toBe(false)
    expect(isProxy(wrapped)).toBe(true)
    expect(wrapped.foo).toBe(1)
  })

  test('warning when call the readonly object setter', () => {
    console.warn = vi.fn()
    const user = readonly({
      age: 1,
      nested: {
        score: 11
      }
    })
    expect(user.age).toBe(1)
    user.age++
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(user.age).toBe(1)
    user.nested.score++
    expect(console.warn).toHaveBeenCalledTimes(2)
    expect(user.nested.score).toBe(11)
  })
})