<template lang="">
    <div class="l-register-main">
        <GeneralHeader />
    <div class="hello container">
        <div class=" pt-4 center-main row justify-content-center">
        <div class="col-md-10 col-lg-7">        
        <div class="bg-dark text-white text-center m-3 p-3 pt-4 find-client" style="border-radius: 10px">
            
        <Form @submit="submitData" class="p-2 px-md-5 m-md-3 fc-form" :validation-schema="schema" v-slot="{errors}">
            <p class=" mb-4 fs-3">Sign up to find clients</p>
            <div>
                    <div class="im-user">
                        <input type="radio" id="optionPage1" value="client" v-model="pageOption" @change="changePage" />
                        <label for="optionPage1">I'm a client</label>
                    </div>
                    
                    <div class="im-user"> 
                        <input type="radio" id="optionPage2" value="lawyer" v-model="pageOption" @change="changePage" />
                        <label for="optionPage2">I'm a lawyer</label>
                    </div>
                  
            </div>    
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
                    <Field type="tel" class="form-control" name="phone" placeholder="Phone Number" :class="{'is-invalid' : errors.phone}" />
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

            <div class="d-flex flex-row align-items-center mb-4 align-baseline">
                <i class="fas fa-circle-question fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                      <Field name="field" as="select" class=" form-select " v-model="selectedOption" @change="checkOtherOption" >
                        <option value="" disabled selected hidden>How did you hear about us?</option>
                        <option value="Google">Google</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Colleague/Friend/Family">Colleague/Friend/Family</option>
                        <option value="Networking">Networking</option>
                        <option value="Another Lawyer">Another Lawyer</option>
                        <option value="Other">Other</option>
                       
                      </Field>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4 align-baseline" v-if="selectedOption === 'Other'">
                <i class="fas fa-message fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <textarea class="form-control otherTextarea" type="text" v-model="otherText" placeholder="Please specify" ></textarea>
                </div>
            </div> 

            <div class="d-flex align-items-between justify-content-center mb-4 inline-table terms-check">
                <Field class="form-check-Field" type="checkbox" id="termsAndConditions" name="tandc" value="true" :class="{'is-invalid' : errors.tandc}" />
                <label class="form-check-label tac" for="termsAndConditions">
                    &nbsp;I have read and agree to the 
                    <router-link to="/terms-and-conditions-for-lawyers" target="_blank" >terms and conditions.</router-link>
                </label>
                <span class="invalid-feedback">{{errors.tandc}}</span>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button class="btn btn-outline-light btn-lg px-5">Sign up</button>
            </div>

            <p>
                <!-- Already have an account?<br>  -->
                <button type="button" @click="goToLoginPage('lawyer')" class="already btn-light text-dark btn">Already have an account?</button>
                <!-- <router-link  to="/lawyer-login">Already have an account?</router-link > -->
                </p>
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
<script>
import GeneralHeader from "../../pages/GeneralHeader.vue";

// import MainHeader from '../../components/global/MainHeader.vue'
import MainFooter from "../../components/global/MainFooter.vue";
import { Form, Field } from 'vee-validate';
import * as yup from "yup";
export default {
    data() {
        const schema = yup.object().shape({
            first_name: yup.string()
            .max(20, 'First name maximum limit is 20 characters.')
            .required('Please enter your first name.'),
            last_name: yup.string()
            .max(35, 'Last name maximum limit is 35 characters.')
            .required('Please enter your last name.'),
            phone: yup.string().required('Please enter your phone number.')
            .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
            .max(15, 'Phone number maximum limit is 15 digits.'),
            email: yup.string()
                .min(3, 'Please enter valid email.')
                .max(50, 'Please enter valid email.')
                .required('Please enter your email.')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Please enter valid email.',
                ),
            password: yup
                .string()
                .required('Please enter your password.')
                .min(6, 'Password must be greater then 6 digit.')
                .max(16, 'Password must be less then 16 digit.')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                ),
            confirm_password: yup
                .string()
                .required('Please re-enter your password.')
                .oneOf([yup.ref('password'), null], 'Password must match.'),
            tandc: yup.bool() // use bool instead of boolean
                .required('You must accept the terms and conditions.')
                .oneOf([true], "You must accept the terms and conditions.")
        });
        return {
            schema,
            pageOption: this.getCurrentPageOption(),
            selectedOption: '', // Selected option from dropdown
            otherText: '' // Text input for 'Other' option
        }
    },
    components: {
        GeneralHeader,
        Form,
        Field,
        MainFooter
    },
    mounted(){
    this.updateMetaDescription(`If you're a legal practitioner looking to find new clients you can access a platform of potential clients on Simplawfy. Simply sign up, get a 60 day free trial and find jobs in your area.`);
    },
    methods: {
        updateMetaDescription(newDescription) {
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      console.log('tag check',metaDescriptionTag);
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', newDescription);
      } else {
        // Meta description tag not found, handle error or log it
        console.error('Meta description tag not found.');
      }
    },
        submitData(formData) {
            console.log(this.selectedOption, " . option")
            if (this.selectedOption != "") {
                formData.hear_about_us = this.selectedOption == "other" ? this.otherText : this.selectedOption;
            }
            this.submitSignupForm(formData, 'lawyer', 'lawyer-profile');
        },
        getCurrentPageOption() {
            const currentRoute = this.$route.path;
            console.log('c user', currentRoute);
            // Compare current route with the routes associated with each option
            if (currentRoute === '/client-register') {
                return 'client'; // If current route is '/page1', select 'page1'
            } else if (currentRoute === '/lawyer-register') {
                return 'lawyer'; // If current route is '/page2', select 'page2'
            } else {
                return null; // Or return null if the current route is not matched
            }
        },
        changePage() {
            if (this.pageOption === 'client') {
                this.$router.push('/client-register');
                console.log('asd', this.pageOption);

            } else if (this.pageOption === 'lawyer') {
                console.log('asd', this.pageOption);
                this.$router.push('/lawyer-register');
            }
        },
        checkOtherOption() {
            // If 'Other' is selected, clear the otherText field
            if (this.selectedOption !== 'Other') {
                this.otherText = '';
            }

        },
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
.select-o {
    width: 100%;
    padding: 0.47rem 0.75rem;
    border-radius: 0.375rem;
    /* color: gray */
}

.inline-table {
    display: inline-block !important;
}

.align-baseline {
    align-items: baseline !important;
}

.otherTextarea {
    width: 100%;
    min-height: 100px;
}

.terms-check {
    width: 100%;
    text-align: left;
    margin-left: 40px;
}

input[type="checkbox"]:checked {
    filter: grayscale(100%) contrast(200%);
}

.l-register-main {
    min-height: 100vh;
    position: relative;
    padding-bottom: 60px;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
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

.already {
    padding: 4px 20px 5px 20px !important;
    /* border-radius: 20px; */
    text-align: center;
    align-items: center;
    font-size: 16px !important;
    margin: 0px 10px;
}

a,
a:hover {
    color: #fff
}

@media (max-width: 1200px) {
    .find-client {
        padding-right: 40px !important;
    }

    .find-client .px-md-5 {
        padding-right: 0rem !important;
        padding-left: 0rem !important;
    }

    .tac {
        font-size: 15px;
    }
}

@media (max-width: 768px) {

    .find-client .px-md-5 {
        padding-right: 0rem !important;
        padding-left: 0rem !important;
    }

    .tac {
        font-size: 15px;
    }

    .l-register-main {
        padding-bottom: 130px;
    }
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
    .find-client {
        margin: 0 !important;
        padding-right: 30px !important;
    }
}
</style>