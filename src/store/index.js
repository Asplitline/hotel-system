import Vue from 'vue'
import Vuex from 'vuex'
import _api from '@api'
import { getSession, setSession } from '@utils'
Vue.use(Vuex)

const state = {
  aIndex: getSession('aIndex'),
  hIndex: getSession('hIndex'),
  allCategory: getSession('allCategory'),
  currentHotel: getSession('currentHotel'),
  currentUser: getSession('currentUser')
}
const mutations = {
  setAIndex (state, index) {
    setSession('aIndex', index)
    state.aIndex = index
  },
  setHIndex (state, index) {
    setSession('hIndex', index)
    state.hIndex = index
  },
  setAllCategory (state, data) {
    setSession('allCategory', data)
    state.allCategory = data
  },
  setCurrentHotel (state, data) {
    setSession('currentHotel', data)
    state.currentHotel = data
  },
  setCurrentUser (state, data) {
    setSession('currentUser', data)
    state.currentUser = data
  }
}
const getters = {
  getMiniCategory: (state) => () => {
    return state.allCategory.filter(({ id, name }) => {
      return { id, name }
    })
  },
  getCategoryById: (state) => (id) => {
    return state.allCategory.find(item => {
      return item.id === id
    })
  }
}
const actions = {
  async fetchAllCategory ({ commit }, query = { size: 999 }) {
    const { list } = await _api.getCategoryList(query)
    // console.log(list)
    commit('setAllCategory', list)
  }
}
const modules = {
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules
})
