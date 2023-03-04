import type { ReactiveEffect } from '../'
import { effectTrack, effectTrigger, trigger } from '../'

class RefImpl {
  public deps: Set<ReactiveEffect>
  constructor(private _value: any) {
    this.deps = new Set()
  }

  get value() {
    effectTrack(this.deps)
    return this._value
  }

  set value(val: any) {
    if (val === this._value)
      return
    this._value = val
    effectTrigger(this.deps)
  }
}
export const ref = (raw: any) => {
  return new RefImpl(raw)
}
