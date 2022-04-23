import { reactive } from '../reactive'
import { effect, stop } from '../effect'
describe('effect', () => {
  test('happy path', () => {
    const user = reactive({
      age: 10
    })
    let nextAge;
    effect(() => {
      nextAge = user.age + 1
    })
    
    // update age => trigger effect => update nextAge
    expect(nextAge).toBe(11)
    user.age++
    expect(nextAge).toBe(12)
  })

  test('return a runner function when effect been call', () => {
    let foo = 5
    const runner = effect(() => {
      foo++
      return 'foo'
    })
    expect(foo).toBe(6)
    expect(runner).toBeTypeOf('function')
    const res = runner()
    expect(res).toBe('foo')
  })

  test('scheduler', () => {
    // 1. effect 可以 传入第二个对象参数（object）（第一个参数为 fn），该对象参数种有一个叫 scheduler 的 function
    // 2. effect 第一次执行的时候，会执行 fn，而不执行 shceduler 
    // 3. 当 effect 中依赖的响应式对象发生 update 行为（set）时，不会执行 fn，而是执行 scheduler
    // 4. 当执行 effect 一开始返回的 runner 时，会再次执行 fn
    let run
    let dummy
    const obj = reactive({
      foo: 1
    })
    const scheduler = vi.fn(() => {
      run = runner
    })
    // -- 1
    const runner = effect(() => {
      dummy = obj.foo
    }, { scheduler })
    // -- 2
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)

    // -- 3
    obj.foo++
    expect(scheduler).toHaveBeenCalled()

    // -- 4
    run()
    expect(dummy).toBe(2)
  })

  test('stop', () => {
    let dummy
    const obj = reactive({
      prop: 1
    })
    const runner = effect(() => {
      dummy = obj.prop
    })
    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    obj.prop++
    expect(dummy).toBe(2)

    runner()
    expect(dummy).toBe(3)

  })

  test('onStop callback', () => {
    let dummy
    const onStop = vi.fn()
    const obj = reactive({
      foo: 1
    })
    const runner = effect(() => {
      dummy = obj.foo
    }, {
      onStop
    })
    stop(runner)
    expect(onStop).toHaveBeenCalledTimes(1)
    runner()
    expect(onStop).toHaveBeenCalledTimes(1)

  })
})