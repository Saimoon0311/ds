<template lang="">
  <div class="hello">
    <LawyerHeader />
    <div class="container">
      <h3 class="mt-3">Profile</h3>
      <p>
        Please complete this information so Simplawfy and clients can get to
        know you.
      </p>

      <!-- Photo -->
      <div class="d-flex">
        <div>
          <form
            action="profile.php"
            method="POST"
            enctype="multipart/form-data"
          >
            <label for="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              name="profile_picture"
              class="form-control"
              required=""
              accept="image/*"
            />
            <input
              type="submit"
              class="btn btn-secondary mt-2"
              name="photo-submit"
              value="Upload"
            />
          </form>
        </div>
      </div>

      <div
        class="modal fade edit-job-title-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Job Title</h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form action="profile.php" method="post"></form>
              <div class="form-group">
                <input
                  type="text"
                  name="job-title"
                  maxlength="200"
                  class="form-control"
                  id="phone"
                  value=""
                />
                <button
                  type="submit"
                  name="job-title-submit"
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
        class="modal fade lawfirm-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Law Firm Name</h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form action="profile.php" method="post"></form>
              <div class="form-group">
                <input
                  type="text"
                  name="lawfirm"
                  class="form-control"
                  id="lawfirm"
                  value=""
                />
                <button
                  type="submit"
                  name="lawfirm-submit"
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
        class="modal fade website-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Link to Website
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form action="profile.php" method="post"></form>
              <div class="form-group">
                <input
                  type="text"
                  name="website"
                  class="form-control"
                  id="website"
                  value=""
                />
                <button
                  type="submit"
                  name="website-submit"
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
        class="modal fade edit-phone-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit phone number
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form action="profile.php" method="post"></form>
              <div class="form-group">
                <input
                  type="tel"
                  name="phone"
                  maxlength="10"
                  class="form-control"
                  id="phone"
                  value="0310000000"
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
      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Tell us a little about yourself
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form action="profile.php" method="post"></form>
              <div class="form-group">
                <input
                  type="text"
                  name="about"
                  class="form-control"
                  id="about"
                  value=""
                />
                <button
                  type="submit"
                  name="about-submit"
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
        class="modal fade bd-example-modal-lg"
        id="field-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Areas of practice
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body w-100">
              <form
                action="profile.php"
                method="post"
                id="form-bs-select-1"
              ></form>
              <div class="dropdown bootstrap-select show-tick w-100">
                <select
                  class="selectpicker w-100"
                  multiple=""
                  name="expertise[]"
                  form="form-bs-select-1"
                >
                  <option value="Commercial">Commercial (business)</option>
                  <option value="Consumer">Consumer</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Employment / workers compensation">
                    Employment / workers compensation
                  </option>
                  <option value="Environmental">Environmental</option>
                  <option value="Family">Family</option>
                  <option value="Human rights / constitutional">
                    Human rights / constitutional
                  </option>
                  <option value="Immigration">Immigration</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Intellectual property">
                    Intellectual property
                  </option>
                  <option value="Liquor licensing">Liquor licensing</option>
                  <option value="Litigation">
                    Litigation (civil court cases)
                  </option>
                  <option value="Notary public">Notary public</option>
                  <option value="Personal injury">
                    Personal injury (compensation)
                  </option>
                  <option value="Property / construction">
                    Property (real estate) / construction
                  </option>
                  <option value="Tax">Tax</option>
                  <option value="Traffic">Traffic</option>
                  <option value="Wills and estates">
                    Wills &amp; estates
                  </option></select
                ><button
                  type="button"
                  tabindex="-1"
                  class="btn dropdown-toggle bs-placeholder btn-light"
                  data-bs-toggle="dropdown"
                  role="combobox"
                  aria-owns="bs-select-1"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  title="Nothing selected"
                >
                  <div class="filter-option">
                    <div class="filter-option-inner">
                      <div class="filter-option-inner-inner">
                        Nothing selected
                      </div>
                    </div>
                  </div>
                </button>
                <div class="dropdown-menu">
                  <div
                    class="inner show"
                    role="listbox"
                    id="bs-select-1"
                    tabindex="-1"
                    aria-multiselectable="true"
                  >
                    <ul
                      class="dropdown-menu inner show"
                      role="presentation"
                    ></ul>
                  </div>
                </div>
              </div>
              <input
                type="submit"
                name="field-submit"
                class="btn btn-secondary my-3"
                value="Save changes"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade bd-example-modal-lg"
        id="location-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Select the states/territories you practice in
              </h5>
              <button
                type="button"
                class="close btn btn-dark"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body w-100">
              <form
                action="profile.php"
                method="post"
                id="form-bs-select-2"
              ></form>
              <div class="dropdown bootstrap-select show-tick w-100">
                <select
                  class="selectpicker w-100"
                  multiple=""
                  name="location[]"
                  form="form-bs-select-2"
                >
                  <option value="New South Wales">New South Wales</option>
                  <option value="Victoria">Victoria</option>
                  <option value="Queensland">Queensland</option>
                  <option value="Western Australia">Western Australia</option>
                  <option value="South Australia">South Australia</option>
                  <option value="Tasmania">Tasmania</option>
                  <option value="Australian Capital Territory">
                    Australian Capital Territory
                  </option>
                  <option value="Northern Territory">
                    Northern Territory
                  </option></select
                ><button
                  type="button"
                  tabindex="-1"
                  class="btn dropdown-toggle bs-placeholder btn-light"
                  data-bs-toggle="dropdown"
                  role="combobox"
                  aria-owns="bs-select-2"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  title="Nothing selected"
                >
                  <div class="filter-option">
                    <div class="filter-option-inner">
                      <div class="filter-option-inner-inner">
                        Nothing selected
                      </div>
                    </div>
                  </div>
                </button>
                <div class="dropdown-menu">
                  <div
                    class="inner show"
                    role="listbox"
                    id="bs-select-2"
                    tabindex="-1"
                    aria-multiselectable="true"
                  >
                    <ul
                      class="dropdown-menu inner show"
                      role="presentation"
                    ></ul>
                  </div>
                </div>
              </div>
              <input
                type="submit"
                name="location-submit"
                class="btn btn-secondary my-3"
                value="Save changes"
              />
            </div>
          </div>
        </div>
      </div>
      <table class="table table-bordered mt-3 table-striped">
        <tbody>
          <!--  Email -->
          <tr>
            <td class="col-md-3">Email:</td>
            <td>asd1@mailinator.com</td>
          </tr>

          <!-- First Name -->
          <tr>
            <td class="col-md-3">First Name:</td>
            <td>John</td>
          </tr>

          <!-- Last Name -->
          <tr>
            <td class="col-md-3">Last Name:</td>
            <td>Doe</td>
          </tr>

          <!-- Job Title -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Job Title:
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target=".edit-job-title-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td></td>
          </tr>

          <!-- LawFirm name -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Law Firm Name:
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target=".lawfirm-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>
            <!-- Modal -->

            <!-- Modal ends here -->
            <td></td>
          </tr>

          <!-- Link to Website -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Link to Website:
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target=".website-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>
            <!-- Modal -->

            <!-- Modal ends here -->
            <td></td>
          </tr>

          <!-- Phone -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Phone:
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target=".edit-phone-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td>0310000000</td>
          </tr>

          <!-- About Me -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              About Me:
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Modal -->

            <!-- Modal ends here -->

            <td></td>
          </tr>

          <!-- Areas of Practice -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              Areas of Practice:
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target="#field-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Field Modal -->

            <!-- Field Modal ends here -->

            <td>
              <span class="badge bg-dark mx-1"></span>
            </td>
          </tr>

          <!-- State/Territory -->
          <tr>
            <td class="d-flex align-items-center justify-content-between">
              State/territory:
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target="#location-modal"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
            </td>

            <!-- Location Modal -->

            <!-- Location Modal ends here -->

            <td>
              <span class="badge bg-dark mx-1"></span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-center">
        Your entries are automatically saved, so you can logout when you're
        ready
      </p>
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
    name: "ProfileTab",
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
