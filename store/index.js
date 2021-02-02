import Vuex from "vuex";
import location from "./modules/location";

export const strict = false;

const store = () => new Vuex.Store({
  state: {
    status: false,
    token: null,
    user: {},
    language: null,
    currentLocation: null,
    searchParams: {}
  },
  mutations: {
    authStatus(state, payload) {
      state.status = payload.status;
      state.token = payload.token;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setCurrentLocation(state, payload) {
      state.currentLocation = payload;
    },
    setSearchParams(state, payload) {
      state.searchParams = payload;
    }
  },
  actions: {},

  getters: {
    isAuthenticated(state) {
      return state.status;
    },
    getCurrentLocation(state) {
      return state.currentLocation;
    },
    getUserDetails(state) {
      return state.user;
    },
    getSearchParams(state) {
      return state.searchParams;
    }
  }, modules: { location }
});

export default store;
