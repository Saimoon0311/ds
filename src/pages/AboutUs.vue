<template lang="">
  <section class="  ">
    <div class="WordSection1 container mt-4">
      <p class="LNDocumentTitleShort" align="center" style="text-align: center">
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight:bold"
          >About Us<o:p></o:p
        ></span>
      </p>

      <p
        class="LNNumberedHeading1"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: normal"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
          
      </p>
      <p class="LNDocumentTitleShort" align="left" style="text-align: left">
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight:bold"
          >Our Mission<o:p></o:p
        ></span>
      </p>
      <p
        class="LNNumberedHeading1"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: normal"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
      </p>
      <p class="LNDocumentTitleShort" align="left" style="text-align: left">
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight:bold"
          >Our Vision<o:p></o:p
        ></span>
      </p>
      <p
        class="LNNumberedHeading1"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: normal"
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
      </p>
      <p class="LNDocumentTitleShort" align="left" style="text-align: left">
        <span
          style="font-size: 20pt;mso-bidi-font-size: 10.5pt;font-family: Montserrat;mso-fareast-font-family: Calibri;text-transform: uppercase;mso-ansi-language: EN-AU;font-weight:bold"
          >Our Team<o:p></o:p
        ></span>
      </p>
      <p
        class="LNNumberedHeading1 mb-4"
        style="margin-left: 0cm;text-indent: 0cm;mso-pagination: none;page-break-after: auto;mso-list: none;tab-stops: 36pt;">
        <span lang="EN-US" style="font-family: Montserrat; font-weight: normal"
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


export default {
  components: {
    MainFooter
  },

  name: "AboutUs",
};
</script>
<style scoped>
.LNNumberedHeading1 span {
  font-size: 14pt !important;
  font-weight: bold;
}

.footer-main div {
  position: absolute;
  bottom: 0;
}

section {
  position: relative;
  height: 100vh;
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
