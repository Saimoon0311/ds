<template>
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
                <button type="button" class="btn btn-dark btn-sm" data-target=".edit-job-title-modal" title="Edit"
                    data-bs-toggle="modal" data-bs-target="#Jobtitle">
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
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#FirmName"
                    data-target=".lawfirm-modal" title="Edit">
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
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#WebsiteModal"
                    data-target=".website-modal" title="Edit">
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
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#PhoneModal"
                    data-target=".edit-phone-modal" title="Edit">
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
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#AboutModal"
                    data-target=".bd-example-modal-lg" title="Edit">
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
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#ConsultationModal"
                    data-target=".edit-consultation-modal" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

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
                <!-- <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button> -->
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="form.remote_consultation"
                        @change="updateProfile('remote_consultation')" id="remote_consultation" />
                    <p>{{ form.remote_consultation ? 'Yes' : 'No' }}</p>
                    <!-- <p>{{ form.remote_consultation }}</p> -->
                </div>
            </td>
        </tr>




        <tr>
            <td class="d-flex align-items-center justify-content-between">
                Mobile friendly:
                <!-- <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button> -->
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="form.mobile_friendly"
                        @change="updateProfile('mobile_friendly')" id="mobile_friendly" />
                    <p>{{ form.mobile_friendly ? 'Yes' : 'No' }}</p>
                </div>
            </td>
        </tr>



        <!-- Areas of Practice -->
        <tr>
            <td class="d-flex align-items-center justify-content-between">
                Areas of Practice:
                <button v-if="!loginUser?.area_insert" type="button" @click="setModal('fields')" class="btn btn-dark btn-sm"
                    data-bs-toggle="modal" data-bs-target="#AreaModal" data-target="#field-modal" title="Edit">
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
                    <span v-for="(item, index) in selectedOptionIdsShow" :key="index">
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
                <button v-if="!loginUser?.state_insert" @click="setModal('locations')" type="button"
                    class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#StateModal"
                    data-target="#location-modal" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>

            <!-- Location Modal -->

            <!-- Location Modal ends here -->

            <td>

                <div v-if="selectedOptionIdsShow_locations.length > 0">
                    <span v-for="(item, index) in selectedOptionIdsShow_locations" :key="index">
                        {{ item.title }}<span v-if="index < selectedOptionIdsShow_locations.length - 1">, </span>
                    </span>
                </div>

                <span class="badge bg-dark mx-1"></span>
            </td>
        </tr>
    </tbody>
</template>
<script>
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
    props:['userData'],

    computed: {
        loginUser() {
            if(!this.userData){
                return this.$store.getters.loginUser;
            }else{
                return this.userData;
            }
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
                    this.fetchUserData();
                    this.closeModal('#AreaModal');
                }).catch((error) => this.$swal("Error", error?.response?.data?.error, "error"));
            } catch (error) {
                this.$swal("Error", error?.response?.data?.error, "error")
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
                    this.fetchUserData();
                    this.closeModal('#StateModal');
                }).catch((error) => this.$swal("Error", error?.response?.data?.error, "error"));
            } catch (error) {
                this.$swal("Error", error?.response?.data?.error, "error")
                // console.error('Error uploading image', error);
            }
        },

        async updateProfile(keyName, modalId = null) {
            let formDataObject = {};

            if (Array.isArray(keyName)) {
                keyName.forEach(element => {
                    if (this.form[element] != null && this.form[element] !== "") {
                        formDataObject[element] = this.form[element];
                    }
                });
            } else {
                if (this.form[keyName] == null || this.form[keyName] === "") {
                    return false;
                }
                formDataObject[keyName] = this.form[keyName];
            }

            console.log('formDataObject:', formDataObject);

            try {
                // Assuming your API expects an object
                api.post('/update-profile', formDataObject).then(res => {
                    if (modalId) {
                        this.closeModal(modalId);
                    }
                    this.$swal("success", "Profile updated successfully", "success").then(() => {
                        this.setUserInStateAndLocalStorage(res);
                    });
                });
            } catch (error) {
                this.$swal("Error", error?.response?.data?.error, "error");
                // console.error('Error uploading image', error);
            }
        },

        closeModal(modalId) {
            $(modalId).modal('hide');
        },

    }
}
</script>
  
<style scoped>

.form-check-input{
  border:1px solid gray !important;
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
