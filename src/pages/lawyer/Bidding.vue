<template lang="">
  <div class="hello">
    <LawyerHeader />
    <div class="my-3 w-100 text-center">
      <h6 class="fs-3">Bid for job</h6>

      <!-- Job details preview -->
      <div>
        <div
          class="d-flex justify-content-between border rounded bg-secondary text-white p-3 text-start col-md-5 m-auto"
          id="28"
        >
          <div>
            <p class="badge bg-dark" title="Area">Criminal</p>
            &nbsp;
            <p class="badge bg-dark" title="Location">Victoria</p>
            <p><b>City/suburb:</b> karachi</p>
            <p>afsdfsd f...</p>
            <div>
              <p><b>Posted by:</b> junucyme@mailinator.com</p>
              <p>
                <b> Deadline:</b>
                
                27-12-2023
              </p>
              <p><b> Preferred contact time:</b> Flexible</p>
            </div>
          </div>
        </div>
      </div>

      <form
        id="mainForm"
        class="text-start border rounded p-3 d-inline-block m-3 col-md-5"
        onsubmit="handleMainFormSubmit(event)"
        method="post"
        action="./backend/submitBid.php"
      >
        <!-- Invisible form fields for backend post -->
        <input
          type="text"
          class="form-control d-none"
          id="receiver"
          name="receiver"
          value="<br />
<b>Notice</b>:  Undefined variable: customer in <b>C:\xampp\htdocs\simplawfy\lawyer\bid.php</b> on line <b>63</b><br />
"
        />
        <input type="text" class="d-none" name="jobId" value="28" />

        <!-- How will you charge? Dropdown -->
        <div class="form-group">
          <label
            >How will you charge?<sup><code>*</code></sup></label
          >
          <div class="dropdown bootstrap-select w-100 border rounded dropup">
            <select
              class="selectpicker w-100 border rounded"
              name="chargeType"
              id="charge-category-select"
              v-model="selectedOption" @change="updateDivContent"
              required=""
              tabindex="null"
            >
              <option disabled="" selected="" hidden="" value="none">
                Select an option
              </option>
              <option value="Fixed">Fixed fee</option>
              <option value="Hourly">Hourly rate</option>
              <option value="Success">Success fee</option>
              <option value="Pro">Pro bono</option></select
            >
            <div
              class="dropdown-menu"
              style="max-height: 434.781px; overflow: hidden; min-height: 114px"
            >
             
            </div>
          </div>
        </div>

        <!-- If they select ‘Fixed fee’ -->
        <div class="form-group" id="fixed-fee" v-if="selectedOption === 'Fixed'">
          <label
            >Fixed fee amount (in AUD and excluding GST and disbursements):<sup
              ><code>*</code></sup
            ></label
          >
          <div>
            <span class="position-absolute" style="line-height: 36px"> $</span>
            <input
              type="number"
              id="fixedFeeAmount"
              name="fixedFeeAmount"
              class="form-control"
              min="1"
              step=".01"
            />
          </div>
          <br />
        </div>

        <!-- If they select ‘Hourly rate’ -->
        <div class="form-group " id="hourly-rate" v-if="selectedOption === 'Hourly'">
          <div class="form-group mb-3" id="addAdditionalFeeEarnersRadio">
            How many fee earners will be working on this matter?
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  name="noOfFeeEarners"
                  class="form-check-input"
                  id="radioNoOfFeeEarnersSingle"
                  checked=""
                  @click="showElement('Yes')"
                />
                Just me
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  name="noOfFeeEarners"
                  class="form-check-input"
                  id="radioNoOfFeeEarnersMultiple"
                  @click="showElement('No')"
                />
                I'm part of a team
              </label>
            </div>
          </div>

          <div class="" id="additionalFeeEarners" v-if="isVisible === 'No'">
            <fieldset
              class="border p-2 my-2 col-6 bg-light text-center"
              style="margin: auto"
            >
              <legend
                class="w-auto"
                style="float: none; padding: inherit; font-size: 1rem"
              >
                Add additional fee earner
              </legend>
              <label class="w-100 text-start">
                Title:<sup><code>*</code></sup>
                <input
                  id="feeEarnerTitle"
                  autocomplete="on"
                  placeholder="Eg: Associate"
                  class="form-control"
                />
              </label>
              <br />
              <br />
              <label class="w-100 text-start">
                Hourly rate (in AUD excluding GST):<sup><code>*</code></sup>
                <div>
                  <span class="position-absolute" style="line-height: 36px">
                    $</span
                  >
                  <input
                    id="feeEarnerHourlyRate"
                    min="1"
                    autocomplete="on"
                    type="number"
                    class="form-control"
                  />
                </div>
              </label>
              <br />
              <br />
              <label class="w-100 text-start">
                Estimated number of hours:<sup><code>*</code></sup>
                <input
                  id="feeEarnerEstimatedHours"
                  min="1"
                  autocomplete="on"
                  type="number"
                  class="form-control"
                />
              </label>
              <br />
              <br />
              <button class="btn btn-dark" onclick="addRow(event)">Add</button>
            </fieldset>

            <table
              class="table table-bordered mb-0"
              id="additionalFeeEarnersTable"
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Hourly rate (in AUD excluding GST)</th>
                  <th>Estimated number of hours</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="addFeeEarnersRow"></tbody>
            </table>

            <div class="border border-top-0 text-end w-100 p-2">
              <b
                class="mb-0 bg-secondary border p-1 rounded text-white"
                style="margin-right: 17vw"
                >Total: $<span id="finalHourlyRateMultiple">0</span></b
              >
            </div>
          </div>

          <!-- Invisible filed for posting additional fee earners info -->
          <input class="d-none" name="feeEarnersInfo" id="feeEarnersInfo" />

          <div id="hourlyRateIndividual">
            <label
              >Hourly rate (in AUD excluding GST):<sup
                ><code>*</code></sup
              ></label
            >
            <div>
              <span class="position-absolute" style="line-height: 36px">
                $</span
              >
              <input
                type="number"
                id="hourlyRate"
                name="hourlyRate"
                min="1"
                step="0.01"
                class="form-control"
                oninput="updateHourlyRateIndividual()"
              />
            </div>

            <br />

            <label
              >Estimated number of hours<sup><code>*</code></sup></label
            >
            <input
              type="number"
              id="noOfHours"
              name="noOfHours"
              min="1"
              step="0.01"
              class="form-control"
              oninput="updateHourlyRateIndividual()"
            />

            <br />
          </div>

          <!-- input field to capture final hourly rate value during form submit -->
          <p id="finalHourlyRateText">
            Total: $<input
              id="finalHourlyRateValue"
              name="finalHourlyRateValue"
              type="number"
              readonly=""
              class="border-0 text-dark bg-white"
            />
          </p>
        </div>

        <!-- If they select ‘Success Fee’ -->
        <div class="form-group " id="success-fee" v-if="selectedOption === 'Success'">
          <label
            >Uplift percentage (%):<sup><code>*</code></sup></label
          >
          <input
            type="number"
            id="upliftPercentage"
            name="upliftPercentage"
            min="1"
            max="25"
            step=".01"
            class="form-control"
          />

          <br />

          <label>Summarise terms upon which Success Fee will be charged:</label>
          <input
            type="text"
            id="successFeeTerms"
            name="successFeeTerms"
            class="form-control"
          />
          <br />
        </div>

        <!-- Upfront payment -->
        <div class="form-group my-2 " id="upfrontPayRadio" v-if="selectedOption === 'Pro'">
          <label
            >Do you require an upfront payment?<sup><code>*</code></sup></label
          >
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="upfrontPayment"
              id="upfrontYes"
             
              value="yes"
              checked=""
            />
            <label class="form-check-label" for="upfrontYes" @click="setOption('Yes')"> Yes </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="upfrontPayment"
              id="upfrontNo"
              
              value="no"
            />
            <label class="form-check-label" for="upfrontNo" @click="setOption('No')"> No </label>
          </div>

          <div class="my-3" id="upfrontPayAmount" v-if="option === 'Yes'">
            <label
              >How much upfront payment do you require?<sup
                ><code>*</code></sup
              ></label
            >
            <div>
              <span class="position-absolute" style="line-height: 36px">$</span>
              <input
                id="upfrontAmount"
                name="upfrontAmount"
                type="number"
                min="1"
                step=".01"
                class="form-control"
              />
            </div>
          </div>
        </div>

        <!-- Additional information -->
        <div class="form-group">
          <label
            >Tell the potential client what you will do for them:<sup
              ><code>*</code></sup
            >
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              class="form-control"
              rows="4"
              cols="100%"
              required=""
            ></textarea>
          </label>
          <br />
        </div>

        <!-- Deadline acceptance radio -->
        <div class="form-group m-2" id="div-deadline-acceptance-radio">
          <label>Can you meet the potential client's deadline?</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="deadlineFlexibility"
              id="deadlineYes"
              onclick="handleDeadlineAcceptanceChange()"
              value="yes"
              checked=""
            />
            <label class="form-check-label" for="deadlineYes"> Yes </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="deadlineFlexibility"
              id="deadlineNo"
              onchange="handleDeadlineAcceptanceChange()"
              value="no"
            />
            <label class="form-check-label" for="deadlineNo"> No </label>
          </div>
        </div>

        <!-- Can't meet deadline explanation box -->
        <div class="form-group d-none" id="div-deadline">
          <label
            >Please explain why you can't meet potential client's deadline:<sup
              ><code>*</code></sup
            >
            <textarea
              id="txtarea-deadline"
              name="deadline"
              class="form-control"
              rows="4"
              cols="100%"
              placeholder="Eg: It's not realistic"
            ></textarea>
          </label>
        </div>

        <!-- Do you offer a free or discounted first consultation? -->
        <div class="form-group m-2" id="freeFirstConsultationRadio">
          <label>Do you offer a free or discounted first consultation?</label>
          <div class="form-check" >
            <input
              class="form-check-input"
              type="radio"
              name="freeFirstConsultation"
              id="freeFirstConsultationYes"
              value="yes"
            
            />
            <label class="form-check-label" for="freeFirstConsultationYes" @click="setOption('Yes')">
              Yes
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="freeFirstConsultation"
              id="freeFirstConsultationNo"
              value="no"
              
            />
            <label class="form-check-label" for="freeFirstConsultationNo" @click="setOption('No')">
              No
            </label>
          </div>
        </div>

        <!-- Do you offer a free or discounted first consultation input fields -->
        <div v-if="option === 'Yes'">
          <div class="form-group  my-3" id="div-freeFirstConsultationFee" >
          <label for="freeFirstConsultationFee"
            >Fee:<sup><code>*</code></sup></label
          >
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">$</div>
            </div>
            <input
              type="number"
              min="1"
              class="form-control"
              name="freeFirstConsultationFee"
              id="freeFirstConsultationFee"
            />
          </div>
        </div>

        <div class="col-auto " id="div-freeFirstConsultationMinutes" >
          <label for=""
            >Time limit:<sup><code>*</code></sup></label
          >
          <div class="input-group mb-2">
            <input
              type="number"
              class="form-control"
              name="freeFirstConsultationMinutes"
              id="freeFirstConsultationMinutes"
              placeholder="60"
            />
            <div class="input-group-prepend">
              <div class="input-group-text">minutes</div>
            </div>
          </div>
        </div>
        </div>
      

        <!-- Submit button -->
        <div class="text-center">
          <input class="btn btn-dark mt-2" type="submit" name="formSubmit" />
        </div>
      </form>
    </div>

  


  </div>
</template>
<script>
import LawyerHeader from "./Header.vue";
export default {
  components: {
    LawyerHeader,
  },
  data() {
    return {
      selectedOption: 'option1',
      option: "Yes",  
      isVisible: "Yes", 
   
      
      
    };
  },
  methods: {
    updateDivContent() {
      // No need to update divContent; we're using v-if to conditionally render divs.
    },
    setOption(value) {
      this.option = value;
    },
    showElement(value) {
      this.isVisible = value;
    },
   
   
  },
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
