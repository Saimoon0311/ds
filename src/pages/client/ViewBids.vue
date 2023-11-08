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
                  <!-- <th>Deadline achievable?</th>
                  <th>Free/discounted first consultation?</th> -->
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colspan="8" class="text-center">
                    No active Proposals are available.
                  </td>
                </tr>
                <tr class="text-left">
                  <td>testing client (crinimal)</td>
                  <td>Fixed fee</td>
                  <td>$100.00</td>
                  <td>Yes - $55.00</td>
                  <td>dummy text</td>
                  <!-- <td>Yes</td>
                  <td>No</td> -->
                  <td>
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
                <tr>
                  <td colspan="7" class="text-center">
                    No closed Proposals are available.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- request info -->
      <h4>Information Requests</h4>
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
      </table>
    </div>
  </div>
</template>
<script>
import ClientHeader from "./Header.vue";

export default {
  name: "ClientDashboard",
  components: {
    ClientHeader,
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
