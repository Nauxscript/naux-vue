import { describe, expect, test } from 'vitest'
import { reactive } from '../'

describe('reactive', () => {
  test('happy path', () => {
    const origin = { foo: 1 }
    const reactiveObj = reactive(origin)
    expect(origin).not.toBe(reactiveObj)
  })
})
