<template>
    <div class="l-register-main">
        <div class="hello container">
            <GeneralHeader />

            <div class="pt-4 center-main row justify-content-center otp-main">
                <div class="col-md-8 col-lg-6 text-center my-4 otp-inner">
                    <div class="bg-dark text-white text-center m-3 p-4 pt-4 find-client" style="border-radius: 10px">
                        <h2 class="mb-4 text-light otp-hd">Please enter your verification code.</h2>
                        <div class="row">
                            <div v-for="(digit, index) in otpDigits" :key="index" class="col-2">
                                <input v-model="otpDigits[index]" @input="handleInput(index, $event)"
                                    @paste="handlePaste(index, $event)" class="form-control text-center" maxlength="1"
                                    type="number" ref="digitInputs" />
                            </div>
                        </div>

                        <div class="d-flex justify-content-center mx-3 mb-2 mb-lg-3">
                            <button @click="verifyOtp" class="btn btn-outline-light btn-lg mt-4
                            ">
                                Verify
                            </button>
                        </div>

                        <a href="javascript:;" @click="sendOtpAgain()" class="text-white">Resend</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <MainFooter />
        </div>
    </div>

    <!-- <div class="container mt-5">
        <h2 class="mb-4">OTP Verification</h2>
        <div class="row">
            <div v-for="(digit, index) in otpDigits" :key="index" class="col-2">
                <input v-model="otpDigits[index]" @input="handleInput(index, $event)" @paste="handlePaste(index, $event)"
                    class="form-control text-center" maxlength="1" type="text" ref="digitInputs" />
            </div>
        </div>
        <button @click="verifyOtp" class="btn btn-primary mt-3">Verify OTP</button>
    </div> -->
</template>

<script>
import { nextTick } from "vue";
import api from "@/config/api";
// import MainHeader from '../../components/global/MainHeader.vue'
import GeneralHeader from "../../pages/GeneralHeader.vue";
import MainFooter from "../../components/global/MainFooter.vue";
export default {
    components: {
        GeneralHeader,
        MainFooter,
    },
    data() {
        return {
            otpVerified: false,
            otpDigits: ["", "", "", "", "", ""],
        };
    },
    beforeUnmount() {
        // localStorage.removeItem('loginUser');
        console.log('otp verify : ', this.otpVerified);
        if (!this.otpVerified) {
            this.logoutProcess('admin-login');
        }
    },

    // beforeRouteLeave(to, from, next) {
    //     this.routeLeaveWithOutOtpVerify(next);
    // },

    // beforeRouteLeave(to, from, next) {
    //     console.log('chk : ', this.otpVerified);
    //     if (!this.otpVerified) {
    //         // this.logoutProcess('admin-login',false);
    //         next({ path: "/otp-verification" });
    //     } else {
    //         next();
    //     }
    // },

    computed: {
        otpEmail() {
            return this.$store.state.otpEmail;
        },
    },
    mounted() {
        // Focus on the first input when the component is mounted
        nextTick(() => this.$refs.digitInputs[0]?.focus());
    },
    methods: {

        // routeLeaveWithOutOtpVerify(next) {
        //     if (!this.otpVerified) {
        //         next({ path: 'otp-verification' });
        //     } else {
        //         next();
        //     }
        // },

        sendOtpAgain() {
            this.sendOtp();
            this.otpDigits = ["", "", "", "", "", ""];
        },
        handlePaste(index, event) {
            event.preventDefault();
            const pastedValue = event.clipboardData.getData("text");
            for (
                let i = 0;
                i < pastedValue.length && index + i < this.otpDigits.length;
                i++
            ) {
                this.otpDigits[index + i] = pastedValue.charAt(i);
            }
            nextTick(() =>
                this.$refs.digitInputs[index + pastedValue.length]?.focus()
            );
        },
        handleInput(index, event) {
            const inputValue = event.target.value;
            if (/^\d$/.test(inputValue)) {
                if (index < 5 && inputValue) {
                    nextTick(() => this.$refs.digitInputs[index + 1]?.focus());
                }
            } else if (index > 0 && !inputValue) {
                // If a digit is removed, move focus to the previous input
                nextTick(() => this.$refs.digitInputs[index - 1]?.focus());
            }
        },
        verifyOtp() {
            const otp = this.otpDigits.join("");
            if (otp.length > 0) {
                api
                    .post("/verify-otp", { otp: otp, email: this.otpEmail })
                    .then((res) => {
                        console.log(res.data);
                        let path = "admin-dashboard";
                        this.otpVerified = true;
                        this.$router.push(path);
                        // this.setUserAndRedirect(res?.data?.data, dashboardUrl);
                    })
                    .catch(() => {
                        this.$swal("", "This code is invalid or has expired.", "error");
                    });
            }
        },
    },
};
</script>

<style scoped>
.otp-form {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.otp-container,
.email-otp-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.otp-input,
.email-otp-input {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 18px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
}

.otp-input:focus,
.email-otp-input:focus {
    border-color: #007bff;
}

#verificationCode,
#emailverificationCode {
    width: 100%;
    margin-top: 15px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
}

#verificationCode:focus,
#emailverificationCode:focus {
    border-color: #007bff;
}

.email-otp {
    margin-top: 25px;
}

/* 
button {
    margin-top: 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
} */

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.otp-main {
    min-height: 50vh;
    position: relative;
}

.otp-inner {
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -40%);
    top: 60%;
}

.otp-inner .col-2 {
    justify-content: center;
    display: flex;
}

.otp-hd {
    font-size: 21px;
}

.form-control {
    min-height: 70px;
    width: 100%;
    font-size: 22px;
    font-weight: 400;
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
    .otp-inner .col-2 {
        padding: 7px;
    }

    .form-control {
        min-height: 60px;
    }
}
</style>
