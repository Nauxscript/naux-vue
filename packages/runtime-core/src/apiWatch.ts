import { ReactiveEffect } from '@naux-vue/reactivity'
import { queuePreFlushJob } from './scheduler'

export const watchEffect = (fn) => {
  let cleanup

  const effect = new ReactiveEffect(getter, () => {
    queuePreFlushJob(job)
  })

  const onCleanup = (fn: Function) => {
    cleanup = effect.onStop = () => {
      fn()
    }
  }

  function getter() {
    cleanup?.()
    fn(onCleanup)
  }

  function job() {
    effect.run()
  }

  effect.run()

  return () => {
    effect.stop()
  }
}
