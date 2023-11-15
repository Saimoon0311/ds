<template lang="">
  <div>
    <ClientHeader />
    <div class="container">
      <router-link
        class="btn btn-secondary btn-sm my-3"
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
              @click="setStatus('open')"
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
              @click="setStatus('accept')"
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
            <table class="table table-bordered table-striped" id="bidsActive">
              <thead>
                <tr>
                  <th>Lawyer</th>
                  <th>
                    Billing method
                    <i
                      class="bi bi-question-circle"
                      onmouseover="showBillingMethodInfo()"
                      onmouseout="hideBillingMethodInfo()"
                    ></i>
                    <dl
                      class="position-absolute bg-grey p-3 me-3 border rounded fw-light d-none"
                      id="billingMethodInfoToolTip"
                    >
                      <dt><i class="bi bi-dot"></i>Hourly rate:</dt>
                      <dd class="ms-3">
                        The lawyer charges an hourly rate (often billed in 6
                        minute increments) based on the actual time spent
                        working on your matter. If there is a team of lawyers,
                        they may have different hourly rates, depending on their
                        level of experience. The fee estimate is based on a
                        calculation of the total hours the job is expected to
                        take multiplied by the hourly rate. It is not a fixed
                        quote — the final legal costs may be more or less
                        depending on how the matter progresses and the actual
                        time taken. This is the most common way in which lawyers
                        charge.
                      </dd>
                      <dt><i class="bi bi-dot"></i>Fixed fee:</dt>
                      <dd class="ms-3">
                        The lawyer is prepared to charge you this fixed amount
                        for the work. You should not have to pay more than this.
                      </dd>
                      <dt><i class="bi bi-dot"></i>Success fee:</dt>
                      <dd class="ms-3">
                        In cases where the lawyer's costs are conditional on a
                        successful outcome (eg. a 'no win, no fee' arrangement),
                        the lawyer can charge a success fee (also called an
                        uplift fee) where they achieve that successful outcome
                        (eg. winning a court case or a settlement in the
                        client's favour). This fee is up to a maximum of 25% and
                        is paid on top of the lawyer's usual legal costs. This
                        is in recognition of the risk the lawyer has taken of
                        not getting paid for their work if the matter was
                        unsuccessful. This billing method is more common in
                        personal injury matters.
                      </dd>
                      <dt><i class="bi bi-dot"></i>Pro bono:</dt>
                      <dd class="ms-3">
                        The lawyer is prepared to take on your matter for free.
                        You will not have to pay any legal costs.
                      </dd>
                    </dl>
                  </th>
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
                  <th>
                    Upfront payment
                    <i
                      class="bi bi-question-circle"
                      onmouseover="showUpfrontPaymentInfo()"
                      onmouseout="hideUpfrontPaymentInfo()"
                    ></i>
                    <dl
                      class="d-none position-absolute bg-grey p-3 me-3 border rounded fw-light"
                      id="upfrontPaymentInfoToolTip"
                    >
                      <dt>Upfront payment:</dt>
                      <dd>
                        The lawyer may require payment of part of the estimated
                        fees upfront, which they will hold in trust and apply
                        towards the legal costs.
                      </dd>
                    </dl>
                  </th>
                  <th>Proposed work</th>
                  <th>Created at</th>
                  <!-- <th>Deadline achievable?</th>
                  <th>Free/discounted first consultation?</th> -->
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="data_paginated == null || data_paginated.length == 0">
                  <td colspan="8" class="text-center">
                    No active Proposals are available.
                  </td>
                </tr>
                <tr v-else class="text-left" v-for="(item,index) in data_paginated" :key="index">
                  <!-- <td>testing client (crinimal)</td> -->
                  <td>{{ item?.lawyer?.first_name }} {{ item?.lawyer?.last_name }}</td>
                  <td>{{ item?.charge_type }}</td>
                  <td>{{ item?.fixed_fee_amount ? '$' + item?.fixed_fee_amount : ''}}</td>
                  <td>{{ item?.upfront_payment_status == 'yes' ? 'Yes - $' + item?.upfront_payment : 'No'}}</td>
                  <td>{{ item?.description }}</td>
                  <td>{{ formatCreatedAt(item?.created_at) }}</td>

                  <!-- <td>Yes</td>
                  <td>No</td> -->
                  <td>
                    <div class="text-center" v-if="item?.status == 'Open'">
                      <button
                        class="btn btn-light btn-sm border p-1 px-2 mb-1"
                        @click="handleAcceptBidAction(item?.id,item?.lawyer?.id,item?.job_id)"
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
                        class="btn btn-danger btn-sm p-1 px-2"
                        @click="handleRejectBidAction(item?.id,item?.lawyer?.id,item?.job_id)"
                      >
                        Reject
                      </button>
                      <form method="post" action="backend/rejectBid.php">
                        <input value="146" class="d-none" name="id" />
                        <button class="d-none" name="reject">
                          <i class="bi bi-x-lg"></i>Reject
                        </button>
                      </form>
                    </div>
                    <p v-else>{{ item?.status }}</p>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div
            data-v-511b78bb=""
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <table class="table table-bordered table-striped" id="bidsClosed">
              <thead>
                <tr>
                  <th>Lawyer</th>
                  <th>
                    Billing method
                    <i
                      class="bi bi-question-circle"
                      onmouseover="showBillingMethodInfo2()"
                      onmouseout="hideBillingMethodInfo2()"
                    ></i>
                    <dl
                      class="d-none position-absolute bg-grey p-3 me-3 border rounded fw-light"
                      id="billingMethodInfoToolTip2"
                    >
                      <dt><i class="bi bi-dot"></i>Hourly rate:</dt>
                      <dd class="ms-3">
                        The lawyer charges an hourly rate (often billed in 6
                        minute increments) based on the actual time spent
                        working on your matter. If there is a team of lawyers,
                        they may have different hourly rates, depending on their
                        level of experience. The fee estimate is based on a
                        calculation of the total hours the job is expected to
                        take multiplied by the hourly rate. It is not a fixed
                        quote — the final legal costs may be more or less
                        depending on how the matter progresses and the actual
                        time taken. This is the most common way in which lawyers
                        charge.
                      </dd>
                      <dt><i class="bi bi-dot"></i>Fixed fee:</dt>
                      <dd class="ms-3">
                        The lawyer is prepared to charge you this fixed amount
                        for the work. You should not have to pay more than this.
                      </dd>
                      <dt><i class="bi bi-dot"></i>Success fee:</dt>
                      <dd class="ms-3">
                        In cases where the lawyer's costs are conditional on a
                        successful outcome (eg. a 'no win, no fee' arrangement),
                        the lawyer can charge a success fee (also called an
                        uplift fee) where they achieve that successful outcome
                        (eg. winning a court case or a settlement in the
                        client's favour). This fee is up to a maximum of 25% and
                        is paid on top of the lawyer's usual legal costs. This
                        is in recognition of the risk the lawyer has taken of
                        not getting paid for their work if the matter was
                        unsuccessful. This billing method is more common in
                        personal injury matters.
                      </dd>
                      <dt><i class="bi bi-dot"></i>Pro bono:</dt>
                      <dd class="ms-3">
                        The lawyer is prepared to take on your matter for free.
                        You will not have to pay any legal costs.
                      </dd>
                    </dl>
                  </th>
                  <th>
                    Fee estimate
                    <i
                      class="bi bi-question-circle"
                      onmouseover="showFeeEstimateInfo2()"
                      onmouseout="hideFeeEstimateInfo2()"
                    ></i>
                    <dl
                      class="d-none position-absolute bg-grey p-3 me-3 border rounded fw-light"
                      id="feeEstimateInfoToolTip2"
                    >
                      <dt>Fee Estimate:</dt>
                      <dd class="ms-3">
                        This is the lawyer’s estimate of the total legal costs
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
                  <th>
                    Upfront payment
                    <i
                      class="bi bi-question-circle"
                      onmouseover="showUpfrontPaymentInfo2()"
                      onmouseout="hideUpfrontPaymentInfo2()"
                    ></i>
                    <dl
                      class="position-absolute bg-grey p-3 me-3 border rounded fw-light d-none"
                      id="upfrontPaymentInfoToolTip2"
                    >
                      <dt>Upfront payment:</dt>
                      <dd class="ms-3">
                        The lawyer may require payment of part of the estimated
                        fees upfront, which they will hold in trust and apply
                        towards the legal costs.
                      </dd>
                    </dl>
                  </th>
                  <th>Proposed work</th>
                  <!-- <th>Deadline achievable?</th>
                  <th>Free/discounted first consultation?</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-if="data_paginated == null || data_paginated.length == 0">
                  <td colspan="7" class="text-center">
                    No closed Proposals are available.
                  </td>
                </tr>
                <tr v-else class="text-left" v-for="(item,index) in data_paginated" :key="index">
                  <!-- <td>testing client (crinimal)</td> -->
                  
                  <td>{{ item?.lawyer?.first_name }} {{ item?.lawyer?.last_name }}</td>
                  <td>{{ item?.charge_type }}</td>
                  <td>{{ item?.fixed_fee_amount ? '$' + item?.fixed_fee_amount : ''}}</td>
                  <td>{{ item?.upfront_payment_status == 'yes' ? 'Yes - $' + item?.upfront_payment : 'No'}}</td>
                  <td>{{ item?.description }}</td>


                  <!-- <td>Yes</td>
                  <td>No</td> -->
                  <!-- <td>
                    <div class="text-center">
                      <button
                        class="btn btn-light btn-sm border p-1 px-2 mb-1"
                        onclick="handleAcceptBidAction(event)"
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
                        class="btn btn-danger btn-sm p-1 px-2"
                        onclick="handleRejectBidAction(event)"
                      >
                        Reject
                      </button>
                      <form method="post" action="backend/rejectBid.php">
                        <input value="146" class="d-none" name="id" />
                        <button class="d-none" name="reject">
                          <i class="bi bi-x-lg"></i>Reject
                        </button>
                      </form>
                    </div>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>

          <!-- for pagination -->
          <CustomPagination  v-if="data_paginated != null && data_paginated.length > 0" />
            <!-- for pagination -->

        </div>
      </div>
      <!-- request info -->
      <!-- <h4>Information Requests</h4>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Lawyer</th>
            <th>
              Requested information
              <i
                class="bi bi-question-circle"
                onmouseover="showRequestedInformationInfo()"
                onmouseout="hideRequestedInformationInfo()"
              ></i>
              <dl
                class="d-none position-absolute bg-grey p-3 me-3 border rounded fw-light"
                id="requestedInformationToolTip"
              >
                <dt>Requested information:</dt>
                <dd class="ms-3">
                  The lawyer requires some further information about your job in
                  order to finalise their Proposal.
                </dd>
              </dl>
            </th>
            <th class="col-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-center">
              No pending information requests.
            </td>
          </tr>
          <tr>
            <td>testing client</td>
            <td>further information</td>
            <td>
              <router-link
                to="/reply-info-request"
                class="btn btn-outline-dark btn-sm"
                title="send reply"
                ><i class="fa fa-reply-fill"></i> Reply</router-link
              >
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>
</template>
<script>
import ClientHeader from "./Header.vue";
import CustomPagination from '@/components/CustomPagination';
import api from "@/config/api";
export default {
  name: "ClientDashboard",
  components: {
    ClientHeader,
    CustomPagination
  },
  computed: {
    jobId() {
      return this.$store.state.jobId;
    }
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
  async mounted() {
    if (this.jobId == null || this.jobId == "") {
      this.$router.push({ path: '/client-dashboard' });
    }
    this.setStatus('open');
  },

  methods: {
    async setStatus(status) {
      this.$store.commit('set_pagination_page', 1);
      this.$store.commit('SET_ENDPOINT_FOR_PAGINATED_DATA', `/client/job-proposals/${this.jobId}/${status}`);
      await this.getPaginatedData();
    },
    handleAcceptBidAction(proposal_id, lawyer_id, job_id) {
      let status = "Accept";
      this.changeStatus({ status, proposal_id, lawyer_id, job_id });
    },
    handleRejectBidAction(proposal_id, lawyer_id, job_id) {
      let status = "Reject";
      this.changeStatus({ status, proposal_id, lawyer_id, job_id });
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
          api.post('/client/change-proposal-status', obj).then(res => {
            this.$swal('Success', `Proposal has been ${obj.status}ed successfully`, 'success').then(async () => {
              await this.getPaginatedData();
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
</style>
