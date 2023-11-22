<template lang="">
    <div class="l-main">
    <div class=" container ">
        <!-- <MainHeader /> -->
  <GeneralHeader />

        <div class="row justify-content-center forget-main">
        <div class="center-main col-md-8 col-lg-7  forget-col">
            <div class="bg-dark text-white text-center m-3 p-3 fp-main" style="border-radius: 10px">
                <p class="m-4 f-pass-hd f-pass ">Please enter the email associated with your Simplawfy account to reset your password.</p>
        <Form @submit="submitData" class="p-2 px-md-5 m-md-3" :validation-schema="schema" v-slot="{errors}">
            
            <!-- Email -->
            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="email" class="form-control f-pass-hd" name="email" placeholder="Email" :class="{'is-invalid' : errors.email}" />
                    <span class="invalid-feedback">{{errors.email}}</span>
                </div>
            </div>
            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <router-link v-if="backUrl" :to="backUrl" class="btn btn-outline-light btn-lg px-4 f-pass-hd f-btn" >Back</router-link>
                &nbsp;
                <button class="btn btn-outline-light btn-lg px-4 f-pass-hd f-btn">Submit</button>
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
// import MainHeader from '../../components/global/MainHeader.vue'
import GeneralHeader from "../../pages/GeneralHeader.vue";

import MainFooter from "../../components/global/MainFooter.vue";

import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
    name: 'ForgetPassword',
    data() {
        const schema = yup.object().shape({
            email: yup.string()
                .min(3, 'Email must be valid')
                .max(50, 'Email must be valid')
                .required('Please Enter your email')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Please enter valid email',
                ),
        });
        return {
            schema,
            backUrl: null,
        }
    },
    components: {
        GeneralHeader,
        Form,
        Field,
        MainFooter
        // MainFooter
    },
    created() {
        this.getBackURL();
    },
    methods: {
        getBackURL() {
            if (localStorage.getItem("backUrl") !== null) {
                this.backUrl = localStorage.getItem('backUrl');
            }
        },
        submitData(formData) {
            try {
                console.log(formData)
                api.post('/send-forget-password-email/', formData)
                    .then(res => {
                        this.$swal("", "If the email address provided is associated with a Simplawfy account you will receive a temporary link to reset your password.", "success")
                        console.log('successfully sent email : ', res?.data)
                    })
                    .catch(error => {
                        // alert('User not found!');
                        this.$swal("Error", "User not found!", "error")
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
.hello {
    min-height: 100vh;
    display: grid;
}

.forget-main {
    min-height: 62vh;
}

.forget-col {
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -40%);
    top: 60%;
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
.l-main {
    min-height: 100vh;
    position: relative;
    padding-bottom: 60px;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.f-pass-hd {
    font-size: 17px;
}

.f-btn {
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 21px;
    height: 35px;
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
    .f-pass {
        margin: 0 !important;
        margin-bottom: 10px !important;
    }

    .fp-main {
        margin: 0 !important;
    }

}
</style>