import { describe, expect, test } from 'vitest'
import { reactive } from '@naux-vue/reactivity'
import { watchEffect } from './../src/apiWatch'
import { nextTick } from './../src/scheduler'
describe('api: watch', () => {
  test('effect', async () => {
    const state = reactive({
      count: 0,
    })
    let dummy
    watchEffect(() => {
      dummy = state.count
    })
    expect(dummy).toBe(0)

    state.count++
    expect(dummy).toBe(0)
    await nextTick()
    expect(dummy).toBe(1)
  })
})
