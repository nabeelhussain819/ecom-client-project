import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import location from './modules/location'
import auth from './modules/auth'
export const strict = false

const store = () =>
  new Vuex.Store({
    state: {
      status: false,
      token: null,

      language: null,
      currentLocation: null,
      searchParams: {},
    },
    mutations: {
      authStatus(state, payload) {
        state.status = payload.status
        state.token = payload.token
      },

      setCurrentLocation(state, payload) {
        state.currentLocation = payload
      },
      setSearchParams(state, payload) {
        state.searchParams = payload
      },
    },
    actions: {},

    getters: {
      isAuthenticated(state) {
        return state.status
      },
      getCurrentLocation(state) {
        return state.currentLocation
      },
      getUserDetails(state) {
        return state.user
      },
      getSearchParams(state) {
        return state.searchParams
      },
    },
    modules: { location, auth },
  })

export default store
