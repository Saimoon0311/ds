<template lang="">
    <div class="l-main">
    <div class=" container">
        <MainHeader />
        <div class="row justify-content-center">
        <div class="center-main col-md-7">
            <div class="bg-dark text-white text-center m-3 p-3" style="border-radius: 10px">
                <p class="m-4 fs-3 ">Forget Password</p>
                
        <Form @submit="submitData" class="p-2 px-md-5 m-md-3" :validation-schema="schema" v-slot="{errors}">
            
            <!-- Email -->
            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="email" class="form-control" name="email" placeholder="Email" :class="{'is-invalid' : errors.email}" />
                    <span class="invalid-feedback">{{errors.email}}</span>
                </div>
            </div>
            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <router-link to="/login" class="btn btn-outline-light btn-lg px-5">Back</router-link>
                &nbsp;
                <button class="btn btn-outline-light btn-lg px-5">Submit</button>
            </div>
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

import api from "../../config/api.js";
import MainHeader from '../../components/global/MainHeader.vue'
import MainFooter from "../../components/global/MainFooter.vue";

import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
    name: 'LawyerForgetPassword',
    data() {
        const schema = yup.object().shape({
            email: yup.string()
                .min(3, 'Please enter valid email.')
                .max(50, 'Please enter valid email.')
                .required('Please enter your email.')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Please enter valid email.',
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
        // MainFooter
    },
    methods: {
        submitData(formData) {
            try {
                console.log(formData)
                api.post('/send-forget-password-email/', formData)
                    .then(res => {
                        alert('Reset Password link has been sent to your email address');
                        console.log('successfully sent email : ', res?.data)
                    })
                    .catch(error => {
                        alert('User not found!');
                        console.log("getResults : ", error)
                    });
            } catch (error) {
                console.error('API request error:', error);
            }
        }
    }
}

</script>
<style scoped>



.align-baseline {
    align-items: baseline !important;
}

.l-main {
    min-height: 100vh;
    position: relative;
    /* padding-bottom: 60px; */
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>