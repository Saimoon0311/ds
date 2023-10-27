<template lang="">
  <div class="hello container">
    <MainHeader />
    <div class="row justify-content-center">
      <div class="center-main col-md-7">
        <div
          class="bg-dark text-white text-center m-3 p-3"
          style="border-radius: 10px"
        >
          <p class="m-4 fs-3">Login</p>
          <Form
            @submit="submitData"
            class="p-2 px-md-5 m-md-3"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <!-- Email -->
            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
              <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
              <div class="form-outline flex-fill mb-0">
                <Field
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <span class="invalid-feedback">{{ errors.email }}</span>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
              <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div class="form-outline flex-fill mb-0">
                <Field
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  :class="{ 'is-invalid': errors.password }"
                />
                <span class="invalid-feedback">{{ errors.password }}</span>
              </div>
            </div>
            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button class="btn btn-outline-light btn-lg px-5" >Submit</button>
            </div>
            <p class="mb-0">
				<br>
				<router-link to="/forget-password">Forget Password</router-link>
			</p>
            <p class="mb-0">Don't have an account?
				<br>
				<router-link to="/find-client">Sign Up</router-link>
			</p>
        </Form>
    </div>
</div>
</div>
        
    </div>
</template>
<script >

// import api from "../../config/api.js";
import MainHeader from '../../components/global/MainHeader.vue'
import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
    data() {
        const schema = yup.object().shape({
            email: yup
                .string()
                .min(3, "Email must be valid")
                .max(50, "Email must be valid")
                .required("Please enter your email")
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    "Please enter valid email"
                ),
            password: yup
                .string()
                .required("Please enter your password")
                .min(6, "Password must be greater then 6 digit")
                .max(16, "Password must be less then 16 digit")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
                ),
        });
        return {
            schema,
        };
    },
    components: {
        MainHeader,
        Form,
        Field,
        // MainFooter
    },
    methods: {
        // submitData(formData) {
        //     try {
        //         formData.type = "client";
        //         console.log(formData)
        //         api.post('/login', formData)
        //             .then(res => {
        //                 console.log('res data : ' , res?.data?.data?.api_token);
        //                 localStorage.setItem("token", res?.data?.data?.api_token);
        //                 this.$store.commit('SET_AUTHENTICATED', true);
        //                 localStorage.setItem("loginUser", res?.data?.data?.email);
        //                 this.$store.commit('SET_LOGIN_USER', res?.data?.data?.email);
        //                 this.$router.push({ path: '/' });
        //                 console.log('successfully login : ', res?.data)
        //             })
        //             .catch(error => console.log("getResults : ", error));
        //         console.log(formData);
        //     } catch (error) {
        //         console.error('API request error:', error);
        //     }
        // }
    },
    name: 'LoginForm',
}

</script>
<style scoped>
.hello {
    min-height: 100vh;
    display: grid;
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
</style>
