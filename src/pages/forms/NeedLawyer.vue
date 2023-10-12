<template lang="">
    <div class="hello">
        <MainHeader />

        <div class="center-main">
            <div class="bg-dark text-white text-center m-3 col-md-6" style="border-radius: 10px">
                <p class="m-4 fs-3">Register your interest to be notified when Simplawfy goes live.</p>
        <Form @submit="submitData" class="p-2 px-md-5 m-md-3" :validation-schema="schema" v-slot="{errors}">
            <!-- Name -->
            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fa-solid fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="text" class="form-control" name="name" placeholder="Name" :class="{'is-invalid' : errors.name}" />
                    <span class="invalid-feedback">{{errors.name}}</span>
                </div>
            </div>

            <!-- Email -->
            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <Field type="email" class="form-control" name="email" placeholder="Email" :class="{'is-invalid' : errors.email}" />
                    <span class="invalid-feedback">{{errors.email}}</span>
                </div>
            </div>
            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button class="btn btn-outline-light btn-lg px-5">Submit</button>
            </div>
        </Form>
    </div>
</div>
        
    </div>
</template>
<script >
import MainHeader from '../../components/global/MainHeader.vue'

import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
    data(){
        const schema = yup.object().shape({
            name: yup.string().required('Name is Required.'),
            email: yup.string()
            .min(3, 'Email must be valid')
            .max(50, 'Email must be valid')
            .required('Please Enter your email')
            .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please enter valid email',
            ),
        });
        return{
            schema
        }
    },
    components: {
        MainHeader,
        Form,
        Field,
    // MainFooter
  },
  methods:{
    submitData(){
        alert('data has been submitted.')
    }
  },
    name: 'NeedLawyer',
}

</script>
<style scoped>

.hello {
    min-height: 100vh;
    display: grid;
}

.center-main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
}
</style>