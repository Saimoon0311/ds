<template lang="">
  <div>
  <ClientHeader />
  <div class="container">

    <div
      class="modal fade first-name-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
      id="Fname"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">First Name</h5>
            <button
              type="button"
              class="close btn btn-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="account.php" method="post"></form>
            <div class="form-group">
              <input
                type="text"
                name="fname"
                class="form-control"
                id="fname"
                v-model="first_name"
              />
              <button
                type="submit"
                name="fname-submit"
                class="btn btn-secondary my-3"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade last-name-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
      id="Lname"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Last Name</h5>
            <button
              type="button"
              class="close btn btn-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="account.php" method="post"></form>
            <div class="form-group">
              <input
                type="text"
                name="lname"
                class="form-control"
                id="lname"
                v-model="last_name"
              />
              <button
                type="submit"
                name="lname-submit"
                class="btn btn-secondary my-3"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade phone-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
      id="Pnum"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Phone Number</h5>
            <button
              type="button"
              class="close btn btn-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <form action="account.php" method="post"></form>
            <div class="form-group">
              <input
                type="tel"
                name="phone"
                class="form-control"
                id="phone"
                v-model="phone"
                maxlength="10"
              />
              <button
                type="submit"
                name="phone-submit"
                class="btn btn-secondary my-3"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered m-3 table-striped">
      <tbody>
        <!-- Email -->
        <tr>
          <td class="col-md-3">Email</td>
          <td>{{ loginUser?.email }}</td>
        </tr>

        <!-- First name -->
        <tr>
          <td class="d-flex align-items-center justify-content-between">
            First Name
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-toggle="modal" data-bs-target="#Fname"
              title="Edit"
            >
              <i class="fa fa-pencil"></i>
            </button>
          </td>

          <!-- Modal -->

          <!-- Modal ends here -->

          <td>{{ loginUser?.first_name }}</td>
        </tr>

        <!-- Last name -->
        <tr>
          <td class="d-flex align-items-center justify-content-between">
            Last Name
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-toggle="modal" data-bs-target="#Lname"
              title="Edit"
            >
              <i class="fa fa-pencil"></i>
            </button>
          </td>

          <!-- Modal -->

          <!-- Modal ends here -->

          <td>{{ loginUser?.last_name }}</td>
        </tr>

        <!-- Phone -->
        <tr>
          <td class="d-flex align-items-center justify-content-between">
            Phone Number
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-toggle="modal" data-bs-target="#Pnum"
              title="Edit"
            >
              <i class="fa fa-pencil"></i>
            </button>
          </td>

          <!-- Modal -->

          <!-- Modal ends here -->

          <td>{{ loginUser?.phone }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Change password -->
    <div class="text-center">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="modal" data-bs-target="#Password"
        title="Edit"
      >
        Change password <i class="bi bi-pencil-fill"></i>
      </button>

      <!-- Modal -->
      <div
        class="modal fade change-password-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="Password"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Change password
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form >
                <div class="form-group">
                  <input
                    type="password"
                    name="prev-password"
                    class="form-control mb-2"
                    id="prev-password"
                    placeholder="Old password"
                  />
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="password"
                    placeholder="New password"
                  />
                  <button
                    type=""
                    name="password-submit"
                    class="btn btn-secondary my-3"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal ends here -->
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
  computed: {
    loginUser() {
      // console.log(this.$store.getters.loginUser);
      return this.$store.getters.loginUser;
    },
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
