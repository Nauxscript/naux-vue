import { extend, isObject } from "../shared"
import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"


// 避免每次创建 响应式对象/只读对象 都创建新的 getter 和 setter
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)


function createGetter(isReadonly = false, shallow = false) {
  return function (target, prop) {
    const res = Reflect.get(target, prop)
    if (prop === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    }if (prop === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    if (shallow) {
      return res
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    if (!isReadonly) {
      // 收集依赖
      track(target, prop)
    }
    return res
  }
}


function createSetter() {
  return function set(target, prop, value) {
    const res = Reflect.set(target, prop, value)
      // TODO 触发依赖
    trigger(target, prop)
    return res
  }
}

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, prop) {
    console.warn(`target is readyonly! Not allow to set the prop: ${prop}; target: `, target)
    return true
  }
}

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
})