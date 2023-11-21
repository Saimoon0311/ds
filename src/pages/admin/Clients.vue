<template lang="">
  <div class="hello">
    <AdminHeader />

    <main class="container my-3">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" class="text-center">
              No clients have been signed up yet
            </td>
          </tr>
        </tbody>
      </table>
    </main>
        <div class="footer">
            <MainFooter />
        </div>
  </div>
</template>
<script>
import AdminHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";


export default {
  components: {
    AdminHeader,
    MainFooter
  },
  methods: {},
  name: "AdminLawyer",
};
</script>
<style scoped>
.hello {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
