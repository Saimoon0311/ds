<template lang="">
  <div class="hello">
    <LawyerHeader />
    <div class="container">
      <div v-if="adminApproval != 'approve'">
        <p class="h5 m-3 text-center">Your profile has not been approved yet.</p>
      </div>
      <div v-else class="pb-5">
        <h3 class="my-3">Subscription</h3>

        <!-- Subscription -->
        <div>
          <table class="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Subscription Status</th>
                <td>{{ subscriptionData?.subscription_status ?? 'N/A' }}</td>
              </tr>
              <tr>
                <th>Start Date</th>
                <td>{{ subscriptionData?.subscription_start ?? 'N/A' }}</td>
              </tr>
              <tr>
                <th>Current Period Start</th>
                <td>{{ subscriptionData?.current_period_start ?? 'N/A' }}</td>
              </tr>
              <tr>
                <th>Current Period End</th>
                <td id="currentPeriodEnd">{{ subscriptionData?.current_period_end ?? 'N/A' }}</td>
              </tr>
              <tr>
                <th>Payment Method</th>
                <td v-if="subscriptionData == null">No payment methods found.</td>
                <td v-else>
                  <p>Card Holder Name: {{ subscriptionData?.card_holder_name }}</p>
                  <p>The {{ subscriptionData?.card_brand }} card ending in {{ subscriptionData?.card_last4 }}</p>
                  <p>Expiry: {{ subscriptionData?.card_expiry }}</p>
                  <a
                    class="btn btn-sm btn-secondary"
                    href="./replace_payment_method.php"
                    >Replace Payment Method</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- after subscribe -->
        <!-- <h3 class="my-3">Subscription</h3> -->
        <div>
          <!-- <table class="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Subscription Status</th>
                <td>60 day free trial</td>
              </tr>
              <tr>
                <th>Start Date</th>
                <td>17-10-2023</td>
              </tr>
              <tr>
                <th>Current Period Start</th>
                <td>17-10-2023</td>
              </tr>
              <tr>
                <th>Current Period End</th>
                <td id="currentPeriodEnd">16-12-2023</td>
              </tr>
              <tr>
                <th>Payment Method</th>
                <td>
                  <p>Card Holder Name: asd</p>
                  <p>The Visa card ending in 4242</p>
                  <p>Expiry: 4/2024</p>
                  <a
                    class="btn btn-sm btn-secondary"
                    href="./replace_payment_method.php"
                    >Replace Payment Method</a
                  >
                </td>
              </tr>
            </tbody>
          </table> -->
          <button
            class="btn btn-danger"
            id="cancel-subscription"
            onclick="handleCancelSubscription()"
          >
            Cancel Subscription
          </button>
        </div>

        <!-- Change account password -->
        <h3 class="my-3 mt-5">Change Password</h3>
        <form action="account.php" method="post" class="col-md-6 col-sm-12">
          <div class="form-group">
            <input
              type="password"
              name="prev-password"
              class="form-control mb-2"
              id="prev-password"
              placeholder="Old password"
            />
            <input
              type="password"
              name="password"
              class="form-control"
              id="password"
              placeholder="New password"
            />
            <button
              type="submit"
              name="password-submit"
              class="btn btn-secondary my-3"
            >
              Save Changes
            </button>
          </div>
        </form>

        <!-- Delete account permanently -->
        <h3 class="mt-4">Delete Account</h3>
        <button onclick="deleteAccount(event)" class="btn btn-danger">
          <i class="bi bi-trash-fill"></i> Delete Account
        </button>
        <form
          method="POST"
          class="d-none"
          action="./backend/delete_account.php"
        >
          ";
          <input type="submit" value="Delete account" />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
export default {
  components: {
    LawyerHeader,
  },
  computed: {
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionData() {
      return this.$store.getters.subscriptionData;
    }
  },
  methods: {},
  name: "AccountTab",
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
