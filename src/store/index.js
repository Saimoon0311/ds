import { createStore } from 'vuex';

const store = createStore({
  state: {
    fullName : "Hammad hasan",
    isLoading : false,
    type : null,
    isAuthenticated : false,
  },
  mutations: {
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
  },
  actions: {
    // Your actions go here
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});

export default store;