<template lang="">
  <section class="tac-for-lawyer">
    <GeneralHeader />
    <div class="WordSection1 container pt-3">
      <p class="LNDocumentTitleShort" align="center" style="text-align: center">
        <span
          style="
            font-size: 20pt;
            mso-bidi-font-size: 10.5pt;
            font-family: Montserrat;
            mso-fareast-font-family: Calibri;
            text-transform: uppercase;
            mso-ansi-language: EN-AU;
            font-weight: 400: bold;
          "
          >Terms And Conditions For Lawyers <o:p></o:p
        ></span>
      </p>

      
    </div>
    <div class="footer">
      <MainFooter />
    </div>
  </section>

</template>
<script>
import GeneralHeader from "../../pages/GeneralHeader.vue";
import MainFooter from "../../components/global/MainFooter.vue";

export default {
  components: {
    MainFooter,
    GeneralHeader
  },

  // name: "terms-for-laywer",
};
</script>
<style scoped>
.LNNumberedHeading1 span {
  font-size: 14pt !important;
  font-weight: 400;
}

.tac-for-lawyer {
  min-height: 100vh;
  position: relative;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
