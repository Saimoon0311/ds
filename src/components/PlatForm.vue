<template>
  <div class="hello">
    <GeneralHeader />

    <div class="d-flex flex-wrap justify-content-center align-items-center flex-column">
      <div class="mb-3 mt-5 text-center ">
        <p class="logo-sub-heading">
          An Australian legal marketplace making law simple by helping you find
          a lawyer or promote your law firm.
        </p>
        <!-- <p class="h5 fw-normal">
          The Revolution is Coming. Be Part of the Change.
        </p> -->
      </div>
      <div class="d-flex flex-wrap justify-content-center align-items-center pb-5">
        <div class="homepage-circles d-flex flex-column align-items-center justify-content-center " v-if="isMobile" @click="toggleDiv1" >
          <p class="fw-normal law-hd" v-if="headShow1">I'm looking for a lawyer</p>
          <div class="showhover" v-if="showDiv1">
            <p class="fw-normal mb-3">Looking for a lawyer?</p>
            <p>Need a lawyer and don't know where to begin?</p>
            <p>
              We take the hassle and uncertainty out of the process of finding a
              lawyer.
            </p>
            <p>Simply make one enquiry and wait for lawyers to come to you.</p>
            <div class="text-center">
              <router-link to="/how-simplawfy-works" class="text-dark fs-5 p-2 btn btn-dark text-white">How Simplawfy Works</router-link>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-two">
              <button @click="goToLoginPage('client')" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign in</button>
              <!-- <router-link to="/client-login" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign in</router-link> -->
              <!-- <p>Or</p> -->
              <router-link to="/client-register" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign up</router-link>
            </div>
            <!-- <a href="./need-a-lawyer/index" class="text-black fs-5">Register to be notified when the platform goes live.</a> -->
          </div>
        </div>
        <div class="homepage-circles d-flex flex-column align-items-center justify-content-center bg-black text-white" v-if="isMobile" @click="toggleDiv2" >
          <p class="fw-normal law-hd" v-if="headShow2">I'm looking for clients</p>
          <div class="showhover" v-if="showDiv2">
            <p class="fw-normal mb-3">Looking for clients?</p>

            <p>
              Professional networking eating into your billable hours and not
              producing results?
            </p>
            <p>
              We provide an untapped population of real people and small
              businesses looking for a lawyer.
            </p>
            <p>
              Simply subscribe for an opportunity to find clients in your
              practice area without leaving your desk.
            </p>
            <div class="text-center">
              <router-link to="/how-simplawfy-works" class="text-white fs-5 p-2 btn btn-light text-black">How Simplawfy Works</router-link>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-two">
              <button @click="goToLoginPage('lawyer')" class="ext-white fs-5 p-2 btn btn-light text-black">Sign
                in</button>
              <!-- <router-link to="/lawyer-login" class="text-white fs-5 p-2 btn btn-light text-black">Sign in</router-link> -->

              <router-link to="/lawyer-register" class="text-white fs-5 p-2 btn btn-light text-black">Sign
                up</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-wrap justify-content-center align-items-center pb-5 hide-mob">
        <div class="homepage-circles d-flex flex-column align-items-center justify-content-center " >
          <p class="fw-normal law-hd" >I'm looking for a lawyer</p>
          <div class="showhover" >
            <p class="fw-normal mb-3">Looking for a lawyer?</p>
            <p>Need a lawyer and don't know where to begin?</p>
            <p>
              We take the hassle and uncertainty out of the process of finding a
              lawyer.
            </p>
            <p>Simply make one enquiry and wait for lawyers to come to you.</p>
            <div class="text-center">
              <router-link to="/how-simplawfy-works" class="text-dark fs-5 p-2 btn btn-dark text-white">How Simplawfy Works</router-link>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-two">
              <button @click="goToLoginPage('client')" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign in</button>
              <!-- <router-link to="/client-login" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign in</router-link> -->
              <!-- <p>Or</p> -->
              <router-link to="/client-register" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign up</router-link>
            </div>
            <!-- <a href="./need-a-lawyer/index" class="text-black fs-5">Register to be notified when the platform goes live.</a> -->
          </div>
        </div>
        <div class="homepage-circles d-flex flex-column align-items-center justify-content-center bg-black text-white" >
          <p class="fw-normal law-hd" >I'm looking for clients</p>
          <div class="showhover" >
            <p class="fw-normal mb-3">Looking for clients?</p>

            <p>
              Professional networking eating into your billable hours and not
              producing results?
            </p>
            <p>
              We provide an untapped population of real people and small
              businesses looking for a lawyer.
            </p>
            <p>
              Simply subscribe for an opportunity to find clients in your
              practice area without leaving your desk.
            </p>
            <div class="text-center">
              <router-link to="/how-simplawfy-works" class="text-white fs-5 p-2 btn btn-light text-black">How Simplawfy Works</router-link>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-two">
              <button @click="goToLoginPage('lawyer')" class="ext-white fs-5 p-2 btn btn-light text-black">Sign
                in</button>
              <!-- <router-link to="/lawyer-login" class="text-white fs-5 p-2 btn btn-light text-black">Sign in</router-link> -->

              <router-link to="/lawyer-register" class="text-white fs-5 p-2 btn btn-light text-black">Sign
                up</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <router-link to="/login" class="btn btn-dark text-light">Already have an account?</router-link>
      </div>
      <!-- <div class="mb-3">
          <router-link to="/terms-of-use" class="me-2 text-dark">Terms of use</router-link>
          <router-link to="/privacy-policy" class="ms-2 text-dark">Privacy policy</router-link>
        </div> -->

    </div>
    <MainFooter />

    <!-- ------- -->
    <!-- <div class="modal fade lawfirm-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
      aria-hidden="true" id="FirmName">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close btn btn-dark" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group text-center">

              <div class="d-flex align-items-center justify-content-center my-3 pb-5 pt-5">
                <button @click="goToLoginPage('client')" class="close text-dark fs-5 p-2 btn btn-dark text-white">I'm a
                  Client</button>
                
                  <button @click="goToLoginPage('lawyer')" class="close text-dark fs-5 p-2 btn btn-dark text-white">I'm a
                  Lawyer</button>  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- ------- -->


  </div>
</template>

<script>
import GeneralHeader from "../pages/GeneralHeader.vue";
import MainFooter from "./global/MainFooter.vue";


export default {
  data() {
    return {
      showDiv1: false,
      showDiv2: false,
      headShow1 : true,
      headShow2 : true,
      isMobile: window.innerWidth < 460,
    };
  },
  components: {
    GeneralHeader,
    MainFooter,
  },
  // name: 'Platform',
  props: {
    msg: String,
  },
  created() {
    // Add event listener to update isMobile when the window is resized
    window.addEventListener('resize', this.updateIsMobile);
  },
  unmounted() {
    // Remove event listener to avoid memory leaks
    window.removeEventListener('resize', this.updateIsMobile);
  },
  methods: {
    openSweetAlert() {
      this.$swal({
        title: 'Login',
        // text: 'Navigate using SweetAlert buttons',
        // icon: 'info',
        showCancelButton: true,
        confirmButtonText: "I'm a Client",
        cancelButtonText: "I'm a Lawyer"
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to Page A
          // this.$router.push('/client-login');
          this.goToLoginPage('client');
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          // Navigate to Page B
          // this.$router.push('/lawyer-login');
          this.goToLoginPage('lawyer');
        }
      });
    },
    toggleDiv1() {
      this.showDiv1 = true;
      this.headShow1 = false;
    },
    toggleDiv2() {
      this.showDiv2 = true;   
      this.headShow2 = false;
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth < 461;
    },
  },
 

};
</script>

<style scoped>
.hello {
  min-height: 100vh;
  display: grid;
}

* {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.homepage-circles {
  border: 3px solid black;
  border-radius: 50%;
  font-size: 1.5em;
  padding: 50px;
  font-size: 16px;
  text-align: center;
  width: 490px;
  height: 490px;
  margin: 10px;
}

.homepage-circles:hover .showhover {
  /* display: block; */
  visibility: visible;
  opacity: 1;
}

.homepage-circles .law-hd {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.5s linear;
  position: absolute;
  font-size: 20px;
}

.homepage-circles .showhover,
.homepage-circles:hover .law-hd {
  /* display: none;
  transition: ease-in-out 0.5; */
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.btn {
  padding: 4px 20px 5px 20px !important;
  border-radius: 20px;
  text-align: center;
  align-items: center;
  font-size: 16px !important;
  margin: 0px 10px;
}

.text-black {
  color: #000 !important;
}

.mt-two {
  margin-top: 2rem !important;
}

.showhover p {
  line-height: 25px;
  margin-bottom: 17px;
}
.show-mob{
  display: none;
}
/* @media (max-width: 961px) {
  .hide-mob{
  display: none !important;
}
} */
@media (max-width: 460px) {
  .hide-mob{
  display: none !important;
}
  .homepage-circles .showhover {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.show-mob{
  display: block;
}


}

@media (min-width: 320px) and (max-width: 425px) {
  /* .homepage-circles:hover .showhover {
  display: block;
  visibility: visible;
  opacity: 1;
} */
.homepage-circles .showhover {
  display: block;
  visibility: visible;
  opacity: 1;
}
  .cstm-dropdown {
    margin-top: -20px;
    right: 0px;
  }

  .showhover {
    line-height: 22px;
    font-size: 13px;
  }

  .footer-main span {
    display: block;
  }

  .showhover p {
    line-height: 22px;
    margin-bottom: 10px;
  }
}



@media (min-width: 451px) and (max-width: 550px) {
  /* .homepage-circles {
    width: 70% !important;
  } */

  .logo-sub-heading {
    padding: 0px 20px;
  }

  .cstm-dropdown {
    margin-top: -20px;
    /* right: 0px; */
  }

}

@media (min-width: 500px) and (max-width: 1023px) {
  .homepage-circles {

    width: 460px !important;
    height: 460px !important;
    padding: 32px !important;
  }

  .showhover p {
    font-size: 15px !important;
  }
}
@media (min-width: 1024px) and (max-width:1036px) {
  .homepage-circles {

width: 440px !important;
height: 440px !important;
padding: 30px !important;
}
}
@media screen and (max-width: 720px) {
  .showhover p {
    line-height: 23px;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .homepage-circles {
    border: 3px solid black;
    border-radius: 50%;
    font-size: 16px;
    padding: 30px;
    text-align: center;
    /* width: 100%;
    height: 300px; */
    flex-direction: unset !important;
    /* row css */
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    width: 420px;
    height: 420px;
    line-height: 18px;
    margin: 10px 0;
  }

  .mt-two {
    margin-top: 0.5rem !important;
  }

  .homepage-circles a , .homepage-circles .btn {
    font-size: 13px !important;
  }

  main {
    flex-direction: column;
  }

  .logo {
    width: 100%;
  }

  .cstm-dropdown {
    right: 20px;
  }

  .showhover {
    line-height: 20px;
  }

}
@media screen and (max-width: 768px) {
  .logo-sub-heading {
    padding: 0px 30px;
  }
  .btn {
    padding: 5px 15px 5px 15px !important;
    font-size: 14px !important;  
}
}
@media (min-width: 360px) and (max-width: 450px) {
  .homepage-circles {
    width: 350px;
    height: 350px;
    padding: 15px;
  }
  .btn {
    padding: 3px 10px !important;
    font-size: 13px !important;
}
  .cstm-dropdown {
    margin-top: -20px;
    right: 0px;
  }
}
@media (min-width: 320px) and (max-width: 359px) {
  .showhover p{
    line-height: 1.5;
    margin-bottom: 8px;
    font-size: 11.5px;
}
  .btn {
    padding: 3px 10px !important;
    font-size: 12px !important;
}
  .homepage-circles {
    width: 310px;
    height: 310px;
  }  
  .homepage-circles a, .homepage-circles .btn {
    font-size: 12px !important;
}
}



</style>
