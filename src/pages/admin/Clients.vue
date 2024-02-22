<template lang="">
  <div class="hello">
    <AdminHeader />

    <main class="container my-md-4 my-sm-3">

      <ul
          data-v-511b78bb=""
          class="nav nav-pills mb-3 bg-light border p-2 py-3 rounded"
          id="pills-tab"
          role="tablist"
        >
          <li data-v-511b78bb="" class="nav-item" role="presentation">
            <button
              data-v-511b78bb=""
              class="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              @click="setStatus('pending')"
            >
              Active 
            </button>
          </li>
          <li data-v-511b78bb="" class="nav-item" role="presentation">
            <button
              data-v-511b78bb=""
              class="nav-link"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="false"
              tabindex="-1"
              @click="setStatus('verify')"
            >
              For Verification
            </button>
          </li>
        </ul>



        <div data-v-511b78bb="" class="tab-content" id="pills-tabContent">
          <div
            data-v-511b78bb=""
            class="tab-pane fade active show"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div>
              <div
                v-if="openJobs.length == 0 && searchQuery == ''"
                class="border rounded bg-light p-3 d-flex flex-wrap"
              >
                <p class="mx-auto my-0" v-if="pageStatus != 'verify'">
                 No clients found.
                </p>
                <p class="mx-auto my-0" v-else>
                  No verification requests found. 
                </p>
              </div>

              <div v-else class="d-flex flex-wrap ">
              <div  class="d-flex flex-wrap align-items-center justify-content-between mb-3 w-100 pt-2">
                <div class="input-group  w-75">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchQuery"
                    @keyup.enter="search(pageStatus)"
                    placeholder="Search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="search(pageStatus)"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="clearSearch(pageStatus)"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                  
                </div>
                <button @click="generateCsv('client')" class="btn btn-dark btn-sm m-1"><i class="fa fa-plus"></i> Generate CSV </button>
              </div>

                <span
                  v-if="openJobs.length == 0 && searchQuery != ''"
                  class="text-center w-100"
                  >
                  <span v-if="pageStatus != 'verify'">
                    No clients found.
                  </span>
                  <span v-else>
                    No verification requests found. 
                  </span>
                </span>                

                  <table v-else class="table table-striped">
                  <tbody>
                    <tr  v-for="(item, index) in openJobs" :key="index">
                      <td>
                        {{ item?.email }} ({{ item?.first_name }} {{ item?.last_name }})
                        <details class="lawyerSummary">
                          <summary data-open="Less" data-close="More">
                            more
                          </summary>
                          <table class="table table-striped">
                            <tbody v-if="pageStatus != 'verify'">
                              <tr>
                                <td class="fw-normal">Profile</td>
                                <td>
                                  <!-- <img
                                  src=""
                                  alt="profile picture"
                                  width="100"
                                  height="100"
                                /> -->
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Email</td>
                                <td>{{ item?.email }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Name</td>
                                <td>{{ item?.first_name }} {{ item?.last_name }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Job Title</td>
                                <td>{{ item?.job_title }}
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Law Firm Name</td>
                                <td>{{ item?.law_firm }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Phone</td>
                                <td>{{ item?.phone }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Website</td>
                                <td>
                                  <a :href="item?.link" target="_blank"
                                    >{{ item?.link }}</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-normal">About</td>
                                <td>{{ item?.about }}</td>
                              </tr>

                              <tr>
                                <td class="fw-normal">Hear about us</td>
                                <td>{{ item?.hear_about_us }}</td>
                              </tr>

                            </tbody>

                            <tbody v-else style="vertical-align: middle;">
                              <tr>
                                
                                  <th></th>
                                  <th>Current</th>
                                  <th>New</th>
                                  <th></th>
                              </tr>
                              <!-- <tr>
                                <td class="fw-normal">Profile</td>
                                <td> -->
                                  <!-- <img
                                  src=""
                                  alt="profile picture"
                                  width="100"
                                  height="100"
                                /> -->
                                <!-- </td>
                              </tr> -->
                              <tr v-if="item?.first_name_verify != null && item?.first_name_verify != ''">
                                <td><b>First Name</b></td>
                                <td >{{ item?.first_name }}</td>
                                <td>{{ item?.first_name_verify }}</td>
                                <td>
                                  <button class="btn btn-dark btn-sm mx-1" @click="verifyData(index,item?.id,'first_name')">
                                    Verify
                                  </button>
                                  <button class="btn btn-dark btn-sm" @click="declineVerification(index,item?.id,'first_name')">
                                    Decline
                                  </button>
                                </td>
                              </tr>
                              <tr v-if="item?.last_name_verify != null && item?.last_name_verify != ''">
                                <td><b>Last Name</b></td>
                                <td >{{ item?.last_name }}</td>
                                <td>{{ item?.last_name_verify }}</td>
                                <td>
                                  <button class="btn btn-dark btn-sm mx-1" @click="verifyData(index,item?.id,'last_name')">
                                    Verify
                                  </button>
                                  <button class="btn btn-dark btn-sm" @click="declineVerification(index,item?.id,'last_name')">
                                    Decline
                                  </button>
                                </td>
                              </tr>
                            
                            </tbody>
                          </table>
                        </details>
                      </td>
                      <td class="text-end button-width"  v-if="pageStatus != 'verify'">
                        <div class="mb-1">
                           <button class="btn btn-dark btn-sm m-1" @click="changeAccountStatus(item?.id,item?.type,item?.status,pageStatus)">
                            {{ item?.status == 'block' ? 'Unblock' : 'Block' }}
                          </button>
                        </div>
                      </td>

                      <!-- <td class="text-end button-width">
                        <div  class="mb-1">
                          <input
                            class="d-none"
                            name="accept_id"
                            value="23"
                          /><button @click="approve(item?.id,index)" class="btn btn-dark">
                            <i class="bi bi-check-lg"></i> Approve
                          </button>
                        </div>
                        <div >
                          <input
                            class="d-none"
                            name="reject_id"
                            value="23"
                          /><button
                          @click="reject(item?.id,index)"
                            class="btn btn-light"
                            style="border: 1px solid black"
                          >
                            <i class="bi bi-x-lg"></i> Reject
                          </button>
                        </div>
                      </td> -->

                    </tr>
                  </tbody>

                  
                </table>

              </div>
            </div>
          </div>
          
          <div v-if="openJobs.length > 0 && currentPage != lastPage"
                    class="text-center mt-3">
                    <button id="loadMoreButton" class="btn custom-button" @click="loadMore(pageStatus)">
                      Load More
                    </button>
                  </div>
        </div>



      <!-- <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" class="text-center">
              No clients have been signed up yet
            </td>
          </tr>
        </tbody>
      </table> -->
    </main>
        <div class="footer">
            <MainFooter />
        </div>
  </div>
</template>
<script>
import AdminHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import api from '@/config/api';
import $ from 'jquery';
window.$ = window.jQuery = $;

export default {
  components: {
    AdminHeader,
    MainFooter
  },
  name: "AdminLawyer",


  data() {
    return {
      pageStatus: "pending",
      // openJobs: [],
      endpoint: "/admin/all-clients",
      // endpoint_search: "/lawyer/search-related-jobs",

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
        user_id: null,
      },

      options: [],
      selectedOptionIds: [],
      selectedOptionIdsShow: [],

      options_locations: [],
      selectedOptionIds_locations: [],
      selectedOptionIdsShow_locations: [],

    };
  },

  watch: {
    pageStatus(newQuery) {
      console.log('pageStatus : ', newQuery);
    },
  },

  computed: {
    userName() {
      return `${this.$store.getters?.loginUser?.first_name} ${this.$store.getters?.loginUser?.last_name}`;
    },
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionStatus() {
      console.log("ss tt uu : ", this.$store.getters.subscriptionStatus);
      return this.$store.getters.subscriptionStatus;
    },
  },
  async created() {
    await this.loadMore(this.pageStatus);
  },


  methods: {

    // declineVerification(index, id, type) {
    //   this.$swal({
    //     title: "Are you sure?",
    //     text: `Are you sure you want to decline this verification ?`,
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: `Yes, Decline`,
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       api.post('/admin/decline-verification', { id, type })
    //         .then(() => {
    //           this.$swal(
    //             "",
    //             `Verification has been declined.`,
    //             "success"
    //           ).then(async () => {
    //             await this.loadMore(this.pageStatus,true);
    //           });
    //         })
    //         .catch((error) => {
    //           console.log("error : ", error);
    //         });
    //     }
    //   }).catch((error) => {
    //     console.log("error : ", error);
    //   });
    // },


    declineVerification(index, id, type) {
      console.log(id, index);
      this.$swal
        .fire({
          title: "Type decline reason here:",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: async (inputValue) => {
            try {
              const response = await api.post("/admin/decline-verification", { id, type, reason: inputValue });
              console.log("API Response:", response.data);
              return inputValue;
            } catch (error) {
              console.error("API Error:", error);
              this.$swal.showValidationMessage("API Error");
            }
          },
          allowOutsideClick: () => !this.$swal.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (result.isConfirmed) {
              this.$swal(
                "",
                `Verification has been declined.`,
                "success"
              ).then(async () => {
                await this.loadMore(this.pageStatus, true);
              });
            }
          }
        });
    },


    verifyData(index, id, type) {
      this.$swal({
        title: "Are you sure?",
        text: `Are you sure you want to verify this data ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, Verify`,
      }).then((result) => {
        if (result.isConfirmed) {
          api.post('/admin/verify-data', { id, type })
            .then(() => {
              this.$swal(
                "",
                `Data has been verified.`,
                "success"
              ).then(async () => {
                // this.fixLoadMoreAfterDeleteRecord(null, this.pageStatus);
                await this.loadMore(this.pageStatus, true);
              });
            })
            .catch((error) => {
              console.log("error : ", error);
            });
        }
      }).catch((error) => {
        console.log("error : ", error);
      });
    },

    setModalData(keyName, value, user_id) {
      this.form[keyName] = value;
      this.form.user_id = user_id;
      console.log(this.form);
    },

    async setStatus(status) {
      this.pageStatus = status;
      await this.loadMore(status, true)
    },
    closeModal(modalId) {
      $(modalId).modal('hide');
    },

  },

};
</script>
<style scoped>
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    background-color: #000000 !important;
    color: white !important;
}
.nav-pills .nav-link {
    color: black !important;
}
ul#pills-tab {
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 280px;
}


.hello {
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
