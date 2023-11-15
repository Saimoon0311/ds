<template lang="">
  <div class="hello">
    <AdminHeader />
    <main class="container my-3">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Job title</th>
            <th>Job description</th>
            <th>Area of law</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" class="text-center">No uncategorised jobs</td>
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
<style scoped></style>
