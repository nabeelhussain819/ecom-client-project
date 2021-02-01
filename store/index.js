import Vuex from 'vuex'
import category from './modules/category'

export const strict = false

const store = () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},

    getters: {},
    modules: { category },
  })

export default store
