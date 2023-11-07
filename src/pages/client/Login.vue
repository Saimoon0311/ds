<template lang="">
  <div class="hello container">
      <MainHeader />
      <div class="row justify-content-center login-row">
      <div class="center-main col-md-7 login-col">
          <div class="bg-dark text-white text-center m-3 p-3" style="border-radius: 10px">
              <p class="m-4 fs-3 ">Login</p>
              <!-- <router-link to="/lawyer-login">Login as a Client</router-link> -->
      <Form @submit="submitData" class="p-2 px-md-5 m-md-3" :validation-schema="schema" v-slot="{errors}">
          
          <!-- Email -->
          <div class="d-flex flex-row align-items-center mb-4 align-baseline">
              <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
              <div class="form-outline flex-fill mb-0">
                  <Field type="email" class="form-control" name="email" placeholder="Email" :class="{'is-invalid' : errors.email}" />
                  <span class="invalid-feedback">{{errors.email}}</span>
              </div>
          </div>
          <div class="d-flex flex-row align-items-center mb-4 align-baseline">
              <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div class="form-outline flex-fill mb-0">
                  <Field type="password"  class="form-control" name="password" placeholder="Password" :class="{'is-invalid' : errors.password}" />
                  <span class="invalid-feedback">{{errors.password}}</span>
              </div>
          </div>
          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button type="button" class="forgetp" @click="goToForgetPasswordPage('client-login')">Forget Password</button>
              <!-- <router-link to="/client-forget-password">Forget Password</router-link> -->
          </div>
          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button class="btn btn-outline-light btn-lg px-5">Submit</button>
          </div>
          <p class="mb-0">Don't have an account?
      <br>
      <router-link to="/client-register">Sign Up</router-link>
    </p>
      </Form>
  </div>
</div>
</div>

  </div>
  <div class="footer">
      <MainFooter />
    </div>
</template>
<script >
import MainHeader from '../../components/global/MainHeader.vue'
import MainFooter from "../../components/global/MainFooter.vue";
import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
  data() {
    const schema = yup.object().shape({
      email: yup.string()
        .min(3, 'Email must be valid')
        .max(50, 'Email must be valid')
        .required('Please enter your email')
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          'Please enter valid email',
        ),
      password: yup
        .string()
        .required('Please enter your password')
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
  components: {
    MainHeader,
    Form,
    Field,
    MainFooter
  },
  methods: {
    submitData(formData) {
      this.submitLoginForm(formData, 'client', 'client-dashboard');
    }
  },
  name: 'ClientLoginForm',
}

</script>
<style scoped>
.hello {
  /* min-height: 100vh;
    display: grid; */
}

/* .center-main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
} */
.align-baseline {
  align-items: baseline !important;
}

/* .login-main {
    width: 35%;
    margin: 0 auto !important;
    margin-top: 50px;
} */
.l-register-main {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.login-row {
  margin: auto;
  min-height: 80vh;
}

.login-col {
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -40%);
  top: 50%;
}

@media (max-width: 1200px) {
  .find-client {
    padding-right: 40px !important;
  }

  .find-client .px-md-5 {
    padding-right: 0rem !important;
    padding-left: 0rem !important;
  }
}

@media (max-width: 768px) {
  .find-client .px-md-5 {
    padding-right: 0rem !important;
    padding-left: 0rem !important;
  }

  .l-register-main {
    padding-bottom: 130px;
  }
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
  .find-client {
    margin: 0 !important;
    padding-right: 30px !important;
  }
}
</style>