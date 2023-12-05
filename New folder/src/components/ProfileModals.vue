<template>
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
              <h5 class="modal-title" id="exampleModalLabel">Edit Job Title</h5>
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
                  maxlength="200"
                  class="form-control"
                  id="phone"
                  v-model="form.job_title"
                />
                <button
                  type="button"
                  name="job-title-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('job_title','#Jobtitle')"
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
        id="FirmName">
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
                  v-model="form.law_firm"
                />
                <button
                  type="button"
                  name="lawfirm-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('law_firm','#FirmName')"
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
                  v-model="form.link"
                />
                <button
                  type="button"
                  name="website-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('link','#WebsiteModal')"
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
                Edit phone number
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
                  maxlength="10"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                />
                <button
                  type="button"
                  name="phone-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('phone','#PhoneModal')"
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
                Edit Consultation Details
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
              <!-- <div class="form-group">
                <input
                  type="tel"
                  name="phone"
                  maxlength="10"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                />
                <button
                  type="button"
                  name="phone-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('phone','#PhoneModal')"
                >
                  Save changes
                </button>
              </div> -->


          <div class="form-group m-2" id="freeFirstConsultationRadio">
            <label>Consultation type:</label>
            <div class="form-check">
              <input class="form-check-input" v-model="form.consultation_type" type="radio" name="freeFirstConsultation"
                id="freeFirstConsultationYes" value="free" checked="" />
              <label class="form-check-label" for="freeFirstConsultationYes" @click="changeConsultationType('free')">
                Free
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" v-model="form.consultation_type" name="freeFirstConsultation"
                id="freeFirstConsultationNo" value="discounted" />
              <label class="form-check-label" for="freeFirstConsultationNo" @click="changeConsultationType('discounted')">
                Discounted
              </label>
            </div>
          </div>

          <div v-if="form.consultation_type === 'discounted'">
            <div class="form-group my-3" id="div-freeFirstConsultationFee">
              <label for="freeFirstConsultationFee">Fee:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">$</div>
                </div>
                <input type="number" min="1" class="form-control" v-model="form.consultation_amount" name="freeFirstConsultationFee"
                  id="freeFirstConsultationFee" />
              </div>
            </div>
          </div>

          <div class="col-auto" id="div-freeFirstConsultationMinutes">
              <label for="">Time limit:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <input type="number" v-model="form.consultation_time" class="form-control"
                  name="freeFirstConsultationMinutes" id="freeFirstConsultationMinutes" placeholder="E.g. 60" />
                <div class="input-group-prepend">
                  <div class="input-group-text">minutes</div>
                </div>
              </div>
          </div>

          <button
                  type="button"
                  name="phone-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile(['consultation_type','consultation_amount','consultation_time'],'#ConsultationModal')"
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
                <input
                  type="text"
                  name="about"
                  class="form-control"
                  id="about"
                  v-model="form.about"
                />
                <button
                  type="button"
                  name="about-submit"
                  class="btn btn-dark my-3"
                  @click="updateProfile('about','#AboutModal')"
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
                Areas of practice
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

              <v-select v-model="selectedOptionIds" :options="options" label="title" multiple></v-select>

              <button @click="saveSelectedFields" class="btn btn-dark my-3">Save changes</button>
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

              <v-select v-model="selectedOptionIds_locations" :options="options_locations" label="title" multiple></v-select>

              <button @click="saveSelectedLocations" class="btn btn-dark my-3">Save changes</button>

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
</template>

<script>
export default {
    data() {
    //   return {

    //   }
    }
}
</script>