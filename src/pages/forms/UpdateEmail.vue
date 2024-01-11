<template lang="">
    <div class="hello container">
        <!-- <MainHeader /> -->
        <GeneralHeader />

        <div class="row justify-content-center reset-main">
            <div class="center-main col-md-7 reset-p">
                <div v-if="!tokenExpired" class="bg-dark text-white text-center m-3 p-3" style="border-radius: 10px">
                    <p class="m-4 fs-3 ">Update Email</p>
                    <Form @submit="submitData" class="p-2 px-md-5 m-md-3" :validation-schema="schema" v-slot="{errors}">
                        <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <Field type="email"  class="form-control" name="email" placeholder="Current Email" :class="{'is-invalid' : errors.email}" />
                                <span class="invalid-feedback">{{errors.email}}</span>
                            </div>
                        </div>

                        <!-- <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <Field type="password"  class="form-control" name="password" placeholder="Password" :class="{'is-invalid' : errors.password}" />
                                <span class="invalid-feedback">{{errors.password}}</span>
                            </div>
                        </div> -->

                        <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <Field type="email"  class="form-control" name="new_email" placeholder="New Email" :class="{'is-invalid' : errors.new_email}" />
                                <span class="invalid-feedback">{{errors.new_email}}</span>
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
                <h2 v-else class="text-center">This temporary link has expired. <router-link to="/forget-password" class="btn btn-dark text-white">Reset your password</router-link> </h2>
            </div>
        </div>
        <div class="footer">
            <MainFooter />
        </div>
    </div>
</template>
<script >

import api from "../../config/api.js";
// import MainHeader from '../../components/global/MainHeader.vue'
import GeneralHeader from "../../pages/GeneralHeader.vue";
import MainFooter from "../../components/global/MainFooter.vue";


import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
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
            // password: yup
            //     .string()
            //     .required('Please enter your password.')
            //     .min(6, 'Password must be greater then 6 digit')
            //     .max(16, 'Password must be less then 16 digit')
            //     .matches(
            //         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            //         'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
            //     ),
            new_email: yup.string()
                .min(3, 'Please enter valid email.')
                .max(50, 'Please enter valid email.')
                .required('Please enter your email.')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Please enter valid email.',
                ),
        });
        return {
            email: null,
            new_email: null,
            token: null,
            tokenExpired: false,
            schema
        }
    },
    components: {
        // MainHeader,
        GeneralHeader,
        MainFooter,
        Form,
        Field,
        // MainFooter
    },
    created() {
        // this.checkLogin();
        this.email = this.$route.params.email;
        this.token = this.$route.params.token;
        this.checkToken();
    },
    methods: {
        // async checkLogin() {
        //     await api.get("/verify").then(() => this.logout('login', false)).catch(error => console.log(error));
        // },
        checkToken() {
            api.get(`/check-forget-token/${this.token}`)
                .then(response => {
                    this.tokenExpired = response.data.expired;
                })
                .catch(error => {
                    console.error('Error checking token expiry', error);
                });
        },
        submitData(formData) {
            try {
                console.log('form data : ' , formData)
                formData.email = this.email;
                // formData.new_email = this.new_email;
                formData.token = this.token;
                api.post('/update-email', formData)
                    .then(res => {
                        console.log('update-email : ' , res);
                        this.$swal('', 'Your Email has now been changed.', 'success').then(() => {
                            // this.$store.commit('SET_USER_TYPE', res?.data?.type);
                            // localStorage.setItem('userType', res?.data?.type);
                            this.setUserInStateAndLocalStorage(res);
                            if(res?.data?.type == "lawyer"){
                                this.$router.push('/lawyer-profile');
                            }else{
                                this.$router.push('/client-account');
                            }
                        });
                    })
                    .catch(error => console.log("getResults : ", error));
                console.log(formData);
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
    position: relative;
    padding-bottom: 60px;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.align-baseline {
    align-items: baseline !important;
}

.reset-p {
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -40%);
    top: 60%;
}

.reset-main {
    min-height: 57vh;
    position: relative;
}

.linkc {
    color: #000
}
</style>