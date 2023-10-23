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
  }
}
</script>

<style>

</style>
