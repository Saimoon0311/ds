<template lang="">
  <div class="l-main">
    <LawyerHeader />
    <div class="container">
      <div class="text-center">
        <h3 class="mt-3 text-center">Account</h3>
        <!-- <h5 class="mt-2 text-center">Details</h5> -->
      </div>
      <div v-if="isLoading" class="loading-indicator"></div>

      <div v-if="adminApproval != 'approve'">
        <p class="h5 m-3 text-center">
          Your profile has not been approved yet.
        </p>
      </div>

      <div v-else class="pb-5 pt-2">
        <!-- <div v-if="!userFields && !userLocations" class="border rounded bg-light p-3 d-flex flex-wrap">
          <p class="mx-auto my-0">Your profile is not completed . Click here to complete your
            <router-link to="/lawyer-profile" class="btn btn-dark text-white">Profile</router-link>
          </p>
        </div> -->
        <!-- <div class="noti-main pb-3">
          <h4 class="my-3 mt-4">Notifications</h4>
          <div class="switch-container">
            <label class="switch">
              <input type="checkbox" v-model="checkbox" @change="toggleSubscription">
              <span class="slider round"></span>
            </label>
          </div>
         
        </div> -->

        <div class="noti-main pb-3">
          <h4 class="my-3 mt-4">Notifications</h4>
          <h6>System Notifications : </h6>
          <div class="switch-container">
            <label class="switch">
              <input type="checkbox" disabled checked>
              <span class="slider round"></span>
            </label>
          </div>
          <h6>Access Notifications : </h6>
          <div class="switch-container">
            <label class="switch">
              <input type="checkbox" v-model="checkbox" @change="toggleSubscription">
              <span class="slider round"></span>
            </label>
          </div>
         </div>

        

        <div v-if="!userFields && !userLocations">
          <span
            >Your profile is not completed . Click here to complete your
            <router-link to="/lawyer-profile" class="btn btn-dark text-white"
              >Profile</router-link
            >
          </span>
        </div>

        <span v-else>
          <div v-if="subscriptionData != null">
            <h4 class="my-3 mt-4">Subscription</h4>
            <div class="subscriptioncard rounded">
              <div class="header p-3">
                <span
                  v-if="subscriptionData?.subscription_status == 'trialing'"
                  class="badge"
                >
                  60-Day Free Trial
                </span>
                <span
                  class="badge"
                  v-else-if="subscriptionData?.subscription_status == 'active'"
                >
                  Subscribed
                </span>
                <span v-else>
                  {{ subscriptionData?.subscription_status }}
                </span>
              </div>
              <div class="body p-3">
                <span
                  class=""
                  v-if="
                    subscriptionData?.subscription_status == 'active' ||
                    subscriptionData?.subscription_status == 'trialing' ||
                    subscriptionData?.subscription_status == 'past due'
                  "
                >
                  Next bill due
                  <b>{{ subscriptionData?.current_period_end }}</b>
                  <br />
                  <span v-if="subscriptionData?.plan == 'basic'"
                    ><b>$39.00/month</b></span
                  >
                  on
                  {{ capitalizeFirstLetter(subscriptionData?.card_brand) }}
                  ----{{ subscriptionData?.card_last4 }} Exp.
                  {{ subscriptionData?.card_expiry }}
                </span>
                <div
                  class="d-flex justify-content-start align-items-center mt-2 flex-wrap"
                >
                  <button
                    class="btn btn-md btn-dark"
                    @click="replacePaymentMethod(subscriptionData?.plan)"
                  >
                    Replace Payment Method
                  </button>
                  <div class="">
                    <div v-if="subscriptionCancelStatus" class="text-center">
                      <p class="m-0 text-start pt-1">
                        You have cancelled your subscription. You can continue
                        to access the Simplawfy platform until the
                        {{ subscriptionData?.current_period_end }}. You can
                        <button
                          class="btn btn-dark softblue"
                          @click="resubscribe(subscriptionData?.plan)"
                        >
                          resubscribe
                        </button>
                        at anytime.
                      </p>
                      <!-- <p>
                Your subscription will be cancelled from
                {{ subscriptionData?.current_period_end }}. You can
                <button
                  class="forgetp"
                  @click="resubscribe(subscriptionData?.plan)"
                >
                  resubscribe
                </button>
                at any time.
              </p> -->
                    </div>
                    <button
                      v-else-if="
                        subscriptionStatus == 'subscribed' ||
                        subscriptionStatus == 'incomplete'
                      "
                      class="btn btn-danger btn-md mt-1 mt-md-0 mx-0 mx-md-1"
                      id="cancel-subscription"
                      @click="handleCancelSubscription"
                    >
                      Cancel Subscription
                    </button>
                    <span v-else>
                      You have not subscribed yet.
                      <router-link to="/plans" class="btn btn-dark"
                        >Subscribe Now</router-link
                      >
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <p>
              Subscription Status :
              <span v-if="subscriptionData?.subscription_status == 'trialing'">
                <b>60-Day Free Trial</b>
              </span>
              <span class="m-2 text-decoration-none badge text-black fs-6 bubbles bubbles-other text-white" 
              v-else-if="subscriptionData?.subscription_status == 'active'">
                <b>Subscribe</b>
              </span>
              <span v-else>
                <b>{{ subscriptionData?.subscription_status }}</b>
              </span>
              <br />
              <span
                v-if="
                  subscriptionData?.subscription_status == 'active' ||
                  subscriptionData?.subscription_status == 'trialing' ||
                  subscriptionData?.subscription_status == 'past due'
                "
              >
                Next bill due <b>{{ subscriptionData?.current_period_end }}</b>
                <br />
                <span v-if="subscriptionData?.plan == 'basic'"
                  ><b>$39.00/month</b></span
                >
                on {{ capitalizeFirstLetter(subscriptionData?.card_brand) }} ----{{
                  subscriptionData?.card_last4
                }}
                Exp. {{ subscriptionData?.card_expiry }}
              </span>
            </p> -->
            <!-- <button
              class="btn btn-sm btn-dark mb-2"
              @click="replacePaymentMethod(subscriptionData?.plan)"
            >
              Replace Payment Method
            </button> -->

            <!-- receipts old place -->
          </div>
          <!-- <div class="mt-4">
            <div v-if="subscriptionCancelStatus" class="text-center">
              <p>You have cancelled your subscription. You can continue to access the Simplawfy platform until the
              {{ subscriptionData?.current_period_end }}. You can 
              <button
                  class="forgetp"
                  @click="resubscribe(subscriptionData?.plan)"
                >
                  resubscribe
              </button>
              at anytime.</p>
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
              </p> -->
          <!-- </div>
            <button v-else-if="subscriptionStatus == 'subscribed' || subscriptionStatus == 'incomplete'"
              class="btn btn-danger"
              id="cancel-subscription"
              @click="handleCancelSubscription"
            >
              Cancel Subscription
            </button>
            <span v-else>
              You have not subscribed yet. 
              <router-link to="/plans" class="btn btn-dark"
                >Subscribe Now</router-link
              >
            </span>
          </div> -->

          <!-- Receipts new place -->
          <div v-if="subscriptionData != null">
            <h4 class="mt-5 mb-2 mb-md-3">Invoices</h4>

            <!-- <form @submit.prevent="searchReceipts">
              <label for="startDate">Start Date:</label>
              <input type="date" v-model="startDate" id="startDate" required>

              <label for="endDate">End Date:</label>
              <input type="date" v-model="endDate" id="endDate" required>

              <button type="submit">Search</button>
            </form> -->
            <div class="table-responsive">
              <table
                v-if="receipts.length > 0"
                class="table invoice-table table-striped"
              >
                <thead class="hd-receipt">
                  <!-- <th>#</th> -->
                  <!-- <th>Invoice ID</th> -->
                  <th>Invoice Number</th>
                  <th>Amount Paid</th>
                  <th>Date of Issue</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr v-for="receipt in receipts" :key="receipt.id">
                    <!-- <td>{{ ++index }}</td> -->
                    <!-- <td>{{ receipt?.id }}</td> -->
                    <td>{{ receipt?.number }}</td>
                    <td>$ {{ formatNumber(receipt?.amount_paid / 100.0) }}</td>
                    <!-- <td>{{ new Date(receipt?.created * 1000).toLocaleDateString() }}</td> -->
                    <td>
                      {{
                        new Date(receipt?.created * 1000).toLocaleDateString(
                          "en-AU",
                          {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          }
                        )
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
            </div>
          </div>
        </span>

        <!-- Change account password -->

        <ChangePasswordForm />

        <!-- <h4 class="my-3 mt-5">Change Password</h4>

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
        <h4 class="mt-4">Delete Account</h4>
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
      checkbox: true,
      // schema,
      startDate: "",
      endDate: "",
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

    userFields() {
      console.log("user : ", this.$store.getters?.loginUser);
      return `${this.$store.getters?.loginUser?.fields}`;
    },
    userLocations() {
      return `${this.$store.getters?.loginUser?.locations}`;
    },
  },
  created() {
    this.$store.commit("SET_REPLACE_PAYMENT_METHOD", false);
    this.getReceipts();
  },
  methods: {

    // add-or-remove-unsubscribe-group

    // toggleSubscription() {
    //   console.log(this.checkbox);      
      
    //   // const val = !this.checkbox;
    //   // console.log(this.checkbox);
    //   api.post('/add-or-remove-unsubscribe-group')
    //     .then(response => {
    //       // if (!response.ok) {
    //       //   throw new Error('Failed to toggle subscription');
    //       // }
    //       this.checkbox == !this.checkbox;
    //         console.log(response);
    //     })
    //     .catch(error => {
    //       console.error('Error toggling subscription:', error);
    //     });
    // },


    toggleSubscription() {
  console.log(this.checkbox);

  // Make sure to store the reference to 'this' to access it inside the Promise callback
  const vm = this;

  api.post('/add-or-remove-unsubscribe-group')
    .then(response => {
   
        // Toggle the checkbox state
        vm.checkbox == !vm.checkbox;
        console.log(response);
      if(!vm.checkbox){
        // Open Swal popup
        this.$swal({
          icon: 'success',
          showCancelButton: true,
          cancelButtonText: 'Close',
          // title: 'Subscription toggled successfully!',
          text: 'At Simplawfy, we are always seeking to improve the service we provide and would appreciate your feedback so we can improve.' ,
          showConfirmButton: false,
          // timer: 1500 // Auto close after 1.5 seconds
        });
      }      
    })
    .catch(error => {
      console.error('Error toggling subscription:', error);

      // Open Swal popup for error
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to toggle subscription!',
      });
    });
},


    // toggleCheckbox() {
    //   console.log('abcfasdfasdfasdfasfasdfasdf');
    //   this.checkbox = !this.checkbox;
    //   // this.$emit("setCheckboxVal", this.checkbox);
    // },

    formatReceiptDate(timestamp) {
      // Function to format the receipt date
      return new Date(timestamp * 1000).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    getReceipts() {
      api
        .get("/lawyer/get-receipts")
        .then((res) => {
          console.log("resp dataaaaaaa : ", res?.data?.data);
          this.receipts = res?.data?.data;
          console.log(res.data?.data);
          this.checkbox = !res?.data?.exist_in_sendgrid;
          if (res?.data?.clearOldSubscription) {
            this.$store.commit("SET_SUB_STATUS", null);
            this.$store.commit("SET_SUB_CANCEL_STATUS", false);
            this.$store.commit("SET_SUBSCRIPTION_DATA", null);
          }
        })
        .catch((error) => {
          console.log("getResults : ", error);
        });
    },

    async searchReceipts() {
      // const startTimestamp = new Date(this.startDate).getTime() / 1000;
      // const endTimestamp = new Date(this.endDate).getTime() / 1000;
      try {
        api
          .get("/lawyer/get-receipts", {
            params: { start_date: this.startDate, end_date: this.endDate },
          })
          // api.get("/lawyer/get-receipts",{ params: { start_date: startTimestamp, end_date: endTimestamp } })
          .then((res) => {
            this.receipts = res?.data?.data;
            console.log(res.data?.data);
          })
          .catch((error) => {
            console.log("getResults : ", error);
          });
      } catch (error) {
        console.error("Error fetching receipts", error);
      }
    },

    replacePaymentMethod(plan) {
      this.$store.commit("SET_REPLACE_PAYMENT_METHOD", true);
      localStorage.setItem("replacePaymentMethod", true);
      this.$router.push({ path: `/subscribe/${plan}` });
    },
    resubscribe(plan) {
      this.$swal({
        title: "Are you sure?",
        text: "Are you sure you want to resubscribe?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Resubscribe",
      }).then((result) => {
        if (result.isConfirmed) {
          const endpoint = `/lawyer/resubscribe`;
          const body = { plan: plan };
          const title = "Welcome back!";
          const msg = "You are now resubscribed.";
          this.updateReason(endpoint, body, title, msg);
        }
      });
    },

    async updateReason(endpoint, body, title, msg, is_cancel = false) {
      try {
        await api.post(endpoint, body);
        this.$store.commit("SET_SUB_CANCEL_STATUS", is_cancel);
        const result = await api.get("/verify");
        this.setUserStatus(result);
        this.$swal(title, msg, "success").then(() => {
          this.$router.push({ path: "/lawyer-dashboard" });
        });
      } catch (error) {
        this.$swal.showValidationMessage(error?.response?.data?.error);
      }

      // this.$swal.fire({
      //   title: 'Type reason here:',
      //   input: 'text',
      //   inputAttributes: {
      //     autocapitalize: 'off',
      //   },
      //   showCancelButton: true,
      //   confirmButtonText: 'Submit',
      //   showLoaderOnConfirm: true,
      //   preConfirm: async (inputValue) => {
      //     try {
      //       body.reason = inputValue;
      //       await api.post(endpoint, body);
      //       this.$store.commit("SET_SUB_CANCEL_STATUS", is_cancel);

      //       const result = await api.get("/verify");
      //       this.setUserStatus(result);
      //       // this.verifyUser(result);

      //       return inputValue;
      //     } catch (error) {
      //       // console.error('API Error:',  error?.response?.data?.error,);
      //       this.$swal.showValidationMessage(error?.response?.data?.error);
      //     }
      //   },
      //   allowOutsideClick: () => !this.$swal.isLoading(),
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     this.$swal(title, msg, "success").then(()=>{
      //       this.$router.push({ path: "/lawyer-dashboard" });
      //     })
      //   }
      // });
    },

    // verifyUser() {
    //   api
    //     .get("/verify")
    //     .then((res) => {
    //       this.setUserStatus(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    handleCancelSubscription() {
      this.$swal({
        title: "Are you sure?",
        text: `Are you sure you want to cancel your subscription? You will not be able to access the Simplawfy platform or have any of your proposals accepted after ${this.subscriptionData?.current_period_end} unless you resubscribe.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel Subscription",
        cancelButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          const endpoint = `/lawyer/cancel-subscription`;
          const body = {};
          const title =
            '<span class="sadtoast">You have cancelled your subscription.</span>';
          // const msg = `Your subscription will be cancelled from ${this.subscriptionData?.current_period_end} You can resubscribe at any time.`;
          const msg = `You have cancelled your subscription. You can continue to access the Simplawfy platform until the ${this.subscriptionData?.current_period_end}. You can resubscribe at anytime.`;
          this.updateReason(endpoint, body, title, msg, true);
        }
      });
    },

    deleteAccount() {
      let text =
        "Once deleted, your account cannot be recovered and any active subscription will be cancelled.";
      let text2 = "Delete Account";
      // if (this.subscriptionStatus == "subscribed") {
      //   text =
      //     "Once deleted, your account cannot be recovered and any active subscription will be cancelled.";
      //   text2 = "Delete Account";
      // }
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
              this.$swal("", "Your account has been deleted.", "success").then(
                () => {
                  this.logoutProcess("login");
                }
              );
            })
            .catch((error) => {
              this.$swal("", error?.response?.data?.error, "error");
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
/* .notification p {
  margin: 0;
  line-height: 1;
  padding-left: 10px;
}
.notification {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
} */
.switch-container {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #101010;
}

input:focus+.slider {
  box-shadow: 0 0 1px #101010;
}

input:checked+.slider:before {
  -webkit-transform: translateX(46px);
  -ms-transform: translateX(46px);
  transform: translateX(46px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.subscriptioncard {
  box-shadow: 5px 5px 20px #00000017;
  width: max-content;
  max-width: 100%;
}

.invoice-table {
  box-shadow: 5px 5px 10px #00000017;
}

.header {
  border-radius: 5px 5px 0 0;
  background: rgba(55, 59, 62, 1);
}

thead.hd-receipt th {
  padding: 10px;
  background: #373b3e;
  color: white;
}

thead.hd-receipt {
  border-radius: 10px 10px 0 0;
}

.bubbles {
  border-radius: 6px;
  padding: 8px 11px;
  margin: 8px 7px !important;
  cursor: pointer;
  background: black !important;
  font-weight: 500;
}

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

.invoice-table .hd-receipt th:first-child {
  border-radius: 5px 0 0 0;
}

.invoice-table .hd-receipt th:last-child {
  border-radius: 0 5px 0 0;
}

.navActive {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
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
  color: #000;
}

.badge {
  font-size: 0.875rem;
  line-height: 1.5em;
  font-weight: 400;
  border: 1px solid rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.table-responsive {
  max-height: 330px;
  overflow-y: auto;
  min-height: auto;
}

.table-responsive thead th {
  position: sticky;
  -webkit-position: sticky;
  top: 0;
}

.table-responsive tbody tr {
  /* display: table; */
  width: 100%;
  /* table-layout: fixed; */
}

.table-responsive::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.table-responsive::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(217, 217, 217, 1);
  border-radius: 10px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background-color: rgba(217, 217, 217, 1);
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}

@media screen and (max-width: 767px) {
  .table-responsive table {
    width: max-content;
  }

  .hd-receipt th {
    padding: 5px;
  }
}
</style>
