import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components', //Directory to search within
  false, // Search subdirectories
  /Base[A-Z]\w+\.(vue|js)$/ //Regular expression
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName) //iterate through each file and get the object exported

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
