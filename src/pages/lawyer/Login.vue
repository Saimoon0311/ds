
<template lang="">
  <div class="l-register-main">
  <GeneralHeader />

    <div class="hello container pt-4">
      <div class="row justify-content-center login-row">
        <div class="center-main col-md-10 col-lg-7 login-col">
          <div
            class="bg-dark text-white text-center m-3 p-3 find-client"
            style="border-radius: 10px">
            <p class="m-4 fs-3 log-hd">Login</p> 
            <!-- <p class="m-4 fs-3 log-hd">Login as a {{ pageOption }}</p>  -->
            <!-- <div>
                    <div class="im-user">
                        <input type="radio" id="optionPage1" value="client" v-model="pageOption" @change="changePage" />
                        <label for="optionPage1">I'm a client</label>
                    </div>
                    
                    <div class="im-user"> 
                        <input type="radio" id="optionPage2" value="lawyer" v-model="pageOption" @change="changePage" />
                        <label for="optionPage2">I'm a lawyer</label>
                    </div>
                  
            </div>   -->
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
          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-3">
              <button type="button" @click="goToForgetPasswordPage('login')" class="forgetp">Forgotten your password?</button>
              <!-- <router-link to="/lawyer-forget-password">Forget Password</router-link> -->
          </div>
          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button class="btn btn-outline-light btn-lg px-5">Submit</button>
          </div>
          <p class="mb-0">
            <!-- Don't have an account? -->
      <!-- <br> -->
      <router-link to="/lawyer-register" class="already btn-light text-dark btn">Don't have an account?</router-link>
    </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
        <div class="footer">
        <MainFooter />
        </div>
  </div>
</template>

<script >
import GeneralHeader from "../../pages/GeneralHeader.vue";
// import MainHeader from "../../components/global/MainHeader.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
  data() {
    const schema = yup.object().shape({
      email: yup.string()
        .min(3, 'Email must be valid.')
        .max(50, 'Email must be valid.')
        .required('Please enter your email.')
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          'Please enter valid email',
        ),
      password: yup
        .string()
        .required('Please enter your password.')
        .min(6, 'Have you forgotten your password?')
        .max(16, 'Have you forgotten your password?')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Have you forgotten your password?',
        ),
    });
    return {
      schema,
      pageOption: null,
      // this.getCurrentPageOption()

    }
  },
  components: {
    GeneralHeader,
    Form,
    Field,
    MainFooter
  },
  computed: {
    userTypeForLogin() {
      return this.$store.state.userType;
    }
  },
  mounted() {
    this.pageOption = this.userTypeForLogin;
    // console.log('page option : ' , this.pageOption);
    this.updateMetaDescription(`Get one step closer to finding a lawyer or client.`);    
  },
  methods: {
    updateMetaDescription(newDescription) {
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      // console.log('tag check',metaDescriptionTag);
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', newDescription);
      } else {
        // Meta description tag not found, handle error or log it
        console.error('Meta description tag not found.');
      }
    },
    submitData(formData) {
      // console.log('sbumt');
      // let dashboardUrl = null;
      // if (this.userTypeForLogin == "lawyer") {
      //   dashboardUrl = "lawyer-profile";
      // } else if (this.userTypeForLogin == "client") {
      //   dashboardUrl = "client-dashboard";
      // }
      let goToAccountPage = false;
      const goToAccountExists = Object.prototype.hasOwnProperty.call(this.$route.query, 'goToAccount');
      if(goToAccountExists && this.$route.query.goToAccount){
        goToAccountPage = true;
      }
      // console.log('g o t o a : ' , this.$route.query.goToAccount);
      if(goToAccountPage){
        // let dashboardUrl = (this.userTypeForLogin == 'lawyer') ? 'lawyer-account' : 'client-account'; 
        // console.log('url 222: ' , dashboardUrl);
        this.submitLoginForm(formData, this.userTypeForLogin, "" , true);
      }else{
        this.submitLoginForm(formData, this.userTypeForLogin);
      }
      
    },
    // getCurrentPageOption() {
    //   const currentRoute = this.$route.path;
    //   console.log('c user', currentRoute);
    //   // Compare current route with the routes associated with each option
    //   if (currentRoute === '/client-login') {
    //     return 'client'; // If current route is '/page1', select 'page1'
    //   } else if (currentRoute === '/lawyer-login') {
    //     return 'lawyer'; // If current route is '/page2', select 'page2'
    //   } else {
    //     return null; // Or return null if the current route is not matched
    //   }
    // },
    changePage() {
      this.$store.commit('SET_USER_TYPE', this.pageOption);
      localStorage.setItem('userType', this.pageOption);
      // this.$router.push('/login');
      // if (this.pageOption === 'client') {
      //   this.$router.push('/client-login');
      //   console.log('asd', this.pageOption);

      // } else if (this.pageOption === 'lawyer') {
      //   console.log('asd', this.pageOption);
      //   this.$router.push('/lawyer-login');
      // }
    }
  },
  name: 'LawyerLoginForm',
}

</script>
<style scoped>
.forgetp {
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
  text-decoration: underline;
  background: no-repeat;
  border: none;
  font-size: 14px;
}

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
.already {
  padding: 4px 20px 5px 20px !important;
  /* border-radius: 20px; */
  text-align: center;
  align-items: center;
  font-size: 16px !important;
  margin: 0px 10px;
}

.forgetp {
  color: #fff;
}

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
  min-height: 70vh;
  align-items: center;
}

/* .login-col {
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -40%);
  top: 50%;
} */

.im-user {
  display: inline-block;
  padding: 20px;
  padding-top: 7px;
  padding-bottom: 0px;
}

.im-user label {
  margin-top: 3px;
  margin-left: 6px;
}

input[type="checkbox"]:checked {
  filter: grayscale(100%) contrast(200%);
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

  .login-row {
    min-height: 67vh;
  }

  .im-user {
    padding: 9px;
  }

  .log-hd {
    margin-bottom: 0px !important;
  }

  .l-register-main {
    padding-bottom: 100px;
  }
}
</style>
