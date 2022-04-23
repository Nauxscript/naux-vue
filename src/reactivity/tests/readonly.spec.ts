import { isReadonly, readonly } from "../reactive"

describe('readonly', () => {
  it('the nested value should be readonly', () => {
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
    expect(wrapped.foo).toBe(1)
  })

  it('warning when call the readonly object setter', () => {
    console.warn = vi.fn()
    const user = readonly({
      age: 1,
      nested: {
        score: 11
      }
    })
    expect(user.age).toBe(1)
    user.age++
    expect(console.warn).toBeCalled()
    expect(user.age).toBe(1)
    user.nested.score++
    expect(console.warn).toBeCalled()
    expect(user.nested.score).toBe(11)
  })
})