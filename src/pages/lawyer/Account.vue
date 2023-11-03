<template lang="">
  <div class="hello">
    <LawyerHeader />
    <div class="container">

      <div v-if="isLoading" class="loading-indicator">

      </div>

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
                <td v-if="subscriptionData?.subscription_status == 'active'">Subscribed</td>
                <td v-else>{{ capitalizeFirstLetter(subscriptionData?.subscription_status) }}</td>
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
                  <button
                    class="btn btn-sm btn-secondary"
                    @click="replacePaymentMethod"
                    >Replace Payment Method</button>
                </td>
              </tr>
              <tr>
                <th>Receipts</th>
                <td>
                  <table v-if="receipts.length > 0" class="table table-bordered table-striped">
                    <thead>
                      <th>#</th>
                      <th>Receipt ID</th>
                      <th>Amount Paid</th>
                      <th>Date of issue</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr v-for="(receipt,index) in receipts" :key="receipt.id">
                        <td>{{ ++index }}</td>
                        <td>{{ receipt?.id }}</td>
                        <td>{{ receipt?.amount_paid }}</td>
                        <td>{{ new Date(receipt?.created * 1000).toLocaleDateString() }}</td>
                        <td><a class="btn btn-sm btn-secondary" :href="receipt?.invoice_pdf">Download</a></td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-else>No Receipts Found!</p>

                  <!-- <ul>
                  
                    <li v-for="receipt in receipts" :key="receipt.id">
                      <strong>Receipt ID:</strong> {{ receipt?.id }}<br>
                      <strong>Amount:</strong> {{ receipt?.amount_paid / 100 }} USD<br>
                      <strong>Date:</strong> {{ new Date(receipt?.created * 1000).toLocaleDateString() }}
                    </li>
                  </ul> -->
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

          <div v-if="subscriptionCancelStatus" class="text-center">
            <p>Your subscription will be cancelled from 
              {{ subscriptionData?.current_period_end }}. You can <button class="forgetp" @click="resubscribe">resubscribe</button> at any time. </p>
          </div>
          <button
            v-else-if="subscriptionStatus == 'subscribed'"      
            class="btn btn-danger"
            id="cancel-subscription"
            @click="handleCancelSubscription"
          >
            Cancel Subscription
          </button>
          <router-link v-else to="/subscribe"  class="btn btn-primary"
            >Subscribe now</router-link>
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
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";
import { mapState } from 'vuex';
// import * as yup from "yup";
// import { Form, Field } from 'vee-validate';
import api from "@/config/api.js";
export default {
  components: {
    LawyerHeader, 
    // Form, 
    // Field, 
    ChangePasswordForm
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
      receipts: [],
    }
  },
  computed: {
    ...mapState(['isSuccessMessage']),
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionData() {
      return this.$store.getters.subscriptionData;
    },
    subscriptionStatus() {
      console.log('ss tt uu : ', this.$store.getters.subscriptionStatus);
      return this.$store.getters.subscriptionStatus;
    },
    subscriptionCancelStatus() {
      console.log('ss tt uu 2: ', this.$store.getters.subscriptionCancelStatus);
      return this.$store.getters.subscriptionCancelStatus;
    }
  },
  created() {
    this.$store.commit('SET_REPLACE_PAYMENT_METHOD', false);
    this.getReceipts();
  },
  methods: {
    getReceipts() {
      api.get('/lawyer/get-receipts')
        .then(res => {
          this.receipts = res?.data?.data?.data;
          console.log('resp id : ', this.receipts?.id);
          console.log('resp amount : ', this.receipts?.amount_paid);
          console.log('resp date : ', new Date(this.receipts?.created * 1000).toLocaleDateString());
          console.log(res.data?.data?.data);
        })
        .catch(error => {
          console.log("getResults : ", error)
        });
    },
    replacePaymentMethod() {
      this.$store.commit('SET_REPLACE_PAYMENT_METHOD', true);
      this.$router.push({ path: '/subscribe' });
    },
    resubscribe() {
      this.$swal({
        title: 'Are you sure?',
        text: 'Are you sure you want to resubscribe ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Resubscribe'
      }).then((result) => {
        if (result.isConfirmed) {
          api.post('/lawyer/resubscribe')
            .then(() => {
              this.$swal(
                'Success',
                'You have been resubscribed successfully',
                'success'
              ).then(() => {
                this.$store.commit('SET_SUB_CANCEL_STATUS', false);
              });
            }).catch(() => {
              this.$swal('Error', 'Something went wrong! please retry', 'error');
            });
        }
      })
    },
    handleCancelSubscription() {
      this.$swal({
        title: 'Are you sure?',
        text: `Are you sure you want to cancel your subscription? You will not be able to access the Simplawfy platform or have any of your proposal accepted from ${this.subscriptionData?.current_period_end} unless you resubscribe.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel Subscription'
      }).then((result) => {
        if (result.isConfirmed) {
          api.get('/lawyer/cancel-subscription')
            .then(() => {
              this.$swal(
                'Cancelled!',
                `Your Subscription will be cancelled from ${this.subscriptionData?.current_period_end} You can resubscribe at any time.`,
                'success'
              )
                .then(() => {
                  this.$store.commit('SET_SUB_CANCEL_STATUS', true);
                });
            }).catch(() => {
              this.$swal('Error', 'Something went wrong! please retry', 'error');
            });
        }
      })
    },
    deleteAccount() {
      let text = "You won't be able to revert this.";
      let text2 = "Yes, Delete Account";
      if (this.subscriptionStatus == 'subscribed') {
        text = "You won't be able to revert this. Deleting your account will also cancel your subscription.";
        text2 = "Yes, Unsubscribe & Delete Account";
      }
      this.$swal({
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: text2,
      }).then((result) => {
        if (result.isConfirmed) {
          api.get('/delete-account')
            .then(() => {
              this.$swal(
                'Deleted!',
                'Your Account has been deleted.',
                'success'
              ).then(() => {
                this.logoutProcess('lawyer-login');
              });
            }).catch(() => {
              this.$swal('Error', 'Something went wrong! please retry', 'error');
            });
        }
      })
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
