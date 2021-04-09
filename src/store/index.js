import Vue from 'vue'
import Vuex from 'vuex'

import { getSession, setSession } from '@utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aIndex: getSession('aIndex')
  },
  mutations: {
    setAIndex (state, index) {
      setSession('aIndex', index)
      state.aIndex = index
    }
  },
  actions: {
  },
  modules: {
  }
})
