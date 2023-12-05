<template lang="">
  <div>
    <ClientHeader />
    <main class="container">
      <router-link
        class="btn btn-secondary btn-sm my-3"
        title="back"
        to="/view-bids"
        ><i class="bi bi-arrow-left"></i> Back</router-link
      >
      <p class="fs-4 text-center w-100">
        Response to request for further information
      </p>

      <p class="bg-secondary text-white p-4 rounded">
        <b>Requested information</b>
        <br />
        further information
      </p>

      <form class="text-center" action="replyInfoRequest.php" method="post">
        <input name="id" value="25" type="number" class="d-none" />
        <div class="form-group text-start">
          <label for="answer"
            >Please respond to the lawyer's request with as much detail as
            possible</label
          >
          <textarea
            class="form-control"
            id="answer"
            rows="10"
            name="answer"
          ></textarea>
        </div>

        <input
          class="btn btn-secondary my-3"
          name="submit"
          
          value="Send"
        />
      </form>
    </main>
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
