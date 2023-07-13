import { ReactiveEffect } from '@naux-vue/reactivity'
import { queuePreFlushJob } from './scheduler'

export const watchEffect = (fn) => {
  const effect = new ReactiveEffect(fn, () => {
    queuePreFlushJob(job)
  })

  function job() {
    effect.run()
  }

  effect.run()
}
