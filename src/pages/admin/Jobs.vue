<template lang="">
  <div class="l-pro-main">
    <AdminHeader />

    <div class="container my-md-4 my-sm-3">
      <!-- <div class="container"> -->

        
      

      <div>

      



    <!-- after subscribe -->
    <main class="container ">
      <br />
      <!-- Table 1 Bids -->
      <!-- <h4 class=" mt-0">Proposals</h4> -->


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
              @click="changeTab('pending')"
            >
              Pending
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
              @click="changeTab('approved')"
            >
              Closed
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
              @click="changeTab('overdue')"
            >
              Overdue
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
              @click="changeTab('withoutarea')"
            >
            Others/Unknown
            </button>
          </li>
        </ul>


    <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      v-model="searchQueryNumberPagination"
      @keyup.enter="searchNumberPaginationData()"
      placeholder="Search..."
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <button
      class="input-group-text btn custom-button"
      id="basic-addon2"
      @click="searchNumberPaginationData()"
    >
      <i class="fa fa-search"></i>
    </button>
    <button
      class="input-group-text btn custom-button"
      id="basic-addon2"
      @click="clearSearchNumberPaginationData()"
    >
      <i class="fa fa-refresh"></i>
    </button>
  </div>

      <div class="table-responsive">
        <table class="table table-bordered table-striped ">
          <thead>
            <tr>
              <th>Job no</th>
              <th class="col-2">Title</th>
              <th v-if="tab != 'withoutarea'">Area of Practice</th>
              <th>State/territory</th>
              <th>City/suburb</th>
              <!-- <th>Proposed Work</th> -->
              <!-- <th>Deadline achievable?</th>
              <th>Free/discounted first consultation?</th> -->
              <th>Created at</th>
              <!-- <th>
                Proposal Status&nbsp;<i
                  class="bi bi-question-circle"
                  onmouseover="showBidStatusInfo()"
                  onmouseout="hideBidStatusInfo()"
                ></i>
                <dl
                  class="d-none position-absolute bg-grey p-3 me-3 border rounded fw-light"
                  id="bidStatusToolTip"
                >
                  <dt>Accepted:</dt>
                  <dd class="ms-3">a client has accepted your Proposal.</dd>
                  <dt>Rejected:</dt>
                  <dd class="ms-3">
                    a client has rejected your Proposal or withdrawn their job.
                  </dd>
                  <dt>Open:</dt>
                  <dd class="ms-3">a client has not chosen a Proposal yet.</dd>
                  <dt>Closed:</dt>
                  <dd class="ms-3">
                    a client has accepted another lawyer's Proposal.
                  </dd>
                </dl>
              </th> -->
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="data_paginated == null || data_paginated.length == 0">
              <td colspan="9" class="text-center">
                No Record Found!
              </td>
            </tr>

            <tr v-else data-v-7525850d="" v-for="(item,index) in data_paginated" :key="index">
            
            <!-- <tr data-v-7525850d=""> -->
              <td data-v-7525850d="">{{ item?.identity }}</td>
              <td data-v-7525850d="">
                <!-- <a data-v-7525850d="" href="jobInfo.php?id=28"> -->
                  {{ item?.title }}
                <!-- </a> -->
              </td>
              <td v-if="tab != 'withoutarea'" data-v-7525850d="">{{ item?.field?.title }}</td>
              <td data-v-7525850d="">{{ item?.location?.title }}</td>
              <td data-v-7525850d="">{{ item?.city }}</td>

              <!-- <td data-v-7525850d="">{{ item?.upfront_payment_status == 'yes' ? 'Yes - $' + item?.upfront_payment : 'No'}}</td> -->
              <!-- <td data-v-7525850d="">{{ item?.description }}</td> -->
              <!-- <td data-v-7525850d="">Yes</td>
              <td data-v-7525850d="">Yes - $100 for 30 minutes</td> -->
              <td>{{ formatCreatedAt(item?.created_at,true) }}</td>
              <!-- <td data-v-7525850d=""><p data-v-7525850d="">{{ item?.status }}</p></td>
                -->
              <!-- <td data-v-7525850d="">
                <button
                  v-if="item?.status == 'Open'"
                  data-v-7525850d=""
                  class="btn btn-sm btn-danger"
                  @click="withdrawProposal(item?.id)"
                >
                  <i  class="bi bi-trash-fill"></i>Withdraw
                  Proposal
                </button>
                <form>
                  <input  class="d-none" name="bidId" /><button
                    
                    class="btn btn-sm btn-danger d-none"
                  >
                    Withdraw Proposal
                  </button>
                </form>
              </td>  -->
              <td>
                <button v-if="tab == 'approved'"
                  @click="reopenJob(item?.id)"
                  type="button" 
                  class="btn btn-sm btn-danger border-0 mx-1 py-1 px-2"
                  data-bs-toggle="tooltip" data-bs-placement="right" title="Reopen job"
                  >
                  <i class="fa fa-undo fs-small"></i>
                </button>
                <button
                  data-v-7525850d=""
                  class="btn btn-sm btn-danger border-0 py-1 px-2"
                  style="background-color: black !important"
                  @click="deleteJob(item?.id)"
                >
                  <i  class="fa fa-trash"></i>
                </button>
                <button
                  v-if="tab == 'open' || tab == 'overdue' || tab == 'withoutarea'"
                  class="btn btn-sm btn-danger border-0 mx-1 py-1 px-2"
                  style="background-color: black !important"
                  @click="openJobDetailModal(item,tab == 'withoutarea' ? true : false)"
                >
                  <i  class="fa fa-eye"></i>
                </button>


                <button
                                    v-if="tab == 'withoutarea'"
                                    type="button"
                                    class="btn btn-sm btn-danger border-0 py-1 px-2"
                                    style="background-color: black !important"
                                    :data-target="`.edit-job-title-modal${index}`"
                                    title="Edit"
                                    data-bs-toggle="modal" :data-bs-target="`#Jobtitle${index}`"
                                    
                                    >
                                    <i class="fa fa-pencil"></i>
                                  </button>
                                  
                                  <!-- @click="setModalData('job_title',item?.job_title,item?.id)" -->

                                  <div
                                    :class="`modal fade edit-job-title-modal${index}`"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="mySmallModalLabel"
                                    aria-hidden="true"
                                    :id="`Jobtitle${index}`"
                                    >
                                    <div class="modal-dialog modal-lg">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">Assign Area of Law</h5>
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
                                        
                                          <div>
                                            <div data-v-2f14f9de="" class="d-flex flex-wrap justify-content-center mb-5" data-v-376ef8ab="">
                                              <!-- class="m-2 text-decoration-none badge text-white fs-6 bubbles" -->
                                              <a v-for="(area, index) in areas" :key="area.id" @click="setArea(index, area.id)" :class="[
                                                'm-2',
                                                'text-decoration-none',
                                                'badge',
                                                'text-white',
                                                'fs-6',
                                                'bubbles',
                                                { selected_bubble: areaIndex === index },
                                              ]">
                                                {{ area.title }}
                                              </a>
                                            </div>
                                          </div>

                                          <div class="text-center">

                                          <button
                                              type="button"
                                              name="job-title-submit"
                                              class="btn btn-dark my-3"
                                              @click="updateArea(item?.id,`#Jobtitle${index}`)"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
              </td>
            </tr>
            <!-- <tr>
              <td><a href="jobInfo.php?id=30">test job</a></td>
              <td>Fixed fee</td>
              <td>$100.00</td>
              <td>Yes - $55.00</td>
              <td>dummy text</td> -->
              <!-- <td>Yes</td>
              <td>No</td> -->
              <!-- <td><p class="text-success fw-bold">Accepted</p></td>
              <td class="text-center">-</td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <!-- for pagination -->
      <CustomPagination v-if="data_paginated != null && data_paginated.length > 0" class="test-page" />
      <!-- for pagination -->

    </main>
    <!-- after data  -->
    <main class="container">
      <!-- Table 2 Request further info -->
      <!-- <h4 class="m-3">Information Requests</h4>
      <table class="table table-bordered m-3 table-striped">
        <thead>
          <tr>
            <th class="col-2">Job title</th>
            <th>Information request</th>
            <th>Client response</th>
            <th>Job status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td  colspan="6" class="text-center">
              You have not requested more information on any jobs yet.
            </td>
          </tr>
          <tr>
            <td><a target="_blank" href="jobInfo.php?id=29">new new new</a></td>
            <td>please give further information</td>
            <td>(No reply yet)</td>
            <td><p>Open</p></td>
            <td>
              <router-link class="btn btn-sm btn-dark mb-1" to="/bidding"
                >Convert to Proposal</router-link
              ><br />
            </td>
          </tr>
          <tr>
            <td><a target="_blank" href="jobInfo.php?id=30">test job</a></td>
            <td>further information</td>
            <td>further information is lorem ipsum dummy text</td>
            <td><p>Open</p></td>
            <td>
              <router-link class="btn btn-sm btn-dark mb-1" to="/bidding"
                >Convert to Proposal</router-link
              ><br /><router-link
                class="btn btn-sm btn-secondary w-100"
                to="/request-info"
                >Request Info</router-link
              >
            </td>
          </tr>
        </tbody>
      </table> -->
    </main>
      </div>
  </div>
  <div class="footer">
      <MainFooter />
    </div>
  </div>
</template>
<script>

import CustomPagination from '@/components/CustomPagination';


import AdminHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";

import api from '@/config/api';

import $ from 'jquery';
window.$ = window.jQuery = $;

export default {
  components: {
    AdminHeader,
    CustomPagination,
    MainFooter
  },

  data(){
    return {
      areas : null,
      area : null,
      areaIndex : null,
      tab : 'open',
      dataUrl : '/admin/show-open-jobs',
    }
  },

  computed: {
    // adminApproval() {
    //   return this.$store.getters.adminApprovalStatus;
    // },
    // subscriptionStatus() {
    //   return this.$store.getters.subscriptionStatus;
    // },
  },

  watch: {
    // for pagination
    currentPaginationPage() {
      console.log('watch run');
      this.getPaginatedData();
    },
    // for pagination
  },

  async mounted() {
    // for pagination
    this.getData();
    this.fetchAreas();
    // for pagination
  },

  beforeUnmount(){
    this.$store.commit('SET_PAGINATION_LAST',null);
    this.$store.commit('set_pagination_page',1);
  },

  methods: {

    closeModal(modalId) {
      $(modalId).modal('hide');
    },

    async fetchAreas() {
      try {
        const response = await api.get("/get-active-fields");
        this.areas = response?.data?.allFields;
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    setArea(index, id) {
      this.area = id;
      this.areaIndex = index;
    },

    updateArea(job_id,modalId){
      console.log(modalId);
      if(job_id && this.area){
        api.post(`/admin/set-job-area`,{"area_id":this.area,"job_id":job_id}).then(() => {
          // console.log(res);
          // console.log(modalId);
          this.closeModal(modalId);
          this.getData()
          // this.getPaginatedData();
        }).catch(error => {
          console.log(error)
        });
      }
    },
    

    async getData(endpoint = null){
      this.$store.commit('SET_ENDPOINT_FOR_PAGINATED_DATA', endpoint ?? this.dataUrl);
      await this.getPaginatedData();
    },
    // withdrawProposal(id) {
    //   api.get(`/lawyer/withdraw-proposal/${id}`).then(() => {
    //     this.getPaginatedData();
    //   }).catch(error => {
    //     console.log(error)
    //   });
    // },

    async clearSearchNumberPaginationData() {
      if (this.searchQueryNumberPagination == "") return false;
      this.clear = true;
      this.data_paginated = [];
      this.searchQueryNumberPagination = "";
      console.log('data url : ', this.dataUrl);
      this.$store.commit('SET_ENDPOINT_FOR_PAGINATED_DATA', this.dataUrl);
      this.getPaginatedData();
      this.clear = false;
    },


    changeTab(status){
      this.$store.commit('SET_PAGINATION_LAST',null);
      this.$store.commit('set_pagination_page',1);
      this.tab = status;
      if(status == "open"){
        this.dataUrl = '/admin/show-open-jobs';
        this.getData('/admin/show-open-jobs');
      }else if(status == "pending"){
        this.dataUrl = '/admin/show-pending-jobs';
        this.getData('/admin/show-pending-jobs');
      }else if(status == "approved"){
        this.dataUrl = '/admin/show-approved-jobs';
        this.getData('/admin/show-approved-jobs');
      }else if(status == "overdue"){
        this.dataUrl = '/admin/show-overdue-jobs';
        this.getData('/admin/show-overdue-jobs');
      }else if(status == "withoutarea"){
        this.dataUrl = '/admin/show-no-field-jobs';
        this.getData('/admin/show-no-field-jobs');
      }
      
    },


    reopenJob(id){
      console.log(id);
      this.$swal({
        title: 'Are you sure?',
        text: "You want to reopen this job ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reopen',
      }).then((result) => {
        if (result.isConfirmed) {
          api.get(`/admin/reopen-job/${id}`)
            .then(() => {
              this.$swal(
                '',
                'Job has been reopen successfully',
                'success'
              ).then(() => {
                this.getPaginatedData();
              });
            }).catch((error) => {
              this.$swal('', error?.response?.data?.error, 'error');
            });
        }
      })
    },



    deleteJob(id){
      console.log(id);
      this.$swal({
        title: 'Are you sure?',
        text: "You want to delete this job ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete',
      }).then((result) => {
        if (result.isConfirmed) {
          api.delete(`/admin/delete-job/${id}`)
            .then(() => {
              this.$swal(
                'Deleted!',
                'Job has been deleted.',
                'success'
              ).then(() => {
                this.getPaginatedData();
              });
            }).catch((error) => {
              this.$swal('', error?.response?.data?.error, 'error');
            });
        }
      })
    }
  },
  name: "AdminLawyer",
};
</script>
<style scoped>



.bubbles {
  border-radius: 6px;
  padding: 8px 11px;
  margin: 5px !important;
  cursor: pointer;
  background: black !important;
  font-weight: 500;
}
.btn-check:focus+.btn, .btn:focus{
  box-shadow: none;
}
.bubbles:hover {
  background: #363636;
}

.selected_bubble {
  background: #4e4e4e !important;
  color: rgb(255, 255, 255) !important;
  box-shadow: 0px 4px 15px #00000082;
}

ul#pills-tab {
  width: 600px !important;
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: white;
    background-color: #000000;
}
ul#pills-tab {
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    width: 330px;
}
.nav-pills .nav-link, .nav-link:focus, .nav-link:hover {
    color: #000000;
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

.l-pro-main {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
@media only screen and (max-width: 767px) {
  ul#pills-tab {
    width: auto !important;
    max-width: 100%;
}
}
@media only screen and (max-width: 600px) {
  ul#pills-tab {
    width: auto !important;
    max-width: 100%;
}
button.px-2 {
    font-size: 12px;
}
.test-page{ 
    padding-bottom: 30px;
}
}
</style>
