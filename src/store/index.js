import Vue from 'vue'
import Vuex from 'vuex'
import _api from '@api'
import { getSession, setSession } from '@utils'
Vue.use(Vuex)

const state = {
  aIndex: getSession('aIndex'),
  hIndex: getSession('hIndex'),
  allCategory: getSession('allCategory'),
  allUser: getSession('allUser'),
  allRoom: getSession('allRoom'),
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
  setAllUser (state, data) {
    setSession('allUser', data)
    state.allUser = data
  },
  setAllRoom (state, data) {
    setSession('allRoom', data)
    state.allRoom = data
  },
  setCurrentHotel (state, data) {
    setSession('currentHotel', data)
    state.currentHotel = data
  },
  setCurrentUser (state, data) {
    setSession('currentUser', data)
    state.currentUser = data
  },
  clearInfo (state) {
    sessionStorage.clear()
    state.currentUser = null
  }
}
const getters = {
  g_doctors: (state) => () => {
    return state.allUser.filter(i => Number(i.level) === 2)
  },
  getCategoryById: (state) => (id) => {
    return state.allCategory.find(item => item.id === id)
  },
  getMiniCategory: (state) => () => {
    return state.allCategory?.filter(({ id, name }) => {
      return { id, name }
    })
  },
  getUserById: (state) => (id) => {
    return state.allUser.find(item => item.id === id)
  },
  getRoomById: (state) => (id) => {
    return state.allRoom.find(item => item.id === id)
  }
}
const actions = {
  async fetchAllCategory ({ commit }, query = { size: 999 }) {
    const { data } = await _api.getCategoryList(query)
    commit('setAllCategory', data)
  },
  async fetchAllUser ({ commit }) {
    const { data } = await _api.getAllUser()
    commit('setAllUser', data)
  },
  async fetchAllRoom ({ commit }, query = { size: 999 }) {
    const { list } = await _api.getRoomList(query)
    commit('setAllRoom', list)
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
