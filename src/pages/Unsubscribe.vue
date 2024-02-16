<template lang="">
     <section class="lp-main">
    <GeneralHeader />
    <div class="container ">
      <div class="row justify-content-center align-items-center mt-5">
        <div class="col-sm-12 col-md-12 col-lg-9 text-center align-items-center d-flex flex-wrap flex-row">

          <h4>We're sorry to see you go. To manage your platform notifications, please visit your <router-link to="/login?goToAccount=true">account</router-link>.</h4>
        </div>

      </div>
    </div>
    <div class="footer footer-lp">
      <MainFooter />
    </div>
     </section>
</template>
<script>
import GeneralHeader from "../pages/GeneralHeader.vue";
import MainFooter from "../components/global/MainFooter.vue";

export default {
    components: {
        MainFooter,
        GeneralHeader
    },
    name: "unsubscribeEmailMarketing",

    // created() {
    //     const email = this.$route.query.email;
    //     console.log(email);
    // }

};
</script>
<style scoped>
.lp-main{
    position: relative;
    /* padding-bottom: 60px; */
    min-height: 100vh;
}
.footer-lp{
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    margin-bottom: 0px;
}
.lp-main .col-md-12{
  min-height: 50vh;
}
@media only screen and (max-width: 991px) {
  .lp-main{   
    padding-bottom: 60px;
}
}
</style>
  