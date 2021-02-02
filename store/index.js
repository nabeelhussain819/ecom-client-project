import Vuex from 'vuex'

import location from './modules/location'
import auth from './modules/auth'
export const strict = false

const store = () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: { location, auth },
  })

export default store
