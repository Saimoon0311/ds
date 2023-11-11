<template>
  :
  <LawyerHeader />
  <div class="f-main">
    <div class="container">
      <h6 class="fs-3 text-center mt-4">Submit a proposal</h6>
      <div
        class="d-flex justify-content-between border rounded bg-secondary text-white p-3 text-start col-md-7 m-auto mt-3"
        id="28">
        <div>
          <p class="badge bg-dark" title="Area">{{ jobData?.field?.title }}</p>
          &nbsp;
          <p class="badge bg-dark" title="Location">{{ jobData?.location?.title }}</p>
          <!-- <p><b>City/suburb:</b> {{ jobData?.identity }}</p>
          <p><b>City/suburb:</b> {{ jobData?.city }}</p>
          <p><b>City/suburb:</b> {{ jobData?.title }}</p>
          <p></p> -->

          <p><b>Serial No:</b> {{ jobData?.identity }}</p>
          <p><b>City/suburb:</b> {{ jobData?.city }}</p>
          <p><b>Title:</b> {{ jobData?.title }}</p>
          <p><b>Created:</b> {{ formatCreatedAt(jobData?.created_at) }} </p>
          <p id="description28" style="overflow: hidden; text-overflow: ellipsis; height: 100px">
            {{ jobData?.description }}
          </p>
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
    <div class="container f-pt">
      <Form @submit="nextStep" :validation-schema="currentSchema" keep-values id="mainForm"
        class="text-start border rounded p-3 d-inline-block m-3 col-md-7 m-auto flex-wrap flex-column d-flex mt-3">
        <template v-if="currentStep === 0">
          <div class="form-group mb-4">
            <label>How will you charge?<sup><code>*</code></sup></label>
            <div class="dropdown bootstrap-select w-100 border rounded dropup">
              <select class="selectpicker w-100 border rounded p-1" name="chargeType" id="charge-category-select"
                v-model="selectedOption" @change="handleOptionChange" required="" tabindex="null">
                <option disabled selected value="">Select an option</option>
                <option value="Fixed">Fixed fee</option>
                <option value="Hourly">Hourly rate</option>
                <option value="Daily">Daily rate</option>
                <option value="Item">Item by item for specific task</option>
                <option value="Success">Success fee</option>
                <option value="Pro">Pro bono</option>
              </select>
              <div class="dropdown-menu" style="max-height: 434.781px; overflow: hidden; min-height: 114px"></div>
            </div>
          </div>
          <div>
            <!-- If they select ‘Daily Rate’ -->
            <div class="form-group" id="fixed-fee" v-if="selectedOption === 'Daily'">
              <div>
                <label> Daily Rate </label>
                <div>
                  <span class="position-absolute d-span"> $</span>
                  <input type="number" id="fixedFeeAmount" v-model="form.daily_rate" name="fixedFeeAmount"
                    class="form-control d-input" min="1" step=".01" placeholder="" />
                </div>
              </div>
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label> What is the estimated amount for disbursements (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.disbursement_amount" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                  <button class="btn btn-dark mt-3 mb-3" type="button" @click="showItemise">Itemise Disbursements</button>
                  <!-- <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">  
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Task:<sup><code>*</code></sup>
                        <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Item one " class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (AUD):<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">
                            $</span>
                          <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number"
                            class="form-control d-input" required />
                        </div>
                      </label>
                      <br />

                      <br />
                      <button type="button" class="btn btn-dark ">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th>Item Disbursement</th>
                          <th>Cost (AUD)</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                                id="finalHourlyRateMultiple">0</span></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div> -->

                  <!-- hammad -->
                  <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input v-model="newRow.itemDisbursement" placeholder="Eg: filing fees" class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        cost: (excluding GST)<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">$</span>
                          <input v-model="newRow.costAud" min="1" type="number" class="form-control d-input" required />
                        </div>
                      </label>
                      <br />
                      <br />
                      <button type="button" @click="addRow" class="btn btn-dark">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Item Disbursement</th>
                          <th>Cost</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr v-for="(row, index) in rows" :key="index">
                          <td style="width:0px"><button type="button" @click="removeRow(index)"
                              class="btn btn-default btn-circle"><i class="fa fa-close"></i></button></td>
                          <td>{{ row.itemDisbursement }}</td>
                          <td>{{ row.costAud }}</td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ grandTotal }}</p>
                  </div>
                </div>

                <!-- <div class="form-group mb-3">
                  <label>What is the estimated total cost of barrister or other law practice (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.law_practice_cost" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                </div> -->

              </div>
            </div>


            <!-- If they select item by item -->
            <div class="form-group" id="fixed-fee" v-if="selectedOption === 'Item'">



              <div class="" id="additionalFeeEarners">
                <fieldset class="border p-2 my-2  bg-light text-center" style="margin: auto">
                  <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem"> Item by Item for Specific
                    Tasks</legend>
                  <label class="w-100 text-start">
                    Item:<sup><code>*</code></sup>
                    <input v-model="newRow2.itemDisbursement" placeholder="Eg: letter of advice" class="form-control"
                      required />
                  </label>
                  <br />
                  <br />
                  <label class="w-100 text-start">
                    Fee: (excluding GST and disbursements)<sup><code>*</code></sup>
                    <div>
                      <span class="position-absolute d-span" style="line-height: 36px">$</span>
                      <input v-model="newRow2.costAud" min="1" type="number" class="form-control d-input" required />
                    </div>
                  </label>
                  <br />
                  <br />
                  <button type="button" @click="addRow2" class="btn btn-dark">Add</button>
                </fieldset>

                <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Item </th>
                      <th>Fee (excluding GST)</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody id="addFeeEarnersRow">
                    <tr v-for="(row, index) in rows2" :key="index">
                      <td style="width:0px"><button type="button" @click="removeRow2(index)"
                          class="btn btn-default btn-circle"><i class="fa fa-close"></i></button></td>
                      <td>{{ row.itemDisbursement }}</td>
                      <td>{{ row.costAud }}</td>
                      <td>
                        <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ grandTotal2 }}</p>
              </div>



              <!-- <div class="" id="additionalFeeEarners">
                <fieldset class="border p-2 my-2  bg-light text-center" style="margin: auto">
                  <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                    Item by Item for Specific Tasks
                  </legend>
                  <label class="w-100 text-start">
                    Task:<sup><code>*</code></sup>
                    <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Task one " class="form-control"
                      required />
                  </label>
                  <br />
                  <br />
                  <label class="w-100 text-start">
                    Cost (AUD):<sup><code>*</code></sup>
                    <div>
                      <span class="position-absolute d-span">
                        $</span>
                      <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number" class="form-control d-input"
                        required />
                    </div>
                  </label>
                  <br />

                  <br />
                  <button type="button" class="btn btn-dark">Add</button>
                </fieldset>

                <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Cost (AUD)</th>

                      <th>Total</th>

                    </tr>
                  </thead>
                  <tbody id="addFeeEarnersRow">
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                            id="finalHourlyRateMultiple">0</span></p>
                      </td>
                    </tr>
                  </tbody>
                </table>


              </div> -->
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label> What is the estimated amount for disbursements (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.disbursement_amount" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                  <button class="btn btn-dark mt-3 mb-3" type="button" @click="showItemise">Itemise Disbursements</button>
                  <!-- <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Task:<sup><code>*</code></sup>
                        <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Item one " class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (AUD):<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">
                            $</span>
                          <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number"
                            class="form-control d-input" required />
                        </div>
                      </label>
                      <br />

                      <br />
                      <button type="button" class="btn btn-dark ">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th>Item Disbursement</th>
                          <th>Cost (AUD)</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                                id="finalHourlyRateMultiple">0</span></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div> -->

                  <!-- hammad -->
                  <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input v-model="newRow.itemDisbursement" placeholder="Eg: filing fees" class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost: (excluding GST)<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">$</span>
                          <input v-model="newRow.costAud" min="1" type="number" class="form-control d-input" required />
                        </div>
                      </label>
                      <br />
                      <br />
                      <button type="button" @click="addRow" class="btn btn-dark">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Item Disbursement</th>
                          <th>Cost</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr v-for="(row, index) in rows" :key="index">
                          <td style="width:0px"><button type="button" @click="removeRow(index)"
                              class="btn btn-default btn-circle"><i class="fa fa-close"></i></button></td>
                          <td>{{ row.itemDisbursement }}</td>
                          <td>{{ row.costAud }}</td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ grandTotal }}</p>
                  </div>
                </div>

                <!-- <div class="form-group mb-3">
                  <label>What is the estimated total cost of barrister or other law practice (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.law_practice_cost" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                </div> -->

              </div>
            </div>

            <!-- If they select ‘Fixed fee’ -->
            <div class="form-group" id="fixed-fee" v-if="selectedOption === 'Fixed'">
              <label>Fixed fee amount (excluding GST and disbursements):<sup><code>*</code></sup></label>
              <div>
                <span class="position-absolute d-span"> $</span>
                <input type="number" id="fixedFeeAmount" v-model="form.fixed_fee_amount" name="fixedFeeAmount"
                  class="form-control d-input" min="1" step=".01" />
              </div>
              <br />
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label> What is the estimated amount for disbursements (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.disbursement_amount" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                  <button class="btn btn-dark mt-3 mb-3" type="button" @click="showItemise">Itemise Disbursements</button>
                  <!-- <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Task:<sup><code>*</code></sup>
                        <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Item one " class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (AUD):<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">
                            $</span>
                          <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number"
                            class="form-control d-input" required />
                        </div>
                      </label>
                      <br />

                      <br />
                      <button type="button" class="btn btn-dark ">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th>Item Disbursement</th>
                          <th>Cost (AUD)</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                                id="finalHourlyRateMultiple">0</span></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div> -->

                  <!-- hammad -->
                  <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input v-model="newRow.itemDisbursement" placeholder="Eg: filing fees" class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost: (excluding GST)<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">$</span>
                          <input v-model="newRow.costAud" min="1" type="number" class="form-control d-input" required />
                        </div>
                      </label>
                      <br />
                      <br />
                      <button type="button" @click="addRow" class="btn btn-dark">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Item Disbursement</th>
                          <th>Cost</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr v-for="(row, index) in rows" :key="index">
                          <td style="width:0px"><button type="button" @click="removeRow(index)"
                              class="btn btn-default btn-circle"><i class="fa fa-close"></i></button></td>
                          <td>{{ row.itemDisbursement }}</td>
                          <td>{{ row.costAud }}</td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ grandTotal }}</p>
                  </div>


                </div>

                <!-- <div class="form-group mb-3">
                  <label>What is the estimated total cost of barrister or other law practice (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.law_practice_cost" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                </div> -->

              </div>

              <!-- <div class="my-3">
                <label>Do you require an upfront payment?<sup><code>*</code></sup></label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontYes" value="yes"
                    checked="" />
                  <label class="form-check-label" for="upfrontYes" @click="setPayment('Yes')">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontNo" value="no" />
                  <label class="form-check-label" for="upfrontNo" @click="setPayment('No')">
                    No
                  </label>
                </div>

                <div class="my-3" id="upfrontPayAmount" v-if="payment === 'Yes'">
                  <label>How much upfront payment do you require?<sup><code>*</code></sup></label>
                  <div>
                    <span class="position-absolute d-span">$</span>
                    <input id="upfrontAmount" name="upfrontAmount" type="number" min="1" step=".01"
                      class="form-control d-input" />
                  </div>
                </div>
              </div> -->
            </div>

            <!-- If they select ‘Hourly rate’ -->
            <div class="form-group" id="hourly-rate" v-if="selectedOption === 'Hourly'">
              <div class="form-group mb-3" id="addAdditionalFeeEarnersRadio">
                How many fee earners will be working on this matter?
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="radio" v-model="form.fee_earners" value="me" name="noOfFeeEarners"
                      class="form-check-input" id="radioNoOfFeeEarnersSingle" checked="" @click="showElement('Yes')" />
                    Just me
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="radio" name="noOfFeeEarners" v-model="form.fee_earners" value="team"
                      class="form-check-input" id="radioNoOfFeeEarnersMultiple" @click="showElement('No')" />
                    I'm part of a team
                  </label>
                </div>
              </div>

              <div class="" id="additionalFeeEarners" v-if="isVisible === 'No'">
                <!-- <fieldset class="border p-2 my-2 bg-light text-center " style="margin: auto">
                  <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                    Add additional fee earner
                  </legend>
                  <label class="w-100 text-start">
                    Title:<sup><code>*</code></sup>
                    <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Associate" class="form-control"
                      required />
                  </label>
                  <br />
                  <br />
                  <label class="w-100 text-start">
                    Hourly rate (in AUD excluding GST):<sup><code>*</code></sup>
                    <div>
                      <span class="position-absolute d-span">
                        $</span>
                      <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number" class="form-control d-input"
                        required />
                    </div>
                  </label>
                  <br />
                  <br />
                  <label class="w-100 text-start">
                    Estimated number of hours:<sup><code>*</code></sup>
                    <input id="feeEarnerEstimatedHours" min="1" autocomplete="on" type="number" class="form-control"
                      required />
                  </label>
                  <br />
                  <br />
                  <button type="button" class="btn btn-dark">Add</button>
                </fieldset> -->


                <fieldset class="border p-2 my-2 bg-light text-center " style="margin: auto">
                  <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                    Add fee earner
                  </legend>
                  <label class="w-100 text-start">
                    Title:<sup><code>*</code></sup>
                    <input v-model="newRow3.title" autocomplete="on" placeholder="Eg: Associate" class="form-control"
                      required />
                  </label>
                  <br />
                  <br />
                  <label class="w-100 text-start">
                    Hourly rate (excluding GST):<sup><code>*</code></sup>
                    <div>
                      <span class="position-absolute d-span">$</span>
                      <input v-model="newRow3.hourlyRate" min="1" autocomplete="on" type="number"
                        class="form-control d-input" required />
                    </div>
                  </label>
                  <br />
                  <br />
                  <label class="w-100 text-start">
                    Estimated number of hours:<sup><code>*</code></sup>
                    <input v-model="newRow3.estimatedHours" min="1" autocomplete="on" type="number" class="form-control"
                      required />
                  </label>
                  <br />
                  <br />
                  <button type="button" @click="addRow3" class="btn btn-dark">Add</button>
                </fieldset>

                <!-- <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Hourly rate (in AUD excluding GST)</th>
                      <th>Estimated number of hours</th>
                      <th>Total</th>

                    </tr>
                  </thead>
                  <tbody id="addFeeEarnersRow">
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                            id="finalHourlyRateMultiple">0</span></p>
                      </td>
                    </tr>
                  </tbody>
                </table> -->


                <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Hourly rate (excluding GST)</th>
                      <th>Estimated number of hours</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody id="addFeeEarnersRow">
                    <tr v-for="(row, index) in rows3" :key="index">
                      <td>{{ row.title }}</td>
                      <td>{{ row.hourlyRate }}</td>
                      <td>{{ row.estimatedHours }}</td>
                      <td>
                        <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>


              </div>

              <div v-if="isVisible === 'Yes'">
                <!-- Invisible filed for posting additional fee earners info -->
                <input class="d-none" name="feeEarnersInfo" id="feeEarnersInfo" />

                <div id="hourlyRateIndividual">
                  <label>Hourly rate (in AUD excluding GST):<sup><code>*</code></sup></label>
                  <div>
                    <span class="position-absolute d-span">
                      $</span>
                    <input type="number" id="hourlyRate" v-model="form.fee_earners" name="hourlyRate" min="1" step="0.01"
                      class="form-control d-input" oninput="updateHourlyRateIndividual()" />
                  </div>

                  <br />

                  <label>Estimated number of hours<sup><code>*</code></sup></label>
                  <input type="number" id="noOfHours" name="noOfHours" min="1" step="0.01" class="form-control"
                    oninput="updateHourlyRateIndividual()" />

                  <br />
                </div>

                <!-- input field to capture final hourly rate value during form submit -->
                <p id="finalHourlyRateText">
                  Total: $<input id="finalHourlyRateValue" name="finalHourlyRateValue" type="number" readonly=""
                    class="border-0 text-dark bg-white" />
                </p>
              </div>
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label> What is the estimated amount for disbursements (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.disbursement_amount" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                  <button class="btn btn-dark mt-3 mb-3" type="button" @click="showItemise">Itemise Disbursements</button>
                  <!-- <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Task:<sup><code>*</code></sup>
                        <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Item one " class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (AUD):<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">
                            $</span>
                          <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number"
                            class="form-control d-input" required />
                        </div>
                      </label>
                      <br />

                      <br />
                      <button type="button" class="btn btn-dark ">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th>Item Disbursement</th>
                          <th>Cost (AUD)</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                                id="finalHourlyRateMultiple">0</span></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div> -->

                  <!-- hammad -->
                  <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input v-model="newRow.itemDisbursement" placeholder="Eg: filing fees" class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost: (excluding GST)<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">$</span>
                          <input v-model="newRow.costAud" min="1" type="number" class="form-control d-input" required />
                        </div>
                      </label>
                      <br />
                      <br />
                      <button type="button" @click="addRow" class="btn btn-dark">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Item Disbursement</th>
                          <th>Cost</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr v-for="(row, index) in rows" :key="index">
                          <td style="width:0px"><button type="button" @click="removeRow(index)"
                              class="btn btn-default btn-circle"><i class="fa fa-close"></i></button>
                          </td>
                          <td>{{ row.itemDisbursement }}</td>
                          <td>{{ row.costAud }}</td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ grandTotal }}</p>
                  </div>
                </div>

                <!-- <div class="form-group mb-3">
                  <label>What is the estimated total cost of barrister or other law practice (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.law_practice_cost" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                </div> -->

              </div>
              <!-- <div class="my-3">
                <label>Do you require an upfront payment?<sup><code>*</code></sup></label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontYes" value="yes"
                    checked="" />
                  <label class="form-check-label" for="upfrontYes" @click="setPay('Yes')">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontNo" value="no" />
                  <label class="form-check-label" for="upfrontNo" @click="setPay('No')">
                    No
                  </label>
                </div>

                <div class="my-3" id="upfrontPayAmount" v-if="pay === 'Yes'">
                  <label>How much upfront payment do you require?<sup><code>*</code></sup></label>
                  <div>
                    <span class="position-absolute d-span">$</span>
                    <input id="upfrontAmount" name="upfrontAmount" type="number" min="1" step=".01"
                      class="form-control d-input" />
                  </div>
                </div>
              </div> -->
            </div>

            <!-- If they select ‘Success Fee’ -->
            <div class="form-group" id="success-fee" v-if="selectedOption === 'Success'">
              <label>Uplift percentage (%):<sup><code>*</code></sup></label>
              <input type="number" v-model="form.uplift_percentage" id="upliftPercentage" name="upliftPercentage"
                class="form-control" @input="limitNumber" />

              <br />

              <label>Summarise terms upon which the Success Fee will be charged:</label>
              <textarea type="text" id="successFeeTerms" v-model="form.success_fee_term" name="successFeeTerms"
                class="form-control"></textarea>
              <br />
              <div class="disbursement-fields">
                <div class="form-group mt-3">
                  <label> What is the estimated amount for disbursements (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.disbursement_amount" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                  <button class="btn btn-dark mt-3 mb-3" type="button" @click="showItemise">Itemise Disbursements</button>
                  <!-- <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                        Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Task:<sup><code>*</code></sup>
                        <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Item one " class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost (AUD):<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">
                            $</span>
                          <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number"
                            class="form-control d-input" required />
                        </div>
                      </label>
                      <br />

                      <br />
                      <button type="button" class="btn btn-dark ">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th>Item Disbursement</th>
                          <th>Cost (AUD)</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                                id="finalHourlyRateMultiple">0</span></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div> -->

                  <!-- hammad -->
                  <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                    <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                      <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">Itemise Disbursements
                      </legend>
                      <label class="w-100 text-start">
                        Item:<sup><code>*</code></sup>
                        <input v-model="newRow.itemDisbursement" placeholder="Eg: filing fees" class="form-control"
                          required />
                      </label>
                      <br />
                      <br />
                      <label class="w-100 text-start">
                        Cost: (excluding GST)<sup><code>*</code></sup>
                        <div>
                          <span class="position-absolute d-span" style="line-height: 36px">$</span>
                          <input v-model="newRow.costAud" min="1" type="number" class="form-control d-input" required />
                        </div>
                      </label>
                      <br />
                      <br />
                      <button type="button" @click="addRow" class="btn btn-dark">Add</button>
                    </fieldset>

                    <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Item Disbursement</th>
                          <th>Cost</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody id="addFeeEarnersRow">
                        <tr v-for="(row, index) in rows" :key="index">
                          <td style="width:0px"><button type="button" @click="removeRow(index)"
                              class="btn btn-default btn-circle"><i class="fa fa-close"></i></button></td>
                          <td>{{ row.itemDisbursement }}</td>
                          <td>{{ row.costAud }}</td>
                          <td>
                            <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ grandTotal }}</p>
                  </div>


                </div>

                <!-- <div class="form-group mb-3">
                  <label>What is the estimated total cost of barrister or other law practice (excluding GST)?</label>
                  <div>
                    <span class="position-absolute d-span"> $</span>
                    <input type="number" id="fixedFeeAmount" v-model="form.law_practice_cost" name="fixedFeeAmount"
                      class="form-control d-input" min="1" step=".01" placeholder="" />
                  </div>
                </div> -->

              </div>
              <!-- <div class="my-3">
                <label>Do you require an upfront payment?<sup><code>*</code></sup></label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontYes" value="yes"
                    checked="" />
                  <label class="form-check-label" for="upfrontYes" @click="setPaySucc('Yes')">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontNo" value="no" />
                  <label class="form-check-label" for="upfrontNo" @click="setPaySucc('No')">
                    No
                  </label>
                </div>

                <div class="my-3" id="upfrontPayAmount" v-if="paySucc === 'Yes'">
                  <label>How much upfront payment do you require?<sup><code>*</code></sup></label>
                  <div>
                    <span class="position-absolute d-span" style="line-height: 36px">$</span>
                    <input id="upfrontAmount" name="upfrontAmount" type="number" min="1" step=".01"
                      class="form-control d-input" />
                  </div>
                </div>
              </div> -->
            </div>



          </div>

          <!-- Upfront payment -->
          <div class="form-group my-2" id="upfrontPayRadio" v-if="selectedOption === 'Pro'" ref="content">
            <!-- Additional information -->
            <div class="disbursement-fields">
              <div class="form-group mt-3">
                <label> What is the estimated amount for disbursements (excluding GST)?</label>
                <div>
                  <span class="position-absolute d-span"> $</span>
                  <input type="number" id="fixedFeeAmount" v-model="form.disbursement_amount" name="fixedFeeAmount"
                    class="form-control d-input" min="1" step=".01" placeholder="" />
                </div>
                <button class="btn btn-dark mt-3 mb-3" type="button" @click="showItemise">Itemise Disbursements</button>

                <!-- hammad -->
                <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
                  <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                    <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">Itemise Disbursements
                    </legend>
                    <label class="w-100 text-start">
                      Item:<sup><code>*</code></sup>
                      <input v-model="newRow.itemDisbursement" placeholder="Eg: filing fees" class="form-control"
                        required />
                    </label>
                    <br />
                    <br />
                    <label class="w-100 text-start">
                      cost: (excluding GST)<sup><code>*</code></sup>
                      <div>
                        <span class="position-absolute d-span" style="line-height: 36px">$</span>
                        <input v-model="newRow.costAud" min="1" type="number" class="form-control d-input" required />
                      </div>
                    </label>
                    <br />
                    <br />
                    <button type="button" @click="addRow" class="btn btn-dark">Add</button>
                  </fieldset>

                  <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Item Disbursement</th>
                        <th>Cost</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody id="addFeeEarnersRow">
                      <tr v-for="(row, index) in rows" :key="index">
                        <td style="width:0px"><button type="button" @click="removeRow(index)"
                            class="btn btn-default btn-circle"><i class="fa fa-close"></i></button></td>
                        <td>{{ row.itemDisbursement }}</td>
                        <td>{{ row.costAud }}</td>
                        <td>
                          <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ row.total }}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: ${{ grandTotal }}</p>
                </div>
              </div>



            </div>

            <!-- <div class="form-group">
              <label>Tell the potential client what you will do for them:<sup><code>*</code></sup>
                <textarea v-model="form.description" id="additionalInfo" name="additionalInfo" class="form-control"
                  rows="4" cols="100%" required=""></textarea>
              </label>
              <br />
            </div> -->


            <div class="stepbtn hiden mt-3">
              <button v-if="currentStep !== 0" type="button" @click="proPrevStep" class="btn btn-dark mr">
                Previous
              </button>
              <button v-if="currentStep !== 1" type="submit" @click="proStep" :disabled="!selectedOption"
                class="btn btn-dark">
                Next
              </button>
              <button v-if="currentStep === 1" type="submit" class="btn btn-dark">
                Summary
              </button>
            </div>


          </div>
        </template>

        <template v-if="currentStep === 1">
          <!-- If they select ‘Daily Rate’ -->
          <!-- <div class="form-group" id="fixed-fee" v-if="selectedOption === 'Daily'">
            <div>
              <label> Daily Rate </label>
              <input type="number" id="fixedFeeAmount" name="fixedFeeAmount" class="form-control" min="1" step=".01"
                placeholder="($AUD) 0.00" />
            </div>
          </div> -->

          <!-- If they select item by item -->
          <!-- <div class="form-group" id="fixed-fee" v-if="selectedOption === 'Item'">
            <div class="" id="additionalFeeEarners">
              <fieldset class="border p-2 my-2  bg-light text-center" style="margin: auto">
                <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                  Item by Item for Specific Tasks
                </legend>
                <label class="w-100 text-start">
                  Task:<sup><code>*</code></sup>
                  <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Task one " class="form-control"
                    required />
                </label>
                <br />
                <br />
                <label class="w-100 text-start">
                  Cost (AUD):<sup><code>*</code></sup>
                  <div>
                    <span class="position-absolute d-span">
                      $</span>
                    <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number" class="form-control d-input"
                      required />
                  </div>
                </label>
                <br />

                <br />
                <button class="btn btn-dark">Add</button>
              </fieldset>

              <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Cost (AUD)</th>

                    <th>Total</th>

                  </tr>
                </thead>
                <tbody id="addFeeEarnersRow">
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                          id="finalHourlyRateMultiple">0</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>


            </div>
          </div> -->

          <!-- If they select ‘Fixed fee’ -->
          <!-- <div class="form-group" id="fixed-fee" v-if="selectedOption === 'Fixed'">
            <label>Fixed fee amount (in AUD and excluding GST and disbursements):<sup><code>*</code></sup></label>
            <div>
              <span class="position-absolute d-span"> $</span>
              <input type="number" id="fixedFeeAmount" name="fixedFeeAmount" class="form-control d-input" min="1"
                step=".01" />
            </div>
            <br />

            <div class="my-3">
              <label>Do you require an upfront payment?<sup><code>*</code></sup></label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontYes" value="yes"
                  checked="" />
                <label class="form-check-label" for="upfrontYes" @click="setPayment('Yes')">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontNo" value="no" />
                <label class="form-check-label" for="upfrontNo" @click="setPayment('No')">
                  No
                </label>
              </div>

              <div class="my-3" id="upfrontPayAmount" v-if="payment === 'Yes'">
                <label>How much upfront payment do you require?<sup><code>*</code></sup></label>
                <div>
                  <span class="position-absolute d-span">$</span>
                  <input id="upfrontAmount" name="upfrontAmount" type="number" min="1" step=".01"
                    class="form-control d-input" />
                </div>
              </div>
            </div>
          </div> -->

          <!-- If they select ‘Hourly rate’ -->
          <!-- <div class="form-group" id="hourly-rate" v-if="selectedOption === 'Hourly'">
            <div class="form-group mb-3" id="addAdditionalFeeEarnersRadio">
              How many fee earners will be working on this matter?
              <div class="form-check">
                <label class="form-check-label">
                  <input type="radio" name="noOfFeeEarners" class="form-check-input" id="radioNoOfFeeEarnersSingle"
                    checked="" @click="showElement('Yes')" />
                  Just me
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="radio" name="noOfFeeEarners" class="form-check-input" id="radioNoOfFeeEarnersMultiple"
                    @click="showElement('No')" />
                  I'm part of a team
                </label>
              </div>
            </div> -->

          <!-- <div class="" id="additionalFeeEarners" v-if="isVisible === 'No'">
              <fieldset class="border p-2 my-2 bg-light text-center " style="margin: auto">
                <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                  Add additional fee earner
                </legend>
                <label class="w-100 text-start">
                  Title:<sup><code>*</code></sup>
                  <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Associate" class="form-control"
                    required />
                </label>
                <br />
                <br />
                <label class="w-100 text-start">
                  Hourly rate (in AUD excluding GST):<sup><code>*</code></sup>
                  <div>
                    <span class="position-absolute d-span">
                      $</span>
                    <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number" class="form-control d-input"
                      required />
                  </div>
                </label>
                <br />
                <br />
                <label class="w-100 text-start">
                  Estimated number of hours:<sup><code>*</code></sup>
                  <input id="feeEarnerEstimatedHours" min="1" autocomplete="on" type="number" class="form-control"
                    required />
                </label>
                <br />
                <br />
                <button class="btn btn-dark">Add</button>
              </fieldset>

              <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Hourly rate (in AUD excluding GST)</th>
                    <th>Estimated number of hours</th>
                    <th>Total</th>

                  </tr>
                </thead>
                <tbody id="addFeeEarnersRow">
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span
                          id="finalHourlyRateMultiple">0</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>


            </div> -->

          <!-- <div v-if="isVisible === 'Yes'">
              Invisible filed for posting additional fee earners info
                <input class="d-none" name="feeEarnersInfo" id="feeEarnersInfo" />

                <div id="hourlyRateIndividual">
                  <label>Hourly rate (in AUD excluding GST):<sup><code>*</code></sup></label>
                  <div>
                    <span class="position-absolute d-span">
                      $</span>
                    <input type="number" id="hourlyRate" name="hourlyRate" min="1" step="0.01" class="form-control d-input"
                      oninput="updateHourlyRateIndividual()" />
                  </div>

                  <br />

                  <label>Estimated number of hours<sup><code>*</code></sup></label>
                  <input type="number" id="noOfHours" name="noOfHours" min="1" step="0.01" class="form-control"
                    oninput="updateHourlyRateIndividual()" />

                  <br />
                </div>

                input field to capture final hourly rate value during form submit
                <p id="finalHourlyRateText">
                  Total: $<input id="finalHourlyRateValue" name="finalHourlyRateValue" type="number" readonly=""
                    class="border-0 text-dark bg-white" />
                </p>
            </div> -->

          <!-- <div class="my-3">
                <label>Do you require an upfront payment?<sup><code>*</code></sup></label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontYes" value="yes"
                    checked="" />
                  <label class="form-check-label" for="upfrontYes" @click="setPay('Yes')">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontNo" value="no" />
                  <label class="form-check-label" for="upfrontNo" @click="setPay('No')">
                    No
                  </label>
                </div>

                <div class="my-3" id="upfrontPayAmount" v-if="pay === 'Yes'">
                  <label>How much upfront payment do you require?<sup><code>*</code></sup></label>
                  <div>
                    <span class="position-absolute d-span">$</span>
                    <input id="upfrontAmount" name="upfrontAmount" type="number" min="1" step=".01"
                      class="form-control d-input" />
                  </div>
                </div>
              </div> -->
          <!-- </div> -->

          <!-- If they select ‘Success Fee’ -->
          <!-- <div class="form-group" id="success-fee" v-if="selectedOption === 'Success'">
            <label>Uplift percentage (%):<sup><code>*</code></sup></label>
            <input type="number" id="upliftPercentage" name="upliftPercentage" min="1" max="25" step=".01"
              class="form-control" />

            <br />

            <label>Summarise terms upon which Success Fee will be charged:</label>
            <input type="text" id="successFeeTerms" name="successFeeTerms" class="form-control" />
            <br />

            <div class="my-3">
              <label>Do you require an upfront payment?<sup><code>*</code></sup></label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontYes" value="yes"
                  checked="" />
                <label class="form-check-label" for="upfrontYes" @click="setPaySucc('Yes')">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="upfrontPayment" id="upfrontNo" value="no" />
                <label class="form-check-label" for="upfrontNo" @click="setPaySucc('No')">
                  No
                </label>
              </div>

              <div class="my-3" id="upfrontPayAmount" v-if="paySucc === 'Yes'">
                <label>How much upfront payment do you require?<sup><code>*</code></sup></label>
                <div>
                  <span class="position-absolute d-span" style="line-height: 36px">$</span>
                  <input id="upfrontAmount" name="upfrontAmount" type="number" min="1" step=".01"
                    class="form-control d-input" />
                </div>
              </div>
            </div>
          </div> -->
          <div class="my-3">
            <label>Do you require an upfront payment?<sup><code>*</code></sup></label>
            <div class="form-check">
              <input class="form-check-input" v-model="form.upfront_payment_status" type="radio" name="upfrontPayment"
                id="upfrontYes" value="yes" checked="" />
              <label class="form-check-label" for="upfrontYes" @click="setPaySucc('Yes')">
                Yes
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" v-model="form.upfront_payment_status" type="radio" name="upfrontPayment"
                id="upfrontNo" value="no" />
              <label class="form-check-label" for="upfrontNo" @click="setPaySucc('No')">
                No
              </label>
            </div>

            <div class="my-3" id="upfrontPayAmount" v-if="paySucc === 'Yes'">
              <label>How much upfront payment do you require?<sup><code>*</code></sup></label>
              <div>
                <span class="position-absolute d-span" style="line-height: 36px">$</span>
                <input id="upfrontAmount" name="upfrontAmount" v-model="form.upfront_payment" type="number" min="1"
                  step=".01" class="form-control d-input" />
              </div>
            </div>
          </div>
          <!-- discount -->
          <!-- Do you offer a free or discounted first consultation? -->
          <!-- <div class="form-group m-2" id="freeFirstConsultationRadio">
            <label>Do you offer a free or discounted first consultation?</label>
            <div class="form-check">
              <input class="form-check-input" v-model="form.consultation" type="radio" name="freeFirstConsultation"
                id="freeFirstConsultationYes" value="yes" checked="" />
              <label class="form-check-label" for="freeFirstConsultationYes" @click="setOption('Yes')">
                Yes
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" v-model="form.consultation" name="freeFirstConsultation"
                id="freeFirstConsultationNo" value="no" />
              <label class="form-check-label" for="freeFirstConsultationNo" @click="setOption('No')">
                No
              </label>
            </div>
          </div> -->

          <!-- Do you offer a free or discounted first consultation input fields -->
          <!-- <div v-if="option === 'Yes'">
            <div class="form-group my-3" id="div-freeFirstConsultationFee">
              <label for="freeFirstConsultationFee">Fee:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">$</div>
                </div>
                <input type="number" min="1" class="form-control" name="freeFirstConsultationFee"
                  id="freeFirstConsultationFee" />
              </div>
            </div>

            <div class="col-auto" id="div-freeFirstConsultationMinutes">
              <label for="">Time limit:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <input type="number" v-model="form.consultation_time_limit" class="form-control"
                  name="freeFirstConsultationMinutes" id="freeFirstConsultationMinutes" placeholder="E.g. 60" />
                <div class="input-group-prepend">
                  <div class="input-group-text">minutes</div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- Upfront payment -->
          <!-- <div class="form-group my-2" id="upfrontPayRadio" v-if="selectedOption === 'Pro'" ref="content">
            <div class="form-group">
              <label>Tell the potential client what you will do for them:<sup><code>*</code></sup>
                <textarea id="additionalInfo" name="additionalInfo" class="form-control" rows="4" cols="100%"
                  required=""></textarea>
              </label>
              <br />
            </div>

            <div class="form-group m-2" id="div-deadline-acceptance-radio">
              <label>Can you meet the potential client's deadline?</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deadlineFlexibility" id="deadlineYes" value="yes"
                  checked="" />
                <label class="form-check-label" for="deadlineYes" @click="showDeadline('Yes')">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deadlineFlexibility" id="deadlineNo" value="no" />
                <label class="form-check-label" for="deadlineNo" @click="showDeadline('No')">
                  No
                </label>
              </div>
            </div>

            <div class="form-group" id="div-deadline" v-if="deadline === 'No'">
              <label>Please explain why you can't meet potential client's deadline:<sup><code>*</code></sup>
                <textarea id="txtarea-deadline" name="deadline" class="form-control" rows="4" cols="100%"
                  placeholder="Eg: It's not realistic"></textarea>
              </label>
            </div>

            <div class="stepbtn hiden mt-3">
              <button v-if="currentStep !== 0" type="button" @click="prevStep" class="btn btn-dark mr">
                Previous
              </button>

              <button v-if="currentStep === 1" type="button" class="btn btn-dark">
                Finish
              </button>
            </div>


          </div> -->

        </template>

        <template v-if="currentStep === 2">
          <!-- <div class="disbursement-fields">  
          <div class="form-group">
            <label> What is the estimated amount for disbursements (excluding GST)?</label>
            <input type="number" id="fixedFeeAmount" name="fixedFeeAmount" class="form-control" min="1" step=".01"
              placeholder="($AUD) 0.00" />
            <button class="btn btn-dark mt-3 mb-3" @click="showItemise">Itemise Disbursements</button>
            <div class="mb-3" id="additionalFeeEarners" v-if="divItemiseVisible">
              <fieldset class="border p-2 my-2 bg-light text-center" style="margin: auto">
                <legend class="w-auto" style="float: none; padding: inherit; font-size: 1rem">
                  Itemise Disbursements
                </legend>
                <label class="w-100 text-start">
                  Task:<sup><code>*</code></sup>
                  <input id="feeEarnerTitle" autocomplete="on" placeholder="Eg: Item one " class="form-control"
                    required />
                </label>
                <br />
                <br />
                <label class="w-100 text-start">
                  Cost (AUD):<sup><code>*</code></sup>
                  <div>
                    <span class="position-absolute d-span" style="line-height: 36px">
                      $</span>
                    <input id="feeEarnerHourlyRate" min="1" autocomplete="on" type="number" class="form-control d-input"
                      required />
                  </div>
                </label>
                <br />

                <br />
                <button class="btn btn-dark ">Add</button>
              </fieldset>

              <table class="table table-bordered mb-0" id="additionalFeeEarnersTable">
                <thead>
                  <tr>
                    <th>Item Disbursement</th>
                    <th>Cost (AUD)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody id="addFeeEarnersRow">
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <p class="mb-0 bg-secondary border p-1 rounded text-white text-center">Total: $<span id="finalHourlyRateMultiple">0</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="form-group mb-3">
            <label>What is the estimated total cost of barrister or other law practice (excluding GST)?</label>
            <input type="number" id="fixedFeeAmount" name="fixedFeeAmount" class="form-control" min="1" step=".01"
              placeholder="($AUD) 0.00" />
          </div>

        </div>   -->



          <!-- Additional information -->
          <div class="form-group">
            <label class="w-100">Tell the potential client what you will do for them:<sup><code>*</code></sup>
              <textarea v-model="form.description" id="additionalInfo" name="additionalInfo" class="form-control" rows="4"
                cols="100%" required=""></textarea>
            </label>
            <br />
          </div>

          <!-- Deadline acceptance radio -->
          <!-- <div class="form-group m-2" id="div-deadline-acceptance-radio">
            <label>Can you meet the potential client's deadline?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="deadlineFlexibility" id="deadlineYes" value="yes"
                checked="" />
              <label class="form-check-label" for="deadlineYes" @click="showDeadline('Yes')">
                Yes
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="deadlineFlexibility" id="deadlineNo" value="no" />
              <label class="form-check-label" for="deadlineNo" @click="showDeadline('No')">
                No
              </label>
            </div>
          </div> -->

          <!-- Can't meet deadline explanation box -->
          <!-- <div class="form-group" id="div-deadline" v-if="deadline === 'No'">
            <label>Please explain why you can't meet potential client's deadline:<sup><code>*</code></sup>
              <textarea id="txtarea-deadline" name="deadline" class="form-control" rows="4" cols="100%"
                placeholder="Eg: It's not realistic"></textarea>
            </label>
          </div> -->

          <!-- Do you offer a free or discounted first consultation? -->
          <!-- <div class="form-group m-2" id="freeFirstConsultationRadio">
            <label>Do you offer a free or discounted first consultation?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="freeFirstConsultation" id="freeFirstConsultationYes"
                value="yes" checked="" />
              <label class="form-check-label" for="freeFirstConsultationYes" @click="setOption('Yes')">
                Yes
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="freeFirstConsultation" id="freeFirstConsultationNo"
                value="no" />
              <label class="form-check-label" for="freeFirstConsultationNo" @click="setOption('No')">
                No
              </label>
            </div>
          </div> -->

          <!-- Do you offer a free or discounted first consultation input fields -->
          <!-- <div v-if="option === 'Yes'">
            <div class="form-group my-3" id="div-freeFirstConsultationFee">
              <label for="freeFirstConsultationFee">Fee:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">$</div>
                </div>
                <input type="number" min="1" class="form-control" name="freeFirstConsultationFee"
                  id="freeFirstConsultationFee" />
              </div>
            </div> -->

          <!-- <div class="col-auto" id="div-freeFirstConsultationMinutes">
              <label for="">Time limit:<sup><code>*</code></sup></label>
              <div class="input-group mb-2">
                <input type="number" class="form-control" name="freeFirstConsultationMinutes"
                  id="freeFirstConsultationMinutes" placeholder="E.g. 60" />
                <div class="input-group-prepend">
                  <div class="input-group-text">minutes</div>
                </div>
              </div>
            </div>
          </div> -->


          <!-- Submit button -->
          <!-- <div class="text-center">
          <input class="btn btn-dark mt-2" type="submit" name="formSubmit" />
        </div> -->
        </template>

        <!-- <template v-if="currentStep === 3">
        <p>4</p>
      </template> -->

        <div class="stepbtn mt-3">
          <button v-if="currentStep !== 0" type="button" @click="prevStep" class="btn btn-dark mr">
            Previous
          </button>
          <button v-if="currentStep !== 2" type="submit" :disabled="!selectedOption" class="btn btn-dark">
            Next
          </button>
          <button v-if="currentStep === 2" class="btn btn-dark">
            Summary
          </button>
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
import { Form } from "vee-validate";
// import * as yup from 'yup';
// import { computed } from "vue";
import MainFooter from "../../components/global/MainFooter.vue";


// const currentStep = ref(0);

// Each step should have its own validation schema
// const schemas = [
// yup.object({
//   name: yup.string().required(),
//   email: yup.string().required().email(),
// }),
// yup.object({
//   password: yup.string().required().min(6),
//   confirmPassword: yup
//     .string()
//     .required()
//     .min(6)
//     .oneOf([yup.ref('password')], 'Passwords must match'),
// }),
// yup.object({
//   address: yup.string().required(),
//   postalCode: yup
//     .string()
//     .required()
//     .matches(/^[0-9]+$/, 'Must be numeric'),
// }),
// yup.object({
//   terms: yup.bool().required().equals([true]),
// })
// ];

// const currentSchema = computed(() => {
//   return schemas[this.currentStep];

// });

// function nextStep(values) {
//   if (currentStep.value === 2) {
//     console.log("Done: ", JSON.stringify(values, null, 1));
//     // console.log('test', currentStep.value);

//     return;
//   }

//   currentStep.value++;
// }

// function prevStep() {
//   if (currentStep.value <= 0) {
//     return;
//   }

//   currentStep.value--;
// }
</script>
<script>
import LawyerHeader from "./Header.vue";
import api from '@/config/api';

export default {
  components: {
    LawyerHeader,
    MainFooter
  },

  data() {
    return {

      form: {
        "charge_type": null,
        "fixed_fee_amount": null,
        "disbursement_amount": null,
        "law_practice_cost": null,
        "fee_earners": null,
        "daily_rate": null,
        "uplift_percentage": null,
        "success_fee_term": null,
        "pro_bono_description": null,
        "meet_deadlines": null,
        "miss_deadline_reason": null,
        "upfront_payment_status": null,
        "upfront_payment": null,
        "consultation": null,
        "consultation_time_limit": null,
        "description": null,
        "lawyer_id": null,
        "job_id": null,
      },

      newRow: {
        itemDisbursement: '',
        costAud: ''
      },
      rows: [], // Itemise Disbursements
      newRow2: {
        itemDisbursement: '',
        costAud: ''
      },
      rows2: [], // item by item specific tasks
      newRow3: {
        title: '',
        hourlyRate: '',
        estimatedHours: '',
      },
      rows3: [], // additional fee earner

      schemas: [],
      currentStep: 0,

      selectedOption: "",
      option: "Yes",
      isVisible: "Yes",
      payment: "Yes",
      pay: "Yes",
      paySucc: "Yes",
      deadline: "Yes",
      team: "Yes",
      divItemiseVisible: false,
      input1: null
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
      return this.rows.reduce((total, row) => total + parseFloat(row.costAud) || 0, 0);
    },
    grandTotal2() {
      return this.rows2.reduce((total, row) => total + parseFloat(row.costAud) || 0, 0);
    },
    grandTotal3() {
      return this.rows3.reduce((total, row) => total + parseFloat(row.costAud) || 0, 0);
    },

    currentSchema() {
      return this.schemas[this.currentStep];
    }
    // upfrontPayRadioFn() {
    //   return !!document.getElementById('upfrontPayRadio');
    // },
  },

  mounted() {
    if (this.jobData == null || this.jobData == "") {
      this.$router.push({ path: '/lawyer-dashboard' });
    }
  },

  beforeUnmount() {
    localStorage.removeItem('jobData');
    this.$store.commit('SET_JOB_DATA', null);
  },

  methods: {

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
      api.post('/lawyer/create-proposal', this.form)
        .then(() => {
          this.$swal('Success', 'Proposal has been submited successfully', 'success').then(res => {
            console.log('response : ', res);
            // this.changePostJobFormToDefault();
            // this.currentStep = 0;
          });
        })
        .catch(error => {
          this.$swal('Error', error?.response?.data?.error, 'error');
          console.log("getResults : ", error?.response?.data?.error)
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
        this.newRow.itemDisbursement = '';
        this.newRow.costAud = '';
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
        this.newRow2.itemDisbursement = '';
        this.newRow2.costAud = '';
      }
    },
    addRow3() {
      if (this.newRow3.title && this.newRow3.hourlyRate && this.newRow3.estimatedHours) {
        this.rows3.push({
          title: this.newRow3.title,
          hourlyRate: this.newRow3.hourlyRate,
          estimatedHours: this.newRow3.estimatedHours,
        });
        // console.log(this.rows);
        this.newRow3.title = '';
        this.newRow3.hourlyRate = '';
        this.newRow3.estimatedHours = '';
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
      if (this.currentStep === 2) {
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
      if (this.selectedOption == 'Pro') {
        this.currentStep = 0;
        return
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
      alert('asd', this.currentStep);
      console.log('asdasd', this.currentStep);
      if (this.currentStep == 2) {
        this.currentStep = 0;

      }

    },


    showItemise() {
      this.divItemiseVisible = !this.divItemiseVisible;
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
.stepbtn {
  display: flex;
  justify-content: flex-end;
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
#upfrontPayRadio+.stepbtn {
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
</style>