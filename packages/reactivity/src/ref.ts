import { isObject } from '@naux-vue/shared'
import type { ReactiveEffect } from '../'
import { effectTrack, effectTrigger, isTracking, reactive } from '../'

class RefImpl {
  private _value: any
  private _rawValue: any
  public deps: Set<ReactiveEffect>
  constructor(value: any) {
    this._value = isObject(value) ? reactive(value) : value
    this._rawValue = value
    this.deps = new Set()
  }

  get value() {
    if (isTracking())
      effectTrack(this.deps)
    return this._value
  }

  set value(val: any) {
    if (val === this._rawValue)
      return
    this._value = (isObject(val) ? reactive(val) : val)
    this._rawValue = val
    effectTrigger(this.deps)
  }
}
export const ref = (raw: any) => {
  return new RefImpl(raw)
}
