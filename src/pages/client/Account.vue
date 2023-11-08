<template lang="">
  <div class="c-main">
  <ClientHeader />
  <div class="container">

    <div
      class="modal fade first-name-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
      id="Fname"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">First Name</h5>
            <button
              type="button"
              class="close btn btn-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                name="fname"
                class="form-control"
                id="fname"
                v-model="form.first_name"
              />
              <button
                type="button"
                name="fname-submit"
                class="btn btn-dark my-3"
                @click="updateProfile('first_name', '#Fname')"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade last-name-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
      id="Lname"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Last Name</h5>
            <button
              type="button"
              class="close btn btn-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                name="lname"
                class="form-control"
                id="lname"
                v-model="form.last_name"
              />
              <button
                type="button"
                name="lname-submit"
                class="btn btn-dark my-3"
                @click="updateProfile('last_name', '#Lname')"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade phone-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
      id="Pnum"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Phone Number</h5>
            <button
              type="button"
              class="close btn btn-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <input
                type="tel"
                name="phone"
                class="form-control"
                id="phone"
                v-model="form.phone"
                maxlength="10"
              />
              <button
                type="button"
                name="phone-submit"
                class="btn btn-dark my-3"
                @click="updateProfile('phone', '#Pnum')"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered mt-5 mb-3 table-striped">
      <tbody>
        <!-- Email -->
        <tr>
          <td class="col-md-3">Email</td>
          <td>{{ loginUser?.email }}</td>
        </tr>

        <!-- First name -->
        <tr>
          <td class="d-flex align-items-center justify-content-between">
            First Name
            <button
              type="button"
              class="btn btn-dark btn-sm"
              data-bs-toggle="modal" data-bs-target="#Fname"
              title="Edit"
              @click="updateFormProperties"
            >
              <i class="fa fa-pencil"></i>
            </button>
          </td>

          <!-- Modal -->

          <!-- Modal ends here -->

          <td>{{ loginUser?.first_name }}</td>
        </tr>

        <!-- Last name -->
        <tr>
          <td class="d-flex align-items-center justify-content-between">
            Last Name
            <button
              type="button"
              class="btn btn-dark btn-sm"
              data-bs-toggle="modal" data-bs-target="#Lname"
              title="Edit"
              @click="updateFormProperties"
            >
              <i class="fa fa-pencil"></i>
            </button>
          </td>

          <!-- Modal -->

          <!-- Modal ends here -->

          <td>{{ loginUser?.last_name }}</td>
        </tr>

        <!-- Phone -->
        <tr>
          <td class="d-flex align-items-center justify-content-between">
            Phone Number
            <button
              type="button"
              class="btn btn-dark btn-sm"
              data-bs-toggle="modal" data-bs-target="#Pnum"
              title="Edit"
              @click="updateFormProperties"
            >
              <i class="fa fa-pencil"></i>
            </button>
          </td>

          <!-- Modal -->

          <!-- Modal ends here -->

          <td>{{ loginUser?.phone }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Change password -->
    <div>

      <ChangePasswordForm />
      <!-- <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="modal" data-bs-target="#Password"
        title="Edit"
        @click="updateFormProperties(true)"
      >
        Change password <i class="bi bi-pencil-fill"></i>
      </button> -->

      <!-- Modal -->
      <div
        class="modal fade change-password-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="Password"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Change password
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <Form  class="col-md-12 col-sm-12" @submit="changePassword" :validation-schema="schema" v-slot="{errors}">
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
                      class="btn btn-dark my-3"
                    >
                      Save Changes
                    </button>
                </Form>
              
              <!-- <form >
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
                    type="button"
                    name="password-submit"
                    class="btn btn-secondary my-3"
                  >
                    Save changes
                  </button>
                </div>
              </form> -->
            </div>
          </div>
        </div>
      </div>
      <!-- Modal ends here -->
    </div>
  </div>
  <div class="footer">
      <MainFooter />
    </div>
</div>
</template>
<script>
import ClientHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";

import * as yup from "yup";
import { Form, Field } from 'vee-validate';
import api from "@/config/api.js";
import $ from 'jquery';
window.$ = window.jQuery = $;
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";

export default {
  name: "ClientAccount",
  components: {
    ClientHeader, Form, Field, ChangePasswordForm, MainFooter
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
      schema,
      form: {
        first_name: null,
        last_name: null,
        phone: null,
      },
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters.loginUser;
    },
  },
  created() {
    this.updateFormProperties();
  },
  methods: {
    updateFormProperties(notCreated) {
      const userData = this.loginUser;
      if (userData) {
        this.form.first_name = userData.first_name;
        this.form.last_name = userData.last_name;
        this.form.phone = userData.phone;
      }
      if (notCreated) {
        document.getElementById('prev_password').value = "";
        document.getElementById('password').value = "";
      }
    },
    async updateProfile(keyName, modalId) {
      if (this.form[keyName] == null || this.form[keyName] == "") {
        return false;
      }
      const formData = {
        [keyName]: this.form[keyName]
      }
      console.log('jjkk :::: ', formData);
      try {
        api.post('/update-profile', formData).then(res => {
          this.closeModal(modalId);
          this.$swal("success", "Profile updated successfully", "success").then(() => {
            this.setUserInStateAndLocalStorage(res);
          });
        })
      } catch (error) {
        this.$swal("Error", "Something went wrong, please try again", "error")
        // console.error('Error uploading image', error);
      }
    },

    changePassword(formData) {
      api.post('/change-password', formData)
        .then(() => {
          this.closeModal('#Password');
          this.$swal('Success', 'Password has been changed successfully', 'success')
          // .then(() => {
          //   document.getElementById('prev_password').value = "";
          //   document.getElementById('password').value = "";
          // });
        })
        .catch(error => {
          this.$swal('Error', error?.response?.data?.error, 'error');
          console.log("getResults : ", error?.response?.data?.error)
        });
    },

    closeModal(modalId) {
      $(modalId).modal('hide');
    },

  }
}

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
  width: 225px;
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

.c-main {
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
