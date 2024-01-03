<template lang="">
  <div>
    <ClientHeader />
    <div class="container client-proposal">
      <router-link
        class="btn btn-dark btn-sm my-3"
        title="back"
        to="/client-dashboard"
        ><i class="bi bi-arrow-left"></i> Back</router-link
      >
      <h4 class="text-center">Proposals</h4>

      <div data-v-511b78bb="" class="">
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
              @click="setStatus('Open')"
            >
              Open
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
              @click="setStatus('Accept')"
            >
              Closed
            </button>
          </li>
        </ul>
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
                  
                  <th v-if="tab == 'Open'">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="data_paginated == null || data_paginated.length == 0">
                  <td colspan="8" class="text-center">
                    No active Proposals are available.
                  </td>
                </tr>
                <tr v-else class="text-left border-bottom" v-for="(item,index) in data_paginated" :key="index">
                  <!-- <td>testing client (crinimal)</td> -->
                  <td class="text-center" style="width:15%"> <p @click="openLawyerDetailsModal(item?.lawyer)" class="lawname btn-dark rounded-pill btn text-capitalize fw-bold px-4 py-1">{{ item?.lawyer?.first_name }} {{ item?.lawyer?.last_name }}</p></td>
                  <!-- <td>{{ item?.charge_type }}</td> -->
                  <td class="text-center" style="width:30%">
                      
                   
                      <p class="text-capitalize px-3 py-0 btn-dark rounded-pill btn fw-normal mb-1 font-small">{{ chargeType(item?.charge_type) }} <span data-toggle="tooltip" data-placement="top" title="How you will charge?"><i class="fas fa-info-circle"></i></span></p>
                      <p class="text-capitalize text-black fw-normal mb-1">{{ item?.fixed_fee_amount ? '$' + formatNumber(item?.fixed_fee_amount) : ''}}</p>
                      <p class="text-capitalize px-3 py-0 btn-dark rounded-pill btn fw-normal mb-0 font-small" @click="openProposalDetailsModal(item)">see more</p>
                    

                    </td>

                  <!-- <td>{{ item?.upfront_payment_status == 'yes' ? 'Yes - $' + item?.upfront_payment : 'No'}}</td> -->
                  <td class="text-center" style="width:40%">
                    <!-- <p class="mb-1">{{ item?.description }}</p> -->
                    <!-- <p class="mb-1">{{ generateExcerpt(item?.description) }} <span class=" text-black fw-bolder" @click="openDescription(item?.description)"> See more</span></p> -->
                    <p class="mb-1 descriptionText">{{ item?.description }} </p>
                    
                  </td>
                  <!-- <td>{{ formatCreatedAt(item?.created_at) }}</td> -->

                  <!-- <td>Yes</td>
                  <td>No</td> -->
                  <td style="width:15%" v-if="tab == 'Open'">
                    <div class="text-center btn-wid" v-if="item?.status == 'Open'">
                     
                      <button
                        class="btn btn-dark text-white btn-sm border p-1 px-2 mb-1 w-75 rounded-pill"
                        @click="handleAcceptBidAction(item?.id,item?.lawyer,item?.job_id,item.job?.client_chat?.chat_id,item?.job?.client_chat?.lawyer_id)"
                      >
                        Accept
                      </button>
                      <form method="post" action="backend/acceptBid.php">
                        <input value="146" class="d-none" name="bidId" />
                        <input value="30" class="d-none" name="jobId" />
                        <input value="22" class="d-none" name="lawyerId" />
                        <button class="d-none" name="accept">
                          <i class="bi bi-check-lg"></i> Accept
                        </button>
                      </form>
                      <button
                        :disabled="item?.job?.client_chat?.lawyer_id != item?.lawyer?.id"
                        class="btn btn-light btn-sm p-1 px-2 w-75 rounded-pill mb-1 border"
                        @click="goToMessagePage(item?.job,'client')"
                      >
                        Message
                        {{
                          item?.job?.client_chat?.lawyer_id != item?.lawyer?.id
                            ? ", (N/A)"
                            : ""
                        }}
                      </button>
                      <button
                        class="btn btn-danger btn-sm p-1 px-2 mb-1 w-75 rounded-pill"
                        @click="handleRejectBidAction(item?.id,item?.lawyer,item?.job_id)"
                      >
                        Reject
                      </button>
                      
                      <!-- <button @click="openProposalDetailsModal(item)" class="btn btn-dark text-white mt-1 btn-sm p-1 px-2 w-100">
                        View
                      </button> -->
                    </div>
                    <p v-else>{{ item?.status }}</p>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

          <!-- for pagination -->
          <CustomPagination  v-if="data_paginated != null && data_paginated.length > 0" />
            <!-- for pagination -->

        </div>
      </div>
    
    </div>
  </div>
</template>
<script>
import ClientHeader from "./Header.vue";
import CustomPagination from '@/components/CustomPagination';
import api from "@/config/api";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from '@/config/firebaseConfig';

export default {
  name: "ClientDashboard",
  components: {
    ClientHeader,
    CustomPagination
  },
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    jobId() {
      return this.$store.state.jobId;
    },
    jobData() {
      return this.$store.state.jobData;
    },
  },
  watch: {
    // for pagination
    currentPaginationPage() {
      console.log('watch run');
      this.getPaginatedData();
    },
    // for pagination
  },
  beforeUnmount() {
    localStorage.removeItem('jobId');
    this.$store.commit('SET_JOB_ID', null);
  },

  created() {
    console.log('under created 222 ', this.jobData?.notifications?.length);
    if (this.jobData?.notifications?.length > 0) {
      this.resetCount('job');
    }
  },

  async mounted() {
    if (this.jobId == null || this.jobId == "") {
      this.$router.push({ path: '/client-dashboard' });
    }
    this.setStatus('Open');
  },

  methods: {
    // getJobChat(chat_id){
    //   const messagesRef = collection(db, "chats", chat_id, "messages");
    //   let messages = [];
    //   onSnapshot(messagesRef, (snapshot) => {
    //     messages = snapshot.docs
    //       .map((doc) => doc.data())
    //       .sort((a, b) => a.timestamp - b.timestamp);
    //   });
    //   return messages
    // },


    getJobChat(messagesRef) {
      // console.log('db ::: ' , db);

      return new Promise((resolve, reject) => {
        onSnapshot(messagesRef, (snapshot) => {
          const messages = snapshot.docs
            .map((doc) => doc.data())
            .sort((a, b) => a.timestamp - b.timestamp);
          resolve(messages);
        }, (error) => {
          reject(error);
        });
      });
    },


    // goToMessagePage(item) {
    //   console.log(item?.job?.client_chat?.chat_id);
    //   this.saveJobInfo(item?.job);
    //   this.$store.commit("SET_JOBIDTOCHAT", item?.job?.id);
    //   this.$store.commit("SET_CLIENTCOMEFROMPROPOSAL", true);
    //   console.log('law : ', item?.lawyer);
    //   this.$store.commit("SET_USERTOCHAT", item?.lawyer);
    //   this.$router.push({ path: "/messages" });
    // },

    openDescription(text) {
      this.$swal.fire({
        title: 'Description',
        html: `<p style="white-space: pre-line;">${text}</p>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: "my-swal-container", // You can define your custom class for styling
        },
      });
    },

    async setStatus(status) {
      this.tab = status;
      this.$store.commit('set_pagination_page', 1);
      this.$store.commit('SET_ENDPOINT_FOR_PAGINATED_DATA', `/client/job-proposals/${this.jobId}/${status}`);
      await this.getPaginatedData();
    },
    handleAcceptBidAction(proposal_id, lawyer, job_id, chat_id, chat_lawyer_id) {
      try {
        console.log('handle acccpt : ', chat_lawyer_id);
        let status = "Accept";
        console.log(proposal_id, lawyer, job_id, chat_id);
        // console.log(this.getJobChat(chat_id));

        console.log('accept bid job : ', this.jobData);

        // check if lawyer and client has chat on this job
        if (lawyer?.id === chat_lawyer_id) {
          console.log('f1 chat id, ' , db);
          const messagesRef = collection(db, "chats", chat_id, "messages");
          console.log('f2 message ref, ' , messagesRef);
          this.getJobChat(messagesRef)
            .then((messages) => {
              console.log('ms : ', messages);
              this.changeStatus({ status, proposal_id, lawyer, job_id, messages });
            })
            .catch((error) => {
              console.error("Error fetching messages:", error);
            });
        } else {
          this.changeStatus({ status, proposal_id, lawyer, job_id });
        }

      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },
    handleRejectBidAction(proposal_id, lawyer, job_id) {
      let status = "Reject";
      this.changeStatus({ status, proposal_id, lawyer, job_id });
    },
    changeStatus(obj) {
      this.$swal({
        title: 'Are you sure?',
        text: `Are you sure you want to ${obj.status} this proposal`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${obj.status}`
      }).then(result => {
        if (result.isConfirmed) {
          obj.lawyer_id = obj?.lawyer?.id;
          api.post('/client/change-proposal-status', obj).then(res => {
            // this.$swal('', `Proposal has been ${obj.status}ed successfully`, 'success').then(async () => {
            let msg = "";
            if (obj.status.toLowerCase() == "accept") {
              msg = `Congratulations on finding a lawyer!
                We're so glad that you found a lawyer for your job '[${this.jobData?.title} - ${this.jobData?.identity}.]' through Simplawfy. 
                Here are your lawyer's contact details so you can communicate with them directly:
                [${obj?.lawyer?.first_name} ${obj?.lawyer?.last_name}, ${obj?.lawyer?.email} and ${obj?.lawyer?.phone}]. 

                You will receive an email shortly with all these details as well as the details of the proposal you accepted, the details of your job and any correspondence between you and your chosen Lawyer.`;
            } else {
              msg = `Proposal has been ${obj.status}ed successfully`;
            }

            this.$swal('', msg, 'success').then(async () => {
              if (obj.status.toLowerCase() == "accept") {
                this.$router.push("/client-dashboard");
              } else {
                await this.getPaginatedData();
              }
            })
            console.log('response : ', res);
          }).catch((error) => {
            console.log('error : ', error);
          });
        }
      });
    }
  },

};
</script>

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
}</style>
