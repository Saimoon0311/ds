<template lang="">
    <div class="hello">
        <MainHeader />
        <div class=" pt-4">

        <div class="bg-dark text-white text-center m-3 p-3 find-client" style="border-radius: 10px">
        <form action="index" method="post" class="px-md-5 m-md-3" data-gtm-form-interact-id="0">
            <p class="m-4 fs-3 mx-5 px-md-5">Sign up to find clients</p>

            
            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="email" id="form3Example3c" class="form-control" name="email" placeholder="Email" required="" data-gtm-form-interact-field-id="0">
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="text" id="name" class="form-control" name="fname" placeholder="First Name" required="">
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="text" id="name" class="form-control" name="lname" placeholder="Last Name" required="">
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="tel" id="phone" class="form-control" maxlength="10" name="phone" placeholder="Phone Number" required="">
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="password" id="form3Example4c" class="form-control" name="password" placeholder="Password" required="" data-gtm-form-interact-field-id="1">
                </div>
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="password" id="form3Example4cd" class="form-control" name="cpassword" placeholder="Repeat Password" required="">
                </div>
            </div>

            <div class="d-flex flex-row align-items-between justify-content-center mb-4">
                <input class="form-check-input" type="checkbox" id="termsAndConditions" required="">
                <label class="form-check-label" for="termsAndConditions">
                    &nbsp;I have read and agree to the <a href="../profile/terms-and-conditions.html" target="_blank">terms and conditions.</a>
                </label>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="submit" class="btn btn-outline-light btn-lg px-5">Sign up</button>
            </div>

            <p>Already have an account?<br> <a href="../legal-marketplace/index.php">Login</a></p>
        </form>
    </div>
</div>

        
    </div>
</template>
<script>
import MainHeader from './global/MainHeader.vue'

export default {
    components: {
        MainHeader,
        // MainFooter
    },
    name: 'FindClient',
}
</script>
<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.hello {
    min-height: 100vh;
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