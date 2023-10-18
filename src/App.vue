<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  created(){
    if(this.$store.getters.loginUser == null || this.$store.getters.loginUser == ""){
      const loginUser = localStorage.getItem('loginUser');
      this.$store.commit('SET_LOGIN_USER',loginUser);
    }
  }
}
</script>

<style>

</style>
