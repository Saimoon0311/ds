<template lang="">
  <div class="hello">
    <AdminHeader />
    <div class="main">
      

      <div class="container">
      <!-- <p class="h4 m-3">Welcome, {{ userName }}</p> -->
      <div data-v-511b78bb="" class="container">
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
              Open
            </button>
          </li>
          <li data-v-511b78bb="" class="nav-item" role="presentation">
            <button
              data-v-511b78bb=""
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              tabindex="-1"
              @click="setStatus('reject')"
            >
              Closed
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
                <p class="mx-auto my-0">
                 No pending lawyer requests found!
                </p>
              </div>

              <div v-else class="border rounded bg-light p-3 d-flex flex-wrap">
                <!-- <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchQuery"
                    @keyup.enter="search"
                    placeholder="Search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="search"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="clearSearch"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                </div> -->

                <span
                  v-if="openJobs.length == 0 && searchQuery != ''"
                  class="text-center w-100"
                  >No pending lawyer requests found!</span>


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
                            <tbody>
                              <tr>
                                <td class="fw-bold">Profile</td>
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
                                <td class="fw-bold">Email</td>
                                <td>{{ item?.email }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Name</td>
                                <td>{{ item?.first_name }} {{ item?.last_name }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Job Title</td>
                                <td>{{ item?.job_title }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Law Firm Name</td>
                                <td>{{ item?.law_firm }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Phone</td>
                                <td>{{ item?.phone }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Website</td>
                                <td>
                                  <a :href="item?.link" target="_blank"
                                    >{{ item?.link }}</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-bold">About</td>
                                <td>{{ item?.about }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Expertise</td>
                                <td v-if="item?.fields.length > 0">
                                  <span v-for="(field, fieldIndex) in item?.fields" :key="fieldIndex" >{{ field?.title}}</span>
                                </td>
                                <td v-else></td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Location</td>
                                <td v-if="item?.locations.length > 0">
                                  <span v-for="(location, locationIndex) in item?.locations" :key="locationIndex" >{{ location?.title}}</span>
                                </td>
                                <td v-else></td>
                              </tr>
                            </tbody>
                          </table>
                        </details>
                      </td>

                      <td class="text-end button-width">
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
                      </td>

                    </tr>
                  </tbody>
                </table>

                <!-- <template v-else>
                  <div class="row">
                    <div
                      v-for="(item, index) in openJobs"
                      :key="index"
                      class="col-md-6"
                      id="28"
                    >
                      <div
                        class="border rounded bg-secondary d-flex justify-content-between text-white p-3 flex-column flex-lg-row mb-3"
                      >
                        <div>
                          <p class="badge bg-dark" title="Area">
                            {{ item?.field?.title }}
                          </p>
                          &nbsp;
                          <p class="badge bg-dark" title="Location">
                            {{ item?.location?.title }}
                          </p>
                          <p>
                            <b>{{ item?.title }}</b>
                          </p>
                          <p
                            id="description28"
                            style="
                              overflow: hidden;
                              text-overflow: ellipsis;
                              
                            "
                          >
                          <b>Job description: </b>
                            {{ item?.description }}
                          </p>
                          <p><b>City/suburb:</b> {{ item?.city }}</p>
                          <p><b>Job No: </b> <span class="smallFont"> {{ item?.identity }} </span> </p>
                          <p >
                            <b>Created: </b>
                          <span class="smallFont"> {{ formatCreatedAt(item.created_at) }}</span> 
                          </p>
                        </div>
                        <div
                          class="d-flex flex-column justify-content-center align-items-center"
                          style="min-width: 110px"
                        >
                          <button
                            @click="submitProposal(item)"
                            class="btn btn-light btn-sm w-100 my-1"
                          >
                            Submit a proposal
                          </button>

                          <button
                            @click="declineJob(item.id)"
                            class="btn btn-danger btn-sm w-100 my-1"
                          >
                            Decline
                          </button>
                          <router-link
                            class="btn btn-dark btn-sm w-100 my-1"
                            to="/request-info"
                            >Message</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </template> -->
              </div>
            </div>
          </div>
          <div
            data-v-511b78bb=""
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div>
              <div
                v-if="openJobs.length == 0 && searchQuery == ''"
                class="border rounded bg-light p-3 d-flex flex-wrap"
              >
                <p class="mx-auto my-0">
                  No pending lawyer requests found!
                </p>
              </div>

              <div v-else class="border rounded bg-light p-3 d-flex flex-wrap">
                <!-- <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchQuery"
                    @keyup.enter="search"
                    placeholder="Search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="search"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="clearSearch"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                </div> -->

                <span
                  v-if="openJobs.length == 0 && searchQuery != ''"
                  class="text-center w-100"
                  >No pending lawyer requests found!</span>


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
                            <tbody>
                              <tr>
                                <td class="fw-bold">Profile</td>
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
                                <td class="fw-bold">Email</td>
                                <td>{{ item?.email }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Name</td>
                                <td>{{ item?.first_name }} {{ item?.last_name }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Job Title</td>
                                <td>{{ item?.job_title }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Law Firm Name</td>
                                <td>{{ item?.law_firm }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Phone</td>
                                <td>{{ item?.phone }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Website</td>
                                <td>
                                  <a :href="item?.link" target="_blank"
                                    >{{ item?.link }}</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-bold">About</td>
                                <td>{{ item?.about }}</td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Expertise</td>
                                <td v-if="item?.fields.length > 0">
                                  <span v-for="(field, fieldIndex) in item?.fields" :key="fieldIndex" >{{ field?.title}}</span>
                                </td>
                                <td v-else></td>
                              </tr>
                              <tr>
                                <td class="fw-bold">Location</td>
                                <td v-if="item?.locations.length > 0">
                                  <span v-for="(location, locationIndex) in item?.locations" :key="locationIndex" >{{ location?.title}}</span>
                                </td>
                                <td v-else></td>
                              </tr>
                            </tbody>
                          </table>
                        </details>
                      </td>

                      <td class="text-end button-width">
                        <div  class="mb-1">
                           {{ capitalizeFirstLetter(item?.admin_approval) }}
                        </div>
                        <!-- <div >
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
                        </div> -->
                      </td>

                    </tr>
                  </tbody>
                </table>

                <!-- <template v-else>
                  <div class="row">
                    <div
                      v-for="(item, index) in openJobs"
                      :key="index"
                      class="col-md-6"
                      id="28"
                    >
                      <div
                        class="border rounded bg-secondary d-flex justify-content-between text-white p-3 flex-column flex-lg-row mb-3"
                      >
                        <div>
                          <p class="badge bg-dark" title="Area">
                            {{ item?.field?.title }}
                          </p>
                          &nbsp;
                          <p class="badge bg-dark" title="Location">
                            {{ item?.location?.title }}
                          </p>
                          <p>
                            <b>{{ item?.title }}</b>
                          </p>
                          <p
                            id="description28"
                            style="
                              overflow: hidden;
                              text-overflow: ellipsis;
                              
                            "
                          >
                          <b>Job description: </b>
                            {{ item?.description }}
                          </p>
                          <p><b>City/suburb:</b> {{ item?.city }}</p>
                          <p><b>Job No: </b> <span class="smallFont"> {{ item?.identity }} </span> </p>
                          <p >
                            <b>Created: </b>
                          <span class="smallFont"> {{ formatCreatedAt(item.created_at) }}</span> 
                          </p>
                        </div>
                        <div
                          class="d-flex flex-column justify-content-center align-items-center"
                          style="min-width: 110px"
                        >
                          <button
                            @click="submitProposal(item)"
                            class="btn btn-light btn-sm w-100 my-1"
                          >
                            Submit a proposal
                          </button>

                          <button
                            @click="declineJob(item.id)"
                            class="btn btn-danger btn-sm w-100 my-1"
                          >
                            Decline
                          </button>
                          <router-link
                            class="btn btn-dark btn-sm w-100 my-1"
                            to="/request-info"
                            >Message</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </template> -->
              </div>
            </div> 
          </div>
          <div
                    v-if="openJobs.length > 0 && currentPage != lastPage"
                    class="text-center mt-3">
                    <button class="btn custom-button" @click="loadMore(pageStatus)">
                      Load More
                    </button>
                  </div>
        </div>
      </div>
    </div>



    </div>
        <div class="footer">
            <MainFooter />
        </div>
  </div>
</template>
<script>
import AdminHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import api from '@/config/api';

export default {
  components: {
    AdminHeader,
    MainFooter
  },

  data() {
    return {
      pageStatus: "pending",
      openJobs: [],
      endpoint: "/admin/all-lawyers",
      // endpoint_search: "/lawyer/search-related-jobs",
    };
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
    async setStatus(status) {
      this.pageStatus = status;
      await this.loadMore(status, true)
    },
    approve(id, index) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: `Are you sure you want to approve this lawyer profile ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Approve`,
        }).then((result) => {
          if (result.isConfirmed) {
            api
              .post("/admin/approve-reject-users", { user_id: id, status: 'approve' })
              .then(() => {
                this.$swal(
                  "Success",
                  `Lawyer has been approved successfully`,
                  "success"
                ).then(async () => {
                  this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
                });
              })
              .catch((error) => {
                console.log("error : ", error);
              });
          }
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },
    reject(id, index) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: `Are you sure you want to reject this lawyer ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Reject`,
        }).then((result) => {
          if (result.isConfirmed) {
            api
              .post("/admin/approve-reject-users", { user_id: id, status: 'reject' })
              .then(() => {
                this.$swal(
                  "Success",
                  `Lawyer has been rejected successfully`,
                  "success"
                ).then(async () => {
                  this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
                });
              })
              .catch((error) => {
                console.log("error : ", error);
              });
          }
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }
  },
  name: "AdminLawyer",
};
</script>
<style scoped>
ul#pills-tab {
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 230px;
}

/* .hello {} */
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

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
  color: white;
  background-color: #000000;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #000000;
}

.text-left {
  text-align: left;
}

.button-width {
  width: 10%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
