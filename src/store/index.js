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
  allItem: getSession('allItem'),
  allNotice: getSession('allNotice'),
  currentItem: getSession('currentItem'),
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
  setAllItem (state, data) {
    setSession('allItem', data)
    state.allItem = data
  },
  setAllNotice (state, data) {
    setSession('allNotice', data)
    state.allNotice = data
  },
  setCurrentItem (state, data) {
    setSession('currentItem', data)
    state.currentItem = data
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
  getCategoryById: (state) => (id) => {
    return state.allCategory.find(item => item.id === id)
  },
  getMiniCategory: (state) => () => {
    return state.allCategory?.filter(({ id, name, pid }) => {
      return { id, name, pid }
    })
  },
  getUserById: (state) => (id) => {
    return state.allUser.find(item => item.id === id)
  },
  getRoomById: (state) => (id) => {
    return state.allRoom.find(item => item.id === id)
  },
  getItemById: (state) => (id) => {
    return state.allItem.find(item => item.id === id)
  }
}
const actions = {
  async fetchAllCategory ({ commit }, query = { size: 999 }) {
    const { list } = await _api.getCategoryList(query)
    commit('setAllCategory', list)
  },
  async fetchAllUser ({ commit }, query = { size: 999 }) {
    const { list } = await _api.getUserList(query)
    commit('setAllUser', list)
  },
  // async fetchAllRoom ({ commit }, query = { size: 999 }) {
  //   const res = await _api.getRoomList(query)
  //   console.log(res)
  //   commit('setAllRoom', 11)
  // },
  async fetchAllItem ({ commit }) {
    const { data } = await _api.getItems()
    commit('setAllItem', data)
  },
  async fetchAllNotice ({ commit }) {
    const { data } = await _api.getNotices()
    commit('setAllNotice', data)
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
