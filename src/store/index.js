import { createStore } from 'vuex';

const store = createStore({
  state: {
    fullName : "Hammad hasan",
    isLoading : false,
    type : null,
    isAuthenticated : false,
    loginUser : null,
    subscriptionStatus : null,
    adminApprovalStatus : null,
  },
  mutations: {
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    SET_LOGIN_USER(state, data) {
      state.loginUser = data;
    },
    SET_SUB_STATUS(state, status) {
      state.subscriptionStatus = status;
    },
    SET_APPROVAL_STATUS(state, status) {
      state.adminApprovalStatus = status;
    },
  },
  actions: {
    // Your actions go here
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    loginUser: (state) => state.loginUser,
    subscriptionStatus: (state) => state.subscriptionStatus,
    adminApprovalStatus: (state) => state.adminApprovalStatus,
  },
});

export default store;