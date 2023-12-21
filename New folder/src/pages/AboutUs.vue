<template lang="">
  <section class="  ">
    <div v-if="loginUserData && loginUserData.type == 'client'">
      <ClientHeader />
    </div>
    <div v-else-if="loginUserData && loginUserData.type == 'lawyer'">
        <LawyerHeader />
    </div>
    <div v-else>
      <GeneralHeader  />
    </div>
    <div class="WordSection1 container mt-4">
      <p class="LNDocumentTitleShort" align="center" style="text-align: center">
        
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight: 400:bold"
          >About Us<o:p></o:p
        ></span>
      </p>

      <p
        class="LNNumberedHeading1"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: 400: normal"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
          
      </p>
      <p class="LNDocumentTitleShort" align="left" style="text-align: left">
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight: 400:bold"
          >Our Mission<o:p></o:p
        ></span>
      </p>
      <p
        class="LNNumberedHeading1"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: 400: normal"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
      </p>
      <p class="LNDocumentTitleShort" align="left" style="text-align: left">
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight: 400:bold"
          >Our Vision<o:p></o:p
        ></span>
      </p>
      <p
        class="LNNumberedHeading1"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: 400: normal"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
      </p>
      <p class="LNDocumentTitleShort" align="left" style="text-align: left">
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight: 400:bold"
          >Our Team<o:p></o:p
        ></span>
      </p>
      <p
        class="LNNumberedHeading1 mb-4"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: 400: normal"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
      </p>
      
    </div>
    <div class="footer">

      <MainFooter />
    </div>
  </section>
</template>
<script>
import MainFooter from "../components/global/MainFooter.vue";
import GeneralHeader from "./GeneralHeader.vue";
import ClientHeader from "../pages/client/Header.vue";
import LawyerHeader from "../pages/lawyer/Header.vue";


export default {
  components: {
    MainFooter,
    GeneralHeader,
    ClientHeader,
    LawyerHeader

  },

  name: "AboutUs",

  computed: {
    loginUserData() {
      return this.$store.getters?.loginUser;
    }
  },

};
</script>
<style scoped>
.LNNumberedHeading1 span {
  font-size: 14pt !important;
  font-weight: 400: bold;
}
</style>
