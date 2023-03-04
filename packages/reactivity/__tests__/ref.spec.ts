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
})
