<template lang="">
  <div class="l-main">
    <LawyerHeader />
    <div class="container">
      <h3 class="mt-3">Profile</h3>
      <h1 v-if="firebaseNoti">{{ firebaseNoti?.title }}</h1>
      <p>
        Please complete this information so Simplawfy and clients can get to
        know you.
      </p>

      <!-- Photo -->
      <div class="d-flex">
        <div>
          <form
            @submit.prevent="uploadImage"
          >
            <label for="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              name="profile_picture"
              class="form-control"
              accept="image/*"
              ref="fileInput"
              required
            />
            <input
              type="submit"
              class="btn btn-dark mt-2"
              name="photo-submit"
              value="Upload"
            />
          </form>
          
        </div>
      </div>

     
      <div
        class="modal fade edit-job-title-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="Jobtitle"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Job Title</h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <!-- <form action="profile.php" method="post"></form> -->
              <div class="form-group">
                <input
                  type="text"
                  name="job-title"
                  maxlength="200"
                  class="form-control"
                  id="phone"
                  v-model="form.job_title"
                />
                <button
                  type="button"
                  name="job-title-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('job_title','#Jobtitle')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade lawfirm-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="FirmName">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Law Firm Name</h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <input
                  type="text"
                  name="lawfirm"
                  class="form-control"
                  id="lawfirm"
                  v-model="form.law_firm"
                />
                <button
                  type="button"
                  name="lawfirm-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('law_firm','#FirmName')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade website-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="WebsiteModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Link to Website
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <input
                  type="text"
                  name="website"
                  class="form-control"
                  id="website"
                  v-model="form.link"
                />
                <button
                  type="button"
                  name="website-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('link','#WebsiteModal')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade edit-phone-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="PhoneModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit phone number
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <input
                  type="tel"
                  name="phone"
                  maxlength="10"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                />
                <button
                  type="button"
                  name="phone-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('phone','#PhoneModal')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade edit-consultation-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="ConsultationModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Consultation Details
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <!-- <div class="form-group">
                <input
                  type="tel"
                  name="phone"
                  maxlength="10"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                />
                <button
                  type="button"
                  name="phone-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('phone','#PhoneModal')"
                >
                  Save changes
                </button>
              </div> -->


          <div class="form-group m-2" id="freeFirstConsultationRadio">
            <label>Consultation type:</label>
            <div class="form-check">
              <input class="form-check-input" v-model="form.consultation_type" type="radio" name="freeFirstConsultation"
                id="freeFirstConsultationYes" value="free" checked="" />
              <label class="form-check-label" for="freeFirstConsultationYes" @click="changeConsultationType('free')">
                Free
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" v-model="form.consultation_type" name="freeFirstConsultation"
                id="freeFirstConsultationNo" value="discounted" />
              <label class="form-check-label" for="freeFirstConsultationNo" @click="changeConsultationType('discounted')">
                Discounted
              </label>
            </div>
          </div>

          <div v-if="form.consultation_type === 'discounted'">
            <div class="form-group my-3" id="div-freeFirstConsultationFee">
              <label for="freeFirstConsultationFee">Fee:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">$</div>
                </div>
                <input type="number" min="1" class="form-control" v-model="form.consultation_amount" name="freeFirstConsultationFee"
                  id="freeFirstConsultationFee" />
              </div>
            </div>
          </div>

          <div class="col-auto" id="div-freeFirstConsultationMinutes">
              <label for="">Time limit:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <input type="number" v-model="form.consultation_time" class="form-control"
                  name="freeFirstConsultationMinutes" id="freeFirstConsultationMinutes" placeholder="E.g. 60" />
                <div class="input-group-prepend">
                  <div class="input-group-text">minutes</div>
                </div>
              </div>
          </div>

          <button
                  type="button"
                  name="phone-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile(['consultation_type','consultation_amount','consultation_time'],'#ConsultationModal')"
                >
                  Save changes
          </button>


            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="AboutModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Tell us a little about yourself
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form action="profile.php" method="post"></form>
              <div class="form-group">
                <input
                  type="text"
                  name="about"
                  class="form-control"
                  id="about"
                  v-model="form.about"
                />
                <button
                  type="button"
                  name="about-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('about','#AboutModal')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="AreaModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Areas of practice
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          
            
            <!-- :options="['Commercial (business)', 'Consumer', 'Criminal','Employment / workers compensation','Environmental','Family','Human rights / constitutional','Immigration','Insurance','Intellectual property','Liquor licensing','Litigation (civil court cases)','Notary public','Personal injury (compensation)','Property (real estate) / construction','Traffic','Wills and estates']"  -->

            <div class="modal-body w-100">

              <!-- <MultiSelectPrime 
              v-model="selectedOptionIds" 
              :options="options" filter 
              optionLabel="title" 
              placeholder="Select Cities"
              :maxSelectedLabels="3" /> -->

              <!-- <Selectic className="mselect"  placeholder="Nothing Selected" multiple 
              :options="options"
              v-model="selectedOptionIds"
              :option-label="opt => opt.text"
              :option-id="opt => opt.id"
              /> -->

              <v-select v-model="selectedOptionIds" :options="options" label="title" multiple></v-select>

              <button @click="saveSelectedFields" class="btn btn-dark my-3">Save changes</button>
              <!-- <form
                @submit="submitForm"
                id="form-bs-select-1"
              ></form>
              <input
                type="submit"
                name="field-submit"
                class="btn btn-secondary my-3"
                value="Save changes"
              /> -->
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="StateModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Select the states/territories you practice in
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body w-100">
              <!-- <Selectic className="mselect  "  placeholder="Nothing Selected" multiple :options="['New South Wales','Victoria','Queensland','Western Australia','South Australia','Tasmania','Australian Capital Territory','Northern Territory']" v-model="selection"/> -->

              <v-select v-model="selectedOptionIds_locations" :options="options_locations" label="title" multiple></v-select>

              <button @click="saveSelectedLocations" class="btn btn-dark my-3">Save changes</button>

              <!-- <form
                action="profile.php"
                method="post"
                id="form-bs-select-2"
              ></form>
              <input
                type="submit"
                name="location-submit"
                class="btn btn-secondary my-3"
                value="Save changes"
              /> -->
            </div>
          </div>
        </div>
      </div>

      <!-- <MultiSelectPrime v-model="selectedOptionIds" :options="options" filter optionLabel="name" placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-20rem" /> -->

      <table class="table table-bordered mt-3 table-striped">
        <tbody>
          <!--  Email -->
          <tr>
            <td class="col-md-3">Email:</td>
            <td>{{ loginUser?.email }}</td>
          </tr>

          <!-- First Name -->
          <tr>
            <td class="col-md-3">First Name:</td>
            <td>{{ loginUser?.first_name }}</td>
          </tr>

          <!-- Last Name -->
          <tr>
            <td class="col-md-3">Last Name:</td>
            <td>{{ loginUser?.last_name }}</td>
          </tr>

          <!-- Job Title -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Job Title:
              <button
                type="button"
                class="btn btn-dark btn-sm"
                data-target=".edit-job-title-modal"
                title="Edit"
                data-bs-toggle="modal" data-bs-target="#Jobtitle"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td>
              {{ loginUser?.job_title }}
            </td>
          </tr>

          <!-- LawFirm name -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Law Firm Name:
              <button
                type="button"
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal" data-bs-target="#FirmName"
                data-target=".lawfirm-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>
            <!-- Modal -->

            <!-- Modal ends here -->
            <td>
              {{ loginUser?.law_firm }}
            </td>
          </tr>

          <!-- Link to Website -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Link to Website:
              <button
                type="button"
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal" data-bs-target="#WebsiteModal"
                data-target=".website-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>
            <!-- Modal -->

            <!-- Modal ends here -->
            <td>
              {{ loginUser?.link }}
            </td>
          </tr>

          <!-- Phone -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Phone:
              <button
                type="button"
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal" data-bs-target="#PhoneModal"
                data-target=".edit-phone-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td>{{ loginUser?.phone }}</td>
          </tr>

          <!-- About Me -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              About Me:
              <button
                type="button"
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal" data-bs-target="#AboutModal"
                data-target=".bd-example-modal-lg"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td>
              {{ limitedAbout }}
            </td>
          </tr>



          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Consultation:
              <button
                type="button"
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal" data-bs-target="#ConsultationModal"
                data-target=".edit-consultation-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <td>
              <span v-if="loginUser?.consultation_type">
                <b>Type : </b>{{ loginUser?.consultation_type }},
              </span>
              <span v-if="loginUser?.consultation_time">
                <b>Time : </b>{{ loginUser?.consultation_time }},
              </span>
              <span v-if="loginUser?.consultation_amount">  
                <b>Fee : </b>{{ loginUser?.consultation_amount }}
              </span>
              </td>
          </tr>




          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Offer Remote Consultations:
            </td>

            <td>
              <div class="form-check" >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="form.remote_consultation"
                  @change="updateProfile('remote_consultation')"
                  id="remote_consultation"
                />
                <label for="remote_consultation">{{ form.remote_consultation ? 'Yes' : 'No' }}</label>
              </div>
            </td>
          </tr>




          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Mobile friendly:
            </td>

            <td>
              <div class="form-check" >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="form.mobile_friendly"
                  @change="updateProfile('mobile_friendly')"
                  id="mobile_friendly"
                />
                <label for="mobile_friendly">{{ form.mobile_friendly ? 'Yes' : 'No' }}</label>
              </div>
            </td>
          </tr>



          <!-- Areas of Practice -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Areas of Practice:
              <button
                v-if="!loginUser?.area_insert"
                type="button"
                @click="setModal('fields')"
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal" data-bs-target="#AreaModal"
                data-target="#field-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Field Modal -->

            <!-- Field Modal ends here -->

            <td>

              <!-- <MultiSelectPrime 
              v-model="selectedOptionIds" 
              :options="options" filter 
              optionLabel="title" 
              placeholder="Select Cities"
              :maxSelectedLabels="3" /> -->

              <!-- {{ selectedOptionIds }} -->

              <div v-if="selectedOptionIdsShow.length > 0">
                <span v-for="(item,index) in selectedOptionIdsShow" :key="index">
                  {{ item.title }}<span v-if="index < selectedOptionIdsShow.length - 1">, </span>
                </span>
              </div>

              <span class="badge bg-dark mx-1"></span>
            </td>
          </tr>

          <!-- State/Territory -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              State/territory:
              <button
              v-if="!loginUser?.state_insert"
              @click="setModal('locations')"
                type="button"
                class="btn btn-dark btn-sm"
                data-bs-toggle="modal" data-bs-target="#StateModal"
                data-target="#location-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Location Modal -->

            <!-- Location Modal ends here -->

            <td>

              <div v-if="selectedOptionIdsShow_locations.length > 0">
                <span v-for="(item,index) in selectedOptionIdsShow_locations" :key="index">
                  {{ item.title }}<span v-if="index < selectedOptionIdsShow_locations.length - 1">, </span>
                </span>
              </div>

              <span class="badge bg-dark mx-1"></span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-center">
        Your entries are automatically saved, so you can logout when you're
        ready
      </p>
    </div>
    <div class="footer">
      <MainFooter />
    </div>
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";

// import { messaging } from "@/config/firebaseConfig";
// import { onMessage } from "firebase/messaging";


// import Selectic from 'selectic';
import api from "@/config/api.js";
import $ from 'jquery';
window.$ = window.jQuery = $;
export default {
  data() {
    return {
      form: {
        law_firm: null,
        link: null,
        phone: null,
        about: null,
        job_title: null,
        consultation_type: "free",
        consultation_time: null,
        consultation_amount: null,
        remote_consultation: false,
        mobile_friendly: false,
      },
      options: [],
      selectedOptionIds: [],
      selectedOptionIdsShow: [],

      options_locations: [],
      selectedOptionIds_locations: [],
      selectedOptionIdsShow_locations: [],
    };
  },
  components: {
    LawyerHeader,
    MainFooter
    // Selectic
  },
  // watch: {
  //   // Watch for changes in the 'noti' property in the Vuex store
  //   '$store.state.noti': {
  //     handler(newValue) {
  //       if(newValue){
  //          // Handle the changes, for example, display a notification
  //         console.log('noti changed:', newValue);
  //         this.$swal(newValue?.notification?.title, newValue?.notification?.body, 'success');
  //       }
  //     },
  //     immediate: true, // Trigger the handler immediately when the component is created
  //   },
  // },
  computed: {

    // firebaseNoti(){
    //   return this.$store.state.noti;
    // },
  
    loginUser() {
      return this.$store.getters.loginUser;
    },

    limitedAbout() {
      if (this.loginUser && this.loginUser.about) {
        const words = this.loginUser.about.split(' ');
        const limit = 10; // Adjust this to the desired word limit
        if (words.length <= limit) {
          return this.loginUser.about;
        }
        return words.slice(0, limit).join(' ') + '...';
      }
      return '';
    },
  },
  created() {
    this.updateFormProperties();
  },
  mounted() {
    // this.checkMessages();
    this.fetchOptions();
    this.fetchOptions_locations();
  },
  methods: {
    // checkMessages() {
    //   console.log('Message received. -1');
    //   onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload);
    //     // ...
    //   })
    // },
    changeConsultationType(value) {
      this.form.consultation_type = value;
    },

    updateFormProperties() {
      const userData = this.loginUser;
      if (userData) {
        this.form.law_firm = userData.law_firm;
        this.form.link = userData.link;
        this.form.phone = userData.phone;
        this.form.about = userData.about;
        this.form.job_title = userData.job_title;

        this.form.remote_consultation = userData.remote_consultation;
        this.form.mobile_friendly = userData.mobile_friendly;
      }
    },

    setModal($type) {
      if ($type == "fields") {
        this.selectedOptionIds = this.selectedOptionIdsShow;
      } else if ($type == "locations") {
        this.selectedOptionIds_locations = this.selectedOptionIdsShow_locations;
      }
    },
    // fields
    async fetchOptions() {
      try {
        const response = await api.get('/get-active-fields');
        console.log('sundak  :::: ', response?.data?.allFields);
        this.options = response?.data?.allFields;
        this.selectedOptionIds = response?.data?.myFields ?? [];
        this.selectedOptionIdsShow = response?.data?.myFields ?? [];
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },

    // locations
    async fetchOptions_locations() {
      try {
        const response = await api.get('/get-active-locations');
        console.log('sundak  :::: ', response?.data);
        this.options_locations = response?.data?.allLocations;
        this.selectedOptionIds_locations = response?.data?.myLocations ?? [];
        this.selectedOptionIdsShow_locations = response?.data?.myLocations ?? [];
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },

    // fields
    saveSelectedFields() {
      console.log('Selected Option IDs:', this.selectedOptionIds);
      if (this.selectedOptionIds.length == 0) {
        return false;
      }
      try {
        api.post('/lawyer/update-fields', { "ids": this.selectedOptionIds }).then(() => {
          this.$swal("", "Fields updated successfully", "success");
          this.fetchOptions();
          this.fetchUserData();
          this.closeModal('#AreaModal');
        }).catch((error) => this.$swal("", error?.response?.data?.error, "error"));
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error")
        // console.error('Error uploading image', error);
      }
    },


    // locations
    saveSelectedLocations() {
      console.log('Selected Option IDs:', this.selectedOptionIds_locations);
      if (this.selectedOptionIds_locations.length == 0) {
        return false;
      }
      try {
        api.post('/lawyer/update-locations', { "ids": this.selectedOptionIds_locations }).then(() => {
          this.$swal("", "Locations updated successfully", "success");
          this.fetchOptions_locations();
          this.fetchUserData();
          this.closeModal('#StateModal');
        }).catch((error) => this.$swal("", error?.response?.data?.error, "error"));
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error")
        // console.error('Error uploading image', error);
      }
    },

    async uploadImage() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('image', file);
      try {
        api.post('/lawyer/upload-image', formData).then(() => {
          this.$swal("", "Profile Image has been uploaded successfully", "success").then(() => {
            fileInput.value = '';
          });
        })
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error")
        // console.error('Error uploading image', error);
      }
    },





    // async updateProfile(keyName, modalId = null) {
    //   let formDataArray = [];

    //   if (Array.isArray(keyName)) {
    //     keyName.forEach(element => {
    //       if (this.form[element] != null && this.form[element] !== "") {
    //         formDataArray.push({
    //           [element]: this.form[element]
    //         });
    //       }
    //     });
    //   } else {
    //     if (this.form[keyName] == null || this.form[keyName] === "") {
    //       return false;
    //     }
    //     formDataArray.push({
    //       [keyName]: this.form[keyName]
    //     });
    //   }

    //   console.log('formDataArray:', formDataArray);

    //   try {
    //     // Assuming your API expects an array of objects
    //     api.post('/update-profile', formDataArray).then(res => {
    //       if(modalId){
    //         this.closeModal(modalId);
    //       }
    //       this.$swal("success", "Profile updated successfully", "success").then(() => {
    //         this.setUserInStateAndLocalStorage(res);
    //       });
    //     });
    //   } catch (error) {
    //     this.$swal("Error", "Something went wrong, please try again", "error");
    //     // console.error('Error uploading image', error);
    //   }
    // },

    // async updateProfile(keyName, modalId) {
    //   if (this.form[keyName] == null || this.form[keyName] == "") {
    //     return false;
    //   }
    //   const formData = {
    //     [keyName]: this.form[keyName]
    //   }
    //   console.log('jjkk :::: ', formData);
    //   try {
    //     api.post('/update-profile', formData).then(res => {
    //       this.closeModal(modalId);
    //       this.$swal("success", "Profile updated successfully", "success").then(() => {
    //         this.setUserInStateAndLocalStorage(res);
    //       });
    //     })
    //   } catch (error) {
    //     this.$swal("Error", "Something went wrong, please try again", "error")
    //     // console.error('Error uploading image', error);
    //   }
    // },

    closeModal(modalId) {
      $(modalId).modal('hide');
    },
  },
  name: "ProfileTab",
};

</script>

<style scoped>
.form-check-input {
  border: 1px solid gray !important;
}

.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.logo-small {
  width: 175px;
  height: 50px;
}

.law-img {
  width: 15vw;
  height: 15vw;
  border: 1px solid white;
  border-radius: 50%;
}

.navActive {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  color: white;
}

.navbar-nav .left-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.bg-grey {
  background: rgb(0, 0, 0);
  color: white;
}

.bg-grey:hover {
  background: rgb(0, 0, 0);
  color: white;
}

.curtain-handler .fa-caret-down {
  display: none;
}

.mselect .selectic-input .selectic-item_text {
  font-style: normal;
}

.selectic .has-feedback .form-control {
  height: 60px !important;
}

.selectic .curtain-handler .fa-caret-down {
  display: none !important;
}

.l-main {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
