<template>
  <div class="f-main">
    <ClientHeader />
    <p class="h3 text-center mt-5">Post a Job</p>
    <div class="container d-flex justify-content-center pb-seven">
      <form @submit.prevent="nextStep" class="col-md-6 border p-3 rounded mt-3">
        <template v-if="currentStep === 0">
          <p class="h3 text-center">Area of law</p>
          <div>
            <div data-v-2f14f9de="" class="d-flex flex-wrap justify-content-center mb-5" data-v-376ef8ab="">

              <a v-for="(area,index) in areas" :key="area.id" @click="setArea(index,area.id)"
                class="m-2 text-decoration-none badge text-white fs-6 bubbles">
                {{ area.title }}
              </a>

              <!-- <a data-v-2f14f9de="" class="m-2 text-decoration-none badge text-white fs-6 bubbles">
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
              </a> -->
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
            <input name="title" id="title" type="text" class="form-control" required="" v-model="title" />
            <br />

            <label for="job" class="mb-2">Tell us in a few words why you need a lawyer. (Please include any important
              upcoming dates,
              such as court dates.)<sup class="text-danger">*</sup></label>
            <textarea name="job" id="job" type="textarea" class="form-control" required="" v-model="description"
              @input="checkCharacterLimit" :maxlength="maxCharacters"></textarea>
            <!-- <div v-if="characterCount >= maxCharacters" class="warning-text">You have reached your character limit.</div> -->
            <!-- <div class="c-Count">Character Count: {{ characterCount }} / {{ maxCharacters }}</div> -->
          </div>
        </template>

        <template v-if="currentStep === 2">

          <p class="h3 text-center">Location</p>
          <div class="pb-5">
            <label for="location">Where are you located?<sup class="text-danger">*</sup></label>
            <select v-model="selectedLocationIndex" name="location" id="location" class="form-select" required="">
              <option value="" selected disabled>Please select an option</option>
              <option v-for="(location,index) in locations" :key="location.id" :value="index">{{ location.title }}</option>
            </select>


            <!-- <option value="Victoria">Victoria</option>
              <option value="Queensland">Queensland</option>
              <option value="Western Australia">Western Australia</option>
              <option value="South Australia">South Australia</option>
              <option value="Tasmania">Tasmania</option>
              <option value="Australian Capital Territory">
                Australian Capital Territory
              </option>
              <option value="Northern Territory">Northern Territory</option> -->

            <br />

            <label for="city">Which city/suburb?<sup class="text-danger">*</sup></label>
            <input v-model="city" name="city" id="city" type="text" class="form-control" required="" />
          </div>
        </template>

        <template v-if="currentStep === 3">
          <p class="h3 text-center ">Accessibility Requirements</p>
          <label for="city" class="mb-3">Do you have any accessibility requirements, such as a disability or speaking a
            language other
            than English?</label>

          <input type="radio" id="yes" name="requirements" value=1 v-model="requirementsOption">
          <label for="yes" class="req-label"> Yes</label><br>
          <input type="radio" id="no" name="requirements" value=0 v-model="requirementsOption">
          <label for="no" class="req-label"> No</label><br>
          <div v-if="requirementsOption == 1">
            <label for="job" class="mt-2 mb-2">Please describe your accessibility requirement.</label>
            <textarea v-model="requirementsOptionDescription" name="accessibility" id="" type="textarea"
              class="form-control mb-5"
              placeholder="e.g. physical disability, mental disability, language (e.g. Mandarin, Arabic, Vietnamese, Spanish, etc)"></textarea>
          </div>
        </template>

        <template v-if="currentStep === 4">
          <p class="h3 text-center ">Preview Job</p>
          
          <h4>Title</h4>
          <p>{{ title }}</p>
          <h4>Description</h4>
          <p>{{ description }}</p>
          <h4>Area</h4>
          <p>{{ areas[selectedAreaIndex].title }}</p>
           <h4>Location</h4>
          <p>{{ locations[selectedLocationIndex].title }}</p>
          <h4>City</h4>
          <p>{{ city }}</p>
          <h4>Accessibility Requirements</h4>
          <p>{{ requirementsOption ? 'Yes' : 'No' }}</p>
          <span v-if="requirementsOption">
            <h4>Accessibility Requirements Details</h4>
            <p>{{ requirementsOptionDescription }}</p>
          </span>
          <!-- <label for="city" class="mb-3">Do you have any accessibility requirements, such as a disability or speaking a
            language other
            than English?</label>

          <input type="radio" id="yes" name="requirements" value=1 v-model="requirementsOption">
          <label for="yes" class="req-label"> Yes</label><br>
          <input type="radio" id="no" name="requirements" value=0 v-model="requirementsOption">
          <label for="no" class="req-label"> No</label><br>
          <div v-if="requirementsOption == 1">
            <label for="job" class="mt-2 mb-2">Please describe your accessibility requirement.</label>
            <textarea v-model="requirementsOptionDescription" name="accessibility" id="" type="textarea"
              class="form-control mb-5"
              placeholder="e.g. physical disability, mental disability, language (e.g. Mandarin, Arabic, Vietnamese, Spanish, etc)"></textarea>
          </div> -->
        </template>

        <div class="stepbtn">
          <button v-if="currentStep !== 0" type="button" class="btn btn-dark mr" @click="prevStep">
            Previous
          </button>
          <button v-if="currentStep !== 3 && currentStep !== 4" type="submit" class="btn btn-dark">
            Next
          </button>

          <button v-if="currentStep === 3"  type="submit" class="btn btn-dark">
            Preview
          </button>

          <button v-if="currentStep === 4" @click="submitStepForm" type="button" class="btn btn-dark">
            Submit
          </button>
        </div>

        <!-- <pre>{{ values }}</pre> -->
      </form>
    </div>
    <div class="footer footer-ct">
      <MainFooter />
    </div>
  </div>
</template>
<!-- <script setup>
import ClientHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";

import { Form } from "vee-validate";
import { ref } from "vue";
import api from "@/config/api.js";

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
</script> -->
<script>
// import { Form } from "vee-validate";
import ClientHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import api from "@/config/api.js";
export default {
  components: {
    ClientHeader,MainFooter
  },
  data() {
    return {
      currentStep: 0,

      areas: [],
      locations: [],

      title: null,
      description: null,
      selectedArea: null,
      selectedAreaIndex : null,
      selectedLocationIndex : null,
      city: null,
      requirementsOption: 0,
      requirementsOptionDescription: null,

      isVisible: false,
      isVisibleContact: false,
      text: "",
      maxCharacters: 2500,

    };
  },

  computed: {
    characterCount() {
      return this.text.length;
    },
  },
  mounted() {
    this.fetchAreas();
    this.fetchLocations();
  },
  methods: {

    nextStep(values) {
      if (this.currentStep === 4) {
        console.log("Done: ", JSON.stringify(values, null, 2));
        return;
      }
      this.currentStep++;
    },

    prevStep() {
      if (this.currentStep <= 0) {
        return;
      }
      this.currentStep--;
    },

    changePostJobFormToDefault() {
      this.title = null,
        this.description = null,
        this.selectedArea = null,
        this.selectedAreaIndex = null,
        this.city = null,
        this.requirementsOption = 0,
        this.requirementsOptionDescription = null
    },
    async submitStepForm() {
      const formData = {
        "title": this.title,
        "description": this.description,
        "field_id": this.selectedArea,
        "location_id": this.locations[this.selectedLocationIndex].id,
        "city": this.city,
        "accessibility_requirements": this.requirementsOption,
      }
      if (this.requirementsOption == 1) {
        formData.requirements_description = this.requirementsOptionDescription;
      }

      api.post('/client/create-job', formData)
        .then(() => {
          this.$swal('Success', 'Job has been inserted successfully', 'success').then(() => {
            this.changePostJobFormToDefault();
            this.currentStep = 0;
          });
        })
        .catch(error => {
          this.$swal('Error', error?.response?.data?.error, 'error');
          console.log("getResults : ", error?.response?.data?.error)
        });

      // console.log('field 1 : ' , this.title);
      // console.log('field 2 : ' , this.description);
      // console.log('field 3 : ' , this.selectedArea);
      // console.log('field 4 : ' , this.selectedLocation);
      // console.log('field 5 : ' , this.city);
      // console.log('field 6 : ' , this.requirementsOption);
      // console.log('field 7 : ' , this.requirementsOptionDescription);
    },
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
    async fetchAreas() {
      try {
        const response = await api.get('/get-active-fields');
        this.areas = response?.data?.allFields;
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },
    async fetchLocations() {
      try {
        const response = await api.get('/get-active-locations');
        this.locations = response?.data?.allLocations;
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },
    setArea(index,id) {
      this.selectedArea = id;
      this.selectedAreaIndex = index;
      console.log(index,id);
    },
    setLocation(){
      console.log('abc tt oo : ' , this.selectedLocationIndex);
    }
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
  background: rgb(128 128 128);
  border-radius: 15px;
  padding: 6px 15px;
  margin: 6px !important;
  cursor: pointer;
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



.bubbles:hover {
  background: #5c636a;
}
</style>
