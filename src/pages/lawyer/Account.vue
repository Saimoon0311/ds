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
            v-if="subscriptionStatus == 'subscribed'"
            class="btn btn-danger"
            id="cancel-subscription"
            onclick="handleCancelSubscription()"
          >
            Cancel Subscription
          </button>
        </div>

        <!-- Change account password -->
        <h3 class="my-3 mt-5">Change Password</h3>

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

        </Form>

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
import { mapState } from 'vuex';
import * as yup from "yup";
import { Form, Field } from 'vee-validate';
import api from "@/config/api.js";
export default {
  components: {
    LawyerHeader, Form, Field,
  },
  data() {
    const schema = yup.object().shape({
      prev_password: yup
        .string()
        .required('Please enter your current password')
        .min(6, 'Password must be greater then 6 digit')
        .max(16, 'Password must be less then 16 digit')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
        ),

      password: yup
        .string()
        .required('Please enter your new password')
        .min(6, 'Password must be greater then 6 digit')
        .max(16, 'Password must be less then 16 digit')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
        ),
    });
    return {
      schema
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
      return this.$store.getters.subscriptionStatus;
    }
  },
  methods: {
    deleteAccount() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this. Deleting your account will also cancel your subscription.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Unsubscribe & Delete Account'
      }).then((result) => {
        if (result.isConfirmed) {
          api.get('/delete-account')
            .then(() => {
              this.$swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              ).then(()=>{
                  this.logoutProcess('lawyer-login');
              });
            }).catch(() => {
              this.$swal('Something went wrong! please retry');            
            });
        }
      })

    },

    changePassword(formData) {
      api.post('/change-password', formData)
        .then(() => {
          this.$swal('Success', 'Password has been changed successfully', 'success').then(() => {
            document.getElementById('prev_password').value = "";
            document.getElementById('password').value = "";
          });
        })
        .catch(error => {
          this.$swal('Error', error?.response?.data?.error, 'error');
          console.log("getResults : ", error?.response?.data?.error)
        });
    }
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
