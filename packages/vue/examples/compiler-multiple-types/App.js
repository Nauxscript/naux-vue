import { ref } from '../dist/naux-vue.esm-bundler.js'

export const App = {
  template: '<div>Naux-vue {{title}} in multiple types</div>',
  setup() {
    const title = ref('compiler module')
    // for changing in the chrome devtool
    window.title = title
    return {
      title,
    }
  },
}
