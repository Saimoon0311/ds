<template lang="">
  <div class="c-main">
  <ClientHeader />
  <div class="container">
    <h3 class="mt-3 text-center">Account</h3>
  
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
                v-model="form.first_name_verify"
              />
              <button
                type="button"
                name="fname-submit"
                class="btn btn-dark my-3"
                @click="updateProfile(
                  'first_name_verify',
                  '#Fname',
                  'First Name')"
              >
                Submit for Verification
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
                v-model="form.last_name_verify"
              />
              <button
                type="button"
                name="lname-submit"
                class="btn btn-dark my-3"
                @click="updateProfile('last_name_verify', '#Lname','Last name')"
              >
                Submit for Verification
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
                maxlength="15"
              />
              <button
                type="button"
                name="phone-submit"
                class="btn btn-dark my-3"
                @click="updateProfile('phone', '#Pnum','Phone number')"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="noti-main pb-3">
          <h4 class="my-3 mt-4">Notifications</h4>
          <div class="d-flex align-items-center justify-content-start mb-2">
          <h5>System Notifications : </h5>
          <div class="switch-container disabled-swtich mx-1">
            <label class="switch">
              <input type="checkbox" disabled checked>
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-start">
          <h5>Access Notifications : </h5>
          <div class="switch-container mx-1">
            <label class="switch">
              <input type="checkbox" v-model="checkbox" @change="toggleSubscription">
              <span class="slider round"></span>
            </label>
          </div>
        </div>

         </div>

    <h4 class="mt-4">Details</h4>

    <table class="table table-bordered mt-3 mb-3 table-striped">
      <tbody>
        <!-- Email -->
        <tr>
          <td class="d-flex align-items-center justify-content-between">Email:
            <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-target=".edit-email-modal"
                  title="Edit"
                  data-bs-toggle="modal" data-bs-target="#emailModal"
                >
                  <i class="fa fa-pencil"></i>
                </button>
          </td>
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


    <div
        class="modal fade edit-email-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="emailModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Email</h5>
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
              <!-- <form action="profile.php" method="post"></form> -->
              <div class="form-group">
                <input
                  type="text"
                  name="email"
                  maxlength="200"
                  class="form-control"
                  id="email"
                  v-model="email"
                  placeholder="Enter new email for verification"
                />
                <button
                  type="button"
                  name="job-email-submit"
                  class="btn btn-dark my-3"
                  @click="sendUpdateEmail('emailModal')"
                >
                Send Verification Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


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
    
      <h4 class="mt-4">Delete Account</h4>
        <button @click="deleteAccount" class="btn btn-danger">
          <i class="bi bi-trash-fill"></i> Delete Account
        </button>
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
// import ProfileImage from "../../components/ProfileImage.vue";


import * as yup from "yup";
import { Form, Field } from 'vee-validate';
import api from "@/config/api.js";
import $ from 'jquery';
window.$ = window.jQuery = $;
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";

export default {
  name: "ClientAccount",
  components: {
    ClientHeader, Form, Field, ChangePasswordForm, MainFooter,
    // ProfileImage
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
        first_name_verify: null,
        last_name_verify: null,
        first_name: null,
        last_name: null,
        phone: null,
      },
      email: null,
      checkbox: true,
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters.loginUser;
    },
  },
  created() {
    this.updateFormProperties();
    this.checkSendgridStatus();
  },
  methods: {

    checkSendgridStatus() {
      api
        .get("/check-sendgrid-status")
        .then((res) => {
          this.checkbox = !res?.data?.exist_in_sendgrid;
        })
        .catch((error) => {
          console.log("getResults : ", error);
        });
    },

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

    async updateProfile(keyName, modalId, keyName2) {
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

          let msg = null;

          if (keyName == "first_name_verify") {
            msg = `Thanks for submitting your details. They'll be updated pending verification.`;
          } else if (keyName == "last_name_verify") {
            msg = `Thanks for submitting your details. They'll be updated pending verification.`;
          } else {
            msg = `${keyName2} updated successfully`;
          }

          this.$swal("", msg, "success").then(() => {
            this.setUserInStateAndLocalStorage(res);
          });
        })
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error")
        // console.error('Error uploading image', error);
      }
    },


    async sendUpdateEmail(modalId = null) {
      try {
        await api.post('/send-email-update-link', { "old_email": this?.loginUser?.email, "email": this.email });
        this.$swal("", "Please check your new email address for your verification link.", "success");
        if (modalId) {
          this.closeModal(modalId);
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Handle validation error (status 422)
          this.$swal(
            "Error",
            "Validation error: " + error.response.data.message,
            "error"
          );
        } else {
          console.error("Error fetching options:", error);
        }
      }
    },

    deleteAccount() {
      let text = "Once deleted, your account cannot be recovered.";
      let text2 = "Yes, Delete Account";

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
                '',
                'Your account has been deleted.',
                'success'
              ).then(() => {
                this.logoutProcess('login');
              });
            }).catch((error) => {
              this.$swal('', error?.response?.data?.error, 'error');
            });
        }
      })
    },
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
    updateFormProperties(notCreated) {
      const userData = this.loginUser;
      if (userData) {
        this.form.first_name_verify = userData.first_name;
        this.form.last_name_verify = userData.last_name;
        // this.form.first_name = userData.first_name;
        // this.form.last_name = userData.last_name;
        this.form.phone = userData.phone;
        // this.email = userData.email;
      }
      if (notCreated) {
        document.getElementById('prev_password').value = "";
        document.getElementById('password').value = "";
      }
    },


    changePassword(formData) {
      api.post('/change-password', formData)
        .then(() => {
          this.closeModal('#Password');
          this.$swal('', 'Password has been changed successfully', 'success')
          // .then(() => {
          //   document.getElementById('prev_password').value = "";
          //   document.getElementById('password').value = "";
          // });
        })
        .catch(error => {
          this.$swal('', error?.response?.data?.error, 'error');
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



.switch-container {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 78px;
  height: 30px;
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
  left: 3px;
  bottom: 2px;
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



</style>
