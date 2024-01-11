<template lang="">
  <div class="hello">
    <AdminHeader />

    <main class="container my-md-4 my-sm-3">

      <!-- <ul
          data-v-511b78bb=""
          class="nav nav-pills mb-3 bg-light border p-2 py-3 rounded"
          id="pills-tab"
          role="tablist"
        >
          <li data-v-511b78bb="" class="nav-item" role="presentation">
            <button
              data-v-511b78bb=""
              class="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              @click="setStatus('pending')"
            >
              Open
            </button>
          </li>
          <li data-v-511b78bb="" class="nav-item" role="presentation">
            <button
              data-v-511b78bb=""
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              tabindex="-1"
              @click="setStatus('reject')"
            >
              Closed
            </button>
          </li>
        </ul> -->



        <div data-v-511b78bb="" class="tab-content" id="pills-tabContent">
          <div
            data-v-511b78bb=""
            class="tab-pane fade active show"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div>
              <div
                v-if="openJobs.length == 0 && searchQuery == ''"
                class="border rounded bg-light p-3 d-flex flex-wrap"
              >
                <p class="mx-auto my-0">
                 No pending lawyer requests found!
                </p>
              </div>

              <div v-else class="d-flex flex-wrap ">
              <div  class="d-flex flex-wrap align-items-center justify-content-between mb-3 w-100 pt-2">
                <div class="input-group  w-75">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchQuery"
                    @keyup.enter="search(pageStatus)"
                    placeholder="Search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="search(pageStatus)"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="clearSearch(pageStatus)"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                  
                </div>
                <button @click="generateCsv('client')" class="btn btn-dark btn-sm m-1"><i class="fa fa-plus"></i> Generate CSV </button>
              </div>

                <span
                  v-if="openJobs.length == 0 && searchQuery != ''"
                  class="text-center w-100"
                  >No pending lawyer requests found!</span>


                  <table v-else class="table table-striped">
                  <tbody>
                    <tr  v-for="(item, index) in openJobs" :key="index">
                      <td>
                        {{ item?.email }} ({{ item?.first_name }} {{ item?.last_name }})
                        <details class="lawyerSummary">
                          <summary data-open="Less" data-close="More">
                            more
                          </summary>
                          <table class="table table-striped">
                            <tbody>
                              <tr>
                                <td class="fw-normal">Profile</td>
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
                                <td class="fw-normal">Email</td>
                                <td>{{ item?.email }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Name</td>
                                <td>{{ item?.first_name }} {{ item?.last_name }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Job Title</td>
                                <td>{{ item?.job_title }}
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Law Firm Name</td>
                                <td>{{ item?.law_firm }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Phone</td>
                                <td>{{ item?.phone }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Website</td>
                                <td>
                                  <a :href="item?.link" target="_blank"
                                    >{{ item?.link }}</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-normal">About</td>
                                <td>{{ item?.about }}</td>
                              </tr>

                            </tbody>
                          </table>
                        </details>
                      </td>
                      <td class="text-end button-width">
                        <div class="mb-1">
                           <button class="btn btn-dark btn-sm m-1" @click="changeAccountStatus(item?.id,item?.type,item?.status,pageStatus)">
                            {{ item?.status == 'block' ? 'Unblock' : 'Block' }}
                          </button>
                        </div>
                      </td>

                      <!-- <td class="text-end button-width">
                        <div  class="mb-1">
                          <input
                            class="d-none"
                            name="accept_id"
                            value="23"
                          /><button @click="approve(item?.id,index)" class="btn btn-dark">
                            <i class="bi bi-check-lg"></i> Approve
                          </button>
                        </div>
                        <div >
                          <input
                            class="d-none"
                            name="reject_id"
                            value="23"
                          /><button
                          @click="reject(item?.id,index)"
                            class="btn btn-light"
                            style="border: 1px solid black"
                          >
                            <i class="bi bi-x-lg"></i> Reject
                          </button>
                        </div>
                      </td> -->

                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
          <div
            data-v-511b78bb=""
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="d-flex flex-wrap ">
              <div
                v-if="openJobs.length == 0 && searchQuery == ''"
                class="border rounded bg-light p-3 d-flex flex-wrap"
              >
                <p class="mx-auto my-0">
                  No pending lawyer requests found!
                </p>
              </div>

              <div v-else class="d-flex flex-wrap align-items-center justify-content-between mb-3 w-100 pt-2">
                <div class="input-group w-75">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchQuery"
                    @keyup.enter="search(pageStatus)"
                    placeholder="Search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="search(pageStatus)"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                  <button
                    class="input-group-text btn custom-button"
                    id="basic-addon2"
                    @click="clearSearch(pageStatus)"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                </div>

                <button @click="generateCsv('client')" class="btn btn-dark btn-sm m-1"><i class="fa fa-plus"></i> Generate CSV </button>

                <span
                  v-if="openJobs.length == 0 && searchQuery != ''"
                  class="text-center w-100"
                  >No pending lawyer requests found!</span>


                  <table v-else class="table table-striped">
                  <tbody>
                    <tr  v-for="(item, index) in openJobs" :key="index">
                      <td>
                        {{ item?.email }} ({{ item?.first_name }} {{ item?.last_name }})
                        <details class="lawyerSummary">
                          <summary data-open="Less" data-close="More">
                            more
                          </summary>
                          <table class="table table-striped">
                            <tbody>
                              <tr>
                                <td class="fw-normal">Profile</td>
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
                                <td class="fw-normal d-flex align-items-center justify-content-between">Email</td>
                                <td>{{ item?.email }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">Name</td>
                                <td>{{ item?.first_name }} {{ item?.last_name }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">Job Title
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    :data-target="`.edit-job-title-modal${index}`"
                                    title="Edit"
                                    data-bs-toggle="modal" :data-bs-target="`#Jobtitle${index}`"
                                    @click="setModalData('job_title',item?.job_title,item?.id)"
                                    >
                                    <i class="fa fa-pencil"></i>
                                  </button>


                                  <div
                                    :class="`modal fade edit-job-title-modal${index}`"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="mySmallModalLabel"
                                    aria-hidden="true"
                                    :id="`Jobtitle${index}`"
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
                                              @click="updateProfile('job_title',`#Jobtitle${index}`)"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </td>
                                <td>{{ item?.job_title }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">Law Firm Name
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    data-bs-toggle="modal" :data-bs-target="`#FirmName${index}`"
                                    :data-target="`.lawfirm-modal${index}`"
                                    title="Edit"
                                    @click="setModalData('law_firm',item?.law_firm,item?.id)"
                                  >
                                    <i class="fa fa-pencil"></i>
                                  </button>

                                  <div
                                    :class="`modal fade lawfirm-modal${index}`"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="mySmallModalLabel"
                                    aria-hidden="true"
                                    :id="`FirmName${index}`">
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
                                              @click="updateProfile('law_firm',`#FirmName${index}`)"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>{{ item?.law_firm }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">Phone
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    data-bs-toggle="modal" :data-bs-target="`#PhoneModal${index}`"
                                    :data-target="`.edit-phone-modal${index}`"
                                    title="Edit"
                                    @click="setModalData('phone',item?.phone,item?.id)"
                                  >
                                    <i class="fa fa-pencil"></i>
                                  </button>

                                  <div
                                    :class="`modal fade edit-phone-modal${index}`"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="mySmallModalLabel"
                                    aria-hidden="true"
                                    :id="`PhoneModal${index}`"
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
                                              @click="updateProfile('phone',`#PhoneModal${index}`)"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </td>
                                <td>{{ item?.phone }}</td>
                              </tr>
                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">Website
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    data-bs-toggle="modal" :data-bs-target="`#WebsiteModal${index}`"
                                    :data-target="`.website-modal${index}`"
                                    title="Edit"
                                    @click="setModalData('link',item?.link,item?.id)"
                                  >
                                    <i class="fa fa-pencil"></i>
                                  </button>

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
                                              @click="updateProfile('link',`#WebsiteModal${index}`)"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </td>
                                <td>
                                  <a :href="item?.link" target="_blank"
                                    >{{ item?.link }}</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">About
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    data-bs-toggle="modal" :data-bs-target="`#AboutModal${index}`"
                                    :data-target="`.bd-example-modal-lg${index}`"
                                    title="Edit"
                                    @click="setModalData('about',item?.about,item?.id)"
                                  >
                                    <i class="fa fa-pencil"></i>
                                  </button>

                                  <div
                                    :class="`modal fade bd-example-modal-lg${index}`"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="mySmallModalLabel"
                                    aria-hidden="true"
                                    :id="`AboutModal${index}`"
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
                                              @click="updateProfile('about',`#AboutModal${index}`)"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>{{ item?.about }}</td>
                              </tr>


                              <tr>
                                <td class="d-flex align-items-center justify-content-between">
                                  Consultation:
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                    data-bs-toggle="modal" :data-bs-target="`#ConsultationModal${index}`"
                                    :data-target="`.edit-consultation-modal${index}`"
                                    title="Edit"
                                  >
                                    <i class="fa fa-pencil"></i>
                                  </button>

                                  <div
                                    :class="`modal fade edit-consultation-modal${index}`"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="mySmallModalLabel"
                                    aria-hidden="true"
                                    :id="`ConsultationModal${index}`"
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
                                                  @click="updateProfile(['consultation_type','consultation_amount','consultation_time'],`#ConsultationModal${index}`)"
                                                >
                                                  Save changes
                                          </button>

                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </td>

                                <td>
                                  <span v-if="loginUser?.consultation_type">
                                    <b>Type : </b>{{ loginUser?.consultation_type }},
                                  </span>
                                  <span v-if="loginUser?.consultation_time">
                                    <b>Time : </b>{{ loginUser?.consultation_time }},
                                  </span>
                                  <span v-if="loginUser?.consultation_amount">  
                                    <b>Fee : </b>{{ loginUser?.consultation_amount }}
                                  </span>
                                  </td>
                              </tr>

                              <tr>
                                <td class="d-flex align-items-center justify-content-between">
                                  Offer Remote Consultations:
                                </td>

                                <td>
                                  <div class="form-check" >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      v-model="form.remote_consultation"
                                      @change="updateProfile('remote_consultation',null)"
                                      id="remote_consultation"
                                    />
                                    <p>{{ form.remote_consultation ? 'Yes' : 'No' }}</p>
                                  </div>
                                </td>
                              </tr>




                              <tr>
                                <td class="d-flex align-items-center justify-content-between">
                                  Mobile friendly:
                                </td>

                                <td>
                                  <div class="form-check" >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      v-model="form.mobile_friendly"
                                      @change="updateProfile('mobile_friendly',null)"
                                      id="mobile_friendly"
                                    />
                                    <p>{{ form.mobile_friendly ? 'Yes' : 'No' }}</p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </details>
                      </td>

                      <td class="text-end button-width">
                        <div  class="mb-1">
                           {{ capitalizeFirstLetter(item?.admin_approval) }}
                        </div>
                        <!-- <div >
                          <input
                            class="d-none"
                            name="reject_id"
                            value="23"
                          /><button
                          @click="reject(item?.id,index)"
                            class="btn btn-light"
                            style="border: 1px solid black"
                          >
                            <i class="bi bi-x-lg"></i> Reject
                          </button>
                        </div> -->
                      </td>

                    </tr>
                  </tbody>
                </table>

                <!-- <template v-else>
                  <div class="row">
                    <div
                      v-for="(item, index) in openJobs"
                      :key="index"
                      class="col-md-6"
                      id="28"
                    >
                      <div
                        class="border rounded bg-secondary d-flex justify-content-between text-white p-3 flex-column flex-lg-row mb-3"
                      >
                        <div>
                          <p class="badge bg-dark" title="Area">
                            {{ item?.field?.title }}
                          </p>
                          &nbsp;
                          <p class="badge bg-dark" title="Location">
                            {{ item?.location?.title }}
                          </p>
                          <p>
                            <b>{{ item?.title }}</b>
                          </p>
                          <p
                            id="description28"
                            style="
                              overflow: hidden;
                              text-overflow: ellipsis;
                              
                            "
                          >
                          <b>Job description: </b>
                            {{ item?.description }}
                          </p>
                          <p><b>City/suburb:</b> {{ item?.city }}</p>
                          <p><b>Job No: </b> <span class="smallFont"> {{ item?.identity }} </span> </p>
                          <p >
                            <b>Created: </b>
                          <span class="smallFont"> {{ formatCreatedAt(item.created_at) }}</span> 
                          </p>
                        </div>
                        <div
                          class="d-flex flex-column justify-content-center align-items-center"
                          style="min-width: 110px"
                        >
                          <button
                            @click="submitProposal(item)"
                            class="btn btn-light btn-sm w-100 my-1"
                          >
                            Submit a proposal
                          </button>

                          <button
                            @click="declineJob(item.id)"
                            class="btn btn-danger btn-sm w-100 my-1"
                          >
                            Decline
                          </button>
                          <router-link
                            class="btn btn-dark btn-sm w-100 my-1"
                            to="/request-info"
                            >Message</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </template> -->
              </div>
            </div> 
          </div>
          <div v-if="openJobs.length > 0 && currentPage != lastPage"
                    class="text-center mt-3">
                    <button id="loadMoreButton" class="btn custom-button" @click="loadMore(pageStatus)">
                      Load More
                    </button>
                  </div>
        </div>



      <!-- <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" class="text-center">
              No clients have been signed up yet
            </td>
          </tr>
        </tbody>
      </table> -->
    </main>
        <div class="footer">
            <MainFooter />
        </div>
  </div>
</template>
<script>
import AdminHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import $ from 'jquery';
window.$ = window.jQuery = $;

export default {
  components: {
    AdminHeader,
    MainFooter
  },
  name: "AdminLawyer",


  data() {
    return {
      pageStatus: "pending",
      // openJobs: [],
      endpoint: "/admin/all-clients",
      // endpoint_search: "/lawyer/search-related-jobs",

      form: {
        law_firm: null,
        link: null,
        phone: null,
        about: null,
        job_title: null,
        consultation_type: "free",
        consultation_time: null,
        consultation_amount: null,
        remote_consultation: false,
        mobile_friendly: false,
        user_id: null,
      },

      options: [],
      selectedOptionIds: [],
      selectedOptionIdsShow: [],

      options_locations: [],
      selectedOptionIds_locations: [],
      selectedOptionIdsShow_locations: [],

    };
  },

  watch: {
    pageStatus(newQuery) {
      console.log('pageStatus : ', newQuery);
    },
  },

  computed: {
    userName() {
      return `${this.$store.getters?.loginUser?.first_name} ${this.$store.getters?.loginUser?.last_name}`;
    },
    adminApproval() {
      return this.$store.getters.adminApprovalStatus;
    },
    subscriptionStatus() {
      console.log("ss tt uu : ", this.$store.getters.subscriptionStatus);
      return this.$store.getters.subscriptionStatus;
    },
  },
  async created() {
    await this.loadMore(this.pageStatus);
  },


  methods: {

    setModalData(keyName, value, user_id) {
      this.form[keyName] = value;
      this.form.user_id = user_id;
      console.log(this.form);
    },

    async setStatus(status) {
      this.pageStatus = status;
      await this.loadMore(status, true)
    },
    closeModal(modalId) {
      $(modalId).modal('hide');
    },

  },

};
</script>
<style scoped>
.hello {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
