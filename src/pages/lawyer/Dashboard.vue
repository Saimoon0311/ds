<template lang="">
  <div class="hello">
    <LawyerHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, {{ userName }}</p>
      <p v-if="openJobs.length > 0 && adminApproval == 'approve' && subscriptionStatus == 'subscribed'" 
        class="m-3">Here are jobs matching your location and practice area</p>
      
      <div v-if="adminApproval != 'approve'">
        <p class="h5 m-3 text-center">Your profile has not been approved yet.</p>
      </div>
      <div v-else-if="subscriptionStatus != 'subscribed'">
          <div class="alert alert-danger text-center m-0 p-2">
          You have not subscribed yet.
          <router-link to="/subscribe" class="btn btn-link ps-0"
            >Subscribe now</router-link
          >
        </div>
      </div>
      <div v-else>

        <!-- Conditions Documentation :
        if : openJobs.length == 0 && searchQuery == '' (if no data , no search)
          No potential jobs found that match your profile. Click here to amend your
        else
          show search
          if : openJobs.length == 0 && searchQuery != '' (if no data come from search result)
            No record found!
          else :
            listing -->

      
        <div v-if="openJobs.length == 0 && searchQuery == ''"
        class="border rounded bg-light p-3 d-flex flex-wrap">
          <p class="mx-auto my-0">
            No potential jobs found that match your profile. Click here to amend
            your <router-link to="/lawyer-profile">Profile</router-link>
          </p>
        </div>
    

        <div v-else 
        class="border rounded bg-light p-3 d-flex flex-wrap">

        <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="searchQuery"  @keyup.enter="search" placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2">
              <button class="input-group-text btn custom-button" id="basic-addon2" @click="search"><i class="fa fa-search"></i></button>
              <button class="input-group-text btn custom-button" id="basic-addon2" @click="clearSearch"><i class="fa fa-refresh"></i></button>
            </div>

        <span v-if="openJobs.length == 0 && searchQuery != ''"  class="text-center w-100">No record found!</span>

          
          <template v-else>

            <div
            v-for="(item,index) in openJobs" :key="index"
              class="d-flex justify-content-between border rounded bg-secondary text-white m-3 p-3"
              style="width: 35vw"
              id="28"
            >
              <div>
                <p class="badge bg-dark" title="Area">{{ item?.field?.title }}</p>
                &nbsp;
                <p class="badge bg-dark" title="Location">{{ item?.location?.title }}</p>
                <p><b>Serial No:</b> {{ item?.identity }}</p>
                <p><b>City/suburb:</b> {{ item?.city }}</p>
                <p><b>Title:</b> {{ item?.title }}</p>
                <p><b>Created:</b> {{ formatCreatedAt(item.created_at) }} </p>
                <p
                  id="description28"
                  style="overflow: hidden; text-overflow: ellipsis; height: 100px"
                >
                  {{ item?.description }}
                </p>
                <!-- <details>
                  <summary>More details</summary>
                  <div class="bg-dark border rounded p-3 m-1">
                    <p><b>Posted by:</b> junucyme@mailinator.com</p>
                    <p><b> Deadline:</b> 27-12-2023</p>
                    <p><b> Preferred contact time:</b> Flexible</p>
                  </div>
                </details> -->
              </div>
              <div
                class="d-flex flex-column justify-content-center align-items-center "
                style="min-width: 110px"
              >
                <!-- <router-link
                  class="btn btn-light btn-sm w-100 my-1"
                  to="/proposal"
                  >Submit a proposal</router-link
                > -->

                <button @click="submitProposal(item)" class="btn btn-light btn-sm w-100 my-1">Submit a proposal</button>
                
                <!-- <router-link
                  name="decline"
                  class="btn btn-danger btn-sm w-100 my-1"
                  to=""
                  >Decline</router-link> -->
                  <button @click="declineJob(item.id)" class="btn btn-danger btn-sm w-100 my-1">Decline</button>
                <router-link
                  class="btn btn-dark btn-sm w-100 my-1"
                  to="/request-info"
                  >Message</router-link
                >
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
                  <p><b>Posted by:</b> junucyme@mailinator.com</p>
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
        
          <div v-if="openJobs.length > 0 && currentPage != lastPage" class="text-center">
            <button class="btn custom-button" @click="loadMore">Load More</button>
          </div>

        </div>

      
      </div>
  </div>
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
import api from '@/config/api';
export default {
  components: {
    LawyerHeader,
  },
  data() {
    return {
      openJobs: [],
      endpoint: "/lawyer/show-related-jobs",
      // endpoint_search: "/lawyer/search-related-jobs",
    }
  },

  computed: {
    userName() {
      return `${this.$store.getters?.loginUser?.first_name} ${this.$store.getters?.loginUser?.last_name}`;
    },
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionStatus() {
      console.log('ss tt uu : ', this.$store.getters.subscriptionStatus);
      return this.$store.getters.subscriptionStatus;
    }
  },
  async created() {
    await this.loadMore();
  },
  // mounted(){
  //   this.getJobs();
  // },
  methods: {
    // async getJobs(){
    //   try {
    //     const response = await api.get('/lawyer/show-related-jobs');
    //     console.log('sundak  :::: ', response?.data?.data);
    //     this.openJobs = response?.data?.data;
    //   } catch (error) {
    //     console.error('Error fetching options:', error);
    //   }
    // },

    submitProposal(item){
      this.$store.commit('SET_JOB_DATA',item);
      localStorage.setItem('jobData',JSON.stringify(item));
      this.$router.push({ path : '/proposal' });
    },
    async declineJob(job_id) {
      try {
        const response = await api.post('/lawyer/decline-job', { "job_id": job_id });
        console.log('sundak  :::: ', response?.data);
        // this.openJobs = response?.data?.data;
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }
  },
  name: "DashboardTab",
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
</style>
