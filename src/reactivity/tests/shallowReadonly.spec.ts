// 浅只读 对象
// 只有第一层的数据是只读的，深层的数据依然是响应式的

import { isReadonly, shallowReadonly } from "../reactive"

describe('shallow readonly function', () => {
  test('should not make ', () => {
    const props = shallowReadonly({
      n: {
        foo: 1
      }
    })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })
  test('warning when call the shallowReadonly object setter', () => {
    console.warn = vi.fn()
    const user = shallowReadonly({
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
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(user.nested.score).toBe(12)
  })
})