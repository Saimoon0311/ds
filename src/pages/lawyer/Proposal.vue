<template>
  <LawyerHeader />
  <div class="f-main">
    <div class="container">
      <h6 class="fs-3 text-center mt-4">Submit a proposal</h6>
      
      <ShowJobDetails :jobData="jobData" />
      
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
                    v-model="form.days"
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
                            
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="newRow.gst_not_applicable"
                          :value="true"
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
                            <td>$ {{ row.costAud }}{{ row.gst_not_applicable ? '*' : '' }}</td>
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
                  <!-- daily rate already used -->
                  <input
                    type="number"
                    id="fixedFeeAmount"
                    v-model="form.retainer_fee"
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
                      v-model="form.retainer_period"
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
                      v-model="form.retainer_limitation"
                      name="fixedFeeAmount"
                      class="form-control"
                      placeholder="Eg: up to 20 hours"
                    />
                  </div>
                  <label> Termination notice period: </label>
                  <div class="mb-3">
                    <input
                      type="text"
                      v-model="form.notice_period"
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
                            
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="newRow.gst_not_applicable"
                          :value="true"
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
                            <td>$ {{ row.costAud }}{{ row.gst_not_applicable ? '*' : '' }}</td>
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
                        $ {{ grandTotal2 }}
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
                            
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="newRow.gst_not_applicable"
                          :value="true"
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
                            <td>$ {{ row.costAud }}{{ row.gst_not_applicable ? '*' : '' }}</td>
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
                            
                            
                          />
                        </div>
                      </label>

                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="newRow.gst_not_applicable"
                          :value="true"
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
                            <td>$ {{ row.costAud }}{{ row.gst_not_applicable ? '*' : '' }}</td>
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
                        
                      />
                    </label>
                    <br />
                    <br />
                    <button v-if="editRow != null" type="button" @click="updateRow3" class="btn btn-dark">
                      Update
                    </button>
                    <button v-else type="button" @click="addRow3" class="btn btn-dark">
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
                              @click="editRow3(index)"
                              >
                              <i class="fa fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-default btn-circle p-1"
                              @click="removeRow3(index)"
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
                            $ {{ grandTotal3 }}
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
                      v-model="form.hourly_rate"
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
                    v-model="form.hours"
                    min="1"
                    step="0.01"
                    class="form-control"
                  required

                  />

                  <br />
                </div>

                <!-- input field to capture final hourly rate value during form submit -->
                <!-- <p id="finalHourlyRateText">
                  Total: $<input
                    id="finalHourlyRateValue"
                    name="finalHourlyRateValue"
                    type="number"
                    readonly=""
                    class="border-0 text-dark bg-white"
                  />
                </p> -->
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
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="newRow.gst_not_applicable"
                          :value="true"
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
                          <td>$ {{ row.costAud }}{{ row.gst_not_applicable ? '*' : '' }}</td>
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
                  v-model="form.estimated_fee"
                  id="estimated_fee"
                  name="estimated_fee"
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
                          />
                        </div>
                      </label>
                      <br />
                      <div class="form-check text-start mt-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="newRow.gst_not_applicable"
                          :value="true"
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
                          <td>$ {{ row.costAud }}{{ row.gst_not_applicable ? '*' : '' }}</td>
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
                        v-model="newRow.gst_not_applicable"
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
                        <td>$ {{ row.costAud }}{{ row.gst_not_applicable ? '*' : '' }}</td>
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
                class="btn text-black border mr"
              >
                Previous
              </button>
              <button
                v-if="currentStep !== 1"
                type="submit"
                @click="proStep"
                :disabled="!selectedOption"
                class="btn btn-bg"
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
          <div class="summ mb-3">
              <p class="h4 text-start fw-bold mb-3 mt-2">Summary</p>


                      <div v-if="form.hours" >
                        <p> <span> Hours:</span>  <span>{{form.hours }}</span></p>
                      </div>

                      <div v-if="form.hourly_rate">
                        <p> <span> Hourly Rate:</span>  <span>{{ form.hourly_rate }}</span></p>
                      </div>

                      <div v-if="form.retainer_period">
                        <p> <span> Retainer Peiod:</span>  <span>{{ form.retainer_period }}</span></p>
                      </div>

                      <div v-if="form.retainer_limitation">
                        <p> <span> Retainer Liitation:</span>  <span> {{ form.retainer_limitation }}</span></p>
                      </div>

                      <div v-if="form.notice_period">
                        <p> <span> Notice Perid:</span>  <span>{{ form.notice_period }}</span></p>
                      </div>

                      <div v-if="form.retainer_fee">
                        <p> <span> Retainer Fee:</span>  <span>{{ form.retainer_fee }}</span></p>
                      </div>

                      <div v-if="form.days">
                        <p> <span> Days:</span>  <span>{{ form.days }}</span></p>
                      </div>

                      <div v-if="form.charge_type">
                        <p> <span> Charge Type:</span>  <span>{{ form.charge_type }}</span></p>
                      </div>

                      <div v-if="form.fixed_fee_amount">
                        <p> <span> Fixed Fee Aount:</span>  <span>{{ form.fixed_fee_amount }}</span></p>
                      </div>

                      <div v-if="form.disbursement_amount">
                        <p> <span> Disbursemen Amount:</span>  <span>{{ form.disbursement_amount }}</span></p>
                      </div>

                      <div v-if="form.law_practice_cost">
                        <p> <span> Law Practic Cost:</span>  <span>{{ form.law_practice_cost }}</span></p>
                      </div>

                      <div v-if="form.fee_earners">
                        <p> <span> Fee Earners:</span>  <span>{{ form.fee_earners }}</span></p>
                      </div>

                      <div v-if="form.daily_rate">
                        <p> <span> Daily Rate:</span>   <span>{{ form.daily_rate }}</span></p>
                      </div>

                      <div v-if="form.uplift_percentage">
                        <p> <span>  Uplift Perentage:</span>  <span>{{ form.uplift_percentage }}</span></p>
                      </div>

                      <div v-if="form.estimated_fee">
                        <p> <span> Estimated Fee:</span>  <span>{{ form.estimated_fee }}</span></p>
                      </div>

                      <div v-if="form.success_fee_term">
                        <p> <span> Success FeeTerm:</span> <span>{{ form.success_fee_term }}</span></p>
                      </div>

                      <div v-if="form.pro_bono_description">
                        <p> <span> Pro Bono Decription:</span>  <span>{{ form.pro_bono_description }}</span></p>
                      </div>

                      <div v-if="form.meet_deadlines">
                        <p> <span> Meet Deadlies:</span>  <span>{{ form.meet_deadlines }}</span></p>
                      </div>

                      <div v-if="form.miss_deadline_reason">
                        <p> <span> Miss Deadlie Reason:</span>  <span>{{ form.miss_deadline_reason }}</span></p>
                      </div>

                      <div v-if="form.upfront_payment_status">
                        <p> <span> Upfront Payent Status:</span>  <span>{{ form.upfront_payment_status }}</span></p>
                      </div>

                      <div v-if="form.upfront_payment">
                        <p> <span> Upfront Payent:</span>  <span>{{ form.upfront_payment }}</span></p>
                      </div>

                      <div v-if="form.consultation">
                        <p> <span> Consultation:</span> <span>{{ form.consultation }}</span></p>
                      </div>

                      <div v-if="form.consultation_time_limit">
                        <p> <span> Consultatio Time Limit:</span>  <span>{{ form.consultation_time_limit }}</span></p>
                      </div>

                      <div v-html="summaryHtml">
                      </div>

                      <div v-if="form.description" class="sumdesc">
                        <p><b> Description:</b>  </p>
                        <p class="descriptionText">{{ form.description }} </p>
                      </div>

                      


              <!-- hours : null,
        hourly_rate : null,
        retainer_period: null,
        retainer_limitation: null,
        notice_period : null,
        retainer_fee : null,
        days : null,
        charge_type: null,
        fixed_fee_amount: null,
        disbursement_amount: null,
        law_practice_cost: null,
        fee_earners: "me",
        daily_rate: null,
        uplift_percentage: null,
        estimated_fee: null,
        success_fee_term: null,
        pro_bono_description: null,
        meet_deadlines: null,
        miss_deadline_reason: null,
        upfront_payment_status: "yes",
        upfront_payment: null,
        consultation: null,
        consultation_time_limit: null,
        description: null,
        lawyer_id: null,
        job_id: null, -->


              <!-- <div class="sum-top mb-3">
                <p class="areas text-decoration-none badge text-white fs-6 bubbles area-bubble">
                  {{ otherAreaSelected ? "Other (not listed here) / I don't know" : areas[selectedAreaIndex].title }}
                </p>
                <h4 class=" text-center title-font text-white mt-1 mb-2"><b>{{ title }}</b>
                </h4>
                <h4 class="text-white descriptionText">{{ description }}</h4>
              </div> -->

              <!-- <h4 class="mb-3 text-capitalize"><b>Location</b>: {{ city }}, {{ locations[selectedLocationIndex].title }}
              </h4> -->
              <!-- <div v-if='this.visualOption != "" ||
                this.auditoryOption != "" ||
                this.mobilityOption != "" ||
                this.learningOption != "" ||
                this.intellectualOption != "" ||
                this.psychiatricOption != "" ||
                this.medicalOption != "" ||
                this.requirementsOptionDescription != "" ||
                this.otherLanguage != "" ||
                this.selectedLanguage != ""' class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button " type="button" data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne">
                      <b>Accessibility Requirements </b>
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show "
                    aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                      <div v-if="VisualIsChecked">
                        <p><i class="fa fa-check"></i><b> Visual Impairment: </b> {{ visualOption }}</p>
                      </div>

                      <div v-if="AuditoryIsChecked">
                        <p><i class="fa fa-check"></i><b> Auditory Impairment: </b> {{ auditoryOption }}</p>

                      </div>

                      <div v-if="MobilityIsChecked">
                        <p><i class="fa fa-check"></i><b> Mobility/Physical Impairment: </b> {{ mobilityOption }}</p>
                      </div>

                      <div v-if="LearningIsChecked">
                        <p><i class="fa fa-check"></i><b> Learning Impairment: </b> {{ learningOption }}</p>
                      </div>

                      <div v-if="IntellectualIsChecked">
                        <p><i class="fa fa-check"></i><b> Intellectual Disability: </b> {{ intellectualOption }}</p>
                      </div>

                      <div v-if="PsychiatricIsChecked">
                        <p><i class="fa fa-check"></i><b> Psychiatric Disability: </b> {{ psychiatricOption }}</p>
                      </div>

                      <div v-if="MedicalIsChecked">
                        <p><i class="fa fa-check"></i><b> Medical Disability: </b> {{ medicalOption }}</p>
                      </div>

                      <div v-if="isChecked">
                        <p><i class="fa fa-check"></i><b> Other: </b> {{ requirementsOptionDescription }}</p>
                      </div>

                      <div v-if="languageIsChecked">
                        <p><i class="fa fa-check"></i><b> Language: </b> {{ selectedLanguage == 'Other' ? otherLanguage :
                          selectedLanguage }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
      </template>

        <div class="stepbtn mt-3">
          <span v-if="selectedOption == 'Pro'">
            <span class="pagination-indicator"> {{ 2 }} of {{ 2 }} </span>
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
              class="btn border mr text-black"
            >
              Previous
            </button>
            <button
              type="submit"
              :disabled="!selectedOption"
              class="btn btn-bg"
            >
              {{ buttonText }}
            </button>
            <!-- v-if="currentStep !== 3" -->
            <!-- <button v-if="currentStep === 3" class="btn btn-dark">
              Summary
            </button> -->
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

import ShowJobDetails from "../../components/ShowJobDetails";

</script>
<script>
import LawyerHeader from "./Header.vue";
import api from "@/config/api";


export default {

  data() {
 
    return {
      editRow : null,
      summaryHtml : null,
      form: {
        hours : null,
        hourly_rate : null,
        retainer_period: null,
        retainer_limitation: null,
        notice_period : null,
        retainer_fee : null,
        days : null,
        charge_type: null,
        fixed_fee_amount: null,
        disbursement_amount: null,
        law_practice_cost: null,
        fee_earners: "me",
        daily_rate: null,
        uplift_percentage: null,
        estimated_fee: null,
        success_fee_term: null,
        pro_bono_description: null,
        meet_deadlines: null,
        miss_deadline_reason: null,
        upfront_payment_status: "yes",
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
        gst_not_applicable : false,
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

    buttonText() {
      if (this.currentStep === 0 || this.currentStep === 1) {
        return 'Next';
      } else if (this.currentStep === 2) {
        return 'Summary';
      } else if (this.currentStep === 3) {
        return 'Submit';
      } else {
        // Add a default value if needed
        return 'Unknown';
      }
    },

    // fixedFeeAmountValue() {
    //   // if (!isNaN(this.form?.fixed_fee_amount)) {
    //     this.form.fixed_fee_amount = parseFloat(this.form?.fixed_fee_amount).toFixed(2); 
        
    //     // console.log(parseFloat(this.form?.fixed_fee_amount).toFixed(2));
    //     // return parseFloat(this.form?.fixed_fee_amount).toFixed(2);
    //   // } else {
    //     // return 'Invalid Input';
    //   // }
    // },

    // formValues() {
    //     return {
    //       ...this.form,
    //     }
    // },
    jobData() {
      console.log('job data : ' , this.$store.state.jobData);
      return this.$store.state.jobData;
    },
    loginUser() {
      return this.$store.state.loginUser;
    },

    // disbursment
    grandTotal() {
      return this.rows.reduce(
        (total, row) => total + parseFloat(row.costAud) || 0,
        0
      );
    },

    // item by item specific tasks
    grandTotal2() {
      return this.rows2.reduce(
        (total, row) => total + parseFloat(row.costAud) || 0,
        0
      );
    },

    // additional fee earner
    grandTotal3() {
      return this.rows3.reduce(
        (total, row) => total + parseFloat(row.hourlyRate * row.estimatedHours) || 0,
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
    ShowJobDetails
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
    openSummaryTab(){
      this.summaryHtml = this.openProposalDetailsModal({'specific_tasks' : this.rows2 , 'disbursements' : this.rows , 'fee_earners' : this.rows3},true)
    },

    handleOptionChange() {
      this.currentSchema = this.selectedOption;
      console.log("schema", this.currentSchema);
      // console.log('schema', this.selectedOption);
    },
    async submitStepForm() {
      console.log('form data : ' , this.form);
      console.log(api);


      // charge_type
      // fixed_fee_amount
      // disbursement_amount
      // disbursements (array of object)
      // upfront_payment
      // description




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

      // console.log(this.formValues);

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
          gst_not_applicable: this.newRow.gst_not_applicable,
          total: this.newRow.costAud,
        });
        // console.log(this.rows);
        this.newRow.itemDisbursement = "";
        this.newRow.costAud = "";
        this.newRow.gst_not_applicable = "";
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

    editRow3(index){
      console.log(index);
      this.editRow = index;
      console.log('row s 3 : ' , this.rows3[index]);
      this.newRow3.title = this.rows3[index].title;
      this.newRow3.hourlyRate = this.rows3[index].hourlyRate;
      this.newRow3.estimatedHours = this.rows3[index].estimatedHours;
    },

    updateRow3(){
      if (
        this.newRow3.title &&
        this.newRow3.hourlyRate &&
        this.newRow3.estimatedHours
      ) {
        const obj = {
          title: this.newRow3.title,
          hourlyRate: this.newRow3.hourlyRate,
          estimatedHours: this.newRow3.estimatedHours,
        }
        this.rows3[this.editRow] = obj;
        this.newRow3.title = "";
        this.newRow3.hourlyRate = "";
        this.newRow3.estimatedHours = "";
        this.editRow = null;
      }

    },

    nextStep() {
      if (this.currentStep === 3) {
        this.submitStepForm();
        // console.log(this.form);
        // console.log("Done: ", JSON.stringify(values, null, 1));
        // console.log('test', values);

        return;
      }

      if(this.currentStep == 2){
        this.openSummaryTab();
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

  },
  name: "DashboardTab",
};
</script>

<style scoped>
.summ div p {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;

}
.summ .sumdesc p{
  display: block !important;
}
.summ .table-wrap h5{
  font-size: 18px;
  font-weight: 600;
}
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
  border-radius: 5px;
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
.descriptionText {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100px;
  /* line-break: anywhere; */
  overflow-y: auto;
  padding-right: 10px;
  margin-right: 5px;
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
.btn-bg{
  background: rgba(55, 59, 62, 1) !important;
  color: white !important;
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
@media only screen and (max-width: 992px) {
  form#mainForm {
    width: 70%;
}
}
@media only screen and (max-width: 767px) {
  form#mainForm {
    width: unset;
}
}
</style>
