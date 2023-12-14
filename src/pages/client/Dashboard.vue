<template lang="">
  <div class="c-main">
    <ClientHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, {{ userName }}</p>
      <p class="m-3" v-if="openJobs.length > 0">
        Here are all the jobs you have posted.
      </p>
      <div data-v-511b78bb="" class="container">
        <div
          v-if="openJobs.length == 0 && searchQuery == ''"
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
                class="nav-link active"
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
                class="nav-link"
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
          <div data-v-511b78bb="" class="tab-content" id="pills-tabContent">
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
                class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
                id="containerActive"
              >
                <span class="text-center w-100">No record found!</span>
              </div>

              <div class="row border rounded bg-light p-3">
                <div
                  v-for="(item, index) in openJobs"
                  :key="index"
                  class="col-md-6"
                  id="30"
                >
                  <div
                    class="border rounded bg-secondary d-flex justify-content-between text-white p-3 flex-column mb-3"
                  >
                    <div class="text-left">
                      <p class="badge bg-dark" title="Area">
                        {{ item?.field?.title }}
                      </p>
                      &nbsp;
                      <p class="badge bg-dark" title="Location">
                        {{ item?.location?.title }}
                      </p>
                      <p class="text-center mt-3 mb-2">
                        <b>{{ item?.title }}</b>
                      </p>
                      <p id="description28" class="descriptionText">
                        <!-- <b>Job description: </b> -->
                        {{ item?.description }}
                      </p>
                      <!-- <p><b>City/suburb:</b> {{ item?.city }}</p> -->
                      <span class="spacer">
                        <p class="smallFont">
                          Posted 
                          <!-- by Username
                          <span class="text-capitalize"
                            >({{ item?.city }})</span
                          > -->
                          on
                          {{ formatCreatedAt(item.created_at) }}
                        </p>
                        <p span class="smallFont">
                          Job No: {{ item?.identity }}
                        </p>
                      </span>

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
                      class="d-flex flex-lg-row justify-content-center align-items-center flex-sm-column"
                      style="min-width: 125px"
                    >
                      <!-- <router-link
                    class="btn btn-light btn-sm w-100 py-2 mb-2"
                    to="/view-proposals"
                    >View Proposals</router-link
                  > -->
                      <button
                        class="btn btn-light btn-sm card-btn my-1 mx-1"
                        @click="goToViewProposals(item?.id)"
                      >
                        View Proposal
                      </button>
                      <button class="btn btn-dark btn-sm card-btn my-1 mx-1" @click="goToMessagePage(item)">
                        View Messages
                      </button>
                      <button class="btn btn-danger btn-sm card-btn my-1 mx-1">
                        View Lawyer's Details
                      </button>
                      <form method="post" action="index.php" class="d-none">
                        <input class="d-none" name="id" value="30" />
                        <button>Cancel Job</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="mt-3 text-center"
              v-if="openJobs.length > 0 && currentPage != lastPage"
            >
              <button class="btn custom-button" @click="loadMore">
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
  <!-- </div> -->
</template>
<script>
import ClientHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";

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

  async created() {
    await this.loadMore();
  },
  computed: {
    userName() {
      return `${this.$store.getters?.loginUser?.first_name} ${this.$store.getters?.loginUser?.last_name}`;
    },
  },
  methods: {

    goToMessagePage(item){
      // this.$store.commit('SET_USERTOCHAT',item?.owner);
      this.$store.commit('SET_JOBIDTOCHAT',item?.id);
      
      // if(!item?.lawyer_chat){
      //   this.$store.commit('SET_CHATSTATUS','new');
      // }else{
      //   this.$store.commit('SET_CHATSTATUS','old');
      // }
      // localStorage.setItem('userEmailToChat',userEmail);
      this.$router.push({ path : "/chat" });
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

    goToViewProposals(id) {
      this.$store.commit('SET_LOADMOREPREVDATA',{'currentPage' : this.currentPage, 'lastPage' : this.lastPage, 'openJobs' : this.openJobs});
      console.log('curr : ' , this.currentPage)
      console.log('last : ' , this.lastPage)
      this.$store.commit("SET_JOB_ID", id);
      localStorage.setItem("jobId", id);
      this.$router.push({ path: "/view-proposals" });
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
.nav-pills .show > .nav-link {
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

.descriptionText {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100px;
  /* line-break: anywhere; */
  overflow-y: auto;
  padding-right: 10px;
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
.card-btn {
    width: 30%;
}
p.badge {
    font-size: 14px;
}
.spacer{
  margin: 30px 0;
  display: block;
}
.smallFont {
  font-size: 12px;
  margin: 0 0 5px 0 ;
}

@media only screen and (max-width: 1400px) and (min-width: 992px)  {
  .card-btn{
  width: 33%;
  font-size: 11px;
}
}
@media only screen and (max-width: 1200px) and (min-width: 992px)  {
  .card-btn{
  font-size: 10px;
}
}
@media only screen and (max-width: 992px) {
  .card-btn{
  width: 100%;
}
}
@media only screen and (max-width: 767px) and (min-width: 320px) {
  /* .btn {
    padding: 5px 0px;
    border-radius: 20px;
    min-width: 90px;
    font-size: 14px;
  } */
}
</style>
