import { extend } from '@naux-vue/shared'
let activeEffect: ReactiveEffect | undefined
let shouldTrack = false

interface EffectOptions {
  scheduler?: () => void
  onStop?: () => void
}

export const cleanUpEffect = (effect: ReactiveEffect) => {
  effect.deps.forEach((dep) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

class ReactiveEffect {
  onStop?: () => void
  scheduler?: () => void
  deps: Array<Set<ReactiveEffect>> = []
  private _active = true

  constructor(private _fn: () => unknown) {}

  run() {
    if (!this._active)
      return this._fn()

    shouldTrack = true
    activeEffect = this
    const result = this._fn()
    shouldTrack = false

    return result
  }

  stop() {
    if (this._active) {
      cleanUpEffect(this)
      this.onStop?.()
      this._active = false
    }
  }
}

const targetMap: WeakMap<any, Map<string | symbol, Set<ReactiveEffect>>> = new WeakMap()
export const track = (target: any, propertyKey: string | symbol) => {
  if (!isTracking())
    return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(propertyKey)
  if (!deps) {
    deps = new Set()
    depsMap.set(propertyKey, deps)
  }
  if (deps.has(activeEffect!))
    return
  deps.add(activeEffect!)
  activeEffect!.deps.push(deps)
}

function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export const trigger = (target: any, propertyKey: string | symbol) => {
  const depsMap = targetMap.get(target)
  const deps = depsMap?.get(propertyKey)
  deps?.forEach((activeEffect) => {
    if (activeEffect.scheduler)
      activeEffect.scheduler()
    else
      activeEffect.run()
  })
}

export const effect = (fn: () => unknown, options?: EffectOptions) => {
  const _effect = new ReactiveEffect(fn)
  extend(_effect, options)
  _effect.run()

  const runner = _effect.run.bind(_effect) as any
  runner.effect = _effect

  return runner
}

export const stop = (effecFn: { effect: ReactiveEffect }) => {
  effecFn.effect.stop()
}
