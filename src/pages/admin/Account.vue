<template lang="">
  <div class="c-main">
  <ClientHeader />
  <div class="container">
    
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
// import { Form, Field } from 'vee-validate';
import api from "@/config/api.js";
import $ from 'jquery';
window.$ = window.jQuery = $;
import ChangePasswordForm from "@/components/ChangePasswordForm.vue";

export default {
  name: "ClientAccount",
  components: {
    ClientHeader, 
    // Form, Field, 
    ChangePasswordForm, MainFooter
  },
  data() {
    const schema = yup.object().shape({
      prev_password: yup
        .string()
        .required('Please enter your current password')
        .min(6, 'Password must be greater then 6 digit')
        .max(16, 'Password must be less then 16 digit')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
        ),

      password: yup
        .string()
        .required('Please enter your new password')
        .min(6, 'Password must be greater then 6 digit')
        .max(16, 'Password must be less then 16 digit')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
      // console.log('jjkk :::: ', formData);
      try {
        api.post('/update-profile', formData).then(res => {
          this.closeModal(modalId);
          this.$swal("", "Profile updated successfully", "success").then(() => {
            this.setUserInStateAndLocalStorage(res);
          });
        })
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error")
        // console.error('Error uploading image', error);
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
</style>
