<template lang="">
  <section class=" ">
    <div >
          <GeneralHeader />
      </div>


      <div class="WordSection1 container pt-3">
          <h3 class="mt-3 text-center">Privacy Policy</h3>

          <p>This Privacy Policy applies to all personal information collected by Simplawfy Pty Ltd via the
              website
              ‘makinglawsimple.com.au’ (<b>Website</b>). </p>

          <h6>
              1<span>&nbsp;&nbsp;&nbsp;</span>What is personal information?
          </h6>
          <p>
              The Privacy Act 1988 (Cth) defines “personal information” as meaning information or an opinion about
              an
              identified individual or an individual who is reasonably identifiable, whether the information or
              opinion is true or not, and whether the information or opinion is recorded in a material form or
              not.
          </p>

          <h6>
              2<span>&nbsp;&nbsp;&nbsp;</span>What information do we collect?
          </h6>
          <p>
              The kind of personal information that we collect from you will depend on how you use the Website.
              The
              personal information which we collect and hold about you may include account details, personal and
              contact details, and information related to legal matters.
          </p>

          <h6>
              3<span>&nbsp;&nbsp;&nbsp;</span>How we collect your personal information
          </h6>
          <p>
              We may collect personal information from you whenever you input such information into the Website.
              We
              may also collect cookies from your computer which enable us to tell when you use the Website and
              also to
              help customise your website experience.
          </p>

          <h6>
              4<span>&nbsp;&nbsp;&nbsp;</span>How we use personal information
          </h6>
          <p>
              (a) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>The primary purpose for which we collect
              personal information is to provide you with the service you have requested by using the Website.
          </p>
          <p>
              (b) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>We customarily disclose personal
              information
              only to our service providers who assist us in operating the Website. Your personal information may
              also
              be exposed from time to time to maintenance and support personnel acting in the normal course of
              their
              duties. </p>
          <p>
              (c) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>By using our Website, you consent to the
              receipt of direct marketing material. We will only use your personal information for this purpose if
              we
              have collected such information direct from you, and if it is material of a type which you would
              reasonably expect to receive from us. We do not use sensitive personal information in direct
              marketing
              activity. Our direct marketing material will include a simple means by which you can request not to
              receive further communications of this nature. </p>
          <h6>
              5<span>&nbsp;&nbsp;&nbsp;</span>How we disclose personal information
          </h6>
          <p>
              (a) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>The personal information of users may be
              held, transmitted to or processed on our behalf outside Australia, including 'in the cloud', by our
              third party service providers. Our third party service providers include: </p>
          <p>
              (i) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              cloud hosting, storage, networking and related providers;
          </p>
          <p>
              (ii) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              payment and banking providers;
          </p>
          <p>
              (iii) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              marketing and analytics providers; and
          </p>
          <p>
              (iv) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              security providers.
          </p>
          <p>
              (b) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              We may grant access to personal information through third party applications or APIs of our website.
          </p>
          <p>
              (c) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              We may also disclose your personal information to third parties:
          </p>
          <p>
              (i) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              if necessary to provide the service or product you have requested;
          </p>
          <p>
              (ii) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              if required by court order, subpoena or request for information by law enforcement;
          </p>
          <p>
              (iii) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              if otherwise permitted or required by law; or
          </p>
          <p>
              (iv) <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              for other purposes with your consent.
          </p>
          <h6>
              6<span>&nbsp;&nbsp;&nbsp;</span>Access and correction
          </h6>
          <p>
              You may contact us to access and correct inaccurate personal information subject to certain
              exceptions.
          </p>
          <h6>
              7<span>&nbsp;&nbsp;&nbsp;</span>Complaint procedure
          </h6>
          <p>
              If you have a complaint concerning the manner in which we maintain the privacy of your personal
              information, please contact us as set out below. All complaints will be considered by our Privacy
              Officer and we may seek further information from you to clarify our concerns. If we agree that your
              complaint is well founded, we will, in consultation with you, take appropriate steps to rectify the
              problem. If you remain dissatisfied with the outcome, you may refer the matter to the Office of the
              Australian Information Commissioner. </p>
          <h6>
              8<span>&nbsp;&nbsp;&nbsp;</span>How to contact us about privacy
          </h6>
          <p>
              If you have any queries, or if you seek access to your personal information, or if you have a
              complaint
              about our privacy practices, you can contact us through: <a
                  href="mailto:info@makinglawsimple.com.au">info@makinglawsimple.com.au</a>. </p>

      </div>
      <div class="footer">
          <MainFooter />
      </div>
  </section>
</template>
<script>
import GeneralHeader from "../pages/GeneralHeader.vue";
import MainFooter from "../components/global/MainFooter.vue";

// import { ref } from "vue";

export default {
  components: {
    GeneralHeader,
    MainFooter,
  },
  // data() {
  //   return {
  //     selectedCities: ref(),
  //     cities: ref([
  //       { name: 'New York', code: 'NY' },
  //       { name: 'Rome', code: 'RM' },
  //       { name: 'London', code: 'LDN' },
  //       { name: 'Istanbul', code: 'IST' },
  //       { name: 'Paris', code: 'PRS' }
  //     ])
  //   }
  // },

  name: "privacy-policy",
};
</script>
<style scoped>
ul.style-rom {
    list-style: lower-roman;
}
.LNNumberedHeading1 span {
  font-size: 14pt !important;
  font-weight: 400;
}

h6 {
            font-size: 19px !important;
            font-weight: 400;
            color: black;
            line-height: 28px;
            margin-bottom: 1rem;
        }

        p {
            font-size: 1rem;
            color: black;
            line-height: 24px;
            margin-bottom: 24px;
        }

        * {
            font-family: "Montserrat", san-sarif;
            box-sizing: border-box;
            padding: 0;
        }


</style>
