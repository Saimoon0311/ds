<template lang="">
  
  <section class="howItWorks">
    <div v-if="loginUserData && loginUserData.type == 'client'">
      <ClientHeader />
    </div>
    <div v-else-if="loginUserData && loginUserData.type == 'lawyer'">
      <LawyerHeader />
    </div>
    <div v-else>
      <GeneralHeader />
    </div>
    <!-- <div class="text-center pt-4">
      <img
        src="../assets/images/new-logo.png"
        alt="logo"
        class="img-fluid new-logo text-center"
      />
      <p class="text-center p-2 mt-2 main-text">
        Simplawfy is an independent legal marketplace platform connecting
        individuals and businesses with legal professionals moving in different
        circles.
      </p>
    </div> -->
    <div class="mt-3 pt-3">
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
          >About the Founders</a
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
          >Why Choose Simplawfy?</a
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
              <div class="col-md-4 col-sm-12">
                <div class="left-inner">
                  <img
                    src="../assets/free.png"
                    alt=""
                    class="img-fluid top-avatar"
                  />
                  <p class="img-bottom bg-dark text-white">
                    SIMPLAWFY IS MORE THAN JUST AN ONLINE MARKETPLACE, IT'S A
                    MOVEMENT TO MAKE THE LAW SIMPLE AND MORE ACCESSIBLE.
                  </p>
                </div>
              </div>
              <div
                class="col-md-8 col-sm-12 pe-2 pe-md-3 ps-2 ps-md-5 d-flex flex-column justify-content-between"
              >
                <div class="para-wrap">
                  <p>
                    Simplawfy was created by husband-and-wife duo, Sean and Jess
                    Gomes, who believe access to quality legal services is a
                    fundamental right. Sean, a former practicing lawyer from
                    Perth, understands the intricacies of the legal industry
                    while Jess, with experience working with communities facing
                    barriers, is passionate about equal access to the law.
                  </p>
                  <p>
                    Together, they identified that there are individuals and
                    businesses needing legal services, and legal professionals
                    seeking clients, but that they are moving in different
                    circles. This results in missed opportunities for lawyers
                    and a lack of legal support for clients.
                  </p>
                  <p>
                    Motivated by the power of technology to create communities
                    and provide transparency, they developed the Simplawfy
                    platform to break down barriers, improve public trust in the
                    legal industry and create a more inclusive legal system in
                    which everyone can benefit.
                  </p>
                  <p class="position-relative mb-md-5 mb-sm-3">
                    Simplawfy is more than just an online marketplace - it's a
                    movement to make the law simple and more accessible. Now
                    those needing legal services, and lawyers needing clients,
                    can move in the same circle -  <img src="../assets/images/sign.png" alt="simplawfy" class="signature img-fluid"/>
                  </p>
                </div>
                <div
                  class="btn-inner mt-5 pt-3 mb-sm-3 mb-md-1 d-flex justify-content-evenly align-items-center flex-wrap"
                >
                  <router-link
                    to="/client-register"
                    class="btn btn-dark softblue text-white rounded-pill m-1 m-lg-0"
                    >Find a Lawyer Now</router-link
                  >
                  <router-link
                    to="/lawyer-register"
                    class="btn btn-dark softblue text-white rounded-pill m-1 m-lg-0"
                    >Find Clients Now</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tab-pane fade show"
        id="ex3-tabs-2"
        role="tabpanel"
        aria-labelledby="ex3-tab-2"
      >
        <div class="container-fluid pt-5">
          <div class="mainbox">
            <section class="row row-flip">
              <div
                class="col-md-5 col-sm-12 d-flex flex-column justify-content-between"
              >
                <h4 class="fw-bold text-center">Our Values</h4>
                <div class="values-inner">
                  <div class="parabox">
                    <h6>Transparency</h6>
                    <p>
                      Our platform provides clients with the opportunity to make
                      an informed choice, and lawyers more insight into what
                      clients are seeking and value most.
                    </p>
                  </div>
                  <div class="parabox">
                    <h6>Accessibility</h6>
                    <p>
                      We're committed to breaking down barriers to ensure
                      everyone has access to a lawyer when they need one,
                      regardless of their background or legal needs.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-7 col-sm-12">
                <div class="row align-items-start inner-row">
                  <div class="col-md-4 col-sm-12">
                    <h5 class="colorblue fw-bold">Simplawfy</h5>
                    <ul>
                      <li>Streamlined, simple process</li>
                      <li>Saves time</li>
                      <li>
                        Convenience delivered online from the comfort of the
                        user's home or office
                      </li>
                      <li>Clients are able to make an informed choice</li>
                      <li>
                        Lawyers gain insight into what clients need and value
                      </li>
                      <li>Increased accessibility to quality legal services</li>
                    </ul>
                  </div>
                  <div class="col-md-4 col-sm-12 px-1 px-md-5 colshow">
                    <img src="../assets/level.png" alt="" class="img-fluid" />
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <h5 class="fw-bold">Other Methods</h5>
                    <ul>
                      <li>Daunting, complicated and expensive process</li>
                      <li>Time-intensive</li>
                      <li>
                        Clients have less opportunity to make an informed choice
                      </li>
                      <li>
                        Lawyers have less opportunity to understand what new
                        clients need and value
                      </li>
                      <li>
                        Accessibility is limited by any legal contacts, time and money the client has at their disposal to find the right lawyer for them
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </section>
            <div class="row">
                <div class="col-md-12">
                <div
                  class="btn-inner mb-sm-3 mb-md-1 mt-5 pt-3 d-flex justify-content-evenly align-items-center flex-wrap"
                >
                  <router-link
                    to="/client-register"
                    class="btn btn-dark softblue text-white rounded-pill m-1 m-md-0"
                    >Find a Lawyer Now</router-link
                  >
                  <router-link
                    to="/lawyer-register"
                    class="btn btn-dark softblue text-white rounded-pill m-1 m-md-0"
                    >Find Clients Now</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
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
    MainFooter,
    GeneralHeader,
    ClientHeader,
    LawyerHeader,
  },
 
 
  name: "NewLanding",

  computed: {
    loginUserData() {
      console.log("dhuurr", this.$store.getters?.loginUser);
      return this.$store.getters?.loginUser;
    },
  },
  mounted() {
    this.updateMetaDescription(`We're more than just an online marketplace - we're making the law simple by increasing accessiblity to and transparency of legal services.`);   
  },
  methods: {
    updateMetaDescription(newDescription) {
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      console.log('tag check',metaDescriptionTag);
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', newDescription);
      } else {
        // Meta description tag not found, handle error or log it
        console.error('Meta description tag not found.');
      }
    }
  }
};
</script>
<style scoped>
img.signature {
    width: 150px;
    position: absolute;
    padding-left: 5px;
}
.top-avatar {
  width: 400px;
  border-radius: 50%;
  height: 400px;
  object-fit: cover;
}
.left-inner {
  position: relative;
  text-align: center;
}
.btn-inner a {
  width: 220px;
}
.parabox {
  width: 35%;
  margin: auto;
  background: black;
  margin: 10px;
  text-align: center;
  border-radius: 50px;
  padding: 70px 10px;
  color: white !important;
}
.parabox p {
  margin: 0;
  color: white !important;
  font-size: 14px;
}
p.img-bottom {
  right: -10%;
  width: 70%;
  text-align: center;
  margin: 0;
  border-radius: 30px;
  font-size: 20px;
  padding: 20px 5px;
  margin-top: -50px;
  z-index: 1;
  background: black !important;
  position: relative;
  margin-left: auto;
  font-weight: 400;
  font-family: 'Bebas Neue', sans-serif;
}
.new-logo {
  width: 400px;
}
.main-text {
  font-size: 1.2vw;
}
.how-tabs a {
  text-decoration: none;
}
.howItWorks {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

p {
  font-size: 18px;
  color: #000;
}

.small-para {
  font-size: 12px;
}

.values-inner {
  display: flex;
  justify-content: space-evenly;
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
  font-weight: 400;
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
  font-weight: 400;
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
.colorblue {
  color: #88c7fa;
}
ol,
ul {
  padding-left: 1rem;
  margin: 0;
}
.row-flip ul li {
    margin-bottom: 15px;
}
.row-flip ul li:last-child {
    margin-bottom: 0;
}
@media only screen and (max-width: 1720px) and (min-width: 1550px)  {
  img.signature{
    position: relative;
  }
}
@media only screen and (max-width: 1600px) {
    .parabox{
        width: 45%;
    }
}
@media only screen and (max-width: 1440px) {
  .img-bottom {
    width: 100% !important  ;
  }
}
@media only screen and (max-width: 1024px) {
  p.img-bottom {
    font-size: 16px;
  }
    .inner-row .col-md-4 {
    width: 50%;
}
    .colshow{
        display: none;
    }
    .values-inner{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
.parabox{
        width: 95%;
      padding: 50px 10px;

    }
  .top-avatar {
    width: 300px;
    height: 100%;
  }
}
@media only screen and (max-width: 991px) {
  .img-bottom {
    right: 0 !important;
  }
  .btn-inner {
    margin-top: 0 !important;
}
.how-tabs a{
    padding: 8px 40px;
  }
}

@media only screen and (max-width: 767px) {
  img.signature {
    width: 100px;
    position: relative;
}
  .how-tabs a{
    padding: 8px 40px;
  }
  p.img-bottom {
    font-size: 18px;
  }
  .parabox{
    padding: 30px 10px;
  }
    .row-flip {
    display: flex;
    flex-direction: column-reverse;
}
.inner-row .col-md-4 {
    width: 100%;
    margin-bottom: 20px;
}
.inner-row{
    margin-bottom: 20px;
}
.inner-row h4{
    text-align: center;
}
  .how-tabs a {
    padding: 10px 30px;
  }
  .top-avatar {
    width: 300px;
    height: 300px;
  }
  .mainbox {
    margin: 0 0 25px 0 !important;
  }
  .btn-inner {
    margin-top: 0 !important;
  }
  .img-bottom {
    margin-top: 20px !important;
    margin-bottom: 20px !important;
  }
  p {
    font-size: 16px;
    color: #000;
  }
  .main-text {
    font-size: 16px;
  }
  .new-logo {
    width: 220px;
  }
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
  .main-text {
    font-size: 16px;
  }
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
  .new-logo {
    width: 250px;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .main-text {
    font-size: 16px;
  }
  .new-logo {
    width: 300px;
  }
  .col {
    width: 33%;
    flex: none;
  }
}
/* @media only screen and (max-width: 480px) {
img.signature {
    width: 150px;
    position: relative;
}
} */
</style>
