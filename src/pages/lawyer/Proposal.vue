<template>
  <LawyerHeader />
  <div class="f-main">
    <div class="container">
      <h6 class="fs-3 text-center mt-4">Submit a proposal</h6>
      <div
        class="border rounded bg-secondary text-white p-3 text-start col-md-7 m-auto mt-3"
        id="28"
      >
        <div>
          <p class="badge bg-dark" title="Area">{{ jobData?.field?.title }}</p>
          &nbsp;
          <p class="badge bg-dark" title="Location">
            {{ jobData?.location?.title }}
          </p>
          <!-- <p><b>City/suburb:</b> {{ jobData?.identity }}</p>
          <p><b>City/suburb:</b> {{ jobData?.city }}</p>
          <p><b>City/suburb:</b> {{ jobData?.title }}</p>
          <p></p> -->

          <p class="text-center mt-3 mb-2">
            <b>{{ jobData?.title }}</b>
          </p>
          <p id="description28" class="cardProposalDes">
            {{ jobData?.description }}
          </p>
          <!-- <p><b>City/suburb:</b> </p> -->
          <!-- <p><b class="smallFont">Posted by:</b> <span class="smallFont">Jess ({{ jobData?.city }}) at 10.30pm on
              19/11/23.</span> </p>
          <p><b class="smallFont">Job No:</b> <span class="smallFont">{{ jobData?.identity }}</span></p> -->
          <button
            :disabled="!jobData?.requirement"
            type="button"
            class="btn btn-dark btn-sm custom-pad"
            :data-target="`.edit-job-title-modal${index}`"
            title="Edit"
            :data-bs-toggle="`modal${index}`"
            data-bs-target="#Accessibility"
            @click="openRequirementsModal(jobData?.requirement)"
          >
            Accessibility Requirements
          </button>
          <span class="spacer">
            <p class="smallFont">
              Posted by Username
              <span class="text-capitalize">({{ jobData?.city }})</span>
              at 10.30pm on 19/11/23.
            </p>
            <p span class="smallFont">Job No: {{ jobData?.identity }}</p>
          </span>
          <div>
            <!-- <p><b>Posted by:</b> test@mailinator.com</p>
            <p>
              <b> Deadline:</b>

              27-12-2023
            </p>
            <p><b> Preferred contact time:</b> Flexible</p> -->
          </div>
        </div>
      </div>
    </div>
    <div class="container f-pt mx-auto">
      <Form
        @submit.prevent="nextStep"
        :validation-schema="currentSchema"
        keep-values
        id="mainForm"
        class="text-start border rounded p-3 d-inline-block m-3 col-md-7 m-auto flex-wrap flex-column d-flex mt-3"
      >
        <template v-if="currentStep === 0">
          <div class="form-group mb-4">
            <label
              >How will you charge?<sup><code>*</code></sup></label
            >
            <div class="dropdown bootstrap-select w-100 border rounded dropup">
              <select
                class="form-select selectpicker w-100 border rounded p-1 charge-drop"
                name="chargeType"
                id="charge-category-select"
                v-model="selectedOption"
                @change="handleOptionChange"
                required=""
                tabindex="null"
              >
                <option disabled selected value="">Select an option</option>
                <option value="Fixed">Fixed fee</option>
                <option value="Hourly">Hourly rate</option>
                <option value="Daily">Daily rate</option>
                <option value="Item">Item by item for specific tasks</option>
                <option value="Retainer">Retainer</option>
                <option value="Success">Success fee</option>
                <option value="Pro">Pro bono</option>
              </select>
              <div
                class="dropdown-menu"
                style="
                  max-height: 434.781px;
                  overflow: hidden;
                  min-height: 114px;
                "
              ></div>
            </div>
          </div>
          <div>
            <!-- If they select ‘Daily Rate’ -->
            <div
              class="form-group"
              id="fixed-fee"
              v-if="selectedOption === 'Daily'"
            >
              <div>
                <label> Daily rate (excluding GST): </label>
                <div>
                  <span class="position-absolute d-span"> $</span>
                  <input
                    type="number"
                    id="fixedFeeAmount"
                    v-model="form.daily_rate"
                    name="fixedFeeAmount"
                    class="form-control d-input"
                    min="1"
                    step=".01"
                    placeholder=""
                  />
                </div>
              </div>

              <div class="form-group mt-3">
                <label> Estimated number of days: </label>
                <div>
                  <!-- <span class="position-absolute d-span"> $</span> -->
                  <input
                    type="number"
                    id="fixedFeeAmount"
                    v-model="form.daily_rate"
                    name="fixedFeeAmount"
                    class="form-control d-input"
                    min="1"
                    step=".01"
                    placeholder=""
                  />
                </div>
              </div>

              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label>
                    What is the estimated amount for disbursements (excluding
                    GST)?</label
                  >
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      id="fixedFeeAmount"
                      v-model="form.disbursement_amount"
                      name="fixedFeeAmount"
                      class="form-control d-input"
                      min="1"
                      step=".01"
                      placeholder=""
                    />
                  </div>
                  <button
                    class="btn btn-dark mt-3 mb-3"
                    type="button"
                    @click="showItemise"
                  >
                    Itemise Disbursements
                  </button>

                  <!-- hammad -->
                  <div
                    class="mb-3"
                    id="additionalFeeEarners"
                    v-if="divItemiseVisible"
                  >
                    <fieldset
                      class="border p-2 my-2 bg-light text-center"
                      style="margin: auto"
                    >
                      <legend
                        class="w-auto"
                        style="float: none; padding: inherit; font-size: 1rem"
                      >
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input
                          v-model="newRow.itemDisbursement"
                          placeholder="Eg: filing fees"
                          class="form-control"
                          required
                        />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (excluding GST):<sup><code>*</code></sup>
                        <div>
                          <span
                            class="position-absolute d-span"
                            style="line-height: 36px"
                            >$</span
                          >
                          <input
                            v-model="newRow.costAud"
                            min="1"
                            type="number"
                            class="form-control d-input"
                            required
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="GST"
                        />
                        <label class="form-check-label" for="GST">
                          GST Not Applicable
                        </label>
                      </div>
                      <br />
                      <button
                        type="button"
                        @click="addRow"
                        class="btn btn-dark"
                      >
                        Add
                      </button>
                    </fieldset>
                    <div class="table-responsive">
                      <table
                        class="table table-bordered mb-0"
                        id="additionalFeeEarnersTable"
                      >
                        <thead>
                          <tr class="border">
                            <!-- <th></th> -->
                            <th>Item</th>
                            <th>Cost</th>
                            <!-- <th></th> -->
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="addFeeEarnersRow">
                          <tr
                            v-for="(row, index) in rows"
                            :key="index"
                            class="border"
                          >
                            <td>{{ row.itemDisbursement }}</td>
                            <td>$ {{ row.costAud }}</td>
                            <!-- <td class="text-center"> -->
                            <!-- <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p> -->
                            <!-- <input type="checkbox" name="gst not applicable"> -->
                            <!-- <i class="fa fa-check"></i>
                          </td> -->
                            <td style="width: 0px">
                              <button
                                type="button"
                                @click="removeRow(index)"
                                class="btn btn-default btn-circle"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td class="p-1"></td>
                          </tr>
                          <tr class="bg-dark text-white border-0">
                            <td
                              class="bg-transparent text-white p-0 px-2 b-round-start"
                            >
                              Total (excluding GST):
                            </td>
                            <td class="bg-transparent text-white p-0 px-2">
                              $ {{ grandTotal }}
                            </td>
                            <td class="bg-transparent p-0 b-round-end"></td>
                          </tr>
                          <tr class="border-0 p-0">
                            <td class="gstStyle p-0">*GST Not Applicable</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- If they select ‘Retainer’ -->
            <div
              class="form-group"
              id="fixed-fee"
              v-if="selectedOption === 'Retainer'"
            >
              <div>
                <label>Retainer fee (excluding GST): </label>
                <div>
                  <span class="position-absolute d-span"> $</span>
                  <input
                    type="number"
                    id="fixedFeeAmount"
                    v-model="form.daily_rate"
                    name="fixedFeeAmount"
                    class="form-control d-input"
                    min="1"
                    step=".01"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label> Retainer period: </label>
                  <div class="mb-3">
                    <input
                      type="text"
                      id="fixedFeeAmount"
                      name="fixedFeeAmount"
                      class="form-control"
                      placeholder="Eg: monthly"
                    />
                  </div>
                  <label> Time/other limitations: </label>
                  <div class="mb-3">
                    <input
                      type="text"
                      id="fixedFeeAmount"
                      name="fixedFeeAmount"
                      class="form-control"
                      placeholder="Eg: up to 20 hours"
                    />
                  </div>
                  <label> Termination notice period: </label>
                  <div class="mb-3">
                    <input
                      type="text"
                      id="fixedFeeAmount"
                      name="fixedFeeAmount"
                      class="form-control"
                      placeholder="Eg: 2 weeks"
                    />
                  </div>
                  <label>
                    What is the estimated amount for disbursements (excluding
                    GST)?</label
                  >
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      id="fixedFeeAmount"
                      v-model="form.disbursement_amount"
                      name="fixedFeeAmount"
                      class="form-control d-input"
                      min="1"
                      step=".01"
                      placeholder=""
                    />
                  </div>
                  <button
                    class="btn btn-dark mt-3 mb-3"
                    type="button"
                    @click="showItemise"
                  >
                    Itemise Disbursements
                  </button>

                  <!-- hammad -->
                  <div
                    class="mb-3"
                    id="additionalFeeEarners"
                    v-if="divItemiseVisible"
                  >
                    <fieldset
                      class="border p-2 my-2 bg-light text-center"
                      style="margin: auto"
                    >
                      <legend
                        class="w-auto"
                        style="float: none; padding: inherit; font-size: 1rem"
                      >
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input
                          v-model="newRow.itemDisbursement"
                          placeholder="Eg: filing fees"
                          class="form-control"
                          required
                        />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (excluding GST):<sup><code>*</code></sup>
                        <div>
                          <span
                            class="position-absolute d-span"
                            style="line-height: 36px"
                            >$</span
                          >
                          <input
                            v-model="newRow.costAud"
                            min="1"
                            type="number"
                            class="form-control d-input"
                            required
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="GST"
                        />
                        <label class="form-check-label" for="GST">
                          GST Not Applicable
                        </label>
                      </div>
                      <br />
                      <button
                        type="button"
                        @click="addRow"
                        class="btn btn-dark"
                      >
                        Add
                      </button>
                    </fieldset>
                    <div class="table-responsive">
                      <table
                        class="table table-bordered mb-0"
                        id="additionalFeeEarnersTable"
                      >
                        <thead>
                          <tr class="border">
                            <!-- <th></th> -->
                            <th>Item</th>
                            <th>Cost</th>
                            <!-- <th></th> -->
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="addFeeEarnersRow">
                          <tr
                            v-for="(row, index) in rows"
                            :key="index"
                            class="border"
                          >
                            <td>{{ row.itemDisbursement }}</td>
                            <td>$ {{ row.costAud }}</td>
                            <!-- <td class="text-center"> -->
                            <!-- <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p> -->
                            <!-- <input type="checkbox" name="gst not applicable"> -->
                            <!-- <i class="fa fa-check"></i>
                          </td> -->
                            <td style="width: 0px">
                              <button
                                type="button"
                                @click="removeRow(index)"
                                class="btn btn-default btn-circle"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td class="p-1"></td>
                          </tr>
                          <tr class="bg-dark text-white border-0">
                            <td
                              class="bg-transparent text-white p-0 px-2 b-round-start"
                            >
                              Total (excluding GST):
                            </td>
                            <td class="bg-transparent text-white p-0 px-2">
                              $ {{ grandTotal }}
                            </td>
                            <td class="bg-transparent p-0 b-round-end"></td>
                          </tr>
                          <tr class="border-0 p-0">
                            <td class="gstStyle p-0">*GST Not Applicable</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- If they select item by item -->
            <div
              class="form-group"
              id="fixed-fee"
              v-if="selectedOption === 'Item'"
            >
              <div class="" id="additionalFeeEarners">
                <fieldset
                  class="border p-2 my-2 bg-light text-center"
                  style="margin: auto"
                >
                  <legend
                    class="w-auto"
                    style="float: none; padding: inherit; font-size: 1rem"
                  >
                    Item by Item for Specific Tasks
                  </legend>
                  <label class="w-100 text-start">
                    Item:<sup><code>*</code></sup>
                    <input
                      v-model="newRow2.itemDisbursement"
                      placeholder="Eg: letter of advice"
                      class="form-control"
                      required
                    />
                  </label>
                  <br />
                  <br />
                  <label class="w-100 text-start">
                    Fee (excluding GST and disbursements):<sup
                      ><code>*</code></sup
                    >
                    <div>
                      <span
                        class="position-absolute d-span"
                        style="line-height: 36px"
                        >$</span
                      >
                      <input
                        v-model="newRow2.costAud"
                        min="1"
                        type="number"
                        class="form-control d-input"
                        required
                      />
                    </div>
                  </label>
                  <br />
                  <br />
                  <button type="button" @click="addRow2" class="btn btn-dark">
                    Add
                  </button>
                </fieldset>
                <!-- <div class="table-responsive"> -->
                <table
                  class="table table-bordered mb-0"
                  id="additionalFeeEarnersTable"
                >
                  <thead>
                    <tr class="border">
                      <th>Item</th>
                      <th>Fee (excluding GST)</th>
                      <th></th>
                      <!-- <th>Total</th> -->
                    </tr>
                  </thead>
                  <tbody id="addFeeEarnersRow">
                    <tr
                      v-for="(row, index) in rows2"
                      :key="index"
                      class="border"
                    >
                      <td>{{ row.itemDisbursement }}</td>
                      <td>$ {{ row.costAud }}</td>
                      <td style="width: 0px">
                        <button
                          type="button"
                          @click="removeRow2(index)"
                          class="btn btn-default btn-circle"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                      <!-- <td>
                        <p class="mb-0 bg-secondary border p-1 rounded text-white ">Total (excluding GST): ${{ row.total
                        }}</p>
                      </td> -->
                    </tr>
                    <tr>
                      <td class="p-1"></td>
                    </tr>
                    <tr class="bg-dark text-white border-0">
                      <td
                        class="bg-transparent text-white p-0 px-2 b-round-start"
                      >
                        Total (excluding GST):
                      </td>
                      <td class="bg-transparent text-white p-0 px-2">
                        $ {{ grandTotal }}
                      </td>
                      <td class="bg-transparent p-0 b-round-end"></td>
                    </tr>
                    <!-- <tr class="border-0 p-0">
                      <td class="gstStyle p-0">
                        *GST Not Applicable
                      </td>
                    </tr> -->
                  </tbody>
                </table>
                <!-- </div> -->
              </div>

              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label>
                    What is the estimated amount for disbursements (excluding
                    GST)?</label
                  >
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      id="fixedFeeAmount"
                      v-model="form.disbursement_amount"
                      name="fixedFeeAmount"
                      class="form-control d-input"
                      min="1"
                      step=".01"
                      placeholder=""
                    />
                  </div>
                  <button
                    class="btn btn-dark mt-3 mb-3"
                    type="button"
                    @click="showItemise"
                  >
                    Itemise Disbursements
                  </button>

                  <!-- hammad -->
                  <div
                    class="mb-3"
                    id="additionalFeeEarners"
                    v-if="divItemiseVisible"
                  >
                    <fieldset
                      class="border p-2 my-2 bg-light text-center"
                      style="margin: auto"
                    >
                      <legend
                        class="w-auto"
                        style="float: none; padding: inherit; font-size: 1rem"
                      >
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input
                          v-model="newRow.itemDisbursement"
                          placeholder="Eg: filing fees"
                          class="form-control"
                          required
                        />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (excluding GST):<sup><code>*</code></sup>
                        <div>
                          <span
                            class="position-absolute d-span"
                            style="line-height: 36px"
                            >$</span
                          >
                          <input
                            v-model="newRow.costAud"
                            min="1"
                            type="number"
                            class="form-control d-input"
                            required
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="GST"
                        />
                        <label class="form-check-label" for="GST">
                          GST Not Applicable
                        </label>
                      </div>
                      <br />
                      <button
                        type="button"
                        @click="addRow"
                        class="btn btn-dark"
                      >
                        Add
                      </button>
                    </fieldset>
                    <div class="table-responsive">
                      <table
                        class="table table-bordered mb-0"
                        id="additionalFeeEarnersTable"
                      >
                        <thead>
                          <tr class="border">
                            <!-- <th></th> -->
                            <th>Item</th>
                            <th>Cost</th>
                            <!-- <th></th> -->
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="addFeeEarnersRow">
                          <tr
                            v-for="(row, index) in rows"
                            :key="index"
                            class="border"
                          >
                            <td>{{ row.itemDisbursement }}</td>
                            <td>$ {{ row.costAud }}</td>
                            <!-- <td class="text-center"> -->
                            <!-- <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p> -->
                            <!-- <input type="checkbox" name="gst not applicable"> -->
                            <!-- <i class="fa fa-check"></i>
                          </td> -->
                            <td style="width: 0px">
                              <button
                                type="button"
                                @click="removeRow(index)"
                                class="btn btn-default btn-circle"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td class="p-1"></td>
                          </tr>
                          <tr class="bg-dark text-white border-0">
                            <td
                              class="bg-transparent text-white p-0 px-2 b-round-start"
                            >
                              Total (excluding GST):
                            </td>
                            <td class="bg-transparent text-white p-0 px-2">
                              $ {{ grandTotal }}
                            </td>
                            <td class="bg-transparent p-0 b-round-end"></td>
                          </tr>
                          <tr class="border-0 p-0">
                            <td class="gstStyle p-0">*GST Not Applicable</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- If they select ‘Fixed fee’ -->
            <div
              class="form-group"
              id="fixed-fee"
              v-if="selectedOption === 'Fixed'"
            >
              <label
                >Fixed fee amount (excluding GST and disbursements):<sup
                  ><code>*</code></sup
                ></label
              >
              <div>
                <span class="position-absolute d-span"> $</span>
                <input
                  type="number"
                  id="fixedFeeAmount"
                  v-model="form.fixed_fee_amount"
                  name="fixedFeeAmount"
                  class="form-control d-input"
                  min="1"
                  step=".01"
                  required="required"
           
                />
              </div>
              <!-- <span class="invalid-feedback">{{errors.fixedFeeAmount}}</span> -->

              
              <br />
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label>
                    What is the estimated amount for disbursements (excluding
                    GST)?</label
                  >
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      id="fixedFeeAmount"
                      v-model="form.disbursement_amount"
                      name="fixedFeeAmount"
                      class="form-control d-input"
                      min="1"
                      step=".01"
                      placeholder=""
                    />
                  </div>
                  <button
                    class="btn btn-dark mt-3 mb-3"
                    type="button"
                    @click="showItemise"
                  >
                    Itemise Disbursements
                  </button>

                  <!-- hammad -->
                  <div
                    class="mb-3"
                    id="additionalFeeEarners"
                    v-if="divItemiseVisible"
                  >
                    <fieldset
                      class="border p-2 my-2 bg-light text-center"
                      style="margin: auto"
                    >
                      <legend
                        class="w-auto"
                        style="float: none; padding: inherit; font-size: 1rem"
                      >
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input
                          v-model="newRow.itemDisbursement"
                          placeholder="Eg: filing fees"
                          class="form-control"
                          required
                          
                        />
                      </label>

                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (excluding GST):<sup><code>*</code></sup>
                        <div>
                          <span
                            class="position-absolute d-span"
                            style="line-height: 36px"
                            >$</span
                          >
                          <input
                            v-model="newRow.costAud"
                            min="1"
                            type="number"
                            class="form-control d-input"
                            required
                            
                          />
                        </div>
                      </label>

                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="GST"
                        />
                        <label class="form-check-label" for="GST">
                          GST Not Applicable
                        </label>
                      </div>
                      <br />
                      <button
                        type="button"
                        @click="addRow"
                        class="btn btn-dark"
                      >
                        Add
                      </button>
                    </fieldset>
                    <div class="table-responsive">
                      <table
                        class="table table-bordered mb-0"
                        id="additionalFeeEarnersTable"
                      >
                        <thead>
                          <tr class="border">
                            <!-- <th></th> -->
                            <th>Item</th>
                            <th>Cost</th>
                            <!-- <th></th> -->
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="addFeeEarnersRow">
                          <tr
                            v-for="(row, index) in rows"
                            :key="index"
                            class="border"
                          >
                            <td>{{ row.itemDisbursement }}</td>
                            <td>$ {{ row.costAud }}</td>
                            <!-- <td class="text-center"> -->
                            <!-- <p class="mb-0 bg-secondary border p-1 rounded text-white">Total (excluding GST): ${{
                              row.total }}
                            </p> -->
                            <!-- <input type="checkbox" name="gst not applicable"> -->
                            <!-- <i class="fa fa-check"></i>
                          </td> -->
                            <td style="width: 0px">
                              <button
                                type="button"
                                @click="removeRow(index)"
                                class="btn btn-default btn-circle"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td class="p-1"></td>
                          </tr>
                          <tr class="bg-dark text-white border-0">
                            <td
                              class="bg-transparent text-white p-0 px-2 b-round-start"
                            >
                              Total (excluding GST):
                            </td>
                            <td class="bg-transparent text-white p-0 px-2">
                              $ {{ grandTotal }}
                            </td>
                            <td class="bg-transparent p-0 b-round-end"></td>
                          </tr>
                          <tr class="border-0 p-0">
                            <td class="gstStyle p-0">*GST Not Applicable</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <!-- If they select ‘Hourly rate’ -->
            <div
              class="form-group"
              id="hourly-rate"
              v-if="selectedOption === 'Hourly'"
            >
              <div class="form-group mb-3" id="addAdditionalFeeEarnersRadio">
                How many fee earners will be working on this matter?
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      v-model="form.fee_earners"
                      value="me"
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
                      v-model="form.fee_earners"
                      value="team"
                      class="form-check-input"
                      id="radioNoOfFeeEarnersMultiple"
                      @click="showElement('No')"
                    />
                    I'm part of a team
                  </label>
                </div>
              </div>

              <div v-if="isVisible === 'No'">
                <button
                  class="btn btn-dark mt-3 mb-3"
                  type="button"
                  @click="showEarner"
                >
                  Add fee earner
                </button>
                <div class="form-group">
                <div class="" id="additionalFeeEarners" v-if="divEarnerVisible">
                  <fieldset
                    class="border p-2 my-2 bg-light text-center"
                    style="margin: auto"
                  >
                    <legend
                      class="w-auto"
                      style="float: none; padding: inherit; font-size: 1rem"
                    >
                      Add fee earner
                    </legend>
                    <label class="w-100 text-start">
                      Title:<sup><code>*</code></sup>
                      <input
                        v-model="newRow3.title"
                        autocomplete="on"
                        placeholder="Eg: Associate"
                        class="form-control"
                        required
                      />
                    </label>
                    <br />
                    <br />
                    <label class="w-100 text-start">
                      Hourly rate (excluding GST):<sup><code>*</code></sup>
                      <div>
                        <span class="position-absolute d-span">$</span>
                        <input
                          v-model="newRow3.hourlyRate"
                          min="1"
                          autocomplete="on"
                          type="number"
                          class="form-control d-input"
                          
                        />
                      </div>
                    </label>
                    <br />
                    <br />
                    <label class="w-100 text-start">
                      Estimated number of hours:<sup><code>*</code></sup>
                      <input
                        v-model="newRow3.estimatedHours"
                        min="1"
                        autocomplete="on"
                        type="number"
                        class="form-control"
                        required
                      />
                    </label>
                    <br />
                    <br />
                    <button type="button" @click="addRow3" class="btn btn-dark">
                      Add
                    </button>
                  </fieldset>

                <div class="table-responsive">

                
                    <table
                      class="table table-bordered mb-3 hourlycost"
                      id="additionalFeeEarnersTable"
                    >
                      <thead>
                        <tr class="border table-top">
                          <!-- <th></th> -->
                          <th>Title</th>
                          <th>Hourly rate</th>
                          <th>Hours</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr
                          v-for="(row, index) in rows3"
                          :key="index"
                          class="border extra-class table-mid"
                        >
                          <td>{{ row.title }}</td>
                          <td>$ {{ row.hourlyRate }}</td>
                          <td>{{ row.estimatedHours }}</td>
                          <td>$ {{ row.hourlyRate * row.estimatedHours }}</td>

                          <td>
                            <button
                              type="button"
                              class="btn btn-default btn-circle p-1"
                            >
                              <i class="fa fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-default btn-circle p-1"
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td class="p-1"></td>
                        </tr>
                        <tr
                          class="bg-dark text-white border-0 extra-class extra-class1"
                        >
                          <td
                            class="bg-transparent text-white p-0 px-2 b-round-start"
                          >
                            Total (excluding GST):
                          </td>
                          <td class="bg-transparent p-0"></td>
                          <td class="bg-transparent p-0"></td>
                          <td class="bg-transparent text-white p-0 px-2">
                            $ {{ grandTotal }}
                          </td>
                          <td class="bg-transparent p-0 b-round-end"></td>
                        </tr>
                        <tr class="border-0 p-0">
                          <td class="gstStyle p-0">*GST Not Applicable</td>
                        </tr>
                      </tbody>
                     
                    </table>
                  </div>
                </div>
              </div>
              </div>

              <div v-if="isVisible === 'Yes'">
                <!-- Invisible filed for posting additional fee earners info -->
                <input
                  class="d-none"
                  name="feeEarnersInfo"
                  id="feeEarnersInfo"
                />

                <div id="hourlyRateIndividual">
                  <label
                    >Hourly rate (excluding GST):<sup
                      ><code>*</code></sup
                    ></label
                  >
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      id="hourlyRate"
                      v-model="form.fee_earners"
                      name="hourlyRate"
                      min="1"
                      step="0.01"
                      class="form-control d-input"
                  required

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
                  required

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
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label>
                    What is the estimated amount for disbursements (excluding
                    GST)?</label
                  >
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      id="fixedFeeAmount"
                      v-model="form.disbursement_amount"
                      name="fixedFeeAmount"
                      class="form-control d-input"
                      min="1"
                      step=".01"
                      placeholder=""
                    />
                  </div>
                  <button
                    class="btn btn-dark mt-3 mb-3"
                    type="button"
                    @click="showItemise"
                  >
                    Itemise Disbursements
                  </button>

                  <!-- hammad -->
                  <div
                    class="mb-3"
                    id="additionalFeeEarners"
                    v-if="divItemiseVisible"
                  >
                    <fieldset
                      class="border p-2 my-2 bg-light text-center"
                      style="margin: auto"
                    >
                      <legend
                        class="w-auto"
                        style="float: none; padding: inherit; font-size: 1rem"
                      >
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input
                          v-model="newRow.itemDisbursement"
                          placeholder="Eg: filing fees"
                          class="form-control"
                          required
                        />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (excluding GST):<sup><code>*</code></sup>
                        <div>
                          <span
                            class="position-absolute d-span"
                            style="line-height: 36px"
                            >$</span
                          >
                          <input
                            v-model="newRow.costAud"
                            min="1"
                            type="number"
                            class="form-control d-input"
                            required
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="GST"
                        />
                        <label class="form-check-label" for="GST">
                          GST Not Applicable
                        </label>
                      </div>
                      <br />
                      <button
                        type="button"
                        @click="addRow"
                        class="btn btn-dark"
                      >
                        Add
                      </button>
                    </fieldset>

                    <table
                      class="table table-bordered mb-0"
                      id="additionalFeeEarnersTable"
                    >
                      <thead>
                        <tr class="border">
                          <!-- <th></th> -->
                          <th>Item</th>
                          <th>Cost</th>
                          <!-- <th></th> -->
                          <th></th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr
                          v-for="(row, index) in rows"
                          :key="index"
                          class="border"
                        >
                          <td>{{ row.itemDisbursement }}</td>
                          <td>$ {{ row.costAud }}</td>
                          <!-- <td class="text-center"> -->
                          <!-- <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p> -->
                          <!-- <input type="checkbox" name="gst not applicable"> -->
                          <!-- <i class="fa fa-check"></i>
                          </td> -->
                          <td style="width: 0px">
                            <button
                              type="button"
                              @click="removeRow(index)"
                              class="btn btn-default btn-circle"
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td class="p-1"></td>
                        </tr>
                        <tr class="bg-dark text-white border-0">
                          <td
                            class="bg-transparent text-white p-0 px-2 b-round-start"
                          >
                            Total (excluding GST):
                          </td>
                          <td class="bg-transparent text-white p-0 px-2">
                            $ {{ grandTotal }}
                          </td>
                          <td class="bg-transparent p-0 b-round-end"></td>
                        </tr>
                        <tr class="border-0 p-0">
                          <td class="gstStyle p-0">*GST Not Applicable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- If they select ‘Success Fee’ -->
            <div
              class="form-group"
              id="success-fee"
              v-if="selectedOption === 'Success'"
            >
              <label>Estimated fee amount (excluding GST):</label>
              <div>
                <span class="position-absolute d-span"> $</span>
                <input
                  type="number"
                  v-model="form.estimatedFee"
                  id="estimatedFee"
                  name="estimatedFee"
                  class="form-control d-input"
                />
              </div>
              <br />

              <label
                >Uplift percentage (%):<sup><code>*</code></sup></label
              >
              <input
                type="number"
                v-model="form.uplift_percentage"
                id="upliftPercentage"
                name="upliftPercentage"
                class="form-control"
                @input="limitNumber"
                required
              />

              <br />

              <label
                >Summarise terms upon which the Success Fee will be
                charged:</label
              >
              <textarea
                type="text"
                id="successFeeTerms"
                v-model="form.success_fee_term"
                name="successFeeTerms"
                class="form-control"
              ></textarea>
              <br />
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label>
                    What is the estimated amount for disbursements (excluding
                    GST)?</label
                  >
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input
                      type="number"
                      id="fixedFeeAmount"
                      v-model="form.disbursement_amount"
                      name="fixedFeeAmount"
                      class="form-control d-input"
                      min="1"
                      step=".01"
                      placeholder=""
                    />
                  </div>
                  <button
                    class="btn btn-dark mt-3 mb-3"
                    type="button"
                    @click="showItemise"
                  >
                    Itemise Disbursements
                  </button>

                  <!-- hammad -->
                  <div
                    class="mb-3"
                    id="additionalFeeEarners"
                    v-if="divItemiseVisible"
                  >
                    <fieldset
                      class="border p-2 my-2 bg-light text-center"
                      style="margin: auto"
                    >
                      <legend
                        class="w-auto"
                        style="float: none; padding: inherit; font-size: 1rem"
                      >
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input
                          v-model="newRow.itemDisbursement"
                          placeholder="Eg: filing fees"
                          class="form-control"
                          required
                        />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (excluding GST):<sup><code>*</code></sup>
                        <div>
                          <span
                            class="position-absolute d-span"
                            style="line-height: 36px"
                            >$</span
                          >
                          <input
                            v-model="newRow.costAud"
                            min="1"
                            type="number"
                            class="form-control d-input"
                            required
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="GST"
                        />
                        <label class="form-check-label" for="GST">
                          GST Not Applicable
                        </label>
                      </div>
                      <br />
                      <button
                        type="button"
                        @click="addRow"
                        class="btn btn-dark"
                      >
                        Add
                      </button>
                    </fieldset>

                    <table
                      class="table table-bordered mb-0"
                      id="additionalFeeEarnersTable"
                    >
                      <thead>
                        <tr class="border">
                          <!-- <th></th> -->
                          <th>Item</th>
                          <th>Cost</th>
                          <!-- <th></th> -->
                          <th></th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr
                          v-for="(row, index) in rows"
                          :key="index"
                          class="border"
                        >
                          <td>{{ row.itemDisbursement }}</td>
                          <td>$ {{ row.costAud }}</td>
                          <!-- <td class="text-center"> -->
                          <!-- <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p> -->
                          <!-- <input type="checkbox" name="gst not applicable"> -->
                          <!-- <i class="fa fa-check"></i>
                          </td> -->
                          <td style="width: 0px">
                            <button
                              type="button"
                              @click="removeRow(index)"
                              class="btn btn-default btn-circle"
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td class="p-1"></td>
                        </tr>
                        <tr class="bg-dark text-white border-0">
                          <td
                            class="bg-transparent text-white p-0 px-2 b-round-start"
                          >
                            Total (excluding GST):
                          </td>
                          <td class="bg-transparent text-white p-0 px-2">
                            $ {{ grandTotal }}
                          </td>
                          <td class="bg-transparent p-0 b-round-end"></td>
                        </tr>
                        <tr class="border-0 p-0">
                          <td class="gstStyle p-0">*GST Not Applicable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upfront payment -->
          <div
            class="form-group"
            id="upfrontPayRadio"
            v-if="selectedOption === 'Pro'"
            ref="content"
          >
            <!-- Additional information -->
            <div class="disbursement-fields">
              <div class="form-group">
                <label>
                  What is the estimated amount for disbursements (excluding
                  GST)?</label
                >
                <div>
                  <span class="position-absolute d-span"> $</span>
                  <input
                    type="number"
                    id="fixedFeeAmount"
                    v-model="form.disbursement_amount"
                    name="fixedFeeAmount"
                    class="form-control d-input"
                    min="1"
                    step=".01"
                    placeholder=""
                  />
                </div>
                <button
                  class="btn btn-dark mt-3 mb-3"
                  type="button"
                  @click="showItemise"
                >
                  Itemise Disbursements
                </button>

                <!-- hammad -->
                <div
                  class="mb-3"
                  id="additionalFeeEarners"
                  v-if="divItemiseVisible"
                >
                  <fieldset
                    class="border p-2 my-2 bg-light text-center"
                    style="margin: auto"
                  >
                    <legend
                      class="w-auto"
                      style="float: none; padding: inherit; font-size: 1rem"
                    >
                      Itemise Disbursements
                    </legend>
                    <label class="w-100 text-start">
                      Item:<sup><code>*</code></sup>
                      <input
                        v-model="newRow.itemDisbursement"
                        placeholder="Eg: filing fees"
                        class="form-control"
                        required
                      />
                    </label>
                    <br />
                    <br />
                    <label class="w-100 text-start">
                      Cost (excluding GST):<sup><code>*</code></sup>
                      <div>
                        <span
                          class="position-absolute d-span"
                          style="line-height: 36px"
                          >$</span
                        >
                        <input
                          v-model="newRow.costAud"
                          min="1"
                          type="number"
                          class="form-control d-input"
                          required
                        />
                      </div>
                    </label>
                    <br />
                    <div class="form-check text-start mt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="GST"
                      />
                      <label class="form-check-label" for="GST">
                        GST Not Applicable
                      </label>
                    </div>
                    <br />
                    <button type="button" @click="addRow" class="btn btn-dark">
                      Add
                    </button>
                  </fieldset>

                  <table
                    class="table table-bordered mb-0"
                    id="additionalFeeEarnersTable"
                  >
                    <thead>
                      <tr class="border">
                        <!-- <th></th> -->
                        <th>Item</th>
                        <th>Cost</th>
                        <!-- <th></th> -->
                        <th></th>
                      </tr>
                    </thead>
                    <tbody id="addFeeEarnersRow">
                      <tr
                        v-for="(row, index) in rows"
                        :key="index"
                        class="border"
                      >
                        <td>{{ row.itemDisbursement }}</td>
                        <td>$ {{ row.costAud }}</td>
                        <!-- <td class="text-center"> -->
                        <!-- <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                          </p> -->
                        <!-- <input type="checkbox" name="gst not applicable"> -->
                        <!-- <i class="fa fa-check"></i>
                        </td> -->
                        <td style="width: 0px">
                          <button
                            type="button"
                            @click="removeRow(index)"
                            class="btn btn-default btn-circle"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-1"></td>
                      </tr>
                      <tr class="bg-dark text-white border-0">
                        <td
                          class="bg-transparent text-white p-0 px-2 b-round-start"
                        >
                          Total (excluding GST):
                        </td>
                        <td class="bg-transparent text-white p-0 px-2">
                          $ {{ grandTotal }}
                        </td>
                        <td class="bg-transparent p-0 b-round-end"></td>
                      </tr>
                      <tr class="border-0 p-0">
                        <td class="gstStyle p-0">*GST Not Applicable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="stepbtn hiden mt-3">
              <span class="pagination-indicator"> {{ 1 }} of {{ 3 }} </span>
              <button
                v-if="currentStep !== 0"
                type="button"
                @click="proPrevStep"
                class="btn btn-dark mr"
              >
                Previous
              </button>
              <button
                v-if="currentStep !== 1"
                type="submit"
                @click="proStep"
                :disabled="!selectedOption"
                class="btn btn-dark"
              >
                Next
              </button>
              <button
                v-if="currentStep === 1"
                type="submit"
                class="btn btn-dark"
              >
                Summary
              </button>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 1">
          <div class="my-3">
            <label
              >Do you require an upfront payment?<sup
                ><code>*</code></sup
              ></label
            >
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="form.upfront_payment_status"
                type="radio"
                name="upfrontPayment"
                id="upfrontYes"
                value="yes"
                checked=""
              />
              <label
                class="form-check-label upfrontlab"
                for="upfrontYes"
                @click="setPaySucc('Yes')"
              >
                Yes
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="form.upfront_payment_status"
                type="radio"
                name="upfrontPayment"
                id="upfrontNo"
                value="no"
              />
              <label
                class="form-check-label upfrontlab"
                for="upfrontNo"
                @click="setPaySucc('No')"
              >
                No
              </label>
            </div>

            <div class="my-3" id="upfrontPayAmount" v-if="paySucc === 'Yes'">
              <label
                >How much upfront payment do you require?<sup
                  ><code>*</code></sup
                ></label
              >
              <div>
                <span class="position-absolute d-span" style="line-height: 36px"
                  >$</span
                >
                <input
                  id="upfrontAmount"
                  name="upfrontAmount"
                  v-model="form.upfront_payment"
                  type="number"
                  min="1"
                  step=".01"
                  class="form-control d-input"
                  required
                />
              </div>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 2">
          <!-- Additional information -->
          <div class="form-group">
            <label class="w-100"
              >Tell the potential client what you will do for them:<sup
                ><code>*</code></sup
              >
              <textarea
                v-model="form.description"
                id="additionalInfo"
                name="additionalInfo"
                class="form-control"
                rows="4"
                cols="100%"
                required
              ></textarea>
            </label>
            <br />
          </div>
        </template>

        <template v-if="currentStep === 3">
        <p>4</p>
      </template>

        <div class="stepbtn mt-3">
          <span v-if="selectedOption == 'Pro'">
            <span class="pagination-indicator"> {{ 3 }} of {{ 3 }} </span>
          </span>
          <span v-else>
            <span v-if="currentStep !== 5" class="pagination-indicator">
              {{ currentStep + 1 }} of {{ totalSteps }}
            </span>
          </span>
          <div>
            <button
              v-if="currentStep !== 0"
              type="button"
              @click="prevStep"
              class="btn btn-dark mr"
            >
              Previous
            </button>
            <button
              v-if="currentStep !== 3"
              type="submit"
              :disabled="!selectedOption"
              class="btn btn-dark"
            >
              Next
            </button>
            <button v-if="currentStep === 3" class="btn btn-dark">
              Summary
            </button>
          </div>
        </div>

        <pre>{{ values }}</pre>
      </Form>
    </div>
    <div class="footer footer-ct">
      <MainFooter />
    </div>
  </div>
</template>
<script setup>

import MainFooter from "../../components/global/MainFooter.vue";
</script>
<script>
import LawyerHeader from "./Header.vue";
import api from "@/config/api";


export default {
 

  data() {
 
    return {
      form: {
        charge_type: null,
        fixed_fee_amount: null,
        disbursement_amount: null,
        law_practice_cost: null,
        fee_earners: null,
        daily_rate: null,
        uplift_percentage: null,
        estimatedFee: null,
        success_fee_term: null,
        pro_bono_description: null,
        meet_deadlines: null,
        miss_deadline_reason: null,
        upfront_payment_status: null,
        upfront_payment: null,
        consultation: null,
        consultation_time_limit: null,
        description: null,
        lawyer_id: null,
        job_id: null,
      },

      newRow: {
        itemDisbursement: "",
        costAud: "",
      },
      rows: [], // Itemise Disbursements
      newRow2: {
        itemDisbursement: "",
        costAud: "",
      },
      rows2: [], // item by item specific tasks
      newRow3: {
        title: "",
        hourlyRate: "",
        estimatedHours: "",
      },
      rows3: [], // additional fee earner

      schemas: [],
      currentStep: 0,
      totalSteps: 4,

      selectedOption: "",
      option: "Yes",
      isVisible: "Yes",
      payment: "Yes",
      pay: "Yes",
      paySucc: "Yes",
      deadline: "Yes",
      team: "Yes",
      divItemiseVisible: false,
      divEarnerVisible: false,
      input1: null,
      
    };
  },
  computed: {
    jobData() {
      return this.$store.state.jobData;
    },
    loginUser() {
      return this.$store.state.loginUser;
    },
    grandTotal() {
      return this.rows.reduce(
        (total, row) => total + parseFloat(row.costAud) || 0,
        0
      );
    },
    grandTotal2() {
      return this.rows2.reduce(
        (total, row) => total + parseFloat(row.costAud) || 0,
        0
      );
    },
    grandTotal3() {
      return this.rows3.reduce(
        (total, row) => total + parseFloat(row.hourlyRate) || 0,
        0
      );
    },

    // currentSchema() {
    //   return this.schemas[this.currentStep];
    // }
    // upfrontPayRadioFn() {
    //   return !!document.getElementById('upfrontPayRadio');
    // },
  },
  components: {
    LawyerHeader,
    MainFooter,
   
  },
  mounted() {
    if (this.jobData == null || this.jobData == "") {
      this.$router.push({ path: "/lawyer-dashboard" });
    }
  },

  beforeUnmount() {
    localStorage.removeItem("jobData");
    this.$store.commit("SET_JOB_DATA", null);
  },

  methods: {
    handleOptionChange() {
      this.currentSchema = this.selectedOption;
      console.log("schema", this.currentSchema);
      // console.log('schema', this.selectedOption);
    },
    async submitStepForm() {
      // const formData = {
      //   "title": this.title,
      //   "description": this.description,
      //   "field_id": this.selectedArea,
      //   "location_id": this.locations[this.selectedLocationIndex].id,
      //   "city": this.city,
      //   "accessibility_requirements": this.requirementsOption,
      // }
      // if (this.requirementsOption == 1) {
      //   formData.requirements_description = this.requirementsOptionDescription;
      // }
      this.form.job_id = this.jobData?.id;
      this.form.lawyer_id = this.loginUser?.email;
      this.form.charge_type = this.selectedOption;

      console.log("rows 3 : ", this.rows3);
      this.form.disbursements = this.rows; // Itemise Disbursements
      this.form.specificTasks = this.rows2; // item by item specific tasks
      this.form.feeEarners = this.rows3; // additional fee earner

      console.log(this.form);

      api
        .post("/lawyer/create-proposal", this.form)
        .then(() => {
          this.$swal("", "Your proposal has been submitted.", "success").then(
            (res) => {
              console.log("response : ", res);
              this.$router.push({ path: "/lawyer-dashboard" });
              // this.changePostJobFormToDefault();
              // this.currentStep = 0;
            }
          );
        })
        .catch((error) => {
          this.$swal("", error?.response?.data?.error, "error");
          console.log("getResults : ", error?.response?.data?.error);
        });
    },

    addRow() {
      if (this.newRow.itemDisbursement && this.newRow.costAud) {
        this.rows.push({
          itemDisbursement: this.newRow.itemDisbursement,
          costAud: this.newRow.costAud,
          total: this.newRow.costAud,
        });
        // console.log(this.rows);
        this.newRow.itemDisbursement = "";
        this.newRow.costAud = "";
      }
    },
    addRow2() {
      if (this.newRow2.itemDisbursement && this.newRow2.costAud) {
        this.rows2.push({
          itemDisbursement: this.newRow2.itemDisbursement,
          costAud: this.newRow2.costAud,
          total: this.newRow2.costAud,
        });
        // console.log(this.rows);
        this.newRow2.itemDisbursement = "";
        this.newRow2.costAud = "";
      }
    },
    addRow3() {
      // console.log('clicked');
      if (
        this.newRow3.title &&
        this.newRow3.hourlyRate &&
        this.newRow3.estimatedHours
      ) {
        this.rows3.push({
          title: this.newRow3.title,
          hourlyRate: this.newRow3.hourlyRate,
          estimatedHours: this.newRow3.estimatedHours,
        });
        // console.log(this.rows3);
        this.newRow3.title = "";
        this.newRow3.hourlyRate = "";
        this.newRow3.estimatedHours = "";
      }
    },

    removeRow(index) {
      this.rows.splice(index, 1);
    },
    removeRow2(index) {
      this.rows2.splice(index, 1);
    },
    removeRow3(index) {
      this.rows3.splice(index, 1);
    },

    nextStep() {
      if (this.currentStep === 3) {
        this.submitStepForm();
        // console.log(this.form);
        // console.log("Done: ", JSON.stringify(values, null, 1));
        // console.log('test', values);

        return;
      }

      this.currentStep++;
    },

    prevStep() {
      // alert('asd', this.selectedOption)
      if (this.selectedOption == "Pro") {
        this.currentStep = 0;
        return;
      }
      if (this.currentStep <= 0) {
        return;
      }

      this.currentStep--;
    },
    proStep() {
      if (this.currentStep == 0) {
        this.currentStep = 2;
      }
    },
    proPrevStep() {
      alert("asd", this.currentStep);
      console.log("asdasd", this.currentStep);
      if (this.currentStep == 2) {
        this.currentStep = 0;
      }
    },

    showItemise() {
      this.divItemiseVisible = !this.divItemiseVisible;
    },
    showEarner() {
      this.divEarnerVisible = !this.divEarnerVisible;
    },

    updateDivContent() {
      // No need to update divContent; we're using v-if to conditionally render divs.
    },
    setPayment(value) {
      this.payment = value;
    },
    setTeam(value) {
      this.team = value;
    },
    setPay(value) {
      this.pay = value;
    },
    setPaySucc(value) {
      this.paySucc = value;
    },
    setOption(value) {
      this.option = value;
    },
    showElement(value) {
      this.isVisible = value;
    },
    showDeadline(value) {
      this.deadline = value;
    },
    // decimal logic
    limitNumber(event) {
      let value = event.target.value;
      if (value < 0 && value == null) {
        this.uplift_percentage = null;
      } else if (value > 25) {
        this.form.uplift_percentage = 25;
      } else {
        this.form.uplift_percentage = value;
      }
    },

    openRequirementsModal(data) {
      let newData = {};

      if (data && typeof data === "object") {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (
              value !== null &&
              key != "id" &&
              key != "job_id" &&
              key != "user_id" &&
              key != "created_at" &&
              key != "updated_at"
            ) {
              newData[key] = value;
            }
          }
        }
      }

      // Construct HTML dynamically for key-value pairs

      // let data2 = Object.fromEntries(data);
      // console.log('v : ' , data2);
      // data.filter((value) => {
      //   console.log('filter : ', value);
      //   return value !== null;
      // });

      // const filteredData = Object.fromEntries(
      //   Object.entries(data).filter(([value]) => value !== null)
      // );

      const htmlContent = Object.entries(newData)
        .map(
          ([key, value]) =>
            `<div class="wrapper" v-if="value != null"><h6><b>${key}: </b><span>${value}</span></h6></div>`
        )
        .join("");

      // Use dynamic HTML inside SweetAlert2 modal
      this.$swal.fire({
        title: "Accessibility Requirements",
        html: `<div class="table-wrap" style="text-align:left !important;">${htmlContent}</div>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: "my-swal-container", // You can define your custom class for styling
        },
      });
    },
  },
  name: "DashboardTab",
};
</script>

<style scoped>
.b-round-start {
  border-radius: 5px 0 0 5px;
}

.b-round-end {
  border-radius: 0 5px 5px 0;
}

.stepbtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stepbtn .mr {
  margin-right: 10px;
}

.btn {
  padding: 5px 25px;
  border-radius: 20px;
}

#successFeeTerms {
  min-height: 120px;
}

/* #mainForm #upfrontPayRadio .stepbtn {
  display: none;
} */
#upfrontPayRadio + .stepbtn {
  display: none;
}

#mainForm label {
  font-size: 15px;
}

.d-span {
  line-height: 39px !important;
  padding: 0px 13px;
}

.d-input {
  padding-left: 25px;
  line-height: 26px !important;
}

.footer-ct {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.f-main {
  min-height: 100vh;
  position: relative;
}

.f-pt {
  padding-bottom: 70px;
}

input[type="radio"]:checked {
  filter: grayscale(100%) contrast(200%);
}

.cardProposalDes {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 145px;
  /* line-break: anywhere; */
  overflow-y: auto;
  padding-right: 10px;
  margin-right: 5px;
}

.cardProposalDes::-webkit-scrollbar {
  width: 10px;
  border-radius: 10px;
}

.cardProposalDes::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.cardProposalDes::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 10px;
}

.smallFont {
  font-size: 12px;
  margin: 0 0 5px 0;
}

.spacer {
  margin: 20px 0 5px 0;
  display: block;
}

#addFeeEarnersRow td {
  line-height: 34px;
}

/* #addFeeEarnersRow td:last-child {
  line-height: 22px;
}

#addFeeEarnersRow td:last-child p {
  margin-top: 4px;
} */
.btn-itemize-total {
  /* max-width: max-content;
    min-width: 300px; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
}

.pagination-indicator {
  border: 1px solid #000;
  border-radius: 50px;
  padding: 2px 8px;
  font-size: 13px;
}

.upfrontlab {
  width: 80px;
  text-align: center;
  margin-left: -25px;
  z-index: 9;
  position: relative;
}

/* table {
    border: 1px solid #dee2e6;
}*/
th,
td {
  border: 0;
}

.gstStyle {
  font-size: 12px;
  color: #000000;
}

/* @media only screen and (max-width: 385px) {} */
/* .extra-class{
  width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
} */
.extra-class1 {
  border-radius: 5px;
}

.custom-pad {
  padding: 5px 10px;
  border-radius: 0.25rem;
}

.charge-drop:focus {
  box-shadow: none;
}

/* @media only screen and (max-width: 600px) {
  .extra-class th , .extra-class td , .extra-class td i{
  font-size: 13px;
}
 .extra-class{
  width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.table-responsive .table , .table-responsive .table th , .table-responsive .table td{
  width:1%;
    white-space: nowrap;
}
}
@media only screen and (max-width: 400px) {
.table-responsive .table , .table-responsive .table th , .table-responsive .table td{
  width:1%;
    white-space: nowrap;
}
} */

.hourlycost thead,.hourlycost tbody tr {
  display:table;
  width: 100%;
}
</style>
