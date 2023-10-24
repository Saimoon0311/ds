<template>
  <div class="container">
    <Form @submit="nextStep" :validation-schema="currentSchema" keep-values>
      <template v-if="currentStep === 0">
        <p>1</p>
      </template>

      <template v-if="currentStep === 1">
        <p>2</p>
      </template>

      <template v-if="currentStep === 2">
        <p>3</p>
      </template>

      <template v-if="currentStep === 3">
        <p>4</p>
      </template>
      <div class="stepbtn">
        <button v-if="currentStep !== 0" type="button" @click="prevStep">
          Previous
        </button>
        <button v-if="currentStep !== 3" type="submit">Next</button>
        <button v-if="currentStep === 3" type="submit">Finish</button>
      </div>



      <pre>{{ values }}</pre>
    </Form>
  </div>
</template>
<script setup >
import { Form } from 'vee-validate';
// import * as yup from 'yup';
import { ref, computed } from 'vue';

const currentStep = ref(0);

// Each step should have its own validation schema
const schemas = [
  // yup.object({
  //   name: yup.string().required(),
  //   email: yup.string().required().email(),
  // }),
  // yup.object({
  //   password: yup.string().required().min(6),
  //   confirmPassword: yup
  //     .string()
  //     .required()
  //     .min(6)
  //     .oneOf([yup.ref('password')], 'Passwords must match'),
  // }),
  // yup.object({
  //   address: yup.string().required(),
  //   postalCode: yup
  //     .string()
  //     .required()
  //     .matches(/^[0-9]+$/, 'Must be numeric'),
  // }),
  // yup.object({
  //   terms: yup.bool().required().equals([true]),
  // })
];

const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

function nextStep(values) {
  if (currentStep.value === 3) {
    console.log('Done: ', JSON.stringify(values, null, 2));
    return;
  }

  currentStep.value++;
}

function prevStep() {
  if (currentStep.value <= 0) {
    return;
  }

  currentStep.value--;
}
</script>

<style>
.stepbtn {
  display: flex;
  justify-content: space-between;
}
</style>
