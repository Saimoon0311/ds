<template lang="">
  <div class="hello">
    <LawyerHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, John Doe</p>
      <p class="h5 m-3 text-center">Your profile has not been approved yet.</p>
      <!-- status after approval -->
      <div class="alert alert-danger text-center m-0 p-2">
        You have not subscribed yet.
        <router-link to="/subscribe" class="btn btn-link ps-0"
          >Subscribe now</router-link
        >
      </div>
      <!-- after subscribe -->
      <div class="border rounded bg-light p-3 d-flex flex-wrap">
        <p class="mx-auto my-0">
          No potential jobs found that match your profile. Click here to amend
          your <router-link to="/lawyer-profile">Profile</router-link>
        </p>
      </div>
      <!-- after profile update -->
      <div class="border rounded bg-light p-3 d-flex flex-wrap">
        <div
          class="d-flex justify-content-between border rounded bg-secondary text-white m-3 p-3"
          style="width: 35vw"
          id="28"
        >
          <div>
            <p class="badge bg-dark" title="Area">Criminal</p>
            &nbsp;
            <p class="badge bg-dark" title="Location">Victoria</p>
            <p><b>City/suburb:</b> karachi</p>
            <p><b>Title:</b> abc 2</p>
            <p
              id="description28"
              style="overflow: hidden; text-overflow: ellipsis; height: 100px"
            >
              test description
            </p>
            <details>
              <summary>More details</summary>
              <div class="bg-dark border rounded p-3 m-1">
                <p><b>Posted by:</b> junucyme@mailinator.com</p>
                <p><b> Deadline:</b> 27-12-2023</p>
                <p><b> Preferred contact time:</b> Flexible</p>
              </div>
            </details>
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center "
            style="min-width: 110px"
          >
            <router-link
              class="btn btn-light btn-sm w-100 my-1"
              to="/proposal"
              >Proposal</router-link
            ><router-link
              name="decline"
              class="btn btn-danger btn-sm w-100 my-1"
              to=""
              >Decline</router-link
            ><router-link
              class="btn btn-dark btn-sm w-100 my-1"
              to="/request-info"
              >Request More Info</router-link
            >
          </div>
        </div>
        <div
          class="d-flex justify-content-between border rounded bg-secondary text-white m-3 p-3"
          style="width: 35vw"
          id="29"
        >
          <div>
            <p class="badge bg-dark" title="Area">Criminal</p>
            &nbsp;
            <p class="badge bg-dark" title="Location">Victoria</p>
            <p><b>City/suburb:</b> karachi</p>
            <p><b>Title:</b> test case</p>
            <p
              id="description29"
              style="overflow: hidden; text-overflow: ellipsis; height: 100px"
            >
              lorem ipsum dummy text
            </p>
            <details>
              <summary>More details</summary>
              <div class="bg-dark border rounded p-3 m-1">
                <p><b>Posted by:</b> junucyme@mailinator.com</p>
                <p><b> Deadline:</b> 23-11-2023</p>
                <p><b> Preferred contact time:</b> Flexible</p>
              </div>
            </details>
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
            style="min-width: 110px"
          >
          <router-link
              class="btn btn-light btn-sm w-100 my-1"
              to="/proposal"
              >Proposal</router-link
            ><router-link
              name="decline"
              class="btn btn-danger btn-sm w-100 my-1"
              to=""
              >Decline</router-link
            ><router-link
              class="btn btn-dark btn-sm w-100 my-1"
              to="/request-info"
              >Request More Info</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
export default {
  components: {
    LawyerHeader,
  },
  methods: {},
  name: "DashboardTab",
};
</script>
<style scoped>
.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.logo-small {
  width: 175px;
  height: 50px;
}

.law-img {
  width: 15vw;
  height: 15vw;
  border: 1px solid white;
  border-radius: 50%;
}

.navActive {
  background: grey;
  border: 1px solid grey;
  border-radius: 10px;
  color: white;
}

.navbar-nav .left-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.bg-grey {
  background: grey;
  color: white;
}

.bg-grey:hover {
  background: grey;
  color: white;
}
</style>
