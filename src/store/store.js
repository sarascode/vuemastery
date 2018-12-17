import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js' //import all public items into user namespace
import * as event from '@/store/modules/event.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event
  },
  store: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
