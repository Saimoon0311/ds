import { createStore } from 'vuex';

const store = createStore({
  state: {
    fullName : "jhon deo",
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
    otpEmail : null,
    loadMorePrevData: null,
    userType : null,

    userToChat : null,
    jobIdToChat : null,
    chatStatus : null,
    dataTab : null,
    clientComeFromProposal : null,
    // lawyerEligibleStatus : false,
    noti : null,
    endOfResult : false,
    noti_count_job : 0,
    noti_count_msg : 0,
    isNotHeaderChat : null,
  },
  mutations: {
    // SET_LAWYER_ELIGIBLE_STATUS(state,value){
    //   state.lawyerEligibleStatus = value
    // },
    SET_IS_NOT_HEADER_CHAT(state,value){
      if(value) {
        localStorage.setItem('isNotHeaderChat',value);
      }else{
        localStorage.removeItem('isNotHeaderChat');
      }
      state.isNotHeaderChat = value;
    },
    SET_NOTI_COUNT_MSG(state,value){
      console.log('under state : ',value);
      state.noti_count_msg = value;
    },
    SET_NOTI_COUNT_JOB(state,value){
      state.noti_count_job = value;
    },
    SET_ENDOFRESULT(state,value){
      state.endOfResult = value;
    },
    SET_NOTI(state,data){
      state.noti = data
    },
    SET_DATATAB(state,value){
      state.dataTab = value
    },
    SET_CHATSTATUS(state,value){
      state.chatStatus = value
    },
    SET_JOBIDTOCHAT(state,id){
      state.jobIdToChat = id
    },
    SET_USERTOCHAT(state,data){
      state.userToChat = data
    },
    SET_CLIENTCOMEFROMPROPOSAL(state,value){
      state.clientComeFromProposal = value
    },
    SET_LOADMOREPREVDATA(state,data){
      state.loadMorePrevData = data
    },
    SET_USER_TYPE(state,value){
      state.userType = value;
    },
    SET_OTP_EMAIL(state,value){
      state.otpEmail = value;
    },
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
    isNotHeaderChat : (state) => state.isNotHeaderChat,
    userType : (state) => state.userType,
    isAuthenticated: (state) => state.isAuthenticated,
    loginUser: (state) => state.loginUser,
    subscriptionStatus: (state) => state.subscriptionStatus,
    subscriptionCancelStatus: (state) => state.subscriptionCancelStatus,
    adminApprovalStatus: (state) => state.adminApprovalStatus,
    subscriptionData: (state) => state.subscriptionData,
    replacePaymentMethod: (state) => state.replacePaymentMethod,
    jobData: (state) => state.jobData,
    otpEmail: (state) => state.otpEmail,
  },
});

export default store;