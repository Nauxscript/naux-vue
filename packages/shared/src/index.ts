export const extend = Object.assign

export const isObject = (target: any) => target !== null && typeof target === 'object'

export const hasChanged = (value: any, newValue: any) => !Object.is(value, newValue)
