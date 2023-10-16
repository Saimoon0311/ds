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
                    <Field type="text" class="form-control" name="first_name" placeholder="First Name" :class="{'is-invalid' : errors.first_name}" />
                    <span class="invalid-feedback">{{errors.first_name}}</span>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="text"  class="form-control" name="last_name" placeholder="Last Name" :class="{'is-invalid' : errors.last_name}" />
                    <span class="invalid-feedback">{{errors.last_name}}</span>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="tel" class="form-control" name="phone" placeholder="Phone phone" :class="{'is-invalid' : errors.phone}" />
                    <span class="invalid-feedback">{{errors.phone}}</span>
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

            <div class="d-flex align-items-between justify-content-center mb-4 inline-table">
                <Field class="form-check-Field" type="checkbox" id="termsAndConditions" name="tandc" value="true" :class="{'is-invalid' : errors.tandc}" />
                <label class="form-check-label" for="termsAndConditions">
                    &nbsp;I have read and agree to the 
                    <a href="../profile/terms-and-conditions.html" target="_blank">terms and conditions.</a>
                </label>
                <span class="invalid-feedback text-center">{{errors.tandc}}</span>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button class="btn btn-outline-light btn-lg px-5">Sign up</button>
            </div>

            <p>Already have an account?<br> <router-link  to="/login">Login</router-link ></p>
        </Form>
    </div>
</div>
</div>

        
    </div>
</template>
<script>
import api from "../../config/api.js";
import MainHeader from '../../components/global/MainHeader.vue'
import { Form, Field } from 'vee-validate';
import * as yup from "yup";

export default {
    name: 'FindClient',
    data() {
        const schema = yup.object().shape({
            first_name: yup.string().required('First Name is Required.'),
            last_name: yup.string().required('Last Name is Required.'),
            phone: yup.string().required('Phone phone is Required.').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone phone is not valid'),
            email: yup.string()
                .min(3, 'Email must be valid')
                .max(50, 'Email must be valid')
                .required('Please Enter your email')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Please enter valid email',
                ),
            password: yup
                .string()
                .required('Please Enter your password')
                .min(6, 'Password must be greater then 6 digit')
                .max(16, 'Password must be less then 16 digit')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One phone and one special case Character',
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
        async submitData(formData) {
            try {
                formData.type = "client";
                console.log(formData)
                api.post('/signup',formData)
                    .then(res => {
                        console.log('successfully registered : ' , res?.data)
                    })
                    .catch(error => console.log("getResults : ", error));
                console.log(formData);
            } catch (error) {
                console.error('API request error:', error);
            }
        },
    }
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
</style>