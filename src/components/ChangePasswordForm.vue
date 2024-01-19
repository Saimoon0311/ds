<template>
    <h4 class="my-3 mt-5">Change Password</h4>

    <Form class="col-md-6 col-sm-12" @submit="changePassword" :validation-schema="schema" v-slot="{ errors }">

        <Field type="password" id="prev_password"
            :class="['form-control', 'mb-2', { 'is-invalid': errors['prev_password'] }]" name="prev_password"
            placeholder="Old password" />
        <span class="invalid-feedback">{{ errors.prev_password }}</span>

        <Field type="password" id="password" :class="['form-control', 'mb-2', { 'is-invalid': errors['password'] }]"
            name="password" placeholder="New password" />
        <span class="invalid-feedback">{{ errors.password }}</span>

        <Field type="password" id="password2" :class="['form-control', { 'is-invalid': errors['password2'] }]"
            name="password2" placeholder="Repeat new password" />
        <span class="invalid-feedback">{{ errors.password2 }}</span>

        <button type="submit" name="password-submit" class="btn btn-dark my-3">
            Save Changes
        </button>

    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field } from 'vee-validate';
import api from "@/config/api.js";
export default {
    name: "ChangePasswordForm",
    components: {
        Form,
        Field,
    },
    data() {
        const schema = yup.object().shape({
            prev_password: yup
                .string()
                .required('Please enter your current password')
                .min(6, 'Password must be greater then 6 digit')
                .max(16, 'Password must be less then 16 digit')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
                ),

            password: yup
                .string()
                .required('Please enter your new password')
                .min(6, 'Password must be greater then 6 digit')
                .max(16, 'Password must be less then 16 digit')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
                ),

            password2: yup
                .string()
                .required('Please re-enter your password.')
                .oneOf([yup.ref('password'), null], 'Password must match.'),
        });
        return {
            schema,
        }
    },
    methods: {
        changePassword(formData) {
            api.post('/change-password', formData)
                .then(() => {
                    this.$swal('', 'You have successfully changed your password.', 'success').then(() => {
                        document.getElementById('prev_password').value = "";
                        document.getElementById('password').value = "";
                        document.getElementById('password2').value = "";
                    });
                })
                .catch(error => {
                    this.$swal('', error?.response?.data?.error, 'error');
                    console.log("getResults : ", error?.response?.data?.error)
                });
        }
    }

}
</script>