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
  created(){  
    if(this.$store.getters.loginUser == null || this.$store.getters.loginUser == ""){
      const loginUser = JSON.parse(localStorage.getItem('loginUser'));
      this.$store.commit('SET_LOGIN_USER',loginUser);
    }
    if(this.$store.getters.jobData == null || this.$store.getters.jobData == ""){
      const item = JSON.parse(localStorage.getItem('jobData'));
      this.$store.commit('SET_JOB_DATA',item);
    }
  }
}
</script>

<style>

@import "vue-select/dist/vue-select.css";

.forgetp{
    color: rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1));
    text-decoration: underline;
    background: no-repeat;
    border: none;
}

.custom-button {
  color: white !important;
  background-color: #808080 !important;
  z-index: 1 !important;
}

</style>
