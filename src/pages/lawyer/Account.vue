<template lang="">
  <div class="l-main">
    <LawyerHeader />
    <div class="container">
      <div v-if="isLoading" class="loading-indicator"></div>

      <div v-if="adminApproval != 'approve'">
        <p class="h5 m-3 text-center">
          Your profile has not been approved yet.
        </p>
      </div>
      <div v-else class="py-5">
        <div v-if="subscriptionData != null" >
          <h3 class="my-3 mt-4">Subscription</h3>
          <p>
            Subscription Status :
            <span v-if="subscriptionData?.subscription_status == 'trialing'">
              <b>60 days free trail</b>
            </span>
            <span v-else-if="subscriptionData?.subscription_status == 'active'">
              <b>Subscribed</b>
            </span>
            <span v-else>
              <b>{{ subscriptionData?.subscription_status }}</b>
            </span>
            <br />
            <span
              v-if="
                subscriptionData?.subscription_status == 'active' ||
                subscriptionData?.subscription_status == 'trialing'
              "
            >
              Next bill due <b>{{ subscriptionData?.current_period_end }}</b>
              <br />
              <span v-if="subscriptionData?.plan == 'basic'"
                ><b>$39.00/month</b></span
              >
              on {{ subscriptionData?.card_brand }} ----{{
                subscriptionData?.card_last4
              }}
              Exp. {{ subscriptionData?.card_expiry }}
            </span>
          </p>

          <button
            class="btn btn-sm btn-dark mb-2"
            @click="replacePaymentMethod(subscriptionData?.plan)"
          >
            Replace Payment Method
          </button>

          <h3 class="my-3 mt-4">Receipts</h3>


          <!-- <form @submit.prevent="searchReceipts">
            <label for="startDate">Start Date:</label>
            <input type="date" v-model="startDate" id="startDate" required>

            <label for="endDate">End Date:</label>
            <input type="date" v-model="endDate" id="endDate" required>

            <button type="submit">Search</button>
          </form> -->

          <table class="table table-bordered table-striped">
            <tbody>
              <tr>
                <td>
                  <table
                    v-if="receipts.length > 0"
                    class="table table-bordered table-striped mt-3"
                  >
                    <thead class="hd-receipt">
                      <th>#</th>
                      <th>Invoice ID</th>
                      <th>Amount Paid</th>
                      <th>Date of issue</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(receipt, index) in receipts"
                        :key="receipt.id"
                      >
                        <td>{{ ++index }}</td>
                        <td>{{ receipt?.id }}</td>
                        <td>{{ receipt?.amount_paid }}</td>
                        <!-- <td>{{ new Date(receipt?.created * 1000).toLocaleDateString() }}</td> -->
                        <td>
                          {{
                            new Date(
                              receipt?.created * 1000
                            ).toLocaleDateString("en-AU", {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            })
                          }}
                        </td>
                        <td>
                          <a
                            class="btn btn-sm btn-dark"
                            :href="receipt?.invoice_pdf"
                            >Download</a
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-else>No invoices found.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div v-if="subscriptionCancelStatus" class="text-center">
            <p>
              Your subscription will be cancelled from
              {{ subscriptionData?.current_period_end }}. You can
              <button
                class="forgetp"
                @click="resubscribe(subscriptionData?.plan)"
              >
                resubscribe
              </button>
              at any time.
            </p>
          </div>
          <button
            v-else-if="subscriptionStatus == 'subscribed'"
            class="btn btn-danger"
            id="cancel-subscription"
            @click="handleCancelSubscription"
          >
            Cancel Subscription
          </button>
          <span v-else>
            You have not subscribed yet. 
          <router-link to="/plans" class="btn btn-dark"
            >Subscribe now</router-link
          >
          </span>
        </div>

        <!-- Change account password -->

        <ChangePasswordForm />

        <!-- <h3 class="my-3 mt-5">Change Password</h3>

        <Form  class="col-md-6 col-sm-12" @submit="changePassword" :validation-schema="schema" v-slot="{errors}">

          <Field type="password" 
          id="prev_password"
          :class="['form-control', 'mb-2', { 'is-invalid': errors['prev_password'] }]" 
          name="prev_password" 
          placeholder="Old password" 
          />
          <span class="invalid-feedback">{{errors.prev_password}}</span>

          <Field type="password" 
          id="password"
          :class="['form-control', { 'is-invalid': errors['password'] }]"
          name="password" 
          placeholder="New password" 
          />
          <span class="invalid-feedback">{{errors.password}}</span>

          <button
              type="submit"
              name="password-submit"
              class="btn btn-secondary my-3"
            >
              Save Changes
            </button>

        </Form> -->

        <!-- <form action="account.php" method="post" class="col-md-6 col-sm-12">
          <div class="form-group">
            <input
              type="password"
              name="prev_password"
              class="form-control mb-2"
              id="prev_password"
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
        </form> -->

        <!-- Delete account permanently -->
        <h3 class="mt-4">Delete Account</h3>
        <button @click="deleteAccount" class="btn btn-danger">
          <i class="bi bi-trash-fill"></i> Delete Account
        </button>
        <!-- <form
          method="POST"
          class="d-none"
          action="./backend/delete_account.php"
        >
          ";
          <input type="submit" value="Delete account" />
        </form> -->
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
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";
import { mapState } from "vuex";
// import * as yup from "yup";
// import { Form, Field } from 'vee-validate';
import api from "@/config/api.js";
export default {
  components: {
    LawyerHeader,
    MainFooter,
    // Form,
    // Field,
    ChangePasswordForm,
  },
  data() {
    // const schema = yup.object().shape({
    //   prev_password: yup
    //     .string()
    //     .required('Please enter your current password')
    //     .min(6, 'Password must be greater then 6 digit')
    //     .max(16, 'Password must be less then 16 digit')
    //     .matches(
    //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //       'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
    //     ),

    //   password: yup
    //     .string()
    //     .required('Please enter your new password')
    //     .min(6, 'Password must be greater then 6 digit')
    //     .max(16, 'Password must be less then 16 digit')
    //     .matches(
    //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //       'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
    //     ),
    // });
    return {
      // schema,
      startDate: '',
      endDate: '',
      receipts: [],
    };
  },
  computed: {
    ...mapState(["isSuccessMessage"]),
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionData() {
      console.log("sub : ", this.$store.getters.subscriptionData);
      return this.$store.getters.subscriptionData;
    },
    subscriptionStatus() {
      console.log("ss tt uu : ", this.$store.getters.subscriptionStatus);
      return this.$store.getters.subscriptionStatus;
    },
    subscriptionCancelStatus() {
      console.log("ss tt uu 2: ", this.$store.getters.subscriptionCancelStatus);
      return this.$store.getters.subscriptionCancelStatus;
    },
  },
  created() {
    this.$store.commit("SET_REPLACE_PAYMENT_METHOD", false);
    this.getReceipts();
  },
  methods: {


    formatReceiptDate(timestamp) {
      // Function to format the receipt date
      return new Date(timestamp * 1000).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
    getReceipts() {
      api
        .get("/lawyer/get-receipts")
        .then((res) => {
          console.log("resp dataaaaaaa : ", res?.data?.data);
          this.receipts = res?.data?.data;
          console.log(res.data?.data);
        })
        .catch((error) => {
          console.log("getResults : ", error);
        });
    },



    async searchReceipts() {
      // const startTimestamp = new Date(this.startDate).getTime() / 1000;
      // const endTimestamp = new Date(this.endDate).getTime() / 1000;
      try {
        api.get("/lawyer/get-receipts", { params: { start_date: this.startDate, end_date: this.endDate } })
          // api.get("/lawyer/get-receipts",{ params: { start_date: startTimestamp, end_date: endTimestamp } })
          .then((res) => {
            this.receipts = res?.data?.data;
            console.log(res.data?.data);
          })
          .catch((error) => {
            console.log("getResults : ", error);
          });
      } catch (error) {
        console.error('Error fetching receipts', error);
      }
    },


    replacePaymentMethod(plan) {
      this.$store.commit("SET_REPLACE_PAYMENT_METHOD", true);
      this.$router.push({ path: `/subscribe/${plan}` });
    },
    resubscribe(plan) {
      this.$swal({
        title: "Are you sure?",
        text: "Are you sure you want to resubscribe ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Resubscribe",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .get(`/lawyer/resubscribe/${plan}`)
            .then(() => {
              this.$swal(
                "",
                "You have been resubscribed successfully",
                "success"
              ).then(() => {
                this.$store.commit("SET_SUB_CANCEL_STATUS", false);
              });
            })
            .catch((error) => {
              this.$swal(
                "",
                error?.response?.data?.error,
                "error"
              );
            });
        }
      });
    },
    handleCancelSubscription() {
      this.$swal({
        title: "Are you sure?",
        text: `Are you sure you want to cancel your subscription? You will not be able to access the Simplawfy platform or have any of your proposal accepted from ${this.subscriptionData?.current_period_end} unless you resubscribe.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel Subscription",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .get("/lawyer/cancel-subscription")
            .then(() => {
              this.$swal(
                "Cancelled!",
                `Your Subscription will be cancelled from ${this.subscriptionData?.current_period_end} You can resubscribe at any time.`,
                "success"
              ).then(() => {
                this.$store.commit("SET_SUB_CANCEL_STATUS", true);
              });
            })
            .catch((error) => {
              this.$swal(
                "",
                error?.response?.data?.error,
                "error"
              );
            });
        }
      });
    },
    deleteAccount() {
      let text = "You won't be able to revert this.";
      let text2 = "Yes, Delete Account";
      if (this.subscriptionStatus == "subscribed") {
        text =
          "You won't be able to revert this. Deleting your account will also cancel your subscription.";
        text2 = "Yes, Unsubscribe & Delete Account";
      }
      this.$swal({
        title: "Are you sure?",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: text2,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .get("/delete-account")
            .then(() => {
              this.$swal(
                "Deleted!",
                "Your Account has been deleted.",
                "success"
              ).then(() => {
                this.logoutProcess("login");
              });
            })
            .catch((error) => {
              this.$swal(
                "",
                error?.response?.data?.error,
                "error"
              );
            });
        }
      });
    },

    // changePassword(formData) {
    //   api.post('/change-password', formData)
    //     .then(() => {
    //       this.$swal('Success', 'Password has been changed successfully', 'success').then(() => {
    //         document.getElementById('prev_password').value = "";
    //         document.getElementById('password').value = "";
    //       });
    //     })
    //     .catch(error => {
    //       this.$swal('Error', error?.response?.data?.error, 'error');
    //       console.log("getResults : ", error?.response?.data?.error)
    //     });
    // }
  },
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

.l-main {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.hd-receipt th {
  border: none;
}

.forgetp {
  color: #000
}
</style>
