<template lang="">
  <div class="l-main">
    <LawyerHeader />
    <div class="container">
      <h3 class="mt-3 text-center">Profile</h3>
      <!-- <h1 v-if="firebaseNoti">{{ firebaseNoti?.title }}</h1> -->
      <p>
        Please complete this information so Simplawfy and clients can get to
        know you.
      </p>

      <!-- Photo -->
      <!-- <div>
      <img :src="this.image" class="rounded" alt="Profile Image">
      </div> -->

      <div v-if="image" class="circular-container mb-3">
        <img :src="image" alt="User Image" class="circular-image " />
      </div>

      <!-- <ProfileImage /> -->

      <div class="d-flex">
        <div class="">
          <form
            @submit.prevent="uploadImage"
          >
            <!-- <label for="photo">Photo:</label> -->
            <input
              type="file"
              id="photo"
              name="profile_picture"
              class="form-control"
              accept="image/*"
              ref="fileInput"
              required
            />
            <input
              type="submit"
              class="btn btn-dark mt-2"
              name="photo-submit"
              value="Upload"
            />
          </form>
          
        </div>
      </div>


      <div
        class="modal fade edit-email-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="emailModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Email</h5>
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
              <!-- <form action="profile.php" method="post"></form> -->
              <div class="form-group">
                <input
                  type="text"
                  name="email"
                  maxlength="50"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  placeholder="Enter new email for verification"
                />
                <button
                  type="button"
                  name="job-email-submit"
                  class="btn btn-dark my-3"
                  @click="sendUpdateEmail('emailModal')"
                >
                  Send Verification Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade edit-first-name-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="firstName"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                First Name
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
              <!-- <form action="profile.php" method="post"></form> -->
              <div class="form-group">
                <input
                  type="text"
                  name="first-name"
                  maxlength="50"
                  class="form-control"
                  id="firstname"
                  v-model="form.first_name_verify"
                />
                <button
                  type="button"
                  name="job-title-submit"
                  class="btn btn-dark my-3"
                  @click="
                    updateProfile(
                      'first_name_verify',
                      '#firstName',
                      'First Name'
                    )
                  "
                >
                  {{
                    loginUser?.admin_approval == "approve"
                      ? "Submit for Verification"
                      : "Save changes"
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade edit-last-name-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="lastName"
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
              <!-- <form action="profile.php" method="post"></form> -->
              <div class="form-group">
                <input
                  type="text"
                  name="last-name"
                  maxlength="50"
                  class="form-control"
                  id="lastname"
                  v-model="form.last_name_verify"
                />
                <button
                  type="button"
                  name="job-title-submit"
                  class="btn btn-dark my-3"
                  @click="
                    updateProfile('last_name_verify', '#lastName', 'Last Name')
                  "
                >
                  {{
                    loginUser?.admin_approval == "approve"
                      ? "Submit for Verification"
                      : "Save changes"
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade edit-job-title-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="Jobtitle"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Job Title</h5>
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
              <!-- <form action="profile.php" method="post"></form> -->
              <div class="form-group">
                <input
                  type="text"
                  name="job-title"
                  maxlength="50"
                  class="form-control"
                  id="phone"
                  v-model="form.job_title"
                />
                <button
                  type="button"
                  name="job-title-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('job_title', '#Jobtitle', 'Job title')"
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
        id="FirmName"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Law Firm Name</h5>
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
              <div class="form-group">
                <input
                  type="text"
                  name="lawfirm"
                  class="form-control"
                  id="lawfirm"
                  maxlength="50"
                  v-model="form.law_firm"
                />
                <button
                  type="button"
                  name="lawfirm-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('law_firm', '#FirmName', 'Law firm')"
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
        id="WebsiteModal"
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
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <input
                  type="text"
                  name="website"
                  class="form-control"
                  id="website"
                  maxlength="50"
                  v-model="form.link"
                />
                <button
                  type="button"
                  name="website-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('link', '#WebsiteModal', 'Website')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade address-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="addressModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Street Address</h5>
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
              <div class="form-group">
                <input
                  type="text"
                  maxlength="200"
                  name="address"
                  class="form-control"
                  id="address"
                  v-model="form.address"
                />
                <button
                  type="button"
                  name="address-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('address', '#addressModal', 'Address')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade suburb-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="suburbModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Suburb</h5>
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
              <div class="form-group">
                <input
                  type="text"
                  maxlength="200"
                  name="suburb"
                  class="form-control"
                  id="suburb"
                  v-model="form.suburb"
                />
                <button
                  type="button"
                  name="suburb-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('suburb', '#suburbModal', 'Suburb')"
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
        id="PhoneModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Phone Number
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
              <div class="form-group">
                <input
                  type="tel"
                  name="phone"
                  maxlength="15"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                />
                <button
                  type="button"
                  name="phone-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('phone', '#PhoneModal', 'Phone number')"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade edit-consultation-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
        id="ConsultationModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Free/Discounted Consultation {{ constitutionalRadioValue }}
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
  
              <div class="form-group m-2" id="freeFirstConsultationRadio">
                <!-- <label>Consultation type:</label> -->
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="constitutionalRadioValue"
                    type="radio"
                    name="consultationRadio"
                    id="freeFirstConsultationNo1"
                    value="no"
                    :checked="form.consultation_type2 == 'no'"
                  />
                  <label
                    class="form-check-label"
                    for="freeFirstConsultationNo1"
                    @click="changeConsultationType2('no')"
                  >
                    No
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="constitutionalRadioValue"
                    type="radio"
                    name="consultationRadio"
                    id="freeFirstConsultationYes"
                    value="free"
                    :checked="form.consultation_type2 == 'free'"
                  />
                  <label
                    class="form-check-label"
                    for="freeFirstConsultationYes"
                    @click="changeConsultationType2('free')"
                  >
                    Free
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="constitutionalRadioValue"
                    name="consultationRadio"
                    id="freeFirstConsultationNo"
                    value="discounted"
                    :checked="form.consultation_type2 == 'discounted'"
                  />
                  <label
                    class="form-check-label"
                    for="freeFirstConsultationNo"
                    @click="changeConsultationType2('discounted')"
                  >
                    Discounted
                  </label>
                </div>
              </div>

              <!-- v-if="form.consultation_type === 'discounted'" -->
              <div v-if="constitutionalRadioValue == 'discounted'">
                <div class="form-group my-3" id="div-freeFirstConsultationFee">
                  <label for="freeFirstConsultationFee"
                    >Fee (including GST):<sup><code>*</code></sup></label
                  >
                  <div class="mb-2">
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      min="1"
                      class="form-control d-input"
                      v-model="form.consultation_amount2"
                      name="freeFirstConsultationFee"
                      id="freeFirstConsultationFee"
                    />
                  </div>
                </div>
              </div>

              <!-- v-if="form.consultation_type2 != 'no'" -->
              <div
                v-if="constitutionalRadioValue == 'free' || constitutionalRadioValue == 'discounted'"
                class=""
                id="div-freeFirstConsultationMinutes"
              >
                <div class="form-group">
                  <label for=""
                    >Time limit:<sup><code>*</code></sup></label
                  >
                  <div class="mb-2 position-relative">
                    <input
                      type="number"
                      v-model="form.consultation_time2"
                      class="form-control d-input-min"
                      name="freeFirstConsultationMinutes"
                      id="freeFirstConsultationMinutes"
                      placeholder="E.g. 60"
                    />
                    <span class="position-absolute d-span min-span"
                      >minutes</span
                    >
                  </div>
                </div>
              </div>

              <button
                type="button"
                name="phone-submit"
                class="btn btn-dark my-3"
                @click="
                  updateProfile(
                    [
                      'consultation_type2',
                      'consultation_amount2',
                      'consultation_time2',
                    ],
                    '#ConsultationModal',
                    'Consultation details'
                  )
                "
              >
                Save changes
              </button>
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
        id="AboutModal"
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
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <form action="profile.php" method="post"></form>
              <div class="form-group">
                <label class="w-100">
                  <textarea
                    v-model="form.about"
                    id="additionalInfo"
                    name="additionalInfo"
                    class="form-control"
                    rows="4"
                    cols="100%"
                    required
                    maxlength="500"
                  ></textarea>
                </label>

                <!-- <input
                  type="text"
                  name="about"
                  class="form-control"
                  id="about"
                  v-model="form.about"
                /> -->
                <button
                  type="button"
                  name="about-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('about', '#AboutModal', 'About me')"
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
        id="AreaModal"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Select the areas of law you practice in
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

            <!-- :options="['Commercial (business)', 'Consumer', 'Criminal','Employment / workers compensation','Environmental','Family','Human rights / constitutional','Immigration','Insurance','Intellectual property','Liquor licensing','Litigation (civil court cases)','Notary public','Personal injury (compensation)','Property (real estate) / construction','Traffic','Wills and estates']"  -->

            <div class="modal-body w-100">
              <!-- <MultiSelectPrime 
              v-model="selectedOptionIds" 
              :options="options" filter 
              optionLabel="title" 
              placeholder="Select Cities"
              :maxSelectedLabels="3" /> -->

              <!-- <Selectic className="mselect"  placeholder="Nothing Selected" multiple 
              :options="options"
              v-model="selectedOptionIds"
              :option-label="opt => opt.text" 
              :option-id="opt => opt.id"
              /> -->

              <v-select
                v-model="selectedOptionIds"
                :options="options"
                :close-on-select="false"
                label="title"
                multiple
                class="multiselect"
              ></v-select>

              <button @click="saveSelectedFields" class="btn btn-dark my-3">
                {{
                  loginUser?.area_insert &&
                  loginUser?.admin_approval == "approve"
                    ? "Submit for Verification"
                    : "Save changes"
                }}
              </button>
              <!-- <form
                @submit="submitForm"
                id="form-bs-select-1"
                
              ></form>
              <input
                type="submit"
                name="field-submit"
                class="btn btn-secondary my-3"
                value="Save changes"
              /> -->
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
        id="StateModal"
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
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body w-100">
              <!-- <Selectic className="mselect  "  placeholder="Nothing Selected" multiple :options="['New South Wales','Victoria','Queensland','Western Australia','South Australia','Tasmania','Australian Capital Territory','Northern Territory']" v-model="selection"/> -->

              <v-select
                v-model="selectedOptionIds_locations"
                :options="options_locations"
                :close-on-select="false"
                label="title"
                multiple
              ></v-select>

              <button @click="saveSelectedLocations" class="btn btn-dark my-3">
                {{
                  loginUser?.state_insert &&
                  loginUser?.admin_approval == "approve"
                    ? "Submit for Verification"
                    : "Save changes"
                }}
              </button>

              <!-- <form
                action="profile.php"
                method="post"
                id="form-bs-select-2"
              ></form>
              <input
                type="submit"
                name="location-submit"
                class="btn btn-secondary my-3"
                value="Save changes"
              /> -->
            </div>
          </div>
        </div>
      </div>

      <!-- <MultiSelectPrime v-model="selectedOptionIds" :options="options" filter optionLabel="name" placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-20rem" /> -->
      <div class="table-responsive">
        <table class="table table-bordered mt-3 table-striped">
          <tbody>
           
            <!--  Email -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Email:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-target=".edit-email-modal"
                  title="Edit"
                  data-bs-toggle="modal"
                  data-bs-target="#emailModal"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <td colspan="3">{{ loginUser?.email }}</td>
            </tr>

            <!-- First Name -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                First Name:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-target=".edit-first-name-modal"
                  title="Edit"
                  data-bs-toggle="modal"
                  data-bs-target="#firstName"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <td colspan="3">{{ loginUser?.first_name }}</td>
            </tr>

            <!-- Last Name -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Last Name:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-target=".edit-last-name-modal"
                  title="Edit"
                  data-bs-toggle="modal"
                  data-bs-target="#lastName"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <td colspan="3">{{ loginUser?.last_name }}</td>
            </tr>

            <!-- Job Title -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Job Title:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-target=".edit-job-title-modal"
                  title="Edit"
                  data-bs-toggle="modal"
                  data-bs-target="#Jobtitle"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>

              <!-- Modal -->

              <!-- Modal ends here -->

              <td colspan="3">
                {{ loginUser?.job_title }}
              </td>
            </tr>

            <!-- LawFirm name -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Law Firm Name:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#FirmName"
                  data-target=".lawfirm-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <!-- Modal -->

              <!-- Modal ends here -->
              <td colspan="3">
                {{ loginUser?.law_firm }}
              </td>
            </tr>

            <!-- Link to Website -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Link to Website:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#WebsiteModal"
                  data-target=".website-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <!-- Modal -->

              <!-- Modal ends here -->
              <td colspan="3">
                {{ loginUser?.link }}
              </td>
            </tr>

            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Street Address:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#addressModal"
                  data-target=".address-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <!-- Modal -->

              <!-- Modal ends here -->
              <td colspan="3">
                {{ loginUser?.address }}
              </td>
            </tr>


            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Suburb:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#suburbModal"
                  data-target=".suburb-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <!-- Modal -->

              <!-- Modal ends here -->
              <td colspan="3">
                {{ loginUser?.suburb }}
              </td>
            </tr>


            <!-- Phone -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Phone:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#PhoneModal"
                  data-target=".edit-phone-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>

              <!-- Modal -->

              <!-- Modal ends here -->

              <td colspan="3">{{ loginUser?.phone }}</td>
            </tr>

            <!-- About Me -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                About Me:
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#AboutModal"
                  data-target=".bd-example-modal-lg"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>

              <!-- Modal -->

              <!-- Modal ends here -->

              <td colspan="3">
                <span class="descriptionText"> {{ limitedAbout }}</span>
              </td>
            </tr>

            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Free/Discounted Consultation:
                <!-- @click="changeConsultationType(form.consultation_type,true)" -->
                <button
                  @click="changeConsultationType()"
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#ConsultationModal"
                  data-target=".edit-consultation-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>

              <td colspan="3">
                <!-- <span v-if="loginUser?.consultation_type">
                <b>Type : </b>{{ capitalizeFirstLetter(loginUser?.consultation_type) }},
              </span>
              <span v-if="loginUser?.consultation_time">
                <b>Time : </b>{{ loginUser?.consultation_time }},
              </span>
              <span v-if="loginUser?.consultation_amount">  
                <b>Fee : </b>${{ loginUser?.consultation_amount }}
              </span> -->
                <span
                  v-if="
                    loginUser?.consultation_type &&
                    loginUser?.consultation_type == 'discounted'
                  "
                >
                  {{ capitalizeFirstLetter(loginUser?.consultation_type) }} -
                  ${{ formatNumber(loginUser?.consultation_amount) }}/{{
                    loginUser?.consultation_time
                  }}
                  mins
                </span>
                <span
                  v-if="
                    loginUser?.consultation_type &&
                    loginUser?.consultation_type == 'free'
                  "
                >
                  {{ capitalizeFirstLetter(loginUser?.consultation_type) }} -
                  {{ loginUser?.consultation_time }} mins
                </span>
                <span
                  v-if="
                    loginUser?.consultation_type &&
                    loginUser?.consultation_type == 'no'
                  "
                >
                  {{ capitalizeFirstLetter(loginUser?.consultation_type) }}
                </span>
              </td>
            </tr>

            <tr>
              <td colspan="3">
                <div class="w-100 align-items-center d-flex mob-set">

                
                <div class="d-flex align-items-center">
               <span> Offer Remote Consultations:</span>
               <div class="form-radio ">
                  <input                    
                    type="radio"
                    v-model="form.remote_consultation"
                    :value="true"
                    @change="updateProfile('remote_consultation')"
                    id="remote_consultation_yes"
                    name="remote_consultation_group"
                    class="mx-1"
                  />
                  <label for="remote_consultation_yes">Yes</label>

                  <input                    
                    type="radio"
                    class="mx-1"
                    v-model="form.remote_consultation"
                    :value="false"
                    @change="updateProfile('remote_consultation')"
                    id="remote_consultation_no"
                    name="remote_consultation_group"
                  />
                  <label for="remote_consultation_no">No</label>
                </div>
                </div>    
                <div class="d-flex mx-0 mx-md-2 align-items-center">
                <span>Mobile-Friendly:</span>
                <div class="form-radio ">
                  <input
              
                    type="radio"
                    v-model="form.mobile_friendly"
                    :value="true"
                    class="mx-1"
                    @change="updateProfile('mobile_friendly')"
                    id="mobile_friendly_yes"
                    name="mobile_friendly_group"
                  />
                  <label for="mobile_friendly_yes">Yes</label>

                  <input
                    
                    type="radio"
                    v-model="form.mobile_friendly"
                    :value="false"
                    class="mx-1"
                    @change="updateProfile('mobile_friendly')"
                    id="mobile_friendly_no"
                    name="mobile_friendly_group"
                  />
                  <label for="mobile_friendly_no">No</label>
                </div>
              </div>      
            </div>     
              </td>
             
             
            </tr>

           

            <!-- Areas of Practice -->
            <!-- v-if="!loginUser?.area_insert" -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                Areas of Practice:
                <button
                  type="button"
                  @click="setModal('fields')"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#AreaModal"
                  data-target="#field-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>

              <!-- Field Modal -->

              <!-- Field Modal ends here -->

              <td colspan="3">
                <!-- <MultiSelectPrime 
              v-model="selectedOptionIds" 
              :options="options" filter 
              optionLabel="title" 
              placeholder="Select Cities"
              :maxSelectedLabels="3" /> -->

                <!-- {{ selectedOptionIds }} -->

                <div v-if="selectedOptionIdsShow.length > 0">
                  <span
                    v-for="(item, index) in selectedOptionIdsShow"
                    :key="index"
                  >
                    {{ item.title
                    }}<span v-if="index < selectedOptionIdsShow.length - 1"
                      >,
                    </span>
                  </span>
                </div>

                <span class="badge bg-dark mx-1"></span>
              </td>
            </tr>

            <!-- State/Territory -->
            <!-- v-if="!loginUser?.state_insert" -->
            <tr>
              <td class="d-flex align-items-center justify-content-between width-set" colspan="3">
                State/territory:
                <button
                  @click="setModal('locations')"
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#StateModal"
                  data-target="#location-modal"
                  title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
              </td>

              <!-- Location Modal -->

              <!-- Location Modal ends here -->

              <td colspan="3">
                <div v-if="selectedOptionIdsShow_locations.length > 0">
                  <span
                    v-for="(item, index) in selectedOptionIdsShow_locations"
                    :key="index"
                  >
                    {{ item.title
                    }}<span
                      v-if="index < selectedOptionIdsShow_locations.length - 1"
                      >,
                    </span>
                  </span>
                </div>

                <span class="badge bg-dark mx-1"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center">
        Your entries are automatically saved, so you can logout when you're
        ready
      </p>
    </div>
    <div class="footer">
      <MainFooter />
    </div>
  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
// import ProfileImage from "../../components/ProfileImage.vue";

// import { messaging } from "@/config/firebaseConfig";
// import { onMessage } from "firebase/messaging";

// import Selectic from 'selectic';
import api from "@/config/api.js";
import $ from "jquery";
window.$ = window.jQuery = $;
export default {
  data() {
    return {
      // baseUrl : process.env.BACKEND_URL + 'storage/images/',
      image: null,

      constitutionalRadioValue : null,

      form: {
        first_name_verify: null,
        last_name_verify: null,
        email: null,
        law_firm: null,
        link: null,
        phone: null,
        about: null,
        address: null,
        job_title: null,
        consultation_type: "free",
        consultation_time: null,
        consultation_amount: null,

        consultation_type2: "free",
        consultation_time2: null,
        consultation_amount2: null,

        remote_consultation: false,
        mobile_friendly: false,
      },
      options: [],
      selectedOptionIds: [],
      selectedOptionIdsShow: [],

      options_locations: [],
      selectedOptionIds_locations: [],
      selectedOptionIdsShow_locations: [],
    };
  },
  components: {
    LawyerHeader,
    MainFooter,
    // ProfileImage,
    // Selectic
  },
  // watch: {
  //   // Watch for changes in the 'noti' property in the Vuex store
  //   '$store.state.noti': {
  //     handler(newValue) {
  //       if(newValue){
  //          // Handle the changes, for example, display a notification
  //         console.log('noti changed:', newValue);
  //         this.$swal(newValue?.notification?.title, newValue?.notification?.body, 'success');
  //       }
  //     },
  //     immediate: true, // Trigger the handler immediately when the component is created
  //   },
  // },


  watch: {
    'form.consultation_amount2': function (newVal) {
      if (newVal == 0) {
        this.form.consultation_amount2 = 1;
      }
      if (isNaN(newVal) || newVal < 1) {
        this.form.consultation_amount2 = null;
      }
    },
    'form.consultation_time2': function (newVal) {
      if (newVal == 0) {
        this.form.consultation_time2 = 1;
      }
      if (isNaN(newVal) || newVal < 1) {
        this.form.consultation_time2 = null;
      }
    },
  },
  computed: {
    // firebaseNoti(){
    //   return this.$store.state.noti;
    // },

    loginUser() {
      return this.$store.getters.loginUser;
    },

    limitedAbout() {
      if (this.loginUser && this.loginUser.about) {
        const words = this.loginUser.about.split(" ");
        const limit = 500; // Adjust this to the desired word limit
        if (words.length <= limit) {
          return this.loginUser.about;
        }
        return words.slice(0, limit).join(" ") + "...";
      }
      return "";
    },
  },
  created() {
    console.log(process.env.BACKEND_URL);
    this.updateFormProperties();
  },
  mounted() {
    // this.checkMessages();
    this.fetchOptions();
    this.fetchOptions_locations();
    if (this.loginUser?.image) {
      this.image = this.baseUrl + "storage/images/" + this.loginUser?.image;
    }
  },
  methods: {
    async sendUpdateEmail(modalId = null) {
      try {
        await api.post("/send-email-update-link", {
          old_email: this?.loginUser?.email,
          email: this?.form?.email,
        });
        this.$swal(
          "",
          "Please check your new email address for your verification link.",
          "success"
        );
        if (modalId) {
          this.closeModal(modalId);
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Handle validation error (status 422)
          this.$swal(
            "Error",
            "Validation error: " + error.response.data.message,
            "error"
          );
        } else {
          console.error("Error fetching options:", error);
        }
      }
    },

    // checkMessages() {
    //   console.log('Message received. -1');
    //   onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload);
    //     // ...
    //   })
    // },
    changeConsultationType() {
      // console.log(clickEditButton);

      // if(clickEditButton){
      //   console.log('start');
      //   console.log(value);
      //   console.log(this.form.consultation_time);
      //   console.log(this.form.consultation_amount);

      //   console.log(this.form.consultation_type2);
      //   console.log(this.form.consultation_time2);
      //   console.log(this.form.consultation_amount2);
      //   console.log('end');
      // }

      this.constitutionalRadioValue = this.loginUser.consultation_type;
      this.form.consultation_type = this.loginUser.consultation_type;
      this.form.consultation_time = this.loginUser.consultation_time;
      this.form.consultation_amount = this.loginUser.consultation_amount;

      this.form.consultation_type2 = this.loginUser.consultation_type;
      this.form.consultation_time2 = this.loginUser.consultation_time;
      this.form.consultation_amount2 = this.loginUser.consultation_amount;


      // if (value == "no") {
      //   this.form.consultation_time = null;
      //   this.form.consultation_amount = null;
      // }
      // this.form.consultation_type = value;

      // this.form.consultation_type2 = this.form.consultation_type;
      // // this.form.consultation_type2 = value;
      // this.form.consultation_time2 = this.form.consultation_time;
      // this.form.consultation_amount2 = this.form.consultation_amount;
    },


    changeConsultationType2(value) {
      this.constitutionalRadioValue = value;
      if (value == "no") {
        this.form.consultation_time = null;
        this.form.consultation_amount = null;
      }
      this.form.consultation_type = value;

      this.form.consultation_type2 = this.form.consultation_type;
      // this.form.consultation_type2 = value;
      this.form.consultation_time2 = this.form.consultation_time;
      this.form.consultation_amount2 = this.form.consultation_amount;
    },

    updateFormProperties() {
      const userData = this.loginUser;
      if (userData) {
        this.form.first_name_verify = userData.first_name;
        this.form.last_name_verify = userData.last_name;
        this.form.law_firm = userData.law_firm;
        this.form.link = userData.link;
        // this.form.email = userData.email;
        this.form.phone = userData.phone;
        this.form.address = userData.address;
        this.form.suburb = userData.suburb;
        this.form.about = userData.about;
        this.form.job_title = userData.job_title;

        this.form.remote_consultation = userData.remote_consultation;
        this.form.consultation_type = userData.consultation_type;

        this.form.consultation_amount = userData.consultation_amount;
        this.form.consultation_time = userData.consultation_time;
        this.form.mobile_friendly = userData.mobile_friendly;

        this.form.consultation_type2 = userData.consultation_type;
        this.form.consultation_amount2 = userData.consultation_amount;
        this.form.consultation_time2 = userData.consultation_time;
      }
    },

    setModal($type) {
      if ($type == "fields") {
        this.selectedOptionIds = this.selectedOptionIdsShow;
      } else if ($type == "locations") {
        this.selectedOptionIds_locations = this.selectedOptionIdsShow_locations;
      }
    },
    // fields
    async fetchOptions() {
      try {
        const response = await api.get("/get-active-fields");
        console.log("sundak  :::: ", response?.data?.allFields);
        this.options = response?.data?.allFields;
        this.selectedOptionIds = response?.data?.myFields ?? [];
        this.selectedOptionIdsShow = response?.data?.myFields ?? [];
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    // locations
    async fetchOptions_locations() {
      try {
        const response = await api.get("/get-active-locations");
        console.log("sundak  :::: ", response?.data);
        this.options_locations = response?.data?.allLocations;
        this.selectedOptionIds_locations = response?.data?.myLocations ?? [];
        this.selectedOptionIdsShow_locations =
          response?.data?.myLocations ?? [];
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    // fields
    saveSelectedFields() {
      console.log("Selected Option IDs:", this.selectedOptionIds);
      if (this.selectedOptionIds.length == 0) {
        return false;
      }
      try {
        api
          .post("/lawyer/update-fields", { ids: this.selectedOptionIds })
          .then(() => {
            let msg = "";
            if (
              this.loginUser?.area_insert &&
              this.loginUser?.admin_approval == "approve"
            ) {
              msg =
                "Thanks for submitting your details. They'll be updated pending verification.";
            } else {
              msg = "Areas of practice updated successfully";
            }
            this.$swal("", msg, "success");
            this.fetchOptions();
            this.fetchUserData();
            this.closeModal("#AreaModal");
          })
          .catch((error) =>
            this.$swal("", error?.response?.data?.error, "error")
          );
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error");
        // console.error('Error uploading image', error);
      }
    },

    // locations
    saveSelectedLocations() {
      console.log("Selected Option IDs:", this.selectedOptionIds_locations);
      if (this.selectedOptionIds_locations.length == 0) {
        return false;
      }
      try {
        api
          .post("/lawyer/update-locations", {
            ids: this.selectedOptionIds_locations,
          })
          .then(() => {
            // this.$swal("", "Locations updated successfully", "success");
            let msg = "";
            if (
              this.loginUser?.state_insert &&
              this.loginUser?.admin_approval == "approve"
            ) {
              msg = "Thanks for submitting your details. They'll be updated pending verification.";
            } else {
              msg = "Locations updated successfully";
            }
            this.$swal("", msg, "success");
            this.fetchOptions_locations();
            this.fetchUserData();
            this.closeModal("#StateModal");
          })
          .catch((error) =>
            this.$swal("", error?.response?.data?.error, "error")
          );
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error");
        // console.error('Error uploading image', error);
      }
    },


    // async updateProfile(keyName, modalId = null) {
    //   let formDataArray = [];

    //   if (Array.isArray(keyName)) {
    //     keyName.forEach(element => {
    //       if (this.form[element] != null && this.form[element] !== "") {
    //         formDataArray.push({
    //           [element]: this.form[element]
    //         });
    //       }
    //     });
    //   } else {
    //     if (this.form[keyName] == null || this.form[keyName] === "") {
    //       return false;
    //     }
    //     formDataArray.push({
    //       [keyName]: this.form[keyName]
    //     });
    //   }

    //   console.log('formDataArray:', formDataArray);

    //   try {
    //     // Assuming your API expects an array of objects
    //     api.post('/update-profile', formDataArray).then(res => {
    //       if(modalId){
    //         this.closeModal(modalId);
    //       }
    //       this.$swal("success", "Profile updated successfully", "success").then(() => {
    //         this.setUserInStateAndLocalStorage(res);
    //       });
    //     });
    //   } catch (error) {
    //     this.$swal("Error", "Something went wrong, please try again", "error");
    //     // console.error('Error uploading image', error);
    //   }
    // },

    // async updateProfile(keyName, modalId) {
    //   if (this.form[keyName] == null || this.form[keyName] == "") {
    //     return false;
    //   }
    //   const formData = {
    //     [keyName]: this.form[keyName]
    //   }
    //   console.log('jjkk :::: ', formData);
    //   try {
    //     api.post('/update-profile', formData).then(res => {
    //       this.closeModal(modalId);
    //       this.$swal("success", "Profile updated successfully", "success").then(() => {
    //         this.setUserInStateAndLocalStorage(res);
    //       });
    //     })
    //   } catch (error) {
    //     this.$swal("Error", "Something went wrong, please try again", "error")
    //     // console.error('Error uploading image', error);
    //   }
    // },

    closeModal(modalId) {
      $(modalId).modal("hide");
    },
  },
  name: "ProfileTab",
};
</script>


<style scoped>
table {
  table-layout: fixed;
  word-break: break-all;
  border-collapse: collapse;
  width: 100%;
}

.form-radio {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
}

.descriptionText {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100px;
  line-break: anywhere;
  overflow-y: auto;
  padding-right: 10px;
  margin-right: 5px;
  display: inline-block;
}

.descriptionText::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(217, 217, 217, 1);
  border-radius: 10px;
}

.descriptionText::-webkit-scrollbar-thumb {
  background-color: rgba(217, 217, 217, 1);
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}

tbody tr:nth-child(odd) {
  background: #f2f2f2;
}

tbody tr {
  border: 1px solid #dee2e6;
}

tbody tr td {
  border-width: 0;
}

tbody tr td:last-child {
  border-left: 1px solid #dee2e6;
}
tbody tr td:first-child{
  word-break: auto-phrase;
}

.form-check-input {
  border: 1px solid gray !important;
}

.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.logo-small {
  width: 185px;
    height: 40px;
    object-fit: contain;
}

.law-img {
  width: 15vw;
  height: 15vw;
  border: 1px solid white;
  border-radius: 50%;
}

.navActive {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  color: white;
}

.navbar-nav .left-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.bg-grey {
  background: rgb(0, 0, 0);
  color: white;
}

.bg-grey:hover {
  background: rgb(0, 0, 0);
  color: white;
}

.curtain-handler .fa-caret-down {
  display: none;
}

.mselect .selectic-input .selectic-item_text {
  font-style: normal;
}

.selectic .has-feedback .form-control {
  height: 60px !important;
}

.selectic .curtain-handler .fa-caret-down {
  display: none !important;
}

.l-main {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.d-span {
  line-height: 39px !important;
  padding: 0px 13px;
}



.d-input {
  padding-left: 25px;
  line-height: 26px !important;
}

.d-input-min {
  padding-left: 10px;
}

.min-span {
  top: 0;
  right: 0;
}
table div span {
    word-break: auto-phrase;
}
@media only screen and (max-width: 767px) {
  tbody tr td:first-child{
  white-space: normal;
/* word-break: break-word; */
  /* text-wrap: ; */
}
  table tr td:nth-child(2){
    width: 50%
}
  table {
    table-layout: inherit;
    word-break: break-word;
    border-collapse: collapse;
    width: 100%;
  }

  .mob-set {
    flex-wrap: wrap;
  }
}
@media only screen and (max-width: 360px) {
  table{
    font-size: 15px;
  }
  table button.btn{
    padding: 3px 5px;
    font-size: 12px;
  }
}
</style>
