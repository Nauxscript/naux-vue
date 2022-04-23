import { hasChanged, isObject } from './../shared/index';
import { trackEffects, triggerEffects, isTracking } from './effect'
import { isProxy, reactive } from './reactive';
class RefImpl {
  private _value: any
  private _rawValue: any
  public dep: Set<any>
  constructor(value) {
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }
  
  get value() {
    // when get the value outside the effect, should be not call the trackEffects(should be not track)
    trackRefValue(this)
    return this._value
  }
  set value(val) {
    if (!hasChanged(val, this._rawValue)) return
    this._rawValue = val
    this._value = convert(val)
    triggerEffects(this.dep)
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref: RefImpl) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}