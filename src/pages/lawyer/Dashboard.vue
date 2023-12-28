<template lang="">
  <div class="l-main">
    <LawyerHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, {{ userName }}</p>
      <p
        v-if="
          openJobs.length > 0 &&
          adminApproval == 'approve' &&
          subscriptionStatus == 'subscribed' &&
          tab == 'open'
        "
        class="m-3"
      >
        Here are jobs matching your location and practice area.
      </p>
      <p v-if="tab == 'pending'" class="m-3">
        Here are jobs that you have submitted a proposal for. The client is yet
        to choose a lawyer.
      </p>
      <p v-if="tab == 'close'" class="m-3">
        Here are jobs that you have submitted a proposal for. The client has
        chosen a lawyer.
      </p>

      <div data-v-511b78bb="" class="container">
        <div v-if="adminApproval != 'approve'">
          <p class="h5 m-3 text-center">
            Your profile has not been approved yet.
          </p>
        </div>
        <!-- <div v-else-if="openJobs.length == 0 && searchQuery == '' && tab == 'open'" class="border rounded bg-light p-3 d-flex flex-wrap"> -->
        <div
          v-else-if="!userFields && !userLocations"
          class="border rounded bg-light p-3 d-flex flex-wrap"
        >
          <p class="mx-auto my-0">
            Your profile is not completed . Click here to complete your
            <router-link to="/lawyer-profile" class="btn btn-dark text-white"
              >Profile</router-link
            >
          </p>
        </div>
        <div v-else-if="subscriptionStatus != 'subscribed' && subscriptionStatus != 'incomplete'">
          <div class="alert alert-danger text-center m-0 p-2">
            You have not subscribed yet.
            <router-link to="/plans" class="btn btn-dark text-white"
              >Subscribe now</router-link
            >
          </div>
        </div>
        <div v-else-if="subscriptionStatus == 'incomplete'">
          <div class="alert alert-danger text-center m-0 p-2">
            Incomplete subscription due to payment failed.
            <router-link to="/lawyer-account" class="btn btn-dark text-white"
              >Modify subscription</router-link
            >
          </div>
        </div>

        <div v-else>
          <ul
            data-v-511b78bb=""
            class="nav nav-pills mb-3 bg-light border p-2 py-3 rounded"
            id="pills-tab"
            role="tablist"
          >
            <li data-v-511b78bb="" class="nav-item" role="presentation">
              <button
                data-v-511b78bb=""
                :class="{ 'nav-link' : true, 'active' : tab == 'open' }"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                @click="changeTab('open')"
              >
                Open
              </button>
            </li>
            <li data-v-511b78bb="" class="nav-item" role="presentation">
              <button
                data-v-511b78bb=""
                :class="{ 'nav-link' : true, 'active' : tab == 'pending' }"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                tabindex="-1"
                @click="changeTab('pending')"
              >
                Pending
              </button>
            </li>
            <li data-v-511b78bb="" class="nav-item" role="presentation">
              <button
                data-v-511b78bb=""
                :class="{ 'nav-link' : true, 'active' : tab == 'close' }"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                tabindex="-1"
                @click="changeTab('close')"
              >
                Closed
              </button>
            </li>
            <!-- <li data-v-511b78bb="" class="nav-item" role="presentation">
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
              @click="changeTab('reject')"
            >
              Reject
            </button>
          </li> -->
          </ul>

          <!-- <div
            data-v-511b78bb=""
            class="tab-pane fade active show"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          > -->

          <div>
            <div>
              <!-- Conditions Documentation :
              if : openJobs.length == 0 && searchQuery == '' (if no data , no search)
                No potential jobs found that match your profile. Click here to amend your
              else
                show search
                if : openJobs.length == 0 && searchQuery != '' (if no data come from search result)
                  No record found!
                else :
                  listing -->

              <!-- <div
                v-if="
                  openJobs.length == 0 && searchQuery == '' && tab == 'open'
                "
                class="border rounded bg-light p-3 d-flex flex-wrap mb-2"
              >
                <p class="mx-auto my-0">
                  No potential jobs found that match your profile. Click here to
                  amend your
                  <router-link
                    to="/lawyer-profile"
                    class="btn btn-dark text-white"
                    >Profile</router-link
                  >
                </p>
              </div> -->


              <div
                v-if="
                  openJobs.length > 0 &&
                  tab == 'close'
                "
                class="d-flex flex-wrap mb-2 justify-content-end"
                >
                  <button @click="deleteAllRejected" class="btn btn-danger btn-sm my-1 mx-1">
                    Clear All Rejected Proposals
                  </button>
                </div>

                <div
                  v-if="
                    openJobs.length == 0 &&
                    searchQuery == '' &&
                    tab != 'open' &&
                    tab != 'close'
                  "
                  class="border rounded bg-light p-3 d-flex flex-wrap mb-2"
                >
                  <p class="mx-auto my-0">You have no pending jobs.</p>
                  
                </div>

              <div
                v-else-if="
                  openJobs.length == 0 && searchQuery == '' && tab == 'close'
                "
                class="border rounded bg-light p-3 d-flex flex-wrap"
              >
                <p class="mx-auto my-0">You have no accepted proposals yet.</p>
                <!-- <button  class="btn btn-danger btn-sm my-1 mx-1 d-none"> Clear All Rejected Proposals </button> -->
              </div>
              <div
                v-else-if="
                  openJobs.length == 0 && searchQuery == '' && tab == 'open'
                "
                class="border rounded bg-light p-3 d-flex flex-wrap"
              >
                <p class="mx-auto my-0">There are no jobs available in your area.</p>
                <!-- <button  class="btn btn-danger btn-sm my-1 mx-1 d-none"> Clear All Rejected Proposals </button> -->
              </div>

              <div
                v-else
                class=" px-2 py-3 d-flex flex-wrap align-center justify-content-center"
              >
                <div class="input-group mb-3 search-field">
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
                </div>

                <span
                  v-if="openJobs.length == 0 && searchQuery != ''"
                  class="text-center w-100"
                  >No record found!</span
                >

                <template v-else>
                  <div class="row w-100">
                    <div
                      v-for="(item, index) in openJobs"
                      :key="index"
                      class="col-md-12"
                      id="28"
                    >
                      <div
                        class="border rounded d-flex justify-content-between text-white flex-column mb-3 pb-3 bg-light"
                      >
                        <div>
                          <div class="p-3 card-top">
                            <div>
                              <p class="badge" title="Area">
                                {{ item?.field?.title }}
                              </p>

                              &nbsp;
                              <p class="badge" title="Location">
                                {{ item?.location?.title }}
                              </p>
                              &nbsp;
                            </div>
                            <div>
                              <p span class="smallFont">
                                <b>Job No: </b>{{ item?.identity }}
                              </p>
                            </div>
                          </div>
                          <div class="p-3">
                            <div
                              class="card-body d-flex align-items-start justify-content-between"
                            >
                              <p class="text-left text-black title">
                                {{ item?.title }}
                              </p>
                              <div v-if="tab == 'pending' || tab == 'close'">
                                <p
                                  class="badge border text-black tag"
                                  v-if="tab == 'pending'"
                                >
                                  Submitted
                                </p>
                                <p
                                  v-else-if="
                                    item?.proposal != null
                                  "
                                  class="badge border text-black tag"
                                >
                                  <span
                                    v-if="
                                      item?.proposal?.status == 'Accept' ||
                                      item?.proposal?.status == 'accept'
                                    "
                                    >Accepted</span
                                  >
                                  <span
                                    v-if="
                                      item?.proposal?.status == 'Reject' ||
                                      item?.proposal?.status == 'reject'
                                    "
                                    >Rejected</span
                                  >
                                </p>
                              </div>
                            </div>
                            <div
                              id="description"
                              class="descriptionText text-black"
                            >
                              {{ item?.description }}
                            </div>
                          </div>
                            <div class="widthcn">
                              <span class="spacer px-3">
                                <button
                                  v-if="item?.requirement"
                                  :disabled="!item?.requirement"
                                  type="button"
                                  class="btn btn-dark btn-sm custom-pad"
                                  :data-target="`.edit-job-title-modal${index}`"
                                  :data-bs-toggle="`modal${index}`"
                                  data-bs-target="#Accessibility"
                                  @click="
                                    openRequirementsModal(item?.requirement)
                                  "
                                >
                                  Accessibility Requirements{{
                                    !item?.requirement ? ", (N/A)" : ""
                                  }}
                                </button>
                                <p class="smallFont text-black smallFont1">
                                  <b>Posted by: </b>
                                  <span class="text-capitalize">
                                    {{ item?.owner?.first_name }}
                                    {{ item?.owner?.last_name }} ({{
                                      item?.city
                                    }}) on
                                    {{ formatCreatedAt(item.created_at) }}
                                  </span>
                                </p>
                              </span>
                            </div>
                         

                          <!-- modal -->

                          <!-- <p><b>City/suburb:</b> {{ item?.city }}</p> -->

                          <!-- <details>
                            <summary>More details</summary>
                            <div class="bg-dark border rounded p-3 m-1">
                              <p><b>Posted by:</b> mailto:junucyme@mailinator.com</p>
                              <p><b> Deadline:</b> 27-12-2023</p>
                              <p><b> Preferred contact time:</b> Flexible</p>
                            </div>
                          </details> -->
                        </div>
                        <div
                          v-if="item.status != 'close'"
                          class="d-flex flex-lg-row justify-content-center align-items-center flex-sm-column flex-wrap"
                          style="min-width: 150px"
                        >
                          <button
                            @click="submitProposal(item)"
                            v-if="tab == 'open'"
                            class="btn btn-dark btn-sm card-btn my-1 mx-1 border"
                          >
                            Submit a Proposal
                          </button>

                          <button
                            @click="openProposalDetailsModal(item.proposal)"
                            v-if="tab == 'pending' || tab == 'close'"
                            class="btn btn-dark border btn-sm card-btn my-1 mx-1"
                          >
                            View Proposal
                          </button>

                         

                          <!-- <button
                          v-if="tab == 'close'"
                            class="btn btn-dark btn-sm card-btn my-1 mx-1"
                            @click="goToMessagePage(item)"
                          >
                            View Messages
                          </button> -->

                          <button
                            class="btn btn-dark btn-sm card-btn my-1 mx-1 opacity-75"
                            @click="goToMessagePage(item,'lawyer')"
                          >
                          Messages
                          </button>
                          <button
                            v-if="tab == 'open'"
                            @click="declineJob(item.id, index)"
                            class="btn btn-danger btn-sm card-btn my-1 mx-1"
                          >
                            Decline
                          </button>

                          <button
                            v-if="tab == 'pending'"
                            @click="withDrawJob(item.id, index)"
                            class="btn btn-danger btn-sm card-btn my-1 mx-1"
                          >
                            Withdraw
                          </button>

                          <!-- <button
                          v-if="tab == 'close'"
                            class="btn btn-dark btn-sm card-btn my-1 mx-1"
                            @click="goToMessagePage(item)"
                          >
                            View Messages
                          </button> -->

                       
                          

                          

                          
                      

                          <!-- <router-link
                            v-if="tab === 'pending'"
                            class="btn btn-dark btn-sm card-btn my-1 mx-1"
                            to="/request-info"
                            >View Message</router-link
                          > -->
                        </div>


                        <div
                        v-if="tab == 'close'"
                          class="d-flex flex-lg-row justify-content-center align-items-center flex-sm-column flex-wrap"
                          style="min-width: 150px"
                        >

                        <button
                            @click="openProposalDetailsModal(item.proposal)"
                            class="btn btn-dark border btn-sm card-btn my-1 mx-1"
                          >
                            View Proposal
                          </button>

                        <button
                            class="btn btn-dark btn-sm card-btn my-1 mx-1 opacity-75"
                            @click="goToMessagePage(item,'lawyer')"
                          >
                          Messages
                          </button>

                          <button
                            class="btn btn-danger btn-sm card-btn my-1 mx-1"
                            @click="openLawyerDetailsModal(item?.owner)"
                          >
                          View Client Details
                          </button>

                         

                        </div>
                          

                        <!-- <div
                          v-if="tab == 'close'"
                          class="d-flex flex-column justify-content-center align-items-center"
                          style="min-width: 150px"
                        >
                          <button
                          v-if="tab == 'close'"
                            class="btn btn-dark btn-sm card-btn my-1 mx-1"
                            @click="goToMessagePage(item)"
                          >
                            View Messages
                          </button>

                        </div> -->
                      </div>
                    </div>
                  </div>
                </template>

                <!-- <div
              class="d-flex justify-content-between border rounded bg-secondary text-white m-3 p-3"
              style="width: 35vw"
              id="29"
            >
              <div>
                <p class="badge bg-dark" title="Area">Criminal</p>
                &nbsp;
                <p class="badge bg-dark" title="Location">Victoria</p>
                <p><b>City/suburb:</b> karachi</p>
                <p><b>Title:</b> test case</p>
                <p
                  id="description29"
                  style="overflow: hidden; text-overflow: ellipsis; height: 100px"
                >
                  lorem ipsum dummy text
                </p>
                <details>
                  <summary>More details</summary>
                  <div class="bg-dark border rounded p-3 m-1">
                    <p><b>Posted by:</b> mailto:junucyme@mailinator.com</p>
                    <p><b> Deadline:</b> 23-11-2023</p>
                    <p><b> Preferred contact time:</b> Flexible</p>
                  </div>
                </details>
              </div>
              <div
                class="d-flex flex-column justify-content-center align-items-center"
                style="min-width: 110px"
              >
              <router-link
                  class="btn btn-light btn-sm w-100 my-1"
                  to="/proposal"
                  >Submit a proposal</router-link
                ><router-link
                  name="decline"
                  class="btn btn-danger btn-sm w-100 my-1"
                  to=""
                  >Decline</router-link
                ><router-link
                  class="btn btn-dark btn-sm w-100 my-1"
                  to="/request-info"
                  >Request More Info</router-link
                >
              </div>
            </div> -->
              </div>

              <div
                v-if="
                  openJobs.length > 0 &&
                  currentPage != lastPage &&
                  adminApproval == 'approve' &&
                  subscriptionStatus == 'subscribed'
                "
                class="text-center mt-3"
                >
                <!-- <button class="btn custom-button" @click="loadMore">
                  Load More
                </button> -->
                <div  @click="loadMore">
                 
                </div>
              </div>

              <h6 class="text-center" v-if="openJobs.length > 0 && currentPage == lastPage">
                End of results   
              </h6>
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
import LawyerHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";

import api from "@/config/api";
export default {
  components: {
    LawyerHeader,
    MainFooter,
  },
  data() {
    return {
      openJobs: [],
      endpoint: "/lawyer/show-open-related-jobs",
      tab: "open",
      // endpoint_search: "/lawyer/search-related-jobs",
    };
  },

  computed: {
    jobTabName() {
      return this.$store.state.dataTab;
    },
    userFields() {
      console.log("user : ", this.$store.getters?.loginUser);
      return `${this.$store.getters?.loginUser?.fields}`;
    },
    userLocations() {
      return `${this.$store.getters?.loginUser?.locations}`;
    },
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
    await this.loadMore();
    // this.getNextUser();
    window.addEventListener('scroll', this.getNextUser);

    // if(this.jobTabName){
    //   this.setTab(this.jobTabName);
    // }
  },

  // mounted(){
  //   this.getNextUser();
  // },

  beforeUnmount() {
    // Remove the scroll event listener before the component is destroyed
    window.removeEventListener('scroll', this.getNextUser);
  },

  methods: {

    deleteAllRejected(){
      try{
        this.$swal({
          title: "Are you sure?",
          text: `Are you sure you want to delete rejected proposals.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Delete`,
        }).then((result) => {
          if (result.isConfirmed) {
            api.get('/lawyer/decline-rejected-proposals').then(()=>{
              this.$swal(
                        "",
                        `Rejected Proposals Deleted Successfully`,
                        "success"
                      ).then(async () => {
                        this.loadMore(null,true);
                      });
            });
          }
        })
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    getNextUser() {
      if (this.currentPage < this.lastPage) {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        console.log(bottomOfWindow);
        if (bottomOfWindow) {
          this.loadMore();
          if (this.jobTabName) {
            this.setTab(this.jobTabName);
          }
        }
      }
      
    },

    // getNextUser() {
    //   window.onscroll = () => {
    //     let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight  === document.documentElement.offsetHeight;
    //     if (bottomOfWindow) {
    //    this.loadMore();
    // if(this.jobTabName){
    //   this.setTab(this.jobTabName);
    // }
    //     }
    //   }
    // },
    

    async setTab(status) {
      this.tab = status
      if (status == "open") {
        this.endpoint = "/lawyer/show-open-related-jobs";
      } else if (status == "pending") {
        this.endpoint = "/lawyer/show-pending-jobs";
      } else if (status == "close") {
        this.endpoint = "/lawyer/show-approve-jobs";
      }
      this.$store.commit('SET_DATATAB', null);
    },

    async changeTab(status) {
      this.tab = status;
      if (status == "open") {
        this.endpoint = "/lawyer/show-open-related-jobs";
        await this.loadMore(null, true);
        // this.getData(this.endpoint);
      } else if (status == "pending") {
        this.endpoint = "/lawyer/show-pending-jobs";
        await this.loadMore(null, true);
      } else if (status == "close") {
        this.endpoint = "/lawyer/show-approve-jobs";
        await this.loadMore(null, true);
      }
      // else if (status == "reject") {
      //   this.endpoint = '/lawyer/show-reject-jobs';
      //   await this.loadMore(null,true);
      // }
    },

    // async getJobs(){
    //   try {
    //     const response = await api.get('/lawyer/show-related-jobs');
    //     console.log('sundak  :::: ', response?.data?.data);
    //     this.openJobs = response?.data?.data;
    //   } catch (error) {
    //     console.error('Error fetching options:', error);
    //   }
    // },

    submitProposal(item) {
      this.saveJobInfo(item);
      this.$router.push({ path: "/proposal" });
    },

    async declineJob(job_id, index) {
      try {
        this.$swal({
          title: "Are you sure?",
          // text: `Are you sure you want to decline this job, You will not be able to see this anymore.`,
          text: `Are you sure you want to decline this job? Doing so will prevent you from viewing or submitting a proposal for this job.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Decline`,
        }).then((result) => {
          if (result.isConfirmed) {
            api
              .post("/lawyer/decline-job", { job_id: job_id })
              .then(() => {
                this.$swal(
                  "",
                  `You have successfully declined this job.`,
                  "success"
                ).then(async () => {
                  this.fixLoadMoreAfterDeleteRecord(index);
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

    async withDrawJob(job_id, index) {
      try {
        this.$swal({
          title: "Are you sure?",
          // text: `Are you sure you want to withdraw from your proposal on this job, You will not be able to see this anymore.`,
          text: `Are you sure you want to withdraw your proposal for this job? In doing so, your proposal will not be able to be accepted nor will you be able to submit a new proposal.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Withdraw`,
        }).then((result) => {
          if (result.isConfirmed) {
            api
              .get(`/lawyer/withdraw-proposal-by-job/${job_id}`)
              .then(() => {
                this.$swal(
                  "",
                  `You have withdrawn your proposal successfully.`,
                  "success"
                ).then(async () => {
                  this.fixLoadMoreAfterDeleteRecord(index);
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
  },
  name: "DashboardTab",
};
</script>

<style scoped>
ul#pills-tab {
  width: 400px !important;
}

p.tag {
  border-radius: 100px;
  padding: 5px 10px !important;
  border-color: gray !important;
  font-size: 12px;
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

ul#pills-tab {
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 185px;
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

.smallFont {
  font-size: 16px;
  margin: 0;
}

/* .smallFont1 span {
  font-weight: 400: 600;
} */
.smallFont1 {
  font-size: 16px;
  margin: 0 0 5px 0;
  color: black;
}

.search-field {
  padding: 0 13px !important;
}

.descriptionText {
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 20px;
  max-height: 100px;
  /* line-break: anywhere; */
  overflow-y: auto;
  padding-right: 10px;
  margin-right: 5px;
}

.descriptionText::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(217, 217, 217, 1);
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-thumb {
  background-color: rgba(217, 217, 217, 1);
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}

.card-btn {
  width: 32%;
  height: 45px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

p.badge {
  font-size: 14px;
  font-weight: 400;
  border: 1px solid rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin: 0;
}

.card-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px 5px 0 0;
  background: rgba(55, 59, 62, 1);
}

.spacer {
  margin: 20px 0;
  display: block;
  border-top: 1px solid #c7c7c7;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-wrap * {
  color: black;
}

.table-wrap .wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 5px 0;
}

.table-wrap .wrapper p,
.table-wrap .wrapper h6 {
  margin: 0;
}

.table-wrap .wrapper p {
  margin-left: 10px;
}

.table-wrap .wrapper h6 {
  font-weight: 400;
}

.my-swal-container .swal2-close:focus {
  box-shadow: none !important;
}

.my-swal-container .swal2-title {
  font-size: 25px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
}
.search-field{
  width: 50%;
}
@media only screen and (max-width: 1400px) and (min-width: 992px) {
  .card-btn {
    width: 32%;
    font-size: 14px;
    padding: 5px;
  }
}

@media only screen and (max-width: 992px) {
  .card-btn {
    width: 95%;
    font-size: 14px;

  }
  .search-field{
  width: 100%;
}
  .smallFont {
    margin: 5px;
    font-size: 14px;
  }
}

@media only screen and (max-width: 767px) {
  .spacer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
  }
}

@media only screen and (max-width: 600px) {
  p.badge {
    margin-bottom: 10px;
  }

  .l-main {
    padding-bottom: 100px;
  }

  ul#pills-tab {
    width: 290px !important;
  }

  .nav-pills .nav-link {
    font-size: 12px;
  }
}

@media only screen and (max-width: 340px) {
  p.badge {
    font-size: 12px;
  }

  .custom-pad {
    padding: 5px;
    font-size: 13px;
  }
}</style>
