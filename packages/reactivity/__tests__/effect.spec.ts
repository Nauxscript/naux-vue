import { describe, expect, test, vi } from 'vitest'
import { effect, stop } from '../src/effect'
import { reactive } from '../src/reactive'

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

  test('scheduler', () => {
    let dummy
    let run: any
    const scheduler = vi.fn(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler },
    )
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    // should be called on first trigger
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    // // should not run yet
    expect(dummy).toBe(1)
    // // manually run
    run()
    // // should have run
    expect(dummy).toBe(2)
  })

  test('stop', () => {
    let woo
    const obj = reactive({
      foo: 1,
    })

    const runner = effect(() => {
      woo = obj.foo
    })
    obj.foo = 2
    expect(woo).toBe(2)
    stop(runner)
    obj.foo++
    expect(woo).toBe(2)
    runner()
    expect(woo).toBe(3)

    // stop again, effect should be stopped
    stop(runner)
    obj.foo = 4
    expect(woo).toBe(3)
  })

  test('onStop', () => {
    let woo
    const obj = reactive({
      foo: 1,
    })

    const onStop = vi.fn(() => {})

    const runner = effect(() => {
      woo = obj.foo
    }, {
      onStop,
    })
    expect(woo).toBe(1)
    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})
