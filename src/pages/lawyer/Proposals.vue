<template lang="">
  <div class="l-pro-main">
    <LawyerHeader />

    <div class="container">
      <!-- <div class="container"> -->

        <div v-if="adminApproval != 'approve'" class> 
          <p class="h5 m-3 text-center">Your profile has not been approved yet.</p>
        </div>
        <div v-else-if="subscriptionStatus != 'subscribed'">
          <div class="alert alert-danger mt-4 text-center m-0 p-2">
          You have not subscribed yet.
            <router-link to="/plans" class="btn btn-dark text-white">Subscribe Now</router-link>
          </div>
        </div>
      

      <div v-else>

      



    <!-- after subscribe -->
    <main class="container">
      <br />
      <!-- Table 1 Bids -->
      <h4 class=" mt-0">Proposals</h4>
      <div class="table-responsive">
        <table class="table table-bordered table-striped ">
          <thead>
            <tr>
              <th class="col-2">Job Title</th>
              <th>Billing Method</th>
              <th>Fee Estimate</th>
              <th>Upfront Payment</th>
              <th>Proposed Work</th>
              <!-- <th>Deadline achievable?</th>
              <th>Free/discounted first consultation?</th> -->
              <th>Created at</th>
              <th>
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
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="data_paginated == null || data_paginated.length == 0">
              <td colspan="9" class="text-center">
                You have not submitted any proposals yet.
              </td>
            </tr>

            <tr v-else class="pr-pad" data-v-7525850d="" v-for="(item,index) in data_paginated" :key="index">
            
            <!-- <tr data-v-7525850d=""> -->
              <td data-v-7525850d="">
                <a class="btn btn-dark text-light">{{ item?.job?.title }}</a>
              </td>
              <td data-v-7525850d="">{{ item?.charge_type }}</td>
              <td data-v-7525850d="">{{ item?.fixed_fee_amount ? '$' + item?.fixed_fee_amount : ''}}</td>
              <td data-v-7525850d="">{{ item?.upfront_payment_status == 'yes' ? 'Yes - $' + item?.upfront_payment : 'No'}}</td>
              <td data-v-7525850d="">{{ item?.description }}</td>
              <!-- <td data-v-7525850d="">Yes</td>
              <td data-v-7525850d="">Yes - $100 for 30 minutes</td> -->
              <td>{{ formatCreatedAt(item?.created_at) }}</td>
              <td data-v-7525850d=""><p data-v-7525850d="">{{ item?.status }}</p></td>
              <td data-v-7525850d="">
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
      <CustomPagination v-if="data_paginated != null && data_paginated.length > 0" />
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
import LawyerHeader from "./Header.vue";
import CustomPagination from '@/components/CustomPagination';
import MainFooter from "../../components/global/MainFooter.vue";
import api from '@/config/api';
export default {
  components: {
    LawyerHeader,
    CustomPagination,
    MainFooter
  },

  computed: {
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionStatus() {
      return this.$store.getters.subscriptionStatus;
    },
  },

  watch: {
    // for pagination
    currentPaginationPage() {
      // console.log('watch run');
      this.getPaginatedData();
    },
    // for pagination
  },

  async mounted() {
    // for pagination
    this.$store.commit('SET_ENDPOINT_FOR_PAGINATED_DATA', '/lawyer/lawyer-proposals');
    await this.getPaginatedData();
    // for pagination
  },
  methods: {
    withdrawProposal(id) {
      api.get(`/lawyer/withdraw-proposal/${id}`).then(() => {
        this.getPaginatedData();
      }).catch(error => {
        console.log(error)
      });
    }
  },
  name: "BidsTab",
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
  width: 185px;
    height: 40px;
    object-fit: contain;
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

.pr-pad td {
  padding-top: 17px;
}

.pr-pad td a {
  line-height: 12px;
}
</style>
