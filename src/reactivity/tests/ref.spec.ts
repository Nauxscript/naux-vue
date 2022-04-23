import { effect } from '../effect'
import { reactive } from '../reactive'
import { isRef, proxyRefs, ref, unRef } from '../ref'
describe('ref', () => {
  test('happy path', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })

  test('should be reactive', () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = a.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
    // effect should be not trigger when setting same value
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
  })

  test('should make nested properties reactive', () => {
    const a = ref({
      count: 1
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })

  test('isRef utility function', () => {
    const a = ref(1)
    const b = reactive({
      foo: 1
    })
    const c = ref({
      a: 1
    })
    expect(isRef(1)).toBe(false)
    expect(isRef(a)).toBe(true)
    expect(isRef(b)).toBe(false)
    expect(isRef(c)).toBe(true)
    
  })

  test('unRef utility function', () => {
    const a = ref(1)
    expect(unRef(1)).toBe(1)
    expect(unRef(a)).toBe(1)
  })

  test('proxyRefs utility function', () => {
    const user = {
      age: ref(10),
      name: 'naux'
    }
    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('naux')

    proxyUser.age = 20
    expect(user.age.value).toBe(20)
    expect(proxyUser.age).toBe(20)
    
    proxyUser.age = ref(10)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
  })
})