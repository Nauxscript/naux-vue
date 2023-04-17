import { createApp } from '../dist/naux-vue.esm-bundler.js'
import { App } from './App.js'
const appContainer = document.getElementById('app')
createApp(App).mount(appContainer)
