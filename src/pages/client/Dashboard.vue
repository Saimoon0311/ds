<template lang="">
  <div class="c-main">
    <ClientHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, {{ userName }}</p>
      <p class="m-3" v-if="openJobs.length > 0">
        Here are all the jobs you have posted.
      </p>

      <div data-v-511b78bb="" class="container">
        <div>
          <ul
            data-v-511b78bb=""
            class="nav nav-pills mb-3 bg-light border p-2 py-3 rounded"
            id="pills-tab"
            role="tablist"
          >
            <li data-v-511b78bb="" class="nav-item" role="presentation">
              <button
                ref="tabOpenButton"
                data-v-511b78bb=""
                :class="{ 'nav-link': true, active: tab == 'open', 'count_btn' : true }"
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
                <span class="countmsg" v-if="noti_job && noti_job > 0">{{ noti_job }}</span>
              </button>
            </li>
            <li data-v-511b78bb="" class="nav-item" role="presentation">
              <button
                data-v-511b78bb=""
                :class="{ 'nav-link': true, active: tab == 'close'  }"
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
          </ul>
          <div
            v-if="openJobs.length > 0"
            data-v-511b78bb=""
            class="tab-content"
            id="pills-tabContent"
          >
            <div
              data-v-511b78bb=""
              class="tab-pane fade text-center active show"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <!-- <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="searchQuery"  @keyup.enter="search" placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2">
            <button class="input-group-text btn custom-button" id="basic-addon2" @click="search"><i class="fa fa-search"></i></button>
            <button class="input-group-text btn custom-button" id="basic-addon2" @click="clearSearch"><i class="fa fa-refresh"></i></button>
            </div> -->

              <!-- <div class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
              id="containerActive"
               v-if="openJobs.length == 0 && searchQuery != ''">
            <span class="text-center w-100">No record found!</span>
            </div> -->

              <div
                v-if="openJobs.length == 0 && searchQuery != ''"
                class=" p-3 my-3 d-flex flex-wrap"
                id="containerActive"
              >
                <span class="text-center w-100">No record found!</span>
              </div>

              <div class="row p-3">
                <div
                  v-for="(item, index) in openJobs"
                  :key="index"
                  class="col-md-12"
                  id="30"
                >
                  <div
                    class="border rounded d-flex justify-content-between text-white flex-column mb-3 pb-3 card-cus"
                  >
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
                    <!-- <div class="p-3">
                      <div
                        class="card-body d-flex align-items-start justify-content-between"
                      >
                        <p class="text-left text-black title">
                          {{ item?.title }}
                        </p>
                      </div>
                      <div id="description" class="descriptionText text-black text-left">
                        {{ item?.description }}
                      </div>
                    </div> -->


                    <div class="p-3">
                            <div
                              class="card-body d-flex align-items-start justify-content-between"
                            >
                              <p class="text-left text-black title">
                                {{ item?.title }}
                              </p>
                              <span v-if="jobData">
                                <div v-if="tab == 'open' && item?.notifications && item?.notifications.length > 0 && jobData?.id != item.id">
                                  <p
                                    class="badge border btn-danger rounded-pill tag"
                                  >
                                    {{ item?.notifications.length }} New Proposals 
                                  </p>
                                </div>
                              </span>
                              <span v-else>
                                <div v-if="tab == 'open' && item?.notifications && item?.notifications.length > 0">
                                  <p
                                    class="badge border btn-danger rounded-pill tag"
                                  >
                                    {{ item?.notifications.length }} New Proposals 
                                  </p>
                                </div>
                              </span>
                            </div>
                            <div
                              id="description"
                              class="descriptionText text-black"
                            >
                              {{ item?.description }}
                            </div>
                          </div>

                    <div class="widthcn px-3">
                      <span class="spacer ">
                        <p class="smallFont text-black">
                          <b>Posted on: </b> {{ formatCreatedAt(item.created_at) }}
                        </p>
                      </span>
                    </div>
                    <!-- <p><b>City/suburb:</b> {{ item?.city }}</p> -->

                    <div
                      class="d-flex flex-lg-row justify-content-center align-items-center flex-sm-column flex-wrap px-md-0 px-2"
                      style="min-width: 125px"
                    >
                      <!-- <router-link
                    class="btn btn-light btn-sm w-100 py-2 mb-2"
                    to="/view-proposals"
                    >View Proposals</router-link
                  > -->
                      <button
                        class="btn btn-sm btn-dark card-btn my-1 mx-1 border"
                        @click="goToViewProposals(item)"
                      >
                        View Proposal
                      </button>
                      <button
                      v-if="tab == 'open'"
                        :disabled="item?.chats && item?.chats.length == 0"
                        class="btn btn-dark btn-sm card-btn my-1 mx-1 opacity-75"
                        @click="goToMessagePage(item,'client')"
                      >
                        Message
                        {{
                          item?.chats && item?.chats.length == 0
                            ? ", (N/A)"
                            : ""
                        }}
                      </button>
                      <button
                      v-if="tab == 'close'"
                        :disabled="item?.chats && item?.chats.length == 0"
                        class="btn btn-dark btn-sm card-btn my-1 mx-1 opacity-75"
                        @click="goToMessagePage(item,'client')"
                      >
                        View Messages
                        {{
                          item?.chats && item?.chats.length == 0
                            ? ", (N/A)"
                            : ""
                        }}
                      </button>

                      <button 
                            v-if="tab == 'close' && item?.assigned_lawyer != null"
                            class="btn btn-danger btn-sm card-btn my-1 mx-1"
                            @click="openLawyerDetailsModal(item?.assigned_lawyer,item?.assigned_lawyer_id ?? true)"
                          >
                          View Lawyer Details
                          </button>

                    
                      <button v-if="tab == 'open'" @click="declineJob(item.id,index)" class="btn btn-danger btn-sm card-btn my-1 mx-1">
                        Cancel Job
                      </button>


                      <!-- <form method="post" action="index.php" class="d-none">
                        <input class="d-none" name="id" value="30" />
                        <button>Cancel Job</button>
                      </form> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="mt-5 mb-5 text-center"
              v-if="openJobs.length > 0 && currentPage != lastPage"
              >
              <div @click="loadMore">
                <!-- Load More -->
              </div>
            </div>

            <h6 class="text-center" v-if="openJobs.length > 0 && isEndOfResult">
                End of results   
            </h6>
           
          </div>

          <div
            v-if="openJobs.length == 0 && tab == 'open'"
            class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
            id="containerActive"
          >
            <div class="d-flex justify-content-center align-items-center w-100">
              <span class="text-center p-2"
                >You haven't posted a job. Click here to</span
              >
              <router-link to="/posting-job" class="btn btn-dark"
                >Post a Job</router-link
              >
            </div>
          </div>

          <div
            v-if="openJobs.length == 0 && tab == 'close'"
            class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
            id="containerActive"
          >
            <div class="d-flex justify-content-center align-items-center w-100">
              <span class="text-center p-2">You haven't accepted any proposals yet.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <MainFooter />
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import ClientHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import api from '@/config/api';

export default {
  name: "ClientDashboard",
  components: {
    ClientHeader,
    MainFooter,
  },
  data() {
    return {
      endpoint: "/client/client-jobs",
      tab: "open",
      // endpoint_search: "/client/search-client-jobs",
    };
  },

  // async created() {
  //   await this.loadMore();
  //   console.log("job tab ::::: ", this.jobTabName);
  //   if (this.jobTabName) {
  //     this.setTab(this.jobTabName);
  //   }
  // },
  computed: {
    jobData() {
      return this.$store.state.jobData;
    },
    noti_msg() {
      return this.$store.state.noti_count_msg;
    },
    noti_job() {
      return this.$store.state.noti_count_job;
    },
    isEndOfResult() {
      return this.$store.state.endOfResult;
    },
    jobTabName() {
      return this.$store.state.dataTab;
    },
    userName() {
      return `${this.$store.getters?.loginUser?.first_name} ${this.$store.getters?.loginUser?.last_name}`;
    },
  },

  async created() {
    await this.loadMore();
    // this.getNextUser();
    window.addEventListener('scroll', this.getNextUser);

    const button = this.$refs.tabOpenButton;
    button.click(); 

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


    async declineJob(job_id, index) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: `Are you sure you want to cancel this job, You will not be able to see this anymore.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            api
              .post("/client/cancel-job", { job_id: job_id })
              .then(() => {
                this.$swal(
                  "",
                  `Job has been cancel successfully`,
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

    getNextUser() {
      if (this.currentPage < this.lastPage) {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.loadMore();
          if (this.jobTabName) {
            this.setTab(this.jobTabName);
          }
        }
      }
    },


    // goToMessagePage(item) {
    //   this.saveJobInfo(item);
    //   this.saveLoadMoreData();
    //   // this.$store.commit('SET_USERTOCHAT',item?.owner);
    //   this.$store.commit("SET_JOBIDTOCHAT", item?.id);

    //   // if(!item?.lawyer_chat){
    //   //   this.$store.commit('SET_CHATSTATUS','new');
    //   // }else{
    //   //   this.$store.commit('SET_CHATSTATUS','old');
    //   // }
    //   // localStorage.setItem('userEmailToChat',userEmail);
    //   this.$store.commit("SET_DATATAB", this.tab);
    //   this.$router.push({ path: "/messages" });
    // },

    async setTab(status) {
      this.tab = status;
      if (status == "open") {
        this.endpoint = "/client/client-jobs";
      } else if (status == "close") {
        this.endpoint = "/client/client-close-jobs";
      }
      this.$store.commit("SET_DATATAB", null);
    },

    async changeTab(status) {
      this.tab = status;
      if (status == "open") {
        this.endpoint = "/client/client-jobs";
      } else if (status == "close") {
        this.endpoint = "/client/client-close-jobs";
      }
      await this.loadMore(null, true);
    },


    // async getJobs() {
    //   try {
    //     const response = await api.get(`/client/client-jobs`);
    //     console.log('sundak  :::: ', response?.data?.openJobs);
    //     this.openJobs = response?.data?.openJobs;
    //     this.closeJobs = response?.data?.closeJobs;
    //   } catch (error) {
    //     console.error('Error fetching options:', error);
    //   }
    // }
  },
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

.text-left {
  text-align: left;
}

/* .btn {
  padding: 5px 20px;
  border-radius: 20px;
} */

.c-main {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.card-cus {
  box-shadow: 5px 5px 20px #00000017;

}

.descriptionText {
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 20px;
  max-height: 100px;
  /* line-break: anywhere; */
  overflow-y: auto;
  padding-right: 10px;
  white-space: pre-line;
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



p.badge {
  font-size: 14px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
}

.smallFont {
  font-size: 12px;
  margin: 0 0 5px 0;
}

.card-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px 5px 0 0;
  background: rgba(55, 59, 62, 1);
}

p.badge {
  font-size: 0.875rem;
  font-weight: 400;
  border: 1px solid rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  margin: 0;
  line-height: 1.5em;
}

.smallFont {
  font-size: 16px;
  margin: 0;
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
  text-align: start;
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

.spacer {
  margin: 20px 0;
  display: block;
  border-top: 1px solid #c7c7c7;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  .smallFont {
    margin: 5px;
    font-size: 14px;
  }
}

@media only screen and (max-width: 992px) {
  .card-btn {
    width: 95%;
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

@media only screen and (max-width: 767px) and (min-width: 320px) {
  .card-btn {
    width: 95%;
}

  /* .btn {
    padding: 5px 0px;
    border-radius: 20px;
    min-width: 90px;
    font-size: 14px;
  } */
  p.badge {
    margin-bottom: 10px;
    font-size: 12px;
  }

  .p-3.card-top>div {
    text-align: start;
  }
}
</style>
