<template lang="">
    <div class="hello container">
        <MainHeader />
        <div class="row justify-content-center">
        <div class="center-main col-md-7">
            <div class="bg-dark text-white text-center m-3 p-3" style="border-radius: 10px">
                <p class="m-4 fs-3 ">Reset Password</p>
        <Form @submit="submitData" class="p-2 px-md-5 m-md-3" :validation-schema="schema" v-slot="{errors}">
            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="password"  class="form-control" name="password" placeholder="Password" :class="{'is-invalid' : errors.password}" />
                    <span class="invalid-feedback">{{errors.password}}</span>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="password" id="form3Example4cd" class="form-control" name="confirm_password" placeholder="Confirm Password" :class="{'is-invalid' : errors.confirm_password}" />
                    <span class="invalid-feedback">{{errors.confirm_password}}</span>
                </div>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button class="btn btn-outline-light btn-lg px-5">Submit</button>
            </div>
            <!-- <p class="mb-0">Don't have an account?
				<br>
				<router-link to="/find-client">Sign Up</router-link>
			</p> -->
        </Form>
    </div>
</div>
</div>
        
    </div>
</template>
<script >

import api from "../../config/api.js";
import MainHeader from '../../components/global/MainHeader.vue'
import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
    data() {
        const schema = yup.object().shape({
            password: yup
                .string()
                .required('Please Enter your password')
                .min(6, 'Password must be greater then 6 digit')
                .max(16, 'Password must be less then 16 digit')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
                ),
            confirm_password: yup
                .string()
                .required('Confirm password is required')
                .oneOf([yup.ref('password'), null], 'Password must match'),
        });
        return {
            email: null,
            token: null,
            schema
        }
    },
    components: {
        MainHeader,
        Form,
        Field,
        // MainFooter
    },
    created() {
        this.email = this.$route.params.email;
        this.token = this.$route.params.token;
    },
    methods: {
        submitData(formData) {
            try {
                // console.log(formData)
                formData.email = this.email;
                formData.token = this.token;
                api.post('/forget-password', formData)
                    .then(res => {
                        console.log('successfully login : ', res?.data)
                        this.$router.push({ path: '/login' });
                    })
                    .catch(error => console.log("getResults : ", error));
                // console.log(formData);
            } catch (error) {
                console.error('API request error:', error);
            }
        }
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