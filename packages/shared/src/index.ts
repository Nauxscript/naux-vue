export const extend = Object.assign

export const isObject = (target: any) => target !== null && typeof target === 'object'

export const hasChanged = (value: any, newValue: any) => !Object.is(value, newValue)

export enum ShapeFlags {
  ELEMENT = 1, // 0001
  STATEFUL_COMPONENT = 1 << 1, // 0010
  TEXT_CHILDREN = 1 << 2, // 0100
  ARRAY_CHILDREN = 1 << 3, // 1000
}
