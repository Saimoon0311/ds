<template lang="">
  <section class="ct-main">
    <GeneralHeader />
    <div class="WordSection1 container  ">
      <MainHeader />
      <div class=" pt-3 center-main row justify-content-center">
        <div class="col-md-10 col-lg-8">        
          <div class="bg-dark text-white text-center m-3 p-3 find-client ct-form" style="border-radius: 10px">
            <Form @submit="submitData" class="p-2 px-md-5 m-md-3 px-sm-3 c-form" :validation-schema="schema" v-slot="{errors}">
                <p class="m-4 fs-3 mx-5 title">Contact Us</p>
                  <div>
                    <div class="im-user">
                      <input type="radio" id="optionYes" value="client" v-model="selectedOption" @change="showText" />
                      <label for="optionYes">I'm a client</label>
                    </div>
                    
                    <div class="im-user"> 
                      <input type="radio" id="optionNo" value="lawyer" v-model="selectedOption" @change="showText" />
                      <label for="optionNo">I'm a lawyer</label>
                    </div>
                  
                  </div>
                  
                  
                    
                    
                <div class="d-flex flex-row  mb-4 align-baseline">
                    <!-- <i class="fas fa-user fa-lg me-3 fa-fw"></i> -->
                    <div class="form-outline flex-fill mb-0">
                        <Field type="text" class="form-control" name="fname" placeholder="Your Name" :class="{'is-invalid' : errors.fname}" />
                        <span class="invalid-feedback">{{errors.fname}}</span>
                    </div>
                </div>
                <div class="d-flex flex-row  mb-4 align-baseline">
                    <!-- <i class="fas fa-envelope fa-lg me-3 fa-fw"></i> -->
                    <!-- Add the style and icon you want using the String format -->
                    <div class="form-outline flex-fill mb-0">
                        <Field type="email"  class="form-control" name="email" placeholder="Email" :class="{'is-invalid' : errors.email}"  /> 
                        <span class="invalid-feedback">{{errors.email}}</span>
                    </div>
                </div>

                

                <div class="d-flex flex-row  mb-4 align-baseline">
                    <!-- <i class="fas fa-phone fa-lg me-3 fa-fw"></i> -->
                    <div class="form-outline flex-fill mb-0">
                        <Field type="tel" class="form-control" name="number" placeholder="Phone Number" :class="{'is-invalid' : errors.number}" />
                        <span class="invalid-feedback">{{errors.number}}</span>
                    </div>
                </div>

                <div class="d-flex flex-row align-baseline">
                    <!-- <i class="fas fa-message fa-lg me-3 fa-fw"></i> -->
                    <!-- <div class="form-outline flex-fill mb-0">
                      <Field name="field" as="select" class=" select-o " >
                        <option value="" disabled selected hidden>General Reasons</option>
                        
                        <option value="">I have an issue with my account</option>
                        <option value="">I believe my account has been compromised</option>
                        <option value="">I have a question not listed in the FAQ</option>
                        <option value="">I want to provide feedback or a complaint about the Simplawfy platform</option>
                        <option value="">I need to change my personal details in my profile or account</option>
                        <option value="">Other</option>
                      </Field>
                    </div> -->
                </div>

                <div class="d-flex flex-row  align-baseline">
                    <!-- <i class="fas fa-message fa-lg me-3 fa-fw"></i> -->
                    <div class="form-outline flex-fill mb-0" v-if="selectedOption === 'client'">
                      <Field name="field" as="select" class=" select-o mb-4" >
                        <option value="" disabled selected hidden>Why do you need to contact us?</option>
                        <option value="">I have an issue with my account</option>
                        <option value="">I believe my account has been compromised</option>
                        <option value="">I have a question not listed in the FAQ</option>
                        <option value="">I want to provide feedback or a complaint about the Simplawfy platform</option>
                        <option value="">I need to change my personal details in my profile or account</option>
                        <option value="">I can't contact my lawyer</option>
                        <option value="">I need a lawyer outside of Australia</option>
                        <option value="">I haven't received any proposals</option>
                        <option value="">I need my job reinstated</option>
                        <option value="">Other</option>
                      </Field>
                    </div>
                   

                  
                    <!-- <i class="fas fa-message fa-lg me-3 fa-fw"></i> -->
                    <div class="form-outline flex-fill mb-0" v-if="selectedOption === 'lawyer'">
                      <Field name="field" as="select" class=" select-o mb-4" >
                        <option value="" disabled selected hidden>Why do you need to contact us?</option>
                        <option value="">I have an issue with my account</option>
                        <option value="">I believe my account has been compromised</option>
                        <option value="">I have a question not listed in the FAQ</option>
                        <option value="">I want to provide feedback or a complaint about the Simplawfy platform</option>
                        <option value="">I need to change my personal details in my profile or account</option>
                        <option value="">I have a subscription or billing issue</option>
                        <option value="">I have an issue with a review left by a client</option>
                        <option value="">I am a lawyer outside of Australia</option>
                        <option value="">My proposal hasn't been accepted or rejected and it's been a while</option>
                        <option value="">I need to amend my proposal</option>
                        <option value="">I cannot contact my client</option>
                        <option value="">My client refuses to sign my costs agreement</option>
                        <option value="">I am unable to act for my client</option>
                        <option value="">Other</option>

                      </Field>
                    </div>
                  </div>
                
                <div class="d-flex flex-row  mb-4 align-baseline">
                    <!-- <i class="fas fa-message fa-lg me-3 fa-fw"></i> -->
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
// import MainHeader from "../components/global/MainHeader.vue";
import GeneralHeader from "./GeneralHeader.vue";
import MainFooter from "../components/global/MainFooter.vue";

import { Form, Field } from 'vee-validate';
import * as yup from "yup";

export default {
  data() {
    const schema = yup.object().shape({
      fname: yup.string().required('Please enter your name.'),
      number: yup.string().required('Please enter your phone number.').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
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
      schema,
      selectedOption: null
    }
  },
  methods: {
    submitData() {
      alert('data has been submitted.')
    },

  },
  components: {
    MainFooter,
    GeneralHeader,
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

.select-o {
  width: 100%;
  padding: 0.47rem 0.75rem;
  border-radius: 0.375rem;
  /* color: gray */
}



select,
option {
  color: black;

}

select option:hover {
  box-shadow: 0 0 10px 100px #000 inset;
  color: #fff
}

.im-user {
  display: inline-block;
  padding: 20px;
  padding-top: 7px;
}

.im-user label {
  margin-top: 3px;
  margin-left: 6px;
}

input::placeholder,
textarea::placeholder {
  color: black
}

/* .select-o option[value=""][selected][disabled] {
  color: #bebebe
} */
@media only screen and (max-width: 767px) and (min-width: 320px) {
  .WordSection1 .center-main{
    min-height: 75vh;
    align-items: center;
  }
  .ct-main {
    padding-bottom: 100px;
  }
.im-user{
  padding: 5px 5px 20px 5px;
}
.title{
  margin: 5px !important;
}
.ct-form{
  margin: 10px !important;
  padding: 20px 10px !important;
}
}

</style>
