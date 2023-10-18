<template lang="">
  <div class="hello">
    <AdminHeader />
    <div class="main">
      <div class="container">
        <ul
          class="nav nav-pills mb-3 bg-light border p-2 py-3 rounded"
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Pending
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Approved
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active text-center"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div class="container my-3" id="containerPending">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td class="text-left">
                      asd1@mailinator.com (asd lasd)
                      <details class="lawyerSummary">
                        <summary data-open="Less" data-close="More"></summary>
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td class="fw-bold">Profile</td>
                              <td class="text-danger">Not specified</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Email</td>
                              <td>asd1@mailinator.com</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Name</td>
                              <td>asd lasd</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Job Title</td>
                              <td class="text-danger">Not specified</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Law Firm Name</td>
                              <td class="text-danger">Not specified</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Phone</td>
                              <td>0310000000</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Website</td>
                              <td class="text-danger">Not specified</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">About</td>
                              <td class="text-danger">Not specified</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Expertise</td>
                              <td class="text-danger">Not specified</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Location</td>
                              <td class="text-danger">Not specified</td>
                            </tr>
                          </tbody>
                        </table>
                      </details>
                    </td>
                    <td class="text-end button-width">
                      <div  class="mb-1">
                        <input
                          class="d-none"
                          name="accept_id"
                          value="23"
                        /><button class="btn btn-dark">
                          <i class="bi bi-check-lg"></i> Approve
                        </button>
                      </div>
                      <div >
                        <input
                          class="d-none"
                          name="reject_id"
                          value="23"
                        /><button
                          class="btn btn-light"
                          style="border: 1px solid black"
                        >
                          <i class="bi bi-x-lg"></i> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="container my-3" id="containerApproved">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td>
                      test@mailinator.com (Yardley Palmer )
                      <details class="lawyerSummary" open="">
                        <summary data-open="Less" data-close="More">
                          more
                        </summary>
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td class="fw-bold">Profile</td>
                              <td>
                                <!-- <img
                                src=""
                                alt="profile picture"
                                width="100"
                                height="100"
                              /> -->
                              </td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Email</td>
                              <td>test@mailinator.com</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Name</td>
                              <td>Yardley Palmer</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Job Title</td>
                              <td>abc job</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Law Firm Name</td>
                              <td>abc firm</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Phone</td>
                              <td>45</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Website</td>
                              <td>
                                <a href="google.com " target="_blank"
                                  >google.com</a
                                >
                              </td>
                            </tr>
                            <tr>
                              <td class="fw-bold">About</td>
                              <td>i am a lawer</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Expertise</td>
                              <td>Commercial, Consumer, Criminal</td>
                            </tr>
                            <tr>
                              <td class="fw-bold">Location</td>
                              <td>New South Wales, Victoria</td>
                            </tr>
                          </tbody>
                        </table>
                      </details>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminHeader from "./Header.vue";

export default {
  components: {
    AdminHeader,
  },

  methods: {},
  name: "AdminLawyer",
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
  width: 230px;
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

.text-left {
  text-align: left;
}

.button-width {
  width: 10%;
}
</style>
