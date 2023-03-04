import { describe, expect, test } from 'vitest'
// import { isProxy, isReactive, reactive } from '../'
import { effect, ref } from '../'

describe('ref', () => {
  test('happy path', () => {
    const val = ref(1)
    expect(val.value).toBe(1)
  })

  test('should be reactive', () => {
    const val = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = val.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    val.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
    // same value should not trigger
    // val.value = 2
    // expect(calls).toBe(2)
    // expect(dummy).toBe(2)
  })

  test.skip('should make nested properties reactive', () => {
    const a = ref({
      count: 1,
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })

  test.skip('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'xiaohong',
    }
    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('xiaohong');

    (proxyUser as any).age = 20
    expect(proxyUser.age).toBe(20)
    expect(user.age.value).toBe(20)

    proxyUser.age = ref(10)
    expect(proxyUser.age).toBe(10)
    expect(user.age.value).toBe(10)
  })
})
