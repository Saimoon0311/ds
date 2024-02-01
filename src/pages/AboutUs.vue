<template lang="">
  <section class="about-main">
    <div v-if="loginUserData && loginUserData.type == 'client'">
      <ClientHeader />
    </div>
    <div v-else-if="loginUserData && loginUserData.type == 'lawyer'">
      <LawyerHeader />
    </div>
    <div v-else>
      <GeneralHeader />
    </div>
    <div class="WordSection1 container mt-5 px-3 px-md-0">
      <h3 class="mt-3 text-center">About Simplawfy:</h3>
      <p class="text-center">
        Simplawfy is an independent legal marketplace platform. We connect
        individuals and businesses with legal professionals moving in different
        circles.
      </p>

      <h4 class="text-center mt-5">Values</h4>
      <div class="value-inner d-flex align-item-center justify-content-center">
        <div class="probox">
          <h6>Transparency</h6>
          <p>
            Our platform provides clients with the opportunity to make an
            informed choice, and lawyers more insight into what clients are
            seeking and value most.
          </p>
        </div>

        <div class="probox">
          <h6>Accessibility</h6>
          <p>
            We’re committed to breaking down barriers to ensure everyone has
            access to a lawyer when they need one, regardless of their
            background or legal needs.
          </p>
        </div>
      </div>
      <h3 class="mt-5 text-center">About the Founders:</h3>

      <div class="row align-item-start">
        <div class="col-md-3 col-sm-12 text-center">
          <img
            src="../assets/free.jpg"
            alt=""
            class="img-fluid about-img rounded-circle w-100 object-fit-cover"
          />
        </div>
        <div class="col-md-9 col-sm-12 pt-3 pb-3 text-justify">
          <p>
            Simplawfy was created by husband-and-wife duo, Sean and Jess Gomes,
            who believe access to quality legal services is a fundamental right.
            Sean, a former practicing lawyer from Perth, understands the
            intricacies of the legal industry while Jess, with experience
            working with communities facing barriers, is passionate about equal
            access to the law.
          </p>
          <p>
            Together, they identified that there are individuals and businesses
            needing legal services, and legal professionals seeking clients, but
            that they are moving in different circles. This results in missed
            opportunities for lawyers and a lack of legal support for clients.
          </p>
          <p>
            Motivated by the power of technology to create communities and
            provide transparency, they developed the Simplawfy platform to break
            down barriers, improve public trust in the legal industry and create
            a more inclusive legal system in which everyone can benefit.
          </p>
          <p>
            Simplawfy is more than just an online marketplace – it’s a movement
            to make the law simple and more accessible. Now those needing legal
            services, and lawyers needing clients, can move in the same circle –
            Simplawfy.
          </p>
          <div
            class="btn-inner mt-5 pt-3 d-flex justify-content-evenly align-items-center flex-wrap"
          >
            <router-link
              to="/login"
              class="btn btn-dark softblue text-white rounded-pill m-1 m-md-0"
              >Find a Lawyer Now</router-link
            >
            <router-link
              to="/login"
              class="btn btn-dark softblue text-white rounded-pill m-1 m-md-0"
              >Find Clients Now</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <MainFooter />
    </div>
  </section>
</template>
<script>
import MainFooter from "../components/global/MainFooter.vue";
import GeneralHeader from "./GeneralHeader.vue";
import ClientHeader from "../pages/client/Header.vue";
import LawyerHeader from "../pages/lawyer/Header.vue";

export default {
  components: {
    MainFooter,
    GeneralHeader,
    ClientHeader,
    LawyerHeader,
  },

  name: "AboutUs",

  computed: {
    loginUserData() {
      return this.$store.getters?.loginUser;
    },
  },
};
</script>
<style scoped>
.text-justify{
  text-align: justify;
}
.btn-inner a {
  width: 220px;
}
.btn-inner {
  margin: 0 !important;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.about-main {
  position: relative;
  padding-bottom: 60px;
}
.probox {
  width: 40%;
  margin: auto;
  background: black;
  margin: 10px;
  text-align: center;
  border-radius: 50px;
  padding: 30px 10px;
  color: white !important;
}
.probox p{
    margin: 0;
    color: white !important;
    font-size: 14px;
}

@media only screen and (max-width: 767px) {
.probox{
  width: 100% !important;
}
img.about-img {
    width: 300px !important;
    height: 300px;
    object-fit: cover !important;
    margin: 20px 0;
}
.value-inner{
  flex-wrap: wrap;
}
}
</style>
