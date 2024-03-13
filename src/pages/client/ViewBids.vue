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
        </ul> -->
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
                    <!-- <span @mouseover="openFeeEstimateModal('Estimate')"> -->

                      <!-- @mouseover="updateTooltip('Estimate', 0)"
                      @click="updateTooltip('Estimate', 0)" -->
                      <!-- data-bs-toggle="tooltip"
                      data-bs-html="true" -->
                    <div class="custom-tooltip">
                    <span
                      
                      id="tooltipSpan0"
                      
                      title=""

                      @mouseenter="showTooltip('Estimate')" @mouseleave="hideTooltip" @click="toggleTooltip('Estimate')"

                    >
                      Fee estimate
                      <i class="fas fa-info-circle"></i>
                     
                      {{ chargeType(item?.charge_type === 'Estimate') }}
                    </span>

                    <!-- <transition name="fade">
                      <div v-if="isTooltipVisible" class="tooltip">
                        <p style="color:#fff">{{ tooltipText }}</p>
                      </div>
                    </transition> -->
                  </div>
    
                  </th>

                  <th>Proposed work</th>

                  <th v-if="tab == 'Open'">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="data_paginated == null || data_paginated.length == 0">
                  <td colspan="8" class="text-center">
                    You haven't received any proposals for this job yet.
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
                    <!-- data-bs-toggle="tooltip"
                      data-bs-html="true"
                      title=""
                      @mouseover="updateTooltip(item?.charge_type, item?.id)" -->
                    <p
                      :id="'tooltipSpan' + item?.id"
                      @mouseenter="showTooltip(item?.charge_type)" @mouseleave="hideTooltip" @click="toggleTooltip(item?.charge_type)"
                      class="text-capitalize px-3 py-0 btn-dark rounded-pill btn fw-normal mb-1 font-small no-hover"
                    >
                      {{ chargeType(item?.charge_type) }}
                      <span
                      >
                        <i class="fas fa-info-circle"></i>
                      </span>
                    </p>

                    <!-- <div class="modal" tabindex="-1" role="dialog" ref="myModal">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header charge-modal">
                          <h6>{{ charge_defination }}</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                                  
                        </div>
                      </div>
                    </div> -->
                    <p class="text-capitalize text-black fw-normal mb-1">
                      {{
                        item?.total_with_gst
                          ? "$" + formatNumber(item?.total_with_gst)
                          : ""
                      }}
                    </p>
                    <p
                      class="text-capitalize px-3 py-0 btn-dark rounded-pill btn fw-normal mb-0 font-small"
                      @click="openProposalDetailsModalPopup(item,'How you will be charged.',false,false)"
                    >
                      see more
                    </p>
                  </td>

                  <!-- <td>{{ item?.upfront_payment_status == 'yes' ? 'Yes - $' + item?.upfront_payment : 'No'}}</td> -->
                  <td class="text-center" style="width: 40%; vertical-align: top;">
                    <!-- <p class="mb-1">{{ item?.description }}</p> -->
                    <!-- <p class="mb-1">{{ generateExcerpt(item?.description) }} <span class=" text-black fw-bolder" @click="openDescription(item?.description)"> See more</span></p> -->
                    <p class="mb-1 descriptionText" style="white-space: pre-line;">{{ item?.description }}</p>
                  </td>
                  <!-- <td>{{ formatCreatedAt(item?.created_at) }}</td> -->

                  <!-- <td>Yes</td>
                  <td>No</td> -->
                  <td style="width: 15%" v-if="tab == 'Open'">
                    <div
                      class="text-center btn-wid"
                      v-if="item?.status == 'Open'"
                    >
                      <button
                        class="btn btn-dark softblue text-white btn-sm border p-1 px-2 mb-1 w-75 rounded-pill"
                        @click="
                          handleAcceptBidAction(
                            item?.id,
                            item?.lawyer,
                            item?.job_id,
                            item.job?.client_chat?.chat_id,
                            item?.job?.client_chat?.lawyer_id
                          )
                        "
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
                      <!-- :disabled="!disableMessageButton(item)" -->
                      <button
                        class="btn btn-light btn-sm p-1 px-2 w-75 rounded-pill mb-1 border"
                        @click="goToMessagePage2(item)"
                      >
                        Message
                        <!-- {{
                          !disableMessageButton(item) ? ", (N/A)" : ""
                        }} -->
                      </button>
                      <button
                        class="btn btn-danger btn-sm p-1 px-2 mb-1 w-75 rounded-pill"
                        @click="
                          handleRejectBidAction(
                            item?.id,
                            item?.lawyer,
                            item?.job_id
                          )
                        "
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
          <CustomPagination
            v-if="data_paginated != null && data_paginated.length > 0"
          />
          <!-- for pagination -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClientHeader from "./Header.vue";
import CustomPagination from "@/components/CustomPagination";
import api from "@/config/api";
import $ from "jquery";
window.$ = window.jQuery = $;
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export default {
  name: "ClientDashboard",
  components: {
    ClientHeader,
    CustomPagination,
  },
  data() {
    return {
      // charge_defination : "",
      tab: null,
      isTooltipVisible: false,
      tooltipText : "",
    };
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
      console.log("watch run");
      this.getPaginatedData();
    },
    // for pagination
  },
  beforeUnmount() {
    localStorage.removeItem("jobId");
    this.$store.commit("SET_JOB_ID", null);
  },

  created() {
    console.log("under created 222 ", this.jobData?.notifications?.length);
    if (this.jobData?.notifications?.length > 0) {
      this.resetCount("job");
    }
  },

  async mounted() {
    if (this.jobId == null || this.jobId == "") {
      this.$router.push({ path: "/client-dashboard" });
    }
    this.setStatus("Open");
  },

  methods: {


    showTooltip(type) {
      if (!this.isMobileDevice()) {
        const { definition } = this.openFeeEstimateModal(type);
        this.tooltipText = definition;
        console.log(this.tooltipText);
        this.isTooltipVisible = true;
        alert(this.tooltipText);
      }
    },
    hideTooltip() {
      if (!this.isMobileDevice()) {
        this.isTooltipVisible = false;
      }
    },
    toggleTooltip(type) {
      if (this.isMobileDevice()) {
        const { definition } = this.openFeeEstimateModal(type);
        this.tooltipText = definition;
        console.log(this.tooltipText);
        this.isTooltipVisible = !this.isTooltipVisible;
        alert(this.tooltipText);
      }
    },
    isMobileDevice() {
      // Adjust this condition as per your needs to detect mobile devices
      return window.innerWidth <= 768;
    },



    goToMessagePage2(item = null) {
      if (item) {
        console.log('item mm mm : ' , item);
        this.saveJobInfo(item?.job);
        // this.saveLoadMoreData();

        this.$store.commit("SET_JOBIDTOCHAT", item?.job?.id);
        // this.$store.commit("SET_DATATAB", this.tab);
        
      
          this.$store.commit("SET_USERTOCHAT", item?.lawyer);
          // if (item?.lawyer_chat == null) {
          //   this.$store.commit("SET_CHATSTATUS", "new");
          // } else {
          //   this.$store.commit("SET_CHATSTATUS", "old");
          // }
      
      }

      // if (item == null) {
      //   console.log("else else else");
      //   this.saveJobInfo(null, reset);
      //   this.saveLoadMoreData(reset);
      //   this.$store.commit("SET_JOBIDTOCHAT", null);
      //   this.$store.commit("SET_DATATAB", null);
      //   this.$store.commit("SET_USERTOCHAT", null);
      //   this.$store.commit("SET_CHATSTATUS", null);
      // }
      this.$store.commit("SET_IS_NOT_HEADER_CHAT", true);
      
      this.$router.push({
        path: "/messages-history",
        query: { job: item?.job?.id },
      });
    },

    // openModal(charge_type) {
    //   // Show Bootstrap Modal
    //   if(charge_type){
    //   switch (charge_type) {
    //       case "Fixed":
    //         this.charge_defination = "The lawyer is prepared to charge you this fixed amount for the work. You should not have to pay more than this.";
    //         break;
    //       case "Hourly":
    //         this.charge_defination = "The lawyer charges an hourly rate (often billed in 6 minute increments) based on the actual time spent working on your matter. If there is a team of lawyers, they may have different hourly rates, depending on their level of experience. The fee estimate is based on a calculation of the total hours the job is expected to take multiplied by the hourly rate. It is not a fixed quote — the final legal costs may be more or less depending on how the matter progresses and the actual time taken. This is the most common way in which lawyers charge.";
    //         break;
    //       case "Daily":
    //         this.charge_defination = "The lawyer charges a rate per day of work.";
    //         break;
    //       case "Item":
    //         this.charge_defination = "The lawyer is estimating the legal cost by breaking down a large, complex or unpredictable matter into smaller stages i.e. milestones";
    //         break;
    //       case "Retainer":
    //         this.charge_defination = "The lawyer is available to work for you as you need them, for a set fee per time period. This may be subject to some limitations (e.g. number of hours per month) and a notice period where you wish to terminate the engagement.";
    //         break;
    //       case "Success":
    //         this.charge_defination = "In cases where the lawyer’s costs are conditional on a successful outcome (eg. a ‘no win, no fee’ arrangement), the lawyer can charge a success fee (also called an uplift fee) where they achieve that successful outcome (eg. winning a court case or a settlement in the client’s favour). This fee is up to a maximum of 25% and is paid on top of the lawyer’s usual legal costs. This is in recognition of the risk the lawyer has taken of not getting paid for their work if the matter was unsuccessful. This billing method is more common in personal injury matters.";
    //         break;
    //       case "Pro":
    //         this.charge_defination = "The lawyer is prepared to take on your matter for free. You will not have to pay any legal costs.";
    //         break;
    //     }
    //     $(this.$refs.myModal).modal('show');
    //   }      
    // },
    closeModal() {
      // Hide Bootstrap Modal
      $(this.$refs.myModal).modal('hide');
    },
    disableMessageButton(item) {
      console.log("lawyer id : ", item?.lawyer_id);
      console.log("chats : ", item?.job?.chats);
      console.log(
        "chats match : ",
        item.job.chats.some((chat) => chat.lawyer_id === item.lawyer_id)
      );
      if (item?.lawyer_id && item?.job?.chats) {
        return item.job.chats.some((chat) => chat.lawyer_id === item.lawyer_id);
      }
      return false; // Enable the button by default
    },
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
        onSnapshot(
          messagesRef,
          (snapshot) => {
            const messages = snapshot.docs
              .map((doc) => doc.data())
              .sort((a, b) => a.timestamp - b.timestamp);
            resolve(messages);
          },
          (error) => {
            reject(error);
          }
        );
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
        title: "Description",
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
      this.$store.commit("set_pagination_page", 1);
      this.$store.commit(
        "SET_ENDPOINT_FOR_PAGINATED_DATA",
        `/client/job-proposals/${this.jobId}/${status}`
      );
      await this.getPaginatedData();
    },
    handleAcceptBidAction(
      proposal_id,
      lawyer,
      job_id,
      chat_id,
      chat_lawyer_id
    ) {
      try {
        console.log("handle acccpt : ", chat_lawyer_id);
        let status = "Accept";
        console.log(proposal_id, lawyer, job_id, chat_id);
        // console.log(this.getJobChat(chat_id));

        console.log("accept bid job : ", this.jobData);

        // check if lawyer and client has chat on this job
        if (lawyer?.id === chat_lawyer_id) {
          console.log("f1 chat id, ", db);
          const messagesRef = collection(db, "chats", chat_id, "messages");
          console.log("f2 message ref, ", messagesRef);
          this.getJobChat(messagesRef)
            .then((messages) => {
              console.log("ms : ", messages);
              this.changeStatus({
                status,
                proposal_id,
                lawyer,
                job_id,
                messages,
              });
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
      let question = "";
      if(obj?.status?.toLowerCase() == "accept"){
        question = "Are you sure you want to accept this proposal? All other proposals will be automatically rejected.";
      }else if(obj?.status.toLowerCase() == "reject"){
         question = 'Are you sure you want to reject this proposal? This cannot be undone.'
      }
      this.$swal({
        title: "Are you sure?",
        text: question,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${obj.status}`,
      }).then((result) => {
        if (result.isConfirmed) {
          obj.lawyer_id = obj?.lawyer?.id;
          api
            .post("/client/change-proposal-status", obj)
            .then((res) => {
              // this.$swal('', `Proposal has been ${obj.status}ed successfully`, 'success').then(async () => {
              let msg = "";
              let heading = "";
              if (obj?.status?.toLowerCase() == "accept") {
                // msg = `Congratulations on finding a lawyer!
                // msg = `We're so glad that you found a lawyer for your job '[${this.jobData?.title} - ${this.jobData?.identity}.]' through Simplawfy. 
                // Here are your lawyer's contact details so you can communicate with them directly:
                // [${obj?.lawyer?.first_name} ${obj?.lawyer?.last_name}, ${obj?.lawyer?.email} and ${obj?.lawyer?.phone}]. 
                // You will receive an email shortly with all these details as well as the details of the proposal you accepted, the details of your job and any correspondence between you and your chosen Lawyer.`;
                heading = "Congratulations on finding a lawyer!";
                msg = `We're so glad that you found a lawyer, ${obj?.lawyer?.first_name} ${obj?.lawyer?.last_name}, through Simplawfy. You will receive an email shortly with their details. You can also view them in the Closed tab on your Dashboard.`;

              } else {
                msg = `You have ${obj.status.toLowerCase()}ed this proposal successfully.`;
              }

              this.$swal(heading, msg, "success").then(async () => {
                if (obj.status.toLowerCase() == "accept") {
                  this.$router.push("/client-dashboard");
                } else {
                  await this.getPaginatedData();
                }
              });

        //       this.$swal.fire({
        //   title: "Congratulations on finding a lawyer!",
        //   html: msg,
        //   showCloseButton: true,
        //   showConfirmButton: false,
        //   customClass: {
        //     container: "my-swal-container", // You can define your custom class for styling
        //   },
        // });


              console.log("response : ", res);
            })
            .catch((error) => {
              console.log("error : ", error);
            });
        }
      });
    },
  },
};
</script>

<style scoped>




/* .custom-tooltip {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  z-index: 1;
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  font-size: 14px;
  display: none;
}

.tooltip.fade-enter-active, .tooltip.fade-leave-active {
  transition: opacity 0.5s;
}

.tooltip.fade-enter, .tooltip.fade-leave-to {
  opacity: 0;
} */












.lawname {
  font-size: 14px;
}

.font-small {
  font-size: 12px;
}
.no-hover:hover{
  background: black !important; 
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
  white-space: normal;
    word-break: break-word;
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
.descriptionText::-webkit-scrollbar , span.class-para::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-thumb , span.class-para::-webkit-scrollbar-thumb {
  background-color: #969696;
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-track , span.class-para::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(217, 217, 217, 1);
  border-radius: 10px;
}

@media only screen and (max-width: 767px) {
  .descriptionText {
    width: 100%;
    white-space: normal;
word-break: break-word;
    font-size: 14px;
    padding-right: 2px;
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
}</style>
