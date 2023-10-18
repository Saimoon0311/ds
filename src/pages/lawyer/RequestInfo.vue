<template lang="">
  <div class="hello">
    <LawyerHeader />
    <main class="my-6 w-100 text-center">
        <div class="my-3 col-md-5 mx-auto d-flex align-items-center ">
            <router-link class="btn btn-secondary btn-sm my-0" to="lawyer-dashboard"><i class="bi bi-arrow-left"></i> Back</router-link>
            <p class="fs-5 mx-auto my-0">Request further information</p>
        </div>

        <!-- Job preview card -->
        <div>
            <div class="d-flex justify-content-between border rounded bg-secondary text-white p-3 text-start col-md-5  m-auto" id="29"><div><p class="badge bg-dark" title="Area">Criminal</p>&nbsp;<p class="badge bg-dark" title="Location">Victoria</p><p><b>City/suburb:</b> karachi</p><p>test description...</p><div><p><b>Posted by:</b> junucyme@mailinator.com</p><p><b> Deadline:</b> 23-11-2023</p><p><b> Preferred contact time:</b> Flexible</p></div></div></div>        </div>

         <!-- Request more info form -->
        <form class="text-start border rounded p-3 col-md-5 my-3 mx-auto" method="post" action="requestInfo.php">
            <input type="text" class="form-control d-none" id="receiver" name="receiver" value="<br />
<b>Notice</b>:  Undefined variable: customer in <b>C:\xampp\htdocs\simplawfy\lawyer\requestInfo.php</b> on line <b>84</b><br />
">
            <br>

            <div class="form-group">
                <input type="text" class="d-none" name="jobId" value="29">
            </div>

            <div class="form-group">
                <label for="question">What further information do you need to know from the client in order to submit a bid?<sup><code>*</code></sup></label>
                <textarea id="question" name="question" class="form-control" required=""></textarea>
            </div>

            <div class="text-center">
                <input class="btn btn-secondary mt-2" type="submit" name="submit" value="Submit">
            </div>
        </form>
    </main>
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
