import { describe, expect, test } from 'vitest'
import { effect, reactive } from '../'

describe('effect', () => {
  test('happy path', () => {
    const target = reactive({
      foo: 1,
    })
    let bar
    effect(() => {
      bar = target.foo + 1
    })
    expect(bar).toBe(2)

    target.foo++
    expect(bar).toBe(3)
  })
})
