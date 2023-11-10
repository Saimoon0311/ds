<template lang="">
  <div class="l-pro-main">
    <LawyerHeader />

    <div class="container-fluid">
      <!-- <div class="container"> -->

        <div v-if="adminApproval != 'approve'" class> 
          <p class="h5 m-3 text-center">Your profile has not been approved yet.</p>
        </div>
        <div v-else-if="subscriptionStatus != 'subscribed'">
          <div class="alert alert-danger mt-4 text-center m-0 p-2">
          You have not subscribed yet.
            <router-link to="/subscribe" class="btn btn-link ps-0">Subscribe now</router-link>
          </div>
        </div>
      

      <div v-else>

      



    <!-- after subscribe -->
    <main class="container-fluid">
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
          <tr>
            <td colspan="9" class="text-center">
              You have not Proposal on any jobs yet.
            </td>
          </tr>
          <tr data-v-7525850d="">
            <td data-v-7525850d="">
              <a data-v-7525850d="" href="jobInfo.php?id=28">abc 2</a>
            </td>
            <td data-v-7525850d="">Hourly rate</td>
            <td data-v-7525850d="">$10,000.00</td>
            <td data-v-7525850d="">Yes - $500.00</td>
            <td data-v-7525850d="">test the potential client</td>
            <!-- <td data-v-7525850d="">Yes</td>
            <td data-v-7525850d="">Yes - $100 for 30 minutes</td> -->
            <td data-v-7525850d=""><p data-v-7525850d="">Open</p></td>
            <td data-v-7525850d="">
              <button
                data-v-7525850d=""
                class="btn btn-sm btn-danger"
                onclick="rescindBid(event)"
              >
                <i data-v-7525850d="" class="bi bi-trash-fill"></i>Withdraw
                Proposal
              </button>
              <form>
                <input data-v-7525850d="" class="d-none" name="bidId" /><button
                  data-v-7525850d=""
                  class="btn btn-sm btn-danger d-none"
                >
                  Withdraw Proposal
                </button>
              </form>
            </td>
          </tr>
          <tr>
            <td><a href="jobInfo.php?id=30">test job</a></td>
            <td>Fixed fee</td>
            <td>$100.00</td>
            <td>Yes - $55.00</td>
            <td>dummy text</td>
            <!-- <td>Yes</td>
            <td>No</td> -->
            <td><p class="text-success fw-bold">Accepted</p></td>
            <td class="text-center">-</td>
          </tr>
        </tbody>
      </table>
    </div>
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
          <tr data-v-7525850d="">
            <td data-v-7525850d="" colspan="6" class="text-center">
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
import MainFooter from "../../components/global/MainFooter.vue";

export default {
  components: {
    LawyerHeader,
    MainFooter
  },
  computed: {
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionStatus() {
      return this.$store.getters.subscriptionStatus;
    }
  },
  methods: {},
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
</style>
