<template lang="">
    <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <div class="form-outline flex-fill mb-0">
                    <label>
                    <input type="radio" value="lawyer" v-model="type" @change="userTypeChange" /> Lawyer
                    </label>
                    <label>
                    <input type="radio" value="client" v-model="type" @change="userTypeChange" /> Client
                    </label>
    
                </div>
            </div>
  </template>
  <script>
  export default {
    name: 'MainHeader',
    data(){
        return {
            type : "", 
        }
    },
    mounted(){
        this.type = this.userType;
    },
    computed: {
        userType() {
            return this.$store.state.userType;
        }
    },
    methods:{
        userTypeChange(){
            localStorage.setItem('userType',this.type);
            this.$store.commit('SET_USER_TYPE',this.type);
        }
    }
  }
  </script>