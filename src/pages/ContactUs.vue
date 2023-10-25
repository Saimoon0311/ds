<template lang="">
  <section class="ct-main">
    <div class="WordSection1 container pt-4 ">
      <MainHeader />
      <div class=" pt-4 center-main row justify-content-center">
        <div class="col-md-7">        
          <div class="bg-dark text-white text-center m-3 p-3 find-client ct-form" style="border-radius: 10px">
            <Form @submit="submitData" class="p-2 px-md-5 m-md-3 c-form" :validation-schema="schema" v-slot="{errors}">
                <p class="m-4 fs-3 mx-5 ">Contact Us</p>
                <div class="d-flex flex-row  mb-4 align-baseline">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                        <Field type="text" class="form-control" name="fname" placeholder="Your Name" :class="{'is-invalid' : errors.fname}" />
                        <span class="invalid-feedback">{{errors.fname}}</span>
                    </div>
                </div>
                <div class="d-flex flex-row  mb-4 align-baseline">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <!-- Add the style and icon you want using the String format -->
                    <div class="form-outline flex-fill mb-0">
                        <Field type="email"  class="form-control" name="email" placeholder="Email" :class="{'is-invalid' : errors.email}"  /> 
                        <span class="invalid-feedback">{{errors.email}}</span>
                    </div>
                </div>

                

                <div class="d-flex flex-row  mb-4 align-baseline">
                    <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                        <Field type="tel" class="form-control" name="number" placeholder="Phone Number" :class="{'is-invalid' : errors.number}" />
                        <span class="invalid-feedback">{{errors.number}}</span>
                    </div>
                </div>
                
                <div class="d-flex flex-row  mb-4 align-baseline">
                    <i class="fas fa-message fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0 textarea-f">
                      <Field v-slot="{ field}" v-model="comment" name="comment"  >
                        <textarea v-bind="field" name="comment" placeholder="Your Message"/>
                      </Field>
                    </div>
                </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button class="btn btn-outline-light btn-lg px-5">Submit</button>
                </div>
            </Form>
          </div>
        </div>  
      </div>  
    </div>  
    <!-- <footer class="footer mt-4"><MainFooter /></footer> -->
    <div class="footer footer-ct">
      <MainFooter />
    </div>

  </section>
</template>
<script>
import MainHeader from "../components/global/MainHeader.vue";
import MainFooter from "../components/global/MainFooter.vue";
import { Form, Field } from 'vee-validate';
import * as yup from "yup";

export default {
  data() {
    const schema = yup.object().shape({
      fname: yup.string().required('Your name is required.'),
      number: yup.string().required('Phone number is required.').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
      email: yup.string()
        .min(3, 'Email must be valid')
        .max(50, 'Email must be valid')
        .required('Please enter your email')
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          'Please enter valid email',
        ),
    });
    return {
      schema
    }
  },
  methods: {
    submitData() {
      alert('data has been submitted.')
    }
  },
  components: {
    MainFooter,
    MainHeader,
    Form,
    Field
  },

  name: "ContactUs",
};
</script>
<style scoped>
.LNNumberedHeading1 span {
  font-size: 14pt !important;
  font-weight: bold;
}

.textarea-f textarea {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 0.375rem;
  height: 130px;
}

.c-form i {
  line-height: 38px;
}

.ct-form {
  border-radius: 10px;
  margin-bottom: 60px !important;
}

.ct-main {
  min-height: 100vh;
  position: relative;
}

.footer-ct {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
