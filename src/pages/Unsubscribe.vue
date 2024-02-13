<template lang="">
     <section class=" ">
    <GeneralHeader />
    <div class="WordSection1 container pt-3">
        <h1>We're sorry to see you go. To manage your platform notifications, please visit your <router-link to="/login">account</router-link>.</h1>
    </div>
    <div class="footer">
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
/* .LNNumberedHeading1 span {
    font-size: 14pt !important;
    font-weight: 400;
  } */
</style>
  