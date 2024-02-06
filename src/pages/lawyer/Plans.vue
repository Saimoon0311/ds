<template lang="">
    <div class="l-main">
      <LawyerHeader />
      <div class="container">
  
        <!-- Photo -->
        <!-- <div class="d-flex">
          <div>
            
          </div>
        </div> -->

  <div class="row pt-4 pb-2 justify-content-center">
    <div class=" col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <h3 class="mt-3 text-center mb-3 text-black ">Subscription Plans</h3>
 
      <div class="card subscription-card mb-3 ">
        <div class="card-header bg-dark d-flex align-items-center justify-content-between">
          <h4 class="text-center text-white mb-0 fw-normal">Connect</h4>
          <h4 class="text-center text-white mb-0"><b>$39.00</b>/<span class="fs-6">Month</span></h4>
        </div>
        <div class="card-body pb-0">
          <ul class="dotRem">
            <li class="fw-bold" v-if="loginUser?.is_subscribed_first != true"><i class="fa fa-check"></i> 60 Day Free Trial</li>
            <li class="fw-bold"><i class="fa fa-check"></i> 1 User</li>
            <li class="fw-bold"><i class="fa fa-check"></i> Platform Access </li>
            <li class="fw-bold"><i class="fa fa-check"></i> Profile</li>
            <li class="fw-bold"><i class="fa fa-check"></i> Unlimited Proposals</li>
          </ul>
        </div>
        <div class="p-3 text-center">
          <button @click="goToSubscribePage('basic')" class="btn btn-dark btn-lg text-light">Subscribe</button>
        </div>
      </div>
    </div>

    <!-- <div class="col-md-4">
      <div class="card subscription-card mb-3">
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
          <button @click="goToSubscribePage()" class="btn btn-dark text-light" disabled>Subscribe</button>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card subscription-card mb-3">
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
          <button @click="goToSubscribePage()" class="btn btn-dark text-light" disabled>Subscribe</button>
        </div>
      </div>
    </div> -->
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
    loginUser() {
      return this.$store.state.loginUser;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goToSubscribePage(plan = null) {
      if (plan) {
        this.$router.push({ path: `/subscribe/${plan}` });
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
  width: 185px;
    height: 40px;
    object-fit: contain;
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
ul.dotRem {
    padding-left: 0px;
    list-style: none;
}
ul.dotRem li{
  margin-bottom: 10px;
}
ul.dotRem li i {
  border: 1px solid #5dc71d;
    padding: 2.5px;
    border-radius: 5px;
    font-size: 12px;
    margin-right: 5px;
}
.fa-check:before {
    content: "\f00c";
    color: rgba(93, 199, 29, 1);
}
.card-header{
  background: rgba(55, 59, 62, 1) !important;
    padding: 15px 10px;
}
@media only screen and (max-width: 1200px) and (min-width: 768px)  {

}
</style>
  