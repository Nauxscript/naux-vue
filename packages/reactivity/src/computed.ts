import { ReactiveEffect } from '../'
class ComputedRefImpl {
  private _getter: () => unknown
  private _value: unknown
  private _dirty = true
  private _effect: ReactiveEffect
  constructor(getter: () => unknown) {
    this._getter = getter
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty)
        this._dirty = true
    })
  }

  get value() {
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }

    return this._value
  }
}

export const computed = (getter: () => unknown) => {
  return new ComputedRefImpl(getter)
}
