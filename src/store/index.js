import { createStore } from 'vuex';

const store = createStore({
  state: {
    fullName : "Hammad hasan",
    isLoading : false,
    type : null,
    isAuthenticated : false,
    loginUser : null,
    subscriptionStatus : null,
    subscriptionCancelStatus : false,
    adminApprovalStatus : null,
    subscriptionData : null,
    replacePaymentMethod : false,
    jobData : null,
    jobId : null,
    currentPaginationPage : 1,
    lastPaginationPage : null,
    paginationEndpoint : null,
  },
  mutations: {
    SET_ENDPOINT_FOR_PAGINATED_DATA(state,value){
      state.paginationEndpoint = value;
    },
    set_pagination_page(state,num){
      state.currentPaginationPage = num;
    },
    page_increment(state) {
      state.currentPaginationPage += 1;
    },
    page_decrement(state) {
      state.currentPaginationPage -= 1;
    },
    SET_PAGINATION_LAST(state,page){
      state.lastPaginationPage = page
    },
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    SET_LOGIN_USER(state, data) {
      state.loginUser = data;
    },
    SET_SUB_STATUS(state, status) {
      state.subscriptionStatus = status;
    },
    SET_SUB_CANCEL_STATUS(state, status) {
      state.subscriptionCancelStatus = status;
    },
    SET_REPLACE_PAYMENT_METHOD(state, status) {
      state.replacePaymentMethod = status;
    },
    SET_APPROVAL_STATUS(state, status) {
      state.adminApprovalStatus = status;
    },
    SET_SUBSCRIPTION_DATA(state,data){
      state.subscriptionData = data;
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
    SET_JOB_DATA(state, data) {
      state.jobData = data;
    },
    SET_JOB_ID(state, value) {
      state.jobId = value;
    },
  },
  actions: {
    // Your actions go here
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    loginUser: (state) => state.loginUser,
    subscriptionStatus: (state) => state.subscriptionStatus,
    subscriptionCancelStatus: (state) => state.subscriptionCancelStatus,
    adminApprovalStatus: (state) => state.adminApprovalStatus,
    subscriptionData: (state) => state.subscriptionData,
    replacePaymentMethod: (state) => state.replacePaymentMethod,
    jobData: (state) => state.jobData,
  },
});

export default store;