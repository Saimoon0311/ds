<template>
  <div class="hello">
    <MainHeader />
    <div class="d-flex flex-wrap justify-content-center align-items-center flex-column">
      <div class="mb-5 text-center">
        <p>
          An Australian legal marketplace making law simple by helping you find
          a lawyer or promote your law firm.
        </p>
        <p class="h5 fw-bold">
          The Revolution is Coming. Be Part of the Change.
        </p>
      </div>
      <div class="d-flex flex-wrap justify-content-center align-items-center pb-5">
        <div class="homepage-circles d-flex flex-column align-items-center justify-content-center ">
          <p class="fw-bold law-hd">I'm looking for a lawyer</p>
          <div class="showhover">
            <p class="fw-bold">Looking for a lawyer</p>
            <p>Need a lawyer and don't know where to begin?</p>
            <p>
              We take the hassle and uncertainty out of the process of finding a
              lawyer.
            </p>
            <p>Simply make one enquiry and wait for lawyers to come to you.</p>
            <div class="d-flex align-items-center justify-content-center mt-3">
              <router-link to="/client-login" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign in</router-link>
              <!-- <p>Or</p> -->
              <router-link to="/client-register" class="text-dark fs-5 p-2 btn btn-dark text-white">Sign up</router-link>
            </div>
            <!-- <a href="./need-a-lawyer/index" class="text-black fs-5">Register to be notified when the platform goes live.</a> -->
          </div>
        </div>
        <div class="homepage-circles d-flex flex-column align-items-center justify-content-center bg-black text-white">
          <p class="fw-bold law-hd">I'm looking for clients</p>
          <div class="showhover">
            <p class="fw-bold">Looking for clients</p>

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
            <div class="d-flex align-items-center justify-content-center mt-3">
              <router-link to="/lawyer-login" class="text-white fs-5 p-2 btn btn-light text-black">Sign in</router-link>

              <router-link to="/lawyer-register" class="text-white fs-5 p-2 btn btn-light text-black">Sign
                up</router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mb-3">
          <router-link to="/login" class="text-dark">Already have an account?</router-link>
        </div>
        <div class="mb-3">
          <router-link to="/terms-of-use" class="me-2 text-dark">Terms of use</router-link>
          <router-link to="/privacy-policy" class="ms-2 text-dark">Privacy policy</router-link>
        </div> -->

    </div>
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from "./global/MainHeader.vue";
import MainFooter from "./global/MainFooter.vue";

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  // name: 'Platform',
  props: {
    msg: String,
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
  width: 500px;
  height: 500px;
}

@media (min-width: 400px) and (max-width: 450px) {
  .homepage-circles {
    width: 85% !important;
  }
}

@media (min-width: 451px) and (max-width: 550px) {
  .homepage-circles {
    width: 70% !important;
  }
}

@media screen and (max-width: 720px) {
  .homepage-circles {
    border: 3px solid black;
    border-radius: 50%;
    font-size: 12px;
    padding: 50px;
    text-align: center;
    /* width: 100%;
    height: 300px; */
    flex-direction: unset !important;
    /* row css */
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-0.5 * var(--bs-gutter-x));
    margin-left: calc(-0.5 * var(--bs-gutter-x));
    line-height: 14px;
  }

  .homepage-circles a {
    font-size: 12px !important;
  }

  main {
    flex-direction: column;
  }

  .logo {
    width: 100%;
  }

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
</style>
