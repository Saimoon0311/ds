<template lang="">
  <div class="hello">
    <MainHeader />
    <div class="pt-4 center-main">
      <div
        class="bg-dark text-white text-center m-3 p-3 find-client"
        style="border-radius: 10px"
      >
        <Form
          @submit="submitData"
          class="m-md-3"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <p class="mx-5 fs-3">Admin Login</p>

          <div class="d-flex flex-row align-items-center mb-4">
            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div class="form-outline flex-fill mb-0">
              <Field
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                :class="{ 'is-invalid': errors.password }"
              />
              <span class="invalid-feedback">{{ errors.password }}</span>
            </div>
          </div>

          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button class="btn btn-outline-light btn-lg px-5">Login</button>
          </div>

          <!-- <p>Already have an account?<br> <a href="../legal-marketplace/index.php">Login</a></p> -->
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import MainHeader from "../../components/global/MainHeader.vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
export default {
    data() {
        const schema = yup.object().shape({
            fname: yup.string().required("First Name is Required."),
            lname: yup.string().required("Last Name is Required."),
            number: yup.string().required("Please enter your number"),

            email: yup
                .string()
                .min(3, "Email must be valid")
                .max(50, "Email must be valid")
                .required("Please Enter your email")
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    "Please enter valid email"
                ),
            password: yup
                .string()
                .required("Please Enter your password")
                .min(6, "Password must be greater then 6 digit")
                .max(16, "Password must be less then 16 digit")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
            confirm_password: yup
                .string()
                .required("Confirm password is required")
                .oneOf([yup.ref("password"), null], "Password must match"),
            tandc: yup
                .bool() // use bool instead of boolean
                .required("You must accept the terms and conditions")
                .oneOf([true], "You must accept the terms and conditions"),
        });
        return {
            schema,
        };
    },
    components: {
        MainHeader,
        Form,
        Field,
        // MainFooter
    },
    methods: {
        submitData() {
            alert("data has been submitted.");
        },
    },
    name: "AdminLogin",
};
</script>
<style scoped>
.hello {
    min-height: 85vh;
    display: grid;
}

.find-client {
    width: 35%;
    margin: 0 auto !important;
    margin-top: 50px;
}

.center-main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
