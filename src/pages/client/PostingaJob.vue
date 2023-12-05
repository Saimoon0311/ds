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
                <a v-for="(area, index) in areas" :key="area.id" @click="setArea(index, area.id)" :class="[
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

                <a @click="setAreaFunc"
                  class="m-2 text-decoration-none badge text-black fs-6 bubbles bubbles-other text-white" :class="[
                                      'm-2',
                                      'text-decoration-none',
                                      'badge',
                                      'text-white',
                                      'fs-6',
                                      'bubbles',
                                      'bubbles-other',
                                      { selected_bubble: otherAreaSelected },
                                    ]" data-v-2f14f9de="">
                  Other (not listed here) / I don't know
                </a>
              </div>
            </div>
          </template>

          <template v-if="currentStep === 1">
            <p class="h4 text-center mb-3 mt-3">Job Description</p>
            <div class="mb-3">
              <!-- <h4 class="d-inline"><b>Area of Law:</b></h4> -->
              <label>Area of Law:&nbsp; </label>
              <p class="text-decoration-none badge text-white fs-6 bubbles area-bubble">
                {{ otherAreaSelected ? "Other (not listed here) / I don't know" : areas[selectedAreaIndex].title }}
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
            <div class="mb-3">
              <label for="city" class="mb-3 d-block">Do you have any accessibility requirements, such as a disability
                or speaking a language other than English?</label>
              <input type="radio" id="yes" name="requirements" value="1" v-model="requirementsOption" />
              <label for="yes" class="req-label"> Yes</label><br />
              <input type="radio" id="no" name="requirements" value="0" v-model="requirementsOption" @change="changeRequirementStatus" />
              <label for="no" class="req-label mb-2"> No</label><br />
            </div>
            <div v-if="requirementsOption == 1">
              <label for="job" class=" mb-2">Please describe your accessibility requirement.</label>

              <div class="selectboxes">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="visual" v-model="VisualIsChecked" />
                  <label class="form-check-label" for="visual">
                    Visual Impairment
                  </label>
                </div>

                <div v-if="VisualIsChecked" class="mt-2 mb-2">
                  <input v-model="visualOption" @input="checkVCharacterLimit" :maxlength="maxCharactersV"
                    name="accessibility" id="" type="text" class=" form-control " placeholder="" />
                  <div v-if="characterCountV >= maxCharactersV" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="auditory" v-model="AuditoryIsChecked" />
                  <label class="form-check-label" for="auditory">
                    Auditory Impairment
                  </label>
                </div>

                <div v-if="AuditoryIsChecked" class="mt-2 mb-2">
                  <input v-model="auditoryOption" @input="checkAuditoryCharacterLimit" :maxlength="maxCharactersAuditory"
                    name="accessibility" id="" type="text" class=" form-control " placeholder="" />
                  <div v-if="characterCountAuditory >= maxCharactersAuditory" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="physical" v-model="MobilityIsChecked" />
                  <label class="form-check-label" for="physical">
                    Mobility/Physical Impairment
                  </label>
                </div>

                <div v-if="MobilityIsChecked" class="mt-2 mb-2">
                  <input v-model="mobilityOption" @input="checkMobilityCharacterLimit" :maxlength="maxCharactersMobility"
                    name="accessibility" id="" type="text" class=" form-control " placeholder="" />
                  <div v-if="characterCountMobility >= maxCharactersMobility" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="learning" v-model="LearningIsChecked" />
                  <label class="form-check-label" for="learning">
                    Learning Impairment
                  </label>
                </div>

                <div v-if="LearningIsChecked" class="mt-2 mb-2">
                  <input v-model="learningOption" @input="checkLearningCharacterLimit" :maxlength="maxCharactersLearning"
                    name="accessibility" id="" type="text" class=" form-control " placeholder="" />
                  <div v-if="characterCountLearning >= maxCharactersLearning" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="intellectual"
                    v-model="IntellectualIsChecked" />
                  <label class="form-check-label" for="intellectual">
                    Intellectual Disability
                  </label>
                </div>

                <div v-if="IntellectualIsChecked" class="mt-2 mb-2">
                  <input v-model="intellectualOption" @input="checkIntellectualCharacterLimit"
                    :maxlength="maxCharactersIntellectual" name="accessibility" id="" type="text" class="form-control "
                    placeholder="" />
                  <div v-if="characterCountIntellectual >= maxCharactersIntellectual" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="psychiatric"
                    v-model="PsychiatricIsChecked" />
                  <label class="form-check-label" for="psychiatric">
                    Psychiatric Disability
                  </label>
                </div>

                <div v-if="PsychiatricIsChecked" class="mt-2 mb-2">
                  <input v-model="psychiatricOption" @input="checkPsychiatricCharacterLimit"
                    :maxlength="maxCharactersPsychiatric" name="accessibility" id="" type="text" class="form-control "
                    placeholder="" />
                  <div v-if="characterCountPsychiatric >= maxCharactersPsychiatric" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="medical" v-model="MedicalIsChecked" />
                  <label class="form-check-label" for="medical">
                    Medical Disability
                  </label>
                </div>

                <div v-if="MedicalIsChecked" class="mt-2 mb-2">
                  <input v-model="medicalOption" @input="checkMedicalCharacterLimit" :maxlength="maxCharactersMedical"
                    name="accessibility" id="" type="text" class="form-control " placeholder="" />
                  <div v-if="characterCountMedical >= maxCharactersMedical" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="Othertext" v-model="isChecked" />
                  <label class="form-check-label" for="Othertext">
                    Other
                  </label>
                </div>

                <!-- <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="language" />
                  <label class="form-check-label" for="language">
                    Speak a language other than English
                  </label>
                </div> -->

                <div v-if="isChecked" class="mt-2 mb-2">
                  <input v-model="requirementsOptionDescription" @input="checkDesCharacterLimit"
                    :maxlength="maxCharactersDes" name="accessibility" id="" type="text" class=" form-control "
                    placeholder="" />
                  <div v-if="characterCountDes >= maxCharactersDes" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>
              </div>

              <div class="  form-check">
                <input class="form-check-input" type="checkbox" value="" id="language" v-model="languageIsChecked" />
                <label class="form-check-label mb-2" for="language">
                  Speak a language other than English
                </label>
              </div>

              <div class="pb-5">
                <select v-if="languageIsChecked" v-model="selectedLanguage" id="language" class="form-select">
                  <option value="">Select a language</option>
                  <option v-for="language in languages" :key="language" :value="language">
                    {{ language }}
                  </option>
                </select>

                <div v-if="selectedLanguage === 'Other' && languageIsChecked" class="mt-3">
                  <!-- <label for="otherLanguage" class="pb-2">Other language:</label> -->
                  <input type="text" v-model="otherLanguage" id="otherLanguage" class="form-control"
                    @input="otherLanCharacterLimit" :maxlength="maxCharactersOtherLan" placeholder="" />
                  <div v-if="otherLanCharacter >= maxCharactersOtherLan" class="warning-text">
                    You have reached your character limit.
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="currentStep === 4">
            <div class="summ mb-3">
              <p class="h4 text-center mb-3 mt-2">Summary</p>
              <!-- <h4 class="d-inline"><b>Area of Law:</b></h4> -->
              <div class="sum-top mb-3">
                <p class="areas text-decoration-none badge text-white fs-6 bubbles area-bubble">
                  {{ otherAreaSelected ? "Other (not listed here) / I don't know" : areas[selectedAreaIndex].title }}
                </p>
                <h4 class=" text-center title-font text-white mt-1 mb-2"><b>{{ title }}</b>
                </h4>
                <h4 class="text-white descriptionText">{{ description }}</h4>
              </div>

              <h4 class="mb-3 text-capitalize"><b>Location</b>: {{ city }}, {{ locations[selectedLocationIndex].title }}
              </h4>
              <!-- <h4><b>State/Territory</b></h4> -->
              <!-- <h4></h4> -->
              <!-- <h4>City</h4> -->
              <!-- <h4>{{ city }}</h4> -->
              <!-- <span v-if="requirementsOption">
                <h4 class="d-inline"><b>Accessibility Requirements: </b></h4>
              </span> -->
              <div v-if="requirementsOption" class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button " type="button" data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne">
                      <b>Accessibility Requirements </b>
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show "
                    aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                      <div v-if="VisualIsChecked">
                        <p><i class="fa fa-check"></i><b> Visual Impairment: </b> {{ visualOption }}</p>
                      </div>

                      <div v-if="AuditoryIsChecked">
                        <!-- <b><p>Auditory Impairment : </p></b>
                <p>{{ auditoryOption }}</p> -->
                        <p><i class="fa fa-check"></i><b> Auditory Impairment: </b> {{ auditoryOption }}</p>

                      </div>

                      <div v-if="MobilityIsChecked">
                        <!-- <b><p>Mobility/Physical Impairment : </p></b>
                <p>{{ mobilityOption }}</p> -->
                        <p><i class="fa fa-check"></i><b> Mobility/Physical Impairment: </b> {{ mobilityOption }}</p>
                      </div>

                      <div v-if="LearningIsChecked">
                        <!-- <b><p>Learning Impairment : </p></b>
                <p>{{ learningOption }}</p> -->
                        <p><i class="fa fa-check"></i><b> Learning Impairment: </b> {{ learningOption }}</p>
                      </div>

                      <div v-if="IntellectualIsChecked">
                        <!-- <b><p>Intellectual Disability : </p></b>
                <p>{{ intellectualOption }}</p> -->
                        <p><i class="fa fa-check"></i><b> Intellectual Disability: </b> {{ intellectualOption }}</p>
                      </div>

                      <div v-if="PsychiatricIsChecked">
                        <!-- <b><p>Psychiatric Disability : </p></b>
                <p>{{ psychiatricOption }}</p> -->
                        <p><i class="fa fa-check"></i><b> Psychiatric Disability: </b> {{ psychiatricOption }}</p>
                      </div>

                      <div v-if="MedicalIsChecked">
                        <!-- <b><p>Medical Disability : </p></b>
                <p>{{ medicalOption }}</p> -->
                        <p><i class="fa fa-check"></i><b> Medical Disability: </b> {{ medicalOption }}</p>
                      </div>

                      <div v-if="isChecked">
                        <p><i class="fa fa-check"></i><b> Other: </b> {{ requirementsOptionDescription }}</p>
                      </div>

                      <div v-if="languageIsChecked">
                        <!-- <b><p>Language : </p></b>
                <p>{{ selectedLanguage }}</p> -->
                        <p><i class="fa fa-check"></i><b> Language: </b> {{ selectedLanguage == 'Other' ? otherLanguage :
                          selectedLanguage }}</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <!-- ---- -->
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
              {{ currentStep + 1 }} of {{ totalSteps }}
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

      otherAreaSelected: false,

      selectedLocationIndex: null,
      city: "",
      requirementsOption: 0,
      requirementsOptionDescription: "",
      visualOption: "",
      auditoryOption: "",
      mobilityOption: "",
      learningOption: "",
      intellectualOption: "",
      psychiatricOption: "",
      medicalOption: "",
      isVisible: false,
      isVisibleContact: false,
      // text: "",
      maxCharacters: 2500,
      maxCharactersCity: 50,
      maxTitleCharacters: 50,
      maxCharactersDes: 30,
      maxCharactersV: 30,
      maxCharactersAuditory: 30,
      maxCharactersMobility: 30,
      maxCharactersLearning: 30,
      maxCharactersIntellectual: 30,
      maxCharactersPsychiatric: 30,
      maxCharactersMedical: 30,
      isChecked: false,
      maxCharactersOtherLan: 30,
      languageIsChecked: false,
      VisualIsChecked: false,
      AuditoryIsChecked: false,
      MobilityIsChecked: false,
      LearningIsChecked: false,
      IntellectualIsChecked: false,
      PsychiatricIsChecked: false,
      MedicalIsChecked: false,
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
    characterCountV() {
      return this.visualOption.length;
    },
    characterCountAuditory() {
      return this.auditoryOption.length;
    },
    characterCountMobility() {
      return this.mobilityOption.length;
    },
    characterCountLearning() {
      return this.learningOption.length;
    },
    characterCountIntellectual() {
      return this.intellectualOption.length;
    },
    characterCountPsychiatric() {
      return this.psychiatricOption.length;
    },
    characterCountMedical() {
      return this.medicalOption.length;
    },
  },
  mounted() {
    this.fetchAreas();
    this.fetchLocations();
  },
  methods: {
    changeRequirementStatus(){
      if(this.requirementsOption = 0){
        this.visualOption = "";
        this.auditoryOption = "";
        this.mobilityOption = "";
        this.learningOption = "";
        this.intellectualOption = "";
        this.psychiatricOption = "";
        this.medicalOption = "";
        this.requirementsOptionDescription = "";
        this.otherLanguage = "";
        this.selectedLanguage = "";
      };
    },
    setAreaFunc() {
      this.selectedArea = null;
      this.selectedAreaIndex = null;
      this.otherAreaSelected = !this.otherAreaSelected;
      // if (this.otherAreaSelected) {
      //   this.nextStep();
      // }
    },
    nextStep(values) {
      if (this.currentStep == 0 && !this.otherAreaSelected && !this.selectedArea && !this.selectedAreaIndex) {
        return false;
      }
      console.log(this.otherAreaSelected, ' : other');
      // if (
      //   this.currentStep == 0 &&
      //   !this.selectedArea &&
      //   !this.selectedAreaIndex
      // ) {
      //   return false;
      // }

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
        visual_impairment: this.visualOption,
        auditory_impairment: this.auditoryOption,
        mobility_impairment: this.mobilityOption,
        learning_impairment: this.learningOption,
        intellectual_disability: this.intellectualOption,
        psychiatric_disability: this.psychiatricOption,
        medical_disability: this.medicalOption,
        other: this.requirementsOptionDescription,
        language: this.selectedLanguage == 'Other' ? this.otherLanguage : this.selectedLanguage

        // accessibility_requirements: this.requirementsOption,
      };
      // if (this.requirementsOption == 1) {
      //   formData.requirements_description = this.requirementsOptionDescription;
      // }

      api
        .post("/client/create-job", formData)
        .then(() => {
          this.$swal("", "Your job has been posted.", "success").then(
            () => {
              this.changePostJobFormToDefault();
              this.currentStep = 0;
              this.$router.push({ path: "/client-dashboard" });
            }
          );
        })
        .catch((error) => {
          this.$swal("", error?.response?.data?.error, "error");
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
    checkVCharacterLimit() {
      if (this.characterCountV > this.maxCharactersV) {
        this.visualOption =
          this.visualOption.slice(0, this.maxCharactersV); // Truncate text to the character limit.
      }
    },
    checkAuditoryCharacterLimit() {
      if (this.characterCountAuditory > this.maxCharactersAuditory) {
        this.auditoryOption =
          this.auditoryOption.slice(0, this.maxCharactersAuditory); // Truncate text to the character limit.
      }
    },
    checkMobilityCharacterLimit() {
      if (this.characterCountMobility > this.maxCharactersMobility) {
        this.mobilityOption =
          this.mobilityOption.slice(0, this.maxCharactersMobility); // Truncate text to the character limit.
      }
    },
    checkLearningCharacterLimit() {
      if (this.characterCountLearning > this.maxCharactersLearning) {
        this.learningOption =
          this.learningOption.slice(0, this.maxCharactersLearning); // Truncate text to the character limit.
      }
    },
    checkIntellectualCharacterLimit() {
      if (this.characterCountIntellectual > this.maxCharactersIntellectual) {
        this.intellectualOption =
          this.intellectualOption.slice(0, this.maxCharactersIntellectual); // Truncate text to the character limit.
      }
    },
    checkPsychiatricCharacterLimit() {
      if (this.characterCountPsychiatric > this.maxCharactersPsychiatric) {
        this.PsychiatricOption =
          this.psychiatricOption.slice(0, this.maxCharactersPsychiatric); // Truncate text to the character limit.
      }
    },
    checkMedicalCharacterLimit() {
      if (this.characterCountMedical > this.maxCharactersMedical) {
        this.medicalOption =
          this.medicalOption.slice(0, this.maxCharactersMedical); // Truncate text to the character limit.
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
      this.otherAreaSelected = false;
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

.pagination-indicator {
  border: 1px solid #000;
  border-radius: 50px;
  padding: 2px 8px;
  font-size: 13px;
}

input[type="checkbox"]:checked {
  filter: grayscale(100%) contrast(200%);
}

.area-bubble {
  /* background: gray !important; */
  margin: 8px 0px !important;
  font-size: 15px !important;
  padding: 6px 7px;
}

.sum-top {
  background-color: #6c757d;
  padding: 15px;
  border-radius: 10px;
}

.title-font {
  font-size: 17px;
}

.descriptionText::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px #0000004d;
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-thumb {
  background-color: #969696;
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}

.descriptionText {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100px;
  /* line-break: anywhere; */
  overflow-y: auto;
  padding-right: 10px;
}

#accordionPanelsStayOpenExample {
  min-width: 30%;
  display: inline-block;
}

#accordionPanelsStayOpenExample h2 button {
  background-color: transparent;
  box-shadow: none;
  padding-bottom: 0px;
  padding-top: 27px;

}

#accordionPanelsStayOpenExample h2 button:focus {
  box-shadow: none;
}

#accordionPanelsStayOpenExample h2 button b {
  font-size: 19px;
  padding-right: 30px;
  color: #000;
}

#accordionPanelsStayOpenExample .accordion-body {
  font-size: 15px;
}

#accordionPanelsStayOpenExample .accordion-body p {
  margin-bottom: 10px !important;
}

#accordionPanelsStayOpenExample .accordion-body p i {
  border: 1px solid #000;
  padding: 5.2px 6px;
  border-radius: 50px;
  font-size: 13px;
}

#accordionPanelsStayOpenExample .accordion-button.collapsed {
  padding-bottom: 25px;
}
</style>
