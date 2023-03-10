import { hasChanged, isObject } from '@naux-vue/shared'
import type { ReactiveEffect } from '../'
import { effectTrack, effectTrigger, isTracking, reactive } from '../'

export const convert = (value) => {
  return isObject(value) ? reactive(value) : value
}

class RefImpl {
  private _value: any
  private _rawValue: any
  public __v_isRef = true
  public deps: Set<ReactiveEffect>
  constructor(value: any) {
    this._value = convert(value)
    this._rawValue = value
    this.deps = new Set()
  }

  get value() {
    if (isTracking())
      effectTrack(this.deps)
    return this._value
  }

  set value(val: any) {
    if (!hasChanged(this._rawValue, val))
      return
    this._value = convert(val)
    this._rawValue = val
    effectTrigger(this.deps)
  }
}

export const ref = (raw: any) => {
  return new RefImpl(raw)
}

export const isRef = (target: any) => {
  return !!target.__v_isRef
}

export const unRef = (target: any) => {
  return isRef(target) ? target.value : target
}

const proxyRefsHandle = () => ({
  get(target: any, propertyKey: string | symbol) {
    return unRef(Reflect.get(target, propertyKey))
  },
  set(target: any, propertyKey: string | symbol, newValue: any) {
    const targetValue = target[propertyKey]
    if (isRef(targetValue) && !isRef(newValue))
      return (target[propertyKey].value = newValue)
    return Reflect.set(target, propertyKey, newValue)
  },
})

export const proxyRefs = (raw: any) => {
  return new Proxy(raw, proxyRefsHandle())
}
