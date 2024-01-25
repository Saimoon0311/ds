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


      <!-- <ul
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
        </ul> -->


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

  <div data-v-511b78bb="" class="tab-content" id="pills-tabContent">
          <div
            data-v-511b78bb=""
            class="tab-pane fade text-center active show table-over"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
        <table class="table table-layout" id="bidsActive">
              <thead class="">
                <tr>
                  <th class="">Lawyer</th>

                  <th>
                    Fee estimate
                    <i
                      class="bi bi-question-circle"
                      onmouseover="showFeeEstimateInfo()"
                      onmouseout="hideFeeEstimateInfo()"
                    ></i>
                    <dl
                      class="d-none position-absolute bg-grey p-3 me-3 border rounded fw-light"
                      id="feeEstimateInfoToolTip"
                    >
                      <dt>Fee Estimate:</dt>
                      <dd>
                        This is the lawyer's estimate of the total legal costs
                        you are likely to have to pay, based on the information
                        you have provided, what the lawyer has agreed to do and
                        what is usually needed for your type of matter. The
                        amount is in Australian dollars and excludes GST and
                        disbursements (third party expenses which the lawyer
                        passes on to you). The lawyer should provide you with
                        updates, including discussing revising the estimate, if
                        the costs incurred are getting close to the initial
                        estimate.
                      </dd>
                    </dl>
                  </th>

                  <th>Proposed work</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="data_paginated == null || data_paginated.length == 0">
                  <td colspan="8" class="text-center">
                    No active Proposals are available.
                  </td>
                </tr>
                <tr
                  v-else
                  class="text-left border-bottom"
                  v-for="(item, index) in data_paginated"
                  :key="index"
                >
                  <!-- <td>testing client (crinimal)</td> -->
                  <td class="text-center" style="width: 15%">
                    <p
                      @click="
                        openLawyerDetailsModal(
                          item?.lawyer,
                          item?.status.toLowerCase() == 'accept'
                        )
                      "
                      class="lawname btn-dark rounded-pill btn text-capitalize fw-bold px-4 py-1"
                    >
                      {{ item?.lawyer?.first_name }}
                      {{ tab == "Accept" ? item?.lawyer?.last_name : "" }}
                    </p>
                  </td>
                  <!-- <td>{{ item?.charge_type }}</td> -->
                  <td class="text-center" style="width: 30%">
                    <!-- <p class="text-capitalize px-3 py-0 btn-dark rounded-pill btn fw-normal mb-1 font-small">{{ chargeType(item?.charge_type) }} <span data-toggle="tooltip" data-placement="top" title="How you will charge?"><i class="fas fa-info-circle"></i></span></p> -->
                    <p
                      class="text-capitalize px-3 py-0 btn-dark rounded-pill btn fw-normal mb-1 font-small"
                    >
                      {{ chargeType(item?.charge_type) }}
                      <span
                        
                        @click="openModal(item?.charge_type)"
                      >
                        <i class="fas fa-info-circle"></i>
                      </span>
                    </p>

                  <div class="modal" tabindex="-1" role="dialog" ref="myModal">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header charge-modal">
                        <h6>{{ charge_defination }}</h6>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal2">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                                
                      </div>
                    </div>
                  </div>

                    <p class="text-capitalize text-black fw-normal mb-1">
                      {{
                        item?.fixed_fee_amount
                          ? "$" + formatNumber(item?.fixed_fee_amount)
                          : ""
                      }}
                    </p>
                    <p
                      class="text-capitalize px-3 py-0 btn-dark rounded-pill btn fw-normal mb-0 font-small"
                      @click="openProposalDetailsModal(item)"
                    >
                      see more
                    </p>
                  </td>

                  <!-- <td>{{ item?.upfront_payment_status == 'yes' ? 'Yes - $' + item?.upfront_payment : 'No'}}</td> -->
                  <td class="text-center" style="width: 40%">
                    <!-- <p class="mb-1">{{ item?.description }}</p> -->
                    <!-- <p class="mb-1">{{ generateExcerpt(item?.description) }} <span class=" text-black fw-bolder" @click="openDescription(item?.description)"> See more</span></p> -->
                    <p class="mb-1 descriptionText">{{ item?.description }}</p>
                  </td>
                  <!-- <td>{{ formatCreatedAt(item?.created_at) }}</td> -->

                  <!-- <td>Yes</td>
                  <td>No</td> -->
                  <td style="width: 15%">
                    <div
                      class="text-center btn-wid"
                    >
                      
                      <button
                        class="btn btn-danger btn-sm p-1 px-2 mb-1 w-75 rounded-pill"
                      >
                        Delete
                      </button>

                      <!-- <button @click="openProposalDetailsModal(item)" class="btn btn-dark text-white mt-1 btn-sm p-1 px-2 w-100">
                        View
                      </button> -->
                    </div>
                    <!-- <p v-else>{{ item?.status }}</p> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <!-- for pagination -->
      <CustomPagination v-if="data_paginated != null && data_paginated.length > 0" class="test-page" />
      <!-- for pagination -->

    </main>
    <!-- after data  -->

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
      charge_defination : "",
      areas : null,
      area : null,
      areaIndex : null,
      tab : 'open',
      dataUrl : '/admin/show-proposals',
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
    console.log('admin pro run run ');
    // for pagination
    this.getData();
    this.fetchAreas();
    // for pagination
  },
  methods: {

    openModal(charge_type) {
      // Show Bootstrap Modal
      if(charge_type){
      switch (charge_type) {
          case "Fixed":
            this.charge_defination = "The lawyer is prepared to charge you this fixed amount for the work. You should not have to pay more than this.";
            break;
          case "Hourly":
            this.charge_defination = "The lawyer charges an hourly rate (often billed in 6 minute increments) based on the actual time spent working on your matter. If there is a team of lawyers, they may have different hourly rates, depending on their level of experience. The fee estimate is based on a calculation of the total hours the job is expected to take multiplied by the hourly rate. It is not a fixed quote — the final legal costs may be more or less depending on how the matter progresses and the actual time taken. This is the most common way in which lawyers charge.";
            break;
          case "Daily":
            this.charge_defination = "The lawyer charges a rate per day of work.";
            break;
          case "Item":
            this.charge_defination = "The lawyer is estimating the legal cost by breaking down a large, complex or unpredictable matter into smaller stages i.e. milestones";
            break;
          case "Retainer":
            this.charge_defination = "The lawyer is available to work for you as you need them, for a set fee per time period. This may be subject to some limitations (e.g. number of hours per month) and a notice period where you wish to terminate the engagement.";
            break;
          case "Success":
            this.charge_defination = "In cases where the lawyer’s costs are conditional on a successful outcome (eg. a ‘no win, no fee’ arrangement), the lawyer can charge a success fee (also called an uplift fee) where they achieve that successful outcome (eg. winning a court case or a settlement in the client’s favour). This fee is up to a maximum of 25% and is paid on top of the lawyer’s usual legal costs. This is in recognition of the risk the lawyer has taken of not getting paid for their work if the matter was unsuccessful. This billing method is more common in personal injury matters.";
            break;
          case "Pro":
            this.charge_defination = "The lawyer is prepared to take on your matter for free. You will not have to pay any legal costs.";
            break;
        }
        $(this.$refs.myModal).modal('show');
      }      
    },

    closeModal(modalId) {
      $(modalId).modal('hide');
    },

    closeModal2() {
      // Hide Bootstrap Modal
      $(this.$refs.myModal).modal('hide');
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
      }
      // else if(status == "pending"){
      //   this.dataUrl = '/admin/show-pending-jobs';
      //   this.getData('/admin/show-pending-jobs');
      // }else if(status == "approved"){
      //   this.dataUrl = '/admin/show-approved-jobs';
      //   this.getData('/admin/show-approved-jobs');
      // }else if(status == "overdue"){
      //   this.dataUrl = '/admin/show-overdue-jobs';
      //   this.getData('/admin/show-overdue-jobs');
      // }else if(status == "withoutarea"){
      //   this.dataUrl = '/admin/show-no-field-jobs';
      //   this.getData('/admin/show-no-field-jobs');
      // }
      
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

<style scoped>
.lawname {
  font-size: 14px;
}

.font-small {
  font-size: 12px;
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

.text-left .fw-bolder {
  cursor: pointer;
}

.fw-bold {
  font-weight: 600 !important;
}

.table td {
  border: unset;
}

.table td.text-center {
  vertical-align: middle;
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
.charge-modal {
    border-bottom: 0;
}
.charge-modal h6{
    margin: 0;
}
.charge-modal  button.close {
    border: none;
    background: transparent;
    font-size: 32px;
    padding: 0;
    line-height: 1;
    font-weight: 600;
}
.descriptionText::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-thumb {
  background-color: #969696;
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(217, 217, 217, 1);
  border-radius: 10px;
}

@media only screen and (max-width: 600px) {
  .descriptionText {
    width: 100%;
    text-wrap: wrap;
    font-size: 14px;
  }
  .lawname {
    font-size: 12px;
  }
  table#bidsActive tr th:first-child,
  table#bidsActive tr td:first-child {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
  }

  table#bidsActive {
    table-layout: auto;
    white-space: nowrap;
    width: 100%;
  }

  .table-over {
    overflow-x: auto;
  }

  .w-75 {
    width: 100% !important;
  }

  .btn-wid {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
