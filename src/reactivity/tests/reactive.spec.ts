import { reactive, isReactive, isProxy } from '../reactive'
describe('reactive', () => {
  test("happy path", () => {
    const origin = {
      a: 123
    }
    const observe = reactive(origin)
    expect(observe).not.toBe(origin)
    expect(observe.a).toBe(123)
    expect(isReactive(observe)).toBe(true)
    expect(isReactive(origin)).toBe(false)
    expect(isProxy(origin)).toBe(false)
    expect(isProxy(observe)).toBe(true)
  })
  
  test("nested reactive", () => {
    const nestedOriginal = {
      nested: {
        foo: 1
      },
      array: [{
        bar: 2
      }]
    }
    const nestedObserve = reactive(nestedOriginal)
    expect(isReactive(nestedObserve)).toBe(true)
    expect(isReactive(nestedObserve.nested)).toBe(true)
    expect(isReactive(nestedObserve.array)).toBe(true)
    expect(isReactive(nestedObserve.array[0])).toBe(true)

  })
})