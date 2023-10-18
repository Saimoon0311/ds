<template lang="">
  <div>
    <ClientHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, test client</p>

    <h3 v-if="subscriptionStatus != null && subscriptionStatus == 'subscribed'">Subscribed</h3>
    <h3 v-if="subscriptionStatus != null && subscriptionStatus == 'not-subscribed'">You don't have subscription please subscribe to access it</h3>
    <h3 v-if="subscriptionStatus != null && subscriptionStatus == 'expired'">You don't have subscription now please resubscribe to access it</h3>
    <button @click="logout()">Logout</button>
      <!-- Toggle active, closed view -->
      <div class="text-center my-3">
        <span class="bg-light border p-2 py-3 rounded">
          <button
            class="btn bg-grey mx-0"
            onclick="toggleScreenActive()"
            id="btnActive"
          >
            Open
          </button>
          <button
            class="btn mx-0"
            onclick="toggleScreenClosed()"
            id="btnClosed"
          >
            Closed
          </button>
        </span>
      </div>

      <!-- Open jobs -->
      <div
        class="border rounded bg-light p-3 my-3 d-flex flex-wrap"
        id="containerActive"
      >
        <span class="text-center w-100"
          >You haven't posted a job. Click here to
          <a href="jobs.php">post a job</a></span
        >
      </div>

      <!-- Closed jobs -->
      <div
        class="border rounded bg-light p-3 my-3 d-flex flex-wrap d-none"
        id="containerClosed"
      >
        <span class="text-center w-100">No closed jobs found.</span>
      </div>
    </div>
  </div>
</template>
<script>
import ClientHeader from "./Header.vue";
import api from "../../config/api.js";

export default {
  name: "ClientAccount",
  components: {
    ClientHeader,
  },
  data(){
        return {
            subscriptionStatus : null
        }
    },
    created(){
        this.checkSubscription();
    },
    methods:{
        checkSubscription(){
            try {
                api.get(`/lawyer/check-subscription/${this.$store.getters.loginUser}`)
                    .then(res => {
                        this.subscriptionStatus = res.data.status;
                    })
                    .catch(error => console.log("getResults 1 : ", error.message));
            } catch (error) {
                console.error('API request error:', error);
            }
        },
        logout(){
            try {
                api.get('/logout')
                    .then(() => {
                        localStorage.removeItem('token');
                        this.$store.commit('SET_AUTHENTICATED', false);
                        localStorage.removeItem("loginUser");
                        this.$store.commit('SET_LOGIN_USER', null);
                        this.$router.push({ path: '/login' });
                    })
                    .catch(error => console.log("getResults : ", error));
                // console.log(formData);
            } catch (error) {
                console.error('API request error:', error);
            }
        }
    }
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
  background-color: #808080;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #6d6f73;
}
</style>
