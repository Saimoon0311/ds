<template lang="">
  <div>
    <ClientHeader />
    <div class="container">
      <p class="h4 m-3">Welcome, test client</p>

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

export default {
  name: "ClientAccount",
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
  background-color: #808080;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #6d6f73;
}
</style>
