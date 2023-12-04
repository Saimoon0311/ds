<template lang="">
  <section class="howItWorks">
    <div v-if="loginUserData && loginUserData.type == 'client'">
      <ClientHeader />
    </div>
    <div v-else-if="loginUserData && loginUserData.type == 'lawyer'">
        <LawyerHeader />
    </div>
    <div v-else>
      <GeneralHeader  />
    </div>
    <h2 class="text-center mt-5 pt-3 mb-5">HOW THE PLATFORM WORKS</h2>
    <ul class="nav nav-tabs mb-3 container how-tabs" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        <a
          class="nav-link active"
          id="ex3-tab-1"
          data-bs-toggle="tab"
          href="#ex3-tabs-1"
          role="tab"
          aria-controls="ex3-tabs-1"
          aria-selected="true"
          >The Client Experience</a
        >
      </li>
      <li class="nav-item" role="presentation">
        <a
          class="nav-link"
          id="ex3-tab-2"
          data-bs-toggle="tab"
          href="#ex3-tabs-2"
          role="tab"
          aria-controls="ex3-tabs-2"
          aria-selected="false"
          >The Lawyer Experience</a
        >
      </li>
      
    </ul>

<div class="tab-content" id="ex2-content">
  <div
    class="tab-pane fade show active"
    id="ex3-tabs-1"
    role="tabpanel"
    aria-labelledby="ex3-tab-1"
  >
  <div class="container-fluid pt-5">
      
      <div class="mainbox">
        <div class="row">
          <div class="col">
            <div class="box01">1</div>
            <div class="subbox signup text-center">
              <div class="boxheading">Sign Up</div>
              <img src="../assets/icons/1.png" alt="icon" />
              <!-- <p>Create an account at </p> -->
              <router-link to="/client-register" class="btn btn-dark text-white">Create an account</router-link>
            </div>
          </div>
          <div class="col">
            <div class="box02">2</div>
            <div class="subbox">
              <div class="boxheading">Post a Job</div>
              <img src="../assets/icons/2.png" alt="icon" />
              <p>Submit a detailed description of the legal work you need.</p>
            </div>
          </div>
          <div class="col">
            <div class="box03">3</div>
            <div class="subbox03">
              <div class="boxheading">Compare Proposals</div>
              <img src="../assets/icons/3.png" alt="icon" />
             <p>Compare estimates, skills and services provided by lawyers.</p>
            </div>
          </div>
          <div class="col">
            <div class="box04">4</div>
            <div class="subbox03">
              <div class="boxheading">Choose A lawyer</div>
              <img src="../assets/icons/5.png" alt="icon" />
              <p>When you are ready, choose a lawyer by accepting their proposal.
                Receive their contact details and engage with them externally.</p>
            </div>
          </div>
          <div class="col">
            <div class="box05">5</div>
            <div class="subbox03">
              <div class="boxheading">Rate</div>
              <img src="../assets/icons/4.png" alt="icon" />
             <p>Review the service of your lawyer on the platform for future
              clients to see.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="tab-pane fade" id="ex3-tabs-2" role="tabpanel" aria-labelledby="ex3-tab-2">
    <div class="container-fluid pt-5">

      <div class="mainbox">
        <section class="row">
          <div class="col">
            <div class="box01">1</div>
            <div class="subbox signup text-center">
              <div class="boxheading">Sign Up</div>
              <img src="../assets/icons/1.png" alt="icon" />
              <router-link to="/lawyer-register" class="btn btn-dark text-white mb-2 mt-2 ">Create an account</router-link>
              <p> and complete your profile.</p>
              
            </div>
          </div>
          <div class="col">
            <div class="box02">2</div>
            <div class="subbox">
              <div class="boxheading">Verification</div>
              <img src="../assets/icons/9.png" alt="icon" />
              <p>
                We will verify that you are an admitted legal practitioner and
                confirm your eligibility to join our platform as per our
                <router-link to="/terms-and-conditions-for-lawyers" class="tandc" target="_blank">T&Cs for lawyers.</router-link>
              </p>
              <!--  -->

            </div>
          </div>
          <div class="col">
            <div class="box03">3</div>
            <div class="subbox03">
              <div class="boxheading">Subscribe</div>
              <img src="../assets/icons/7.png" alt="icon" />
              <p>Get a 60-day free trial and pay A$39 per month thereafter.</p>
            </div>
          </div>
          <div class="col">
            <div class="box04">4</div>
            <div class="subbox03">
              <div class="boxheading">access</div>
              <img src="../assets/icons/6.png" alt="icon" />
              <p class="text-center no-mar">
                <!-- <router-link to="/lawyer-login" 
                class="btn btn-dark text-white mt-2 ">Log in</router-link> -->
                <button @click="goToLoginPage('lawyer')"
                class="btn btn-dark text-white mt-2 ">Log in</button>
              </p>
              <p class="mt-2"> to view jobs in your location and areas of law.</p>
            </div>
          </div>
          <div class="col">
            <div class="box05">5</div>
            <div class="subbox03">
              <div class="boxheading">Submit a proposal*</div>
              <img src="../assets/icons/8.png" alt="icon" />
              <p>
                Submit your estimate for the jobs you want and based on the way
                you bill. 
              </p>
            </div>
          </div>
          <div class="col">
            <div class="box05">6</div>
            <div class="subbox03">
              <div class="boxheading">Find a Client</div>
              <img src="../assets/icons/5.png" alt="icon" />
              <p>
                If a client wants to work with you, they will accept your
                proposal. Receive their contact details and continue with the
                legal matter externally.
              </p>
            </div>
          </div>
          <div class="col">
            <div class="box05">7</div>
            <div class="subbox03">
              <div class="boxheading">Be rated</div>
              <img src="../assets/icons/4.png" alt="icon" />
              <p>
                Clients review your service on the platform for future clients
                to see.
              </p>
            </div>
          </div>
        </section>
      </div>
  <p class="text-center  pt-3 small-para"> *At no point in time can you revise your proposal or see the proposals of other lawyers. Your proposal remains confidential between you and the potential client.</p>

    </div>
  </div>
</div>
    <!-- ------------ -->
    
    

    <div class="footer">
      <MainFooter />
    </div>
  </section>
</template>
<script>
import GeneralHeader from "../pages/GeneralHeader.vue";
import MainFooter from "../components/global/MainFooter.vue";
import ClientHeader from "../pages/client/Header.vue";
import LawyerHeader from "../pages/lawyer/Header.vue";

export default {
  components: {
    GeneralHeader,
    MainFooter,
    ClientHeader,
    LawyerHeader
  },
  computed: {
    loginUserData() {
      console.log('dhuurr', this.$store.getters?.loginUser)
      return this.$store.getters?.loginUser;
    }
  },

  name: "HowSimplawfyWorks",
};
</script>
<style scoped>
.howItWorks {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

p {
  font-size: 14px;
  color: #000;
}

.small-para {
  font-size: 12px;
}

.btn {
  font-size: 13px;
  padding: 4px 8px;
}

.no-mar {
  margin: 0px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.signup {
  width: auto !important;
}

.col img {
  width: 60px;
}

.mainbox {
  width: 98%;
  margin: 25px auto;
  padding: 0 1%;
  /* border-top: solid 5px #000; */
}

.box01,
.box02,
.box03,
.box04,
.box05 {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: -27px; */
  margin: -23px auto 10px auto;
}

.subbox {
  width: 150px;
  margin: 5px auto 35px auto;
}

.subbox03 {
  width: 200px;
  margin: 5px auto 35px auto;
}

.subbox img {
  display: table;
  margin: 8px auto;
  text-align: center;
  min-height: 60px;
}

/* .subbox a {
  color: #0d6efd;
} */

.tandc,
.tandc:hover {
  color: #000;
  text-decoration: none;
  font-weight: 600;

}

.subbox a:hover {
  color: #000;
}

.boxheading {
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  color: #000;
  display: block;
}

.subbox03 img {
  display: table;
  margin: 8px auto;
  text-align: center;
  min-height: 60px;
}

.subbox03 a {
  color: #0d6efd;
}

.subbox03 a:hover {
  color: #000;
}

.col {
  border-top: 5px solid;
}

.how-tabs {
  border: none;
  text-align: center;
  justify-content: center;
}

.how-tabs a.active {
  border: none;
  border-bottom: 5px solid #000;
  color: #000;
}

.how-tabs a {
  border: none;
  border-bottom: 5px solid rgb(218, 218, 218);
  padding: 8px 60px;
  font-size: 22px;
  color: #000;
}

@media only screen and (max-width: 767px) {
  .col {
    width: 50%;
    flex: none;
  }

  .subbox {
    width: 100%;
    text-align: center;
  }

  .subbox03 {
    width: 100%;
    text-align: center;
  }
}

@media only screen and (min-width: 576px) and (max-width: 767px) {
  .col {
    width: 50% !important;
    flex: none;
  }

  .subbox {
    width: 100%;
    text-align: center;
  }

  .subbox03 {
    width: 100%;
    text-align: center;
  }
}

@media only screen and (min-width: 480px) and (max-width: 575px) {
  .col {
    width: 100%;
    flex: none;
  }

  .subbox {
    width: 100%;
    text-align: center;
  }

  .subbox03 {
    width: 100%;
    text-align: center;
  }
}

@media only screen and (min-width: 0px) and (max-width: 479px) {
  .col {
    width: 100%;
    flex: none;
  }

  .subbox {
    width: 100%;
    text-align: center;
  }

  .subbox03 {
    width: 100%;
    text-align: center;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .col {
    width: 50%;
    flex: none;
  }

  .subbox {
    width: 100%;
    text-align: center;
  }

  .subbox03 {
    width: 100%;
    text-align: center;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .col {
    width: 33%;
    flex: none;
  }
}
</style>
