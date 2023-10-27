<template lang="">
  <div class="hello">
    <LawyerHeader />
    <div class="container">
      <h3 class="mt-3">Profile</h3>
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
              class="btn btn-secondary mt-2"
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
                  class="btn btn-secondary my-3"
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
        id="FirmName"
      >
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
                  class="btn btn-secondary my-3"
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
                  class="btn btn-secondary my-3"
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
                  class="btn btn-secondary my-3"
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
                  class="btn btn-secondary my-3"
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

              <button @click="saveSelectedFields" class="btn btn-secondary my-3">Save changes</button>
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

              <button @click="saveSelectedLocations" class="btn btn-secondary my-3">Save changes</button>

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
            <td>



            </td>
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
                class="btn btn-secondary btn-sm"
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
                class="btn btn-secondary btn-sm"
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
                class="btn btn-secondary btn-sm"
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
                class="btn btn-secondary btn-sm"
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
                class="btn btn-secondary btn-sm"
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

          <!-- Areas of Practice -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Areas of Practice:
              <button
                type="button"
                @click="setModal('fields')"
                class="btn btn-secondary btn-sm"
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
              @click="setModal('locations')"
                type="button"
                class="btn btn-secondary btn-sm"
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
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
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
    // Selectic
  },
  computed: {
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
    this.fetchOptions();
    this.fetchOptions_locations();
  },
  methods: {

    updateFormProperties() {
      const userData = this.loginUser;
      if (userData) {
        this.form.law_firm = userData.law_firm;
        this.form.link = userData.link;
        this.form.phone = userData.phone;
        this.form.about = userData.about;
        this.form.job_title = userData.job_title;
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
        console.log('sundak  :::: ', response?.data?.allLocations);
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
          this.$swal("Success", "Fields updated successfully", "success");
          this.fetchOptions();
          this.closeModal('#AreaModal');
        })
      } catch (error) {
        this.$swal("Error", "Something went wrong, please try again", "error")
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
          this.$swal("Success", "Locations updated successfully", "success");
          this.fetchOptions_locations();
          this.closeModal('#StateModal');
        })
      } catch (error) {
        this.$swal("Error", "Something went wrong, please try again", "error")
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
          this.$swal("success", "Profile Image has been uploaded successfully", "success").then(() => {
            fileInput.value = '';
          });
        })
      } catch (error) {
        this.$swal("Error", "Something went wrong, please try again", "error")
        // console.error('Error uploading image', error);
      }
    },

    async updateProfile(keyName, modalId) {
      if (this.form[keyName] == null || this.form[keyName] == "") {
        return false;
      }
      const formData = {
        [keyName]: this.form[keyName]
      }
      console.log('jjkk :::: ', formData);
      try {
        api.post('/update-profile', formData).then(res => {
          this.closeModal(modalId);
          this.$swal("success", "Profile updated successfully", "success").then(() => {
            this.setUserInStateAndLocalStorage(res);
          });
        })
      } catch (error) {
        this.$swal("Error", "Something went wrong, please try again", "error")
        // console.error('Error uploading image', error);
      }
    },

    closeModal(modalId) {
      $(modalId).modal('hide');
    },
  },
  name: "ProfileTab",
};

</script>

<style scoped>
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
  background: grey;
  border: 1px solid grey;
  border-radius: 10px;
  color: white;
}

.navbar-nav .left-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.bg-grey {
  background: grey;
  color: white;
}

.bg-grey:hover {
  background: grey;
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
</style>
