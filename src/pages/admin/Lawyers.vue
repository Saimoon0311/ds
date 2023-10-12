<template lang="">
  <div class="hello">
    <AdminHeader />
    <div class="main">
      <div class="container">

      <ul class="nav nav-pills mb-3 bg-light border p-2 py-3 rounded" id="pills-tab" role="tablist">
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
            Approval
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
          <p>No lawyer approval is pending at this moment</p>
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
                    pyvugefuha@mailinator.com (Yardley Palmer Ria Fischer)
                    <details class="lawyerSummary" open="">
                      <summary data-open="Less" data-close="More">more</summary>
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td class="fw-bold">Profile</td>
                            <td>
                              <img
                                src="https://makinglawsimple.com.au/lawyer/uploads/21_hyp3.jpg"
                                alt="profile picture"
                                width="100"
                                height="100"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td class="fw-bold">Email</td>
                            <td>pyvugefuha@mailinator.com</td>
                          </tr>
                          <tr>
                            <td class="fw-bold">Name</td>
                            <td>Yardley Palmer Ria Fischer</td>
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
    width: 225px;
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: white;
    background-color: #808080;
}
.nav-pills .nav-link, .nav-link:focus, .nav-link:hover{
    color: #6d6f73 ;
}
</style>
