<template lang="">
    <div class="l-main">
      <LawyerHeader />
      <div class="container">
        <h3 class="mt-3">Subscription Plans</h3>
  
        <!-- Photo -->
        <!-- <div class="d-flex">
          <div>
            
          </div>
        </div> -->

  <div class="row py-4">
    <div class="col-md-4">
      <div class="card subscription-card">
        <div class="card-header">
          <h3 class="text-center">Basic Plan</h3>
        </div>
        <div class="card-body">
          <h2 class="text-center">$39.00/month</h2>
          <ul>
            <li>60 days free trial</li>
            <li>Cancel any time</li>
          </ul>
        </div>
        <div class="card-footer text-center">
          <button @click="goToSubscribePage('basic')" class="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card subscription-card">
        <div class="card-header">
          <h3 class="text-center">Pro Plan</h3>
        </div>
        <div class="card-body">
          <h2 class="text-center">$49.99/month</h2>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
          </ul>
        </div>
        <div class="card-footer text-center">
          <button @click="goToSubscribePage()" class="btn btn-primary" disabled>Subscribe</button>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card subscription-card">
        <div class="card-header">
          <h3 class="text-center">Premium Plan</h3>
        </div>
        <div class="card-body">
          <h2 class="text-center">$99.99/month</h2>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
          </ul>
        </div>
        <div class="card-footer text-center">
          <button @click="goToSubscribePage()" class="btn btn-primary" disabled>Subscribe</button>
        </div>
      </div>
    </div>
  </div>



      </div>
      <div class="footer">
        <MainFooter />
      </div>
    </div>
  </template>
  <script>
  import LawyerHeader from "./Header.vue";
  import MainFooter from "../../components/global/MainFooter.vue";
  
  // import Selectic from 'selectic';
//   import api from "@/config/api.js";
//   import $ from 'jquery';
//   window.$ = window.jQuery = $;
  export default {
    data() {
      return {
      };
    },
    components: {
      LawyerHeader,
      MainFooter
      // Selectic
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
        goToSubscribePage(plan = null){
            if(plan){
                this.$router.push({ path : `/subscribe/${plan}` });
            }
        }
    },
    name: "PlansTab",
  };
  
  </script>
  
  <style scoped>
  .navbar-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .logo-small {
    width: 175px;
    height: 50px;
  }
  
  .law-img {
    width: 15vw;
    height: 15vw;
    border: 1px solid white;
    border-radius: 50%;
  }
  
  .navActive {
    background: rgb(0, 0, 0);
    border: 1px solid rgb(0, 0, 0);
    border-radius: 10px;
    color: white;
  }
  
  .navbar-nav .left-menu {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .bg-grey {
    background: rgb(0, 0, 0);
    color: white;
  }
  
  .bg-grey:hover {
    background: rgb(0, 0, 0);
    color: white;
  }
  
  .curtain-handler .fa-caret-down {
    display: none;
  }
  
  .mselect .selectic-input .selectic-item_text {
    font-style: normal;
  }
  
  .selectic .has-feedback .form-control {
    height: 60px !important;
  }
  
  .selectic .curtain-handler .fa-caret-down {
    display: none !important;
  }
  
  .l-main {
    min-height: 100vh;
    position: relative;
    padding-bottom: 60px;
  }
  
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  </style>
  