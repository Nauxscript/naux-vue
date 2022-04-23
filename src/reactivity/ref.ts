import { hasChanged, isObject } from './../shared/index';
import { trackEffects, triggerEffects, isTracking } from './effect'
import { isProxy, reactive } from './reactive';
class RefImpl {
  private _value: any
  private _rawValue: any
  public dep: Set<any>
  public __v_isRef = true
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

export function isRef(ref) {
  // my way to implement
  // return ref instanceof RefImpl
  // cxr's way to implement
  return !!ref.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function ref(value) {
  return new RefImpl(value)
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      // Reflect.set(objectWithRefs, key, value)
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}