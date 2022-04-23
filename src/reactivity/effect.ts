
// 当前调用 run 方法的 reactiveEffect 示例
import { extend } from '../shared'
let activeEffect

class ReactiveEffect {
  deps = []
  private _fn: any
  private active: boolean = true
  public scheduler: Function | undefined
  onStop?: () => void
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    this.active = true
    activeEffect = this
    return this._fn()
  }
  stop() {
    if (this.active) {
      cleanupEffect(this)
      this.onStop && this.onStop()
      this.active = false
    }
  }
}

// 清除 ReactiveEffect 的 effect
const cleanupEffect = (effect) => {
  for(let dep of effect.deps) {
    dep.delete(effect)
  }
  effect.deps.length = 0
}

// 一个 target 对象 对应 一个 Set ，该对应关系存在 targetMap 中
const targetMap = new Map()

export const track = (target, prop) => {
  // const dep = new Set()
  // dep.add(   )
  if (!activeEffect || activeEffect.active === false) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(prop)
  if (!dep) {
    dep = new Set()
    depsMap.set(prop, dep)
  }
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}
 
export const trigger = (target, prop) => {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(prop)
  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export const stop = (runner) => {
  runner.effect.stop()
}

export const effect = (fn, options: any = {}) => {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  extend(_effect, options)
  // _effect.onStop = options.onStop
  _effect.run()
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}