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
      password: yup
        .string()
        .required("Please enter your password")
        .min(6, "Password must be greater then 6 digit")
        .max(16, "Password must be less then 16 digit")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
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
