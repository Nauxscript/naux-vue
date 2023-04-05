import { toHandlerKey } from '@naux-vue/shared'

export const emit = (instance, event: string, ...args) => {
  const { props } = instance

  const handler = props[toHandlerKey(event)]
  handler && handler(...args)
}
