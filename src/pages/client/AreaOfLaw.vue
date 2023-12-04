<template lang="">
  <div>
    <ClientHeader />
    <div class="container">
      <div class="container" >
        <div
          class="d-flex flex-wrap justify-content-center border mt-5 rounded p-3"
          
        >
          <h4 class="w-100 text-center" >
            Which area of law do you need assistance in?
          </h4>
          <router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Banking &amp; finance / insolvency </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Commercial (business) </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Consumer </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Criminal </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Employment / workers compensation </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Environmental </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Family </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Health / disability / aged care </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Human rights / constitutional </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Immigration </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Insurance </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Intellectual property </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Liquor licensing / hospitality </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Litigation (civil court cases) </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Mediation </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Notary public </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Personal injury (compensation) </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Property (real estate) / construction </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Tax </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Traffic </router-link
          ><router-link
            class="m-2 text-decoration-none badge text-white fs-6 bubbles"
            to="/posting-job"
          >
            Wills &amp; estates
          </router-link>
          <div class="w-100 text-center" >
            <router-link
              class="m-2 text-decoration-none badge text-white fs-6 bubbles"
              to="/posting-job"
            >
              Other (not listed here) / I don't know
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClientHeader from "./Header.vue";

export default {
  name: "AreaOfLaw",
  components: {
    ClientHeader,
  },
};
</script>

<style scoped>
ul#pills-tab {
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 225px;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
  color: white;
  background-color: #000000;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #000000;
}

.bubbles {
  background: rgb(0, 0, 0);
}

.bubbles:hover {
  background: #000000;
}
</style>
