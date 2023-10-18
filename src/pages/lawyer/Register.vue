<template lang="">
    <div class="hello container">
        <MainHeader />
        <div class=" pt-4 center-main row justify-content-center">
        <div class="col-md-7">        
        <div class="bg-dark text-white text-center m-3 p-3 find-client " style="border-radius: 10px">
        <Form @submit="submitData" class="p-2 px-md-5 m-md-3" :validation-schema="schema" v-slot="{errors}">
            <p class="m-4 fs-3 mx-5 ">Sign up to find clients</p>
            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                 <!-- Add the style and icon you want using the String format -->
             
                <div class="form-outline flex-fill mb-0">
                    <Field type="email"  class="form-control" name="email" placeholder="Email" :class="{'is-invalid' : errors.email}"  /> 
                    <span class="invalid-feedback">{{errors.email}}</span>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="text" class="form-control" name="fname" placeholder="First Name" :class="{'is-invalid' : errors.fname}" />
                    <span class="invalid-feedback">{{errors.fname}}</span>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="text"  class="form-control" name="lname" placeholder="Last Name" :class="{'is-invalid' : errors.lname}" />
                    <span class="invalid-feedback">{{errors.lname}}</span>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="tel" class="form-control" name="number" placeholder="Phone Number" :class="{'is-invalid' : errors.number}" />
                    <span class="invalid-feedback">{{errors.number}}</span>
                </div>
            </div>

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
                    <Field type="password" id="form3Example4cd" class="form-control" name="confirm_password" placeholder="Repeat Password" :class="{'is-invalid' : errors.confirm_password}" />
                    <span class="invalid-feedback">{{errors.confirm_password}}</span>
                </div>
            </div>

            <div class="d-flex align-items-between justify-content-center mb-4 inline-table terms-check">
                <Field class="form-check-Field" type="checkbox" id="termsAndConditions" name="tandc" value="true" :class="{'is-invalid' : errors.tandc}" />
                <label class="form-check-label" for="termsAndConditions">
                    &nbsp;I have read and agree to the 
                    <router-link to="/terms-of-use" >terms and conditions.</router-link>
                </label>
                <span class="invalid-feedback">{{errors.tandc}}</span>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button class="btn btn-outline-light btn-lg px-5">Sign up</button>
            </div>

            <p>Already have an account?<br> <router-link  to="/lawyer-login">Login</router-link ></p>
        </Form>
    </div>
</div>
</div>

        
    </div>
</template>
<script>

import MainHeader from '../../components/global/MainHeader.vue'
import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
    data() {
        const schema = yup.object().shape({
            fname: yup.string().required('First name is required.'),
            lname: yup.string().required('Last name is required.'),
            number: yup.string().required('Phone number is required.').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
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
            confirm_password: yup
                .string()
                .required('Confirm password is required')
                .oneOf([yup.ref('password'), null], 'Password must match'),
            tandc: yup.bool() // use bool instead of boolean
                .required('You must accept the terms and conditions')
                .oneOf([true], "You must accept the terms and conditions")
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
        submitData() {
            alert('data has been submitted.')
        }
    },
    name: 'LawyerRegister',
}
</script>
<style scoped>
.hello {
    /* min-height: 100vh;
    display: grid; */
}

.find-client {
    /* width: 35%;
    margin: 0 auto !important; */
    /* margin-top: 50px; */
}

/* .center-main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
} */
.inline-table {
    display: inline-block !important;
}

.align-baseline {
    align-items: baseline !important;
}

.terms-check {
    width: 100%;
    text-align: left;
    margin-left: 40px;
}
</style>