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

  test('effect should return a runner function when be called', () => {
    let foo = 1
    const runner = effect(() => {
      foo++
      return 'called'
    })
    expect(foo).toBe(2)
    const runnerRes = runner()
    expect(foo).toBe(3)
    expect(runnerRes).toBe('called')
  })
})
