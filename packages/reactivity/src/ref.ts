import { createReactiveObject, mutableHandler } from '..'
export const ref = (raw: any) => {
  return createReactiveObject({ value: raw }, mutableHandler())
}
