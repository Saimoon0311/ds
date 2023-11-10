<template lang="">
  <section class="howItWorks">
    <GeneralHeader />
    
    <div class="container-fluid pt-5">
      <h2 class="text-center pt-5 pb-3 mb-5">HOW THE PLATFORM WORKS</h2>

      <div class="mainbox">
        <section class="row">
          <div class="col">
            <div class="box01">1</div>
            <div class="subbox">
              <div class="boxheading">Sign Up</div>
              <img src="../assets/icons/icon01.jpg" alt="icon" />
              <p>Make an account and create a profile at: <router-link to="/">makinglawsimple.com.au</router-link></p>
              
            </div>
          </div>
          <div class="col">
            <div class="box02">2</div>
            <div class="subbox">
              <div class="boxheading">Verification</div>
              <img src="../assets/icons/icon06.jpg" alt="icon" />
              <p>
                We will verify that you are an admitted legal practioner and
                confirm your eligibility to join our platform as per our
                <router-link to="/terms-and-conditions-for-lawyers">T&Cs for lawyers.</router-link>
              </p>
              <!--  -->

            </div>
          </div>
          <div class="col">
            <div class="box03">3</div>
            <div class="subbox03">
              <div class="boxheading">Subscribe</div>
              <img src="../assets/icons/icon07.jpg" alt="icon" />
              <p>Get a 60-day free trial and pay $39 per month thereafter.</p>
            </div>
          </div>
          <div class="col">
            <div class="box04">4</div>
            <div class="subbox03">
              <div class="boxheading">access</div>
              <img src="../assets/icons/icon08.jpg" alt="icon" />
              <p>Log in to view jobs in your location and areas of law.</p>
            </div>
          </div>
          <div class="col">
            <div class="box05">5</div>
            <div class="subbox03">
              <div class="boxheading">Submit a proposal*</div>
              <img src="../assets/icons/icon09.jpg" alt="icon" />
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
              <img src="../assets/icons/icon04.jpg" alt="icon" />
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
              <img src="../assets/icons/icon05.jpg" alt="icon" />
              <p>
                Clients review your service on the platform for future clients
                to see.
              </p>
              
            </div>
          </div>
        </section>
      </div>
    </div>
    

    <div class="footer">
      <MainFooter />
    </div>
  </section>
</template>
<script>
import GeneralHeader from "../pages/GeneralHeader.vue";
import MainFooter from "../components/global/MainFooter.vue";


export default {
  components: {
    GeneralHeader,
    MainFooter
  },

  name: "HowSimplawfyWorksLawyer",
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
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
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

.subbox a {
  color: #0d6efd;
}

.subbox a:hover {
  color: #000;
}

.boxheading {
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
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
