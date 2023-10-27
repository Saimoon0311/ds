<template>
  <div class="f-main">
    <ClientHeader />
    <p class="h3 text-center mt-5">Post a Job</p>
    <div class="container d-flex justify-content-center pb-seven">
      <Form @submit="nextStep" class="col-md-6 border p-3 rounded mt-3">
        <template v-if="currentStep === 0">
          <p class="h3 text-center">Area of law</p>
          <div>
            <div data-v-2f14f9de="" class="d-flex flex-wrap justify-content-center mb-5" data-v-376ef8ab="">
              <a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Banking &amp; finance / insolvency </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Commercial (business) </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Consumer </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Criminal </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Employment / workers compensation </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Environmental </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Family </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Health / disability / aged care </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Human rights / constitutional </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Immigration </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Insurance </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Intellectual property </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Liquor licensing / hospitality </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Litigation (civil court cases) </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Mediation </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Notary public </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Personal injury (compensation) </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Property (real estate) / construction </a><a data-v-2f14f9de=""
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Tax </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Traffic </a><a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                Wills &amp; estates
              </a>
              <a class="m-2 text-decoration-none badge text-black fs-6 bubbles text-white" data-v-2f14f9de="">
                Other (not listed here) / I don't know
              </a>

            </div>
          </div>
        </template>

        <template v-if="currentStep === 1">
          <p class="h3 text-center">Job Description</p>

          <div class="mb-5">
            <label for="title">Title<sup class="text-danger">*</sup></label>
            <input name="title" id="title" type="text" class="form-control" required="" />
            <br />

            <label for="job">Tell us in a few words why you need a lawyer. (Please include any important upcoming dates,
              such as court dates.)<sup class="text-danger">*</sup></label>
            <textarea name="job" id="job" type="textarea" class="form-control" required="" v-model="text"
              @input="checkCharacterLimit" :maxlength="maxCharacters"></textarea>
            <!-- <div v-if="characterCount >= maxCharacters" class="warning-text">You have reached your character limit.</div> -->
            <!-- <div class="c-Count">Character Count: {{ characterCount }} / {{ maxCharacters }}</div> -->
          </div>
        </template>

        <template v-if="currentStep === 2">

          <p class="h3 text-center">Location</p>
          <div class="pb-5">
            <label for="location">Where are you located?<sup class="text-danger">*</sup></label>
            <select name="location" id="location" class="form-select" required="">
              <option value="" selected disabled>Please select an option</option>
              <option value="New South Wales">New South Wales</option>
              <option value="Victoria">Victoria</option>
              <option value="Queensland">Queensland</option>
              <option value="Western Australia">Western Australia</option>
              <option value="South Australia">South Australia</option>
              <option value="Tasmania">Tasmania</option>
              <option value="Australian Capital Territory">
                Australian Capital Territory
              </option>
              <option value="Northern Territory">Northern Territory</option>
            </select>
            <br />

            <label for="city">Which city/suburb?<sup class="text-danger">*</sup></label>
            <input name="city" id="city" type="text" class="form-control" required="" />
          </div>
        </template>

        <template v-if="currentStep === 3">
          <p class="h3 text-center ">Accessibility Requirements</p>
          <label for="city" class="mb-3">Do you have any accessibility requirements, such as a disability or speaking a
            language other
            than English?</label>

          <input type="radio" id="yes" name="requirements" value="yes" v-model="requirementsOption">
          <label for="yes" class="req-label"> Yes</label><br>
          <input type="radio" id="no" name="requirements" value="no" v-model="requirementsOption">
          <label for="no" class="req-label"> No</label><br>
          <div v-if="requirementsOption === 'yes'">
            <label for="job" class="mt-2 mb-2">Please describe your accessibility requirement.</label>
            <textarea name="accessibility" id="" type="textarea" class="form-control mb-5"
              placeholder="e.g. physical disability, mental disability, language (e.g. Mandarin, Arabic, Vietnamese, Spanish, etc)"></textarea>
          </div>
        </template>
        <div class="stepbtn">
          <button v-if="currentStep !== 0" type="button" class="btn btn-dark mr" @click="prevStep">
            Previous
          </button>
          <button v-if="currentStep !== 3" type="submit" class="btn btn-dark">
            Next
          </button>

          <button v-if="currentStep === 3" type="submit" class="btn btn-dark">
            Finish
          </button>
        </div>

        <!-- <pre>{{ values }}</pre> -->
      </Form>
    </div>
    <div class="footer footer-ct">
      <MainFooter />
    </div>
  </div>
</template>
<script setup>
import ClientHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";

import { Form } from "vee-validate";
import { ref } from "vue";

const currentStep = ref(0);

function nextStep(values) {
  if (currentStep.value === 3) {
    console.log("Done: ", JSON.stringify(values, null, 2));
    return;
  }

  currentStep.value++;
}

function prevStep() {
  if (currentStep.value <= 0) {
    return;
  }

  currentStep.value--;
}
</script>
<script>

export default {
  data() {
    return {
      isVisible: false,
      isVisibleContact: false,
      text: "",
      maxCharacters: 2500,
      requirementsOption: 'no'
    };
  },
  computed: {
    characterCount() {
      return this.text.length;
    },
  },
  methods: {
    showDate() {
      this.isVisible = !this.isVisible;
    },
    showContact() {
      this.isVisibleContact = !this.isVisibleContact;
    },
    checkCharacterLimit() {
      if (this.characterCount > this.maxCharacters) {
        this.text = this.text.slice(0, this.maxCharacters); // Truncate text to the character limit.
      }
    },
  },
  components: {
    ClientHeader,
  },
};
</script>
<style scoped>
.stepbtn {
  display: flex;
  justify-content: flex-end;
}

.stepbtn .mr {
  margin-right: 10px;
}

.btn {
  padding: 5px 25px;
  border-radius: 20px;
}

.bubbles {
  border-radius: 15px;
  padding: 6px 15px;
  margin: 6px !important;
  cursor: pointer;
  background: rgb(128 128 128);
}

.bubbles:hover {
  background: #5c636a;
}

.footer-ct {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.f-main {
  min-height: 100vh;
  position: relative;
}

.pb-seven {
  padding-bottom: 80px;
}

.req-label {
  padding-left: 8px;
  position: relative;
  top: -1px;
}
</style>
