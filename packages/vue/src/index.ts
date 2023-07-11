import * as runtimeDom from '@naux-vue/runtime-dom'
import { baseCompile } from '@naux-vue/compiler-core'
import { registRuntimeCompile } from 'packages/runtime-core/src/component'

export function compileToFunciton(template: string) {
  const { code } = baseCompile(template)
  // eslint-disable-next-line no-new-func
  const render = new Function('Vue', code)(runtimeDom)
  return render
}

export * from '@naux-vue/runtime-dom'
export * from '@naux-vue/reactivity'

registRuntimeCompile(compileToFunciton)
