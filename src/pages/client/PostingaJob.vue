<template>
  <div class="f-main">
    <ClientHeader />
    <p class="h3 text-center mt-5">Post a Job</p>
    <div class="container pb-seven">
      <div class="row justify-content-center">
        <form @submit.prevent="nextStep" class="col-md-9 border p-3 rounded mt-3">
          <template v-if="currentStep === 0">
            <p class="h4 text-center mb-3 mt-3">
              Which area of law do you need assistance in?
            </p>
            <div>
              <div data-v-2f14f9de="" class="d-flex flex-wrap justify-content-center mb-5" data-v-376ef8ab="">
                <!-- class="m-2 text-decoration-none badge text-white fs-6 bubbles" -->
                <a v-for="(area, index) in areas" :key="area.id" @click="setArea(index, area.id), nextStep()" :class="[
                  'm-2',
                  'text-decoration-none',
                  'badge',
                  'text-white',
                  'fs-6',
                  'bubbles',
                  { selected_bubble: selectedAreaIndex === index },
                ]">
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
                <a class="m-2 text-decoration-none badge text-black fs-6 bubbles bubbles-other text-white"
                  data-v-2f14f9de="">
                  Other (not listed here) / I don't know
                </a>
              </div>
            </div>
          </template>

          <template v-if="currentStep === 1">
            <p class="h4 text-center mb-3 mt-3">Job Description</p>
            <div class="mb-3">
              <!-- <h4 class="d-inline"><b>Area of Law:</b></h4> -->
              <label>Area of Law:</label>
              <p class="text-decoration-none badge text-white fs-6 bubbles">
                {{ areas[selectedAreaIndex].title }}
              </p>
            </div>
            <div class="mb-5">
              <label for="title">Title<sup class="text-danger">*</sup></label>
              <input name="title" id="title" type="text" class="form-control" required="" v-model="title"
                @input="checkTitleCharacterLimit" :maxlength="maxTitleCharacters" />
              <div v-if="characterCountTitle >= maxTitleCharacters" class="warning-text">
                You have reached your character limit.
              </div>
              <div class="c-Count">
                {{ characterCountTitle }} / {{ maxTitleCharacters }}
              </div>
              <br />

              <label for="job">Why do you need a lawyer?
                <sup class="text-danger">*</sup></label>
              <label class="short-des">(Please include any important upcoming dates, such as court
                dates.)</label>
              <textarea name="job" id="job" type="textarea" class="form-control des-text" required=""
                v-model="description" @input="checkCharacterLimit" :maxlength="maxCharacters"></textarea>
              <div v-if="characterCount >= maxCharacters" class="warning-text">
                You have reached your character limit.
              </div>
              <div class="c-Count">
                {{ characterCount }} / {{ maxCharacters }}
              </div>
            </div>
          </template>

          <template v-if="currentStep === 2">
            <p class="h4 text-center">Location</p>
            <div class="pb-5">
              <label for="location">Where are you located?<sup class="text-danger">*</sup></label>
              <select v-model="selectedLocationIndex" name="location" id="location" class="form-select" required="">
                <option value="" selected disabled>
                  Please select an option
                </option>
                <option v-for="(location, index) in locations" :key="location.id" :value="index">
                  {{ location.title }}
                </option>
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
              <input v-model="city" name="city" id="city" type="text" class="form-control" required=""
                @input="checkCityCharacterLimit" :maxlength="maxCharactersCity" />
              <div v-if="characterCountCity >= maxCharactersCity" class="warning-text">
                You have reached your character limit.
              </div>
              <!-- <div class="c-Count">{{ characterCountCity }} / {{ maxCharactersCity }}</div> -->
            </div>
          </template>

          <template v-if="currentStep === 3">
            <p class="h4 text-center">Accessibility Requirements</p>
            <label for="city" class="mb-3 d-block">Do you have any accessibility requirements, such as a disability
              or speaking a language other than English?</label>

            <input type="radio" id="yes" name="requirements" value="1" v-model="requirementsOption" />
            <label for="yes" class="req-label"> Yes</label><br />
            <input type="radio" id="no" name="requirements" value="0" v-model="requirementsOption" />
            <label for="no" class="req-label"> No</label><br />
            <div v-if="requirementsOption == 1">
              <label for="job" class="mt-3 mb-2">Please describe your accessibility requirement.</label>
              <!-- <textarea v-model="requirementsOptionDescription" @input="checkDesCharacterLimit"
                :maxlength="maxCharactersDes" name="accessibility" id="" type="textarea"
                class="des-text form-control mb-5"
                placeholder="e.g. physical disability, mental disability, language (e.g. Mandarin, Arabic, Vietnamese, Spanish, etc)"></textarea>
              <div v-if="characterCountDes >= maxCharactersDes" class="warning-text">You have reached your character
                limit.
              </div>
              <div class="c-Count">{{ characterCountDes }} / {{ maxCharactersDes }}</div> -->
              <div class="selectboxes">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="visual" />
                  <label class="form-check-label" for="visual">
                    Visual Impairment
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="auditory" />
                  <label class="form-check-label" for="auditory">
                    Auditory Impairment
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="physical" />
                  <label class="form-check-label" for="physical">
                    Mobility/Physical Impairment
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="learning" />
                  <label class="form-check-label" for="learning">
                    Learning Impairment
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="intellectual" />
                  <label class="form-check-label" for="intellectual">
                    Intellectual Disability
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="psychiatric" />
                  <label class="form-check-label" for="psychiatric">
                    Psychiatric Disability
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="medical" />
                  <label class="form-check-label" for="medical">
                    Medical Disability
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="Othertext" v-model="isChecked" />
                  <label class="form-check-label" for="Othertext">
                    Other
                  </label>
                </div>

                <div v-if="isChecked" class="mt-2">
                  <input v-model="requirementsOptionDescription" @input="checkDesCharacterLimit"
                    :maxlength="maxCharactersDes" name="accessibility" id="" type="text" class=" form-control "
                    placeholder="e.g. physical disability, mental disability" />
                  <div v-if="characterCountDes >= maxCharactersDes" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>
              </div>

              <div class="pb-5 pt-3">
                <label for="language" class="pb-2">Speak a language other than English</label>

                <select v-model="selectedLanguage" id="language" class="form-select">
                  <option value="">Select a language</option>
                  <option v-for="language in languages" :key="language" :value="language">
                    {{ language }}
                  </option>
                </select>

                <div v-if="selectedLanguage === 'Other'" class="mt-3">
                  <!-- <label for="otherLanguage" class="pb-2">Other language:</label> -->
                  <input type="text" v-model="otherLanguage" id="otherLanguage" class="form-control"
                    @input="otherLanCharacterLimit" :maxlength="maxCharactersOtherLan"
                    placeholder="e.g. vietnamese, spanish" />
                  <div v-if="otherLanCharacter >= maxCharactersOtherLan" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>
              </div>




            </div>
          </template>

          <template v-if="currentStep === 4">
            <div class="summ">
              <p class="h4 text-center mb-3 mt-2">Summary</p>
              <h4 class="d-inline"><b>Area of Law:</b></h4>
              <p class="areas text-decoration-none badge text-white fs-6 bubbles">
                {{ areas[selectedAreaIndex].title }}
              </p>
              <h4 class="line-break "><b>{{ title }}</b>
              </h4>
              <!-- <p></p> -->
              <!-- <h4>Description</h4> -->
              <!-- <p></p> -->
              <h4 class="line-break">{{ description }}</h4>

              <h4><b>Location</b>: {{ locations[selectedLocationIndex].title }}, {{ city }}</h4>
              <!-- <h4><b>State/Territory</b></h4> -->
              <!-- <h4></h4> -->
              <!-- <h4>City</h4> -->
              <!-- <h4>{{ city }}</h4> -->
              <h4 class="d-inline"><b>Accessibility Requirements: </b></h4>
              <h4 class="d-inline line-break">
                {{ requirementsOption ? requirementsOptionDescription : "No" }}
              </h4>
            </div>
            <!-- <span v-if="requirementsOption">
              <h4>Accessibility Requirements Details</h4>
              <p>{{ requirementsOptionDescription }}</p>
            </span> -->
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
            <!-- Pagination Indicator -->
            <span v-if="currentStep !== 4" class="pagination-indicator">
              {{ currentStep + 1 }}/{{ totalSteps }}
            </span>

            <div>
              <button v-if="currentStep !== 0" type="button" class="btn btn-dark mr" @click="prevStep">
                Previous
              </button>
              <button v-if="currentStep !== 3 && currentStep !== 4" type="submit" class="btn btn-dark">
                Next
              </button>

              <button v-if="currentStep === 3" type="submit" class="btn btn-dark">
                Summary
              </button>

              <button v-if="currentStep === 4" @click="submitStepForm" type="button" class="btn btn-dark">
                Submit
              </button>
            </div>
          </div>

          <!-- <pre>{{ values }}</pre> -->
        </form>
      </div>
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
    ClientHeader,
    MainFooter,
  },
  data() {
    return {
      currentStep: 0,
      totalSteps: 4,

      areas: [],
      locations: [],
      selectedLanguage: "",
      otherLanguage: "",
      languages: [
        "Mandarin",
        "Italian",
        "Arabic",
        "Cantonese",
        "Greek",
        "Vietnamese",
        "Spanish",
        "Hindi",
        "Tagalog",
        "German",
        "Korean",
        "Punjabi",
        "Macedonian",
        "French",
        "Indonesian",
        "Filipino",
        "Other",
      ],

      title: "",
      description: "",
      selectedArea: null,
      selectedAreaIndex: null,
      selectedLocationIndex: null,
      city: "",
      requirementsOption: 0,
      requirementsOptionDescription: "",

      isVisible: false,
      isVisibleContact: false,
      // text: "",
      maxCharacters: 2500,
      maxCharactersCity: 50,
      maxTitleCharacters: 50,
      maxCharactersDes: 30,
      isChecked: false,
      maxCharactersOtherLan: 30,
    };
  },

  computed: {
    characterCount() {
      return this.description.length;
    },
    characterCountCity() {
      return this.city.length;
    },
    characterCountTitle() {
      return this.title.length;
    },
    characterCountDes() {
      return this.requirementsOptionDescription.length;
    },
    otherLanCharacter() {
      return this.otherLanguage.length;
    },
  },
  mounted() {
    this.fetchAreas();
    this.fetchLocations();
  },
  methods: {
    nextStep(values) {
      if (
        this.currentStep == 0 &&
        !this.selectedArea &&
        !this.selectedAreaIndex
      ) {
        return false;
      }
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
      (this.title = null),
        (this.description = null),
        (this.selectedArea = null),
        (this.selectedAreaIndex = null),
        (this.city = null),
        (this.requirementsOption = 0),
        (this.requirementsOptionDescription = "");
    },
    async submitStepForm() {
      const formData = {
        title: this.title,
        description: this.description,
        field_id: this.selectedArea,
        location_id: this.locations[this.selectedLocationIndex].id,
        city: this.city,
        accessibility_requirements: this.requirementsOption,
      };
      if (this.requirementsOption == 1) {
        formData.requirements_description = this.requirementsOptionDescription;
      }

      api
        .post("/client/create-job", formData)
        .then(() => {
          this.$swal("Success", "Your job has been posted.", "success").then(
            () => {
              this.changePostJobFormToDefault();
              this.currentStep = 0;
            }
          );
        })
        .catch((error) => {
          this.$swal("Error", error?.response?.data?.error, "error");
          console.log("getResults : ", error?.response?.data?.error);
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
        this.description = this.description.slice(0, this.maxCharacters); // Truncate text to the character limit.
      }
    },
    checkCityCharacterLimit() {
      if (this.characterCountCity > this.maxCharactersCity) {
        this.city = this.city.slice(0, this.maxCharactersCity); // Truncate text to the character limit.
      }
    },
    checkTitleCharacterLimit() {
      if (this.characterCountTitle > this.maxTitleCharacters) {
        this.title = this.title.slice(0, this.maxTitleCharacters); // Truncate text to the character limit.
      }
    },
    checkDesCharacterLimit() {
      if (this.characterCountDes > this.maxDesCharacters) {
        this.requirementsOptionDescription =
          this.requirementsOptionDescription.slice(0, this.maxDesCharacters); // Truncate text to the character limit.
      }
    },
    otherLanCharacterLimit() {
      if (this.otherLanCharacter > this.maxCharactersOtherLan) {
        this.otherLanguage =
          this.otherLanguage.slice(0, this.maxCharactersOtherLan); // Truncate text to the character limit.
      }
    },



    async fetchAreas() {
      try {
        const response = await api.get("/get-active-fields");
        this.areas = response?.data?.allFields;
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },
    async fetchLocations() {
      try {
        const response = await api.get("/get-active-locations");
        this.locations = response?.data?.allLocations;
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },
    setArea(index, id) {
      this.selectedArea = id;
      this.selectedAreaIndex = index;
      // console.log(index,id);
    },
    setLocation() {
      console.log("abc tt oo : ", this.selectedLocationIndex);
    },
  },
};
</script>
<style scoped>
.stepbtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stepbtn .mr {
  margin-right: 10px;
}

.btn {
  padding: 5px 25px;
  border-radius: 20px;
}

.bubbles {
  border-radius: 6px;
  padding: 8px 11px;
  margin: 8px 7px !important;
  cursor: pointer;
  background: black !important;
}

.bubbles:hover {
  background: #363636;
}

.selected_bubble {
  background: #4e4e4e !important;
  color: rgb(255, 255, 255) !important;
  box-shadow: 0px 4px 15px #00000082;
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

.warning-text {
  margin: 10px 0px;
  color: red;
}

.bubbles-other {
  display: block;
}

.des-text {
  min-height: 150px;
}

.short-des {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
}

.c-Count {
  margin: 6px 0px;
  font-size: 14px;
}

.areas {
  position: relative;
  bottom: 2px;
}

h4 {
  font-size: 16px;
}

.line-break {
  line-break: anywhere;
}

.selectboxes .form-check {
  padding-right: 1.5em;
  margin-bottom: 0.25rem;
}

.summ+.stepbtn {
  justify-content: end !important;
}
</style>
