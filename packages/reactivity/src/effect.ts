let activeEffect: ReactiveEffect | undefined

interface EffectOptions {
  scheduler: Function
}

class ReactiveEffect {
  private _fn: Function
  constructor(fn: Function, public scheduler?: Function) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    return this._fn()
  }
}
const targetMap: WeakMap<any, Map<string | symbol, Set<ReactiveEffect>>> = new WeakMap()
export const track = (target: any, propertyKey: string | symbol) => {
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

  deps.add(activeEffect)
}

export const trigger = (target: any, propertyKey: string | symbol) => {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(propertyKey)
  deps.forEach((activeEffect) => {
    if (activeEffect.scheduler)
      activeEffect.scheduler()
    else
      activeEffect.run()
  })
}

export const effect = (fn: Function, options?: EffectOptions) => {
  const reactiveEffect = new ReactiveEffect(fn, options?.scheduler)
  reactiveEffect.run()
  return reactiveEffect.run.bind(reactiveEffect)
}
