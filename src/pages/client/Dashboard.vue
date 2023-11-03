<template lang="">
  <div>
    <ClientHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, test client</p>
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

          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="searchQuery"  @keyup.enter="search" placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2">
            <button class="input-group-text btn custom-button" id="basic-addon2" @click="search"><i class="fa fa-search"></i></button>
            <button class="input-group-text btn custom-button" id="basic-addon2" @click="clearSearch"><i class="fa fa-refresh"></i></button>
          </div>

          <!-- <div class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
              id="containerActive"
               v-if="openJobs.length == 0 && searchQuery != ''">
            <span class="text-center w-100">No record found!</span>
          </div> -->
          <div v-if="openJobs.length == 0 && searchQuery == ''"
              class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
              id="containerActive"
            >
              <span class="text-center w-100"
                >You haven't posted a job. Click here to
                <router-link to="/posting-job" class="btn btn-dark">post a job</router-link></span
              >
            </div>

            <div v-else-if="openJobs.length == 0 && searchQuery != ''"
              class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
              id="containerActive"
            >
            <span class="text-center w-100">No record found!</span>
            </div>


            <div v-else
              class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
              id="containerActive"
            >

              <div  v-for="(item,index) in openJobs" :key="index"
                class="d-flex justify-content-between border rounded bg-secondary text-white m-3 p-3"
                style="width: 35vw"
                id="30"
              >
                <div class="text-left">
                  <p class="badge bg-dark" title="Area">{{ item?.field?.title }}</p>
                  &nbsp;
                  <p class="badge bg-dark" title="Location">{{ item?.location?.title }}</p>
                  <p><b>Serial No:</b> {{ item?.identity }}</p>
                  <p><b>City/suburb:</b> {{ item?.city }} </p>
                  <p><b>Title:</b> {{ item?.title }}</p>
                  <p><b>Created:</b> {{ formatCreatedAt(item.created_at) }} </p>
                  <p
                    id="description30"
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      height: 100px;
                    "
                  >
                    {{ item?.description }}
                  </p>
                  <!-- <details>
                    <summary>More details</summary>
                    <div class="bg-dark border rounded p-3 m-1">
                      <p><b>Posted by:</b> client@mailinator.com</p>
                      <p><b> Deadline:</b> 28-10-2023</p>
                      <p><b> Preferred contact time:</b> after 1:00</p>
                    </div>
                  </details> -->
                </div>
                <div
                  class="d-flex flex-column justify-content-center align-items-center"
                  style="min-width: 110px"
                >
                  <router-link
                    class="btn btn-light btn-sm w-100 py-2 mb-2"
                    to="/view-proposals"
                    >View Proposals</router-link
                  ><button
                    class="btn btn-danger btn-sm w-100 py-2"
                    
                  >
                    Cancel
                  </button>
                  <form method="post" action="index.php" class="d-none">
                    <input class="d-none" name="id" value="30" />
                    <button>Cancel Job</button>
                  </form>
                </div>
              </div>
            </div>
            <div v-if="openJobs.length > 0 && currentPage != lastPage">
              <button class="btn custom-button" @click="loadMore">Load More</button>
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
            <div v-if="closeJobs.length == 0"
              class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
              id="containerClosed"
            >
              <span class="text-center w-100">You haven't accepted any proposals yet.</span>
            </div>
            <!-- if data exist -->
            <div v-else
              class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
              id="containerClosed"
            >
              <div v-for="(item,index) in closeJobs" :key="index"
                class="d-flex justify-content-between border rounded bg-secondary text-white m-3 p-3"
                style="width: 35vw"
                id="30"
              >
                <div>
                  <p class="badge bg-dark" title="Area">{{ item?.field?.title }}</p>
                  &nbsp;
                  <p class="badge bg-dark" title="Location">{{ item?.location?.title }}</p>
                  <p><b>Title:</b> {{ item?.title }}</p>
                  <p><b>Lawyer Name:</b> testing client</p>
                  <p><b>Lawyer Email:</b> testing@mailinator.com</p>
                  <p><b>Phone Number:</b> 0310000000</p>
                  <p
                    id="description30"
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      height: 100px;
                    "
                  >
                    lorem ipsum dummy text description
                  </p>
                  <!-- <details>
                    <summary>More details</summary>
                    <div class="bg-dark border rounded p-3 m-1">
                      <p><b>City/suburb:</b> city</p>
                      <p><b> Deadline:</b> 28-10-2023</p>
                      <p><b> Preferred contact time:</b> after 1:00</p>
                    </div>
                  </details> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import ClientHeader from "./Header.vue";
export default {
  name: "ClientDashboard",
  components: {
    ClientHeader,
  },
  data() {
    return {
      endpoint: "/client/client-jobs",
      // endpoint_search: "/client/search-client-jobs",
    }
  },
  async created() {
    await this.loadMore();
  },
  methods: {
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
  }
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
  background-color: #808080;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #6d6f73;
}

.text-left {
  text-align: left;
}

.btn {
  padding: 5px 20px;
  border-radius: 20px;
}
</style>
