export const extend = Object.assign

export const isObject = (target: any) => target !== null && typeof target === 'object'

export const isString = (target: any) => typeof target === 'string'

export const hasChanged = (value: any, newValue: any) => !Object.is(value, newValue)

export enum ShapeFlags {
  ELEMENT = 1, // 0001
  STATEFUL_COMPONENT = 1 << 1, // 0010
  TEXT_CHILDREN = 1 << 2, // 0100
  ARRAY_CHILDREN = 1 << 3, // 1000
  SLOT_CHILDREN = 1 << 4, // 0001 0000
}

export const hasOwn = (target, key) => Reflect.has(target, key)

export const camelize = (str: string) => str.replace(/-(\w)/g, (_, c) => {
  return c ? c.toUpperCase() : ''
})

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const toHandlerKey = (str: string) => (str ? `on${capitalize(camelize(str))}` : '')

export const EMPTY_OBJ = {}

export * from './toDisplayString'
