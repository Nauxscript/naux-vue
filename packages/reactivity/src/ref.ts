import { hasChanged, isObject } from '@naux-vue/shared'
import type { ReactiveEffect } from '../'
import { effectTrack, effectTrigger, isTracking, reactive } from '../'

export const convert = (value) => {
  return isObject(value) ? reactive(value) : value
}

class RefImpl {
  private _value: any
  private _rawValue: any
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
    if (!hasChanged(this._value, val))
      return
    this._value = convert(val)
    this._rawValue = val
    effectTrigger(this.deps)
  }
}

export const ref = (raw: any) => {
  return new RefImpl(raw)
}
