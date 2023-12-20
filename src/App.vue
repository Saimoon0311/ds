<template>
  <router-view></router-view>
  <LoadingIndicator />
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue';

export default {
  name: 'App',
  components: {
    LoadingIndicator
  },
  created() {
    if (this.$store.getters.loginUser == null || this.$store.getters.loginUser == "") {
      const loginUser = JSON.parse(localStorage.getItem('loginUser'));
      this.$store.commit('SET_LOGIN_USER', loginUser);
    }
    if (this.$store.getters.jobData == null || this.$store.getters.jobData == "") {
      const item = JSON.parse(localStorage.getItem('jobData'));
      this.$store.commit('SET_JOB_DATA', item);
    }
    if(this.$store.getters.jobId == null || this.$store.getters.jobId == ""){
      this.$store.commit('SET_JOB_ID',localStorage.getItem('jobId'));
    }
    if(this.$store.getters.otpEmail == null || this.$store.getters.otpEmail == ""){
      this.$store.commit('SET_OTP_EMAIL',localStorage.getItem('otpEmail'));
    }
    if(this.$store.getters.userType == null || this.$store.getters.userType == ""){
      this.$store.commit('SET_USER_TYPE',localStorage.getItem('userType'));
    }
    if(this.$store.getters.replacePaymentMethod == null || this.$store.getters.replacePaymentMethod == "" || this.$store.getters.replacePaymentMethod == false){
      this.$store.commit('SET_REPLACE_PAYMENT_METHOD',localStorage.getItem('replacePaymentMethod'));
    }
  }
}
</script>

<style>
@import "vue-select/dist/vue-select.css";

.forgetp {
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
  text-decoration: underline;
  background: no-repeat;
  border: none;
}

.custom-button {
  color: white !important;
  background-color: #000000 !important;
  z-index: 1 !important;
}

.dynamicTable th,.dynamicTable td{
  font-size: 1rem;
}


</style>
