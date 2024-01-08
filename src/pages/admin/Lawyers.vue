<template lang="">
  <div class="hello">
    <AdminHeader />
    <div class="main">
      

      <div class="container">


        

      

     

      

      <!-- <p class="h4 m-3">Welcome, {{ userName }}</p> -->
      <div data-v-511b78bb="" class="container">
        <ul
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
              Pending
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
              Approved or Rejected
            </button>
          </li>
        </ul>
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

              <div v-else class="d-flex flex-wrap">
                <div class="d-flex flex-wrap align-items-center justify-content-between mb-3 w-100">
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
                <button class="btn btn-dark btn-sm m-1"><i class="fa fa-plus"></i> Generate CSV </button>
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

                              <tr>
                                <td class="fw-normal">Expertise</td>
                                <td v-if="item?.fields.length > 0">
                                  <span v-for="(field, fieldIndex) in item?.fields" :key="fieldIndex" >{{ field?.title}} <span v-if="fieldIndex < item?.fields.length - 1">, </span></span>
                                  
                                </td>
                                <td v-else></td>
                              </tr>
                              <tr>
                                <td class="fw-normal">Location</td>
                                <td v-if="item?.locations.length > 0">
                                  <span v-for="(location, locationIndex) in item?.locations" :key="locationIndex" >{{ location?.title}} <span v-if="locationIndex < item?.locations.length - 1">, </span></span>
                                  
                                </td>
                                <td v-else></td>
                              </tr>
                            </tbody>
                          </table>
                        </details>
                      </td>

                      <td class="text-end">
                        <div class="row justify-content-end">
                          <div class="col-md-12 col-sm-12">
                          <button @click="approve(item?.id,index)" class="btn btn-dark btn-sm m-1">
                            <i class="bi bi-check-lg"></i> Approve
                          </button>
                          <button
                          @click="reject(item?.id,index)"
                            class="btn btn-light btn-sm m-1"
                            style="border: 1px solid black"
                          >
                            <i class="bi bi-x-lg"></i> Reject
                          </button>
                          </div>
                         
                        </div>
                        
                        
                      </td>

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
            <div>
              <div
                v-if="openJobs.length == 0 && searchQuery == ''"
                class="border rounded bg-light p-3 d-flex flex-wrap"
              >
                <p class="mx-auto my-0">
                  No pending lawyer requests found!
                </p>
              </div>

              <div v-else class="border rounded bg-light p-3 d-flex flex-wrap">
                <div class="input-group mb-3">
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

                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">Expertise
                                  <button
                                    v-if="!loginUser?.area_insert"
                                    type="button"
                                    @click="setModal('fields',item?.id)"
                                    class="btn btn-dark btn-sm"
                                    data-bs-toggle="modal" :data-bs-target="`#AreaModal${index}`"
                                    :data-target="`#field-modal${index}`"
                                    title="Edit"
                                    >
                                    <i class="fa fa-pencil"></i>
                                  </button>

                                  <div
                                    :class="`modal fade bd-example-modal-lg${index}`"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="mySmallModalLabel"
                                    aria-hidden="true"
                                    :id="`AreaModal${index}`"
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

                                          <v-select v-model="selectedOptionIds" :options="options" label="title" multiple></v-select>

                                          <button @click="saveSelectedFields(item?.id,index)" class="btn btn-dark my-3">Save changes</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <!-- <td v-if="item?.fields.length > 0">
                                  <span v-for="(field, fieldIndex) in item?.fields" :key="fieldIndex" >{{ field?.title}} <span v-if="fieldIndex < item?.fields.length - 1">, </span></span>
                                </td>
                                <td v-else></td> -->

                                <td>
                                  <div v-if="item?.fields.length > 0">
                                    <span v-for="(field, fieldIndex) in item?.fields" :key="fieldIndex">
                                      {{ field.title }}<span v-if="fieldIndex < item?.fields.length - 1">, </span>
                                    </span>
                                  </div>
                                </td>

                                
                              </tr>
                              <tr>
                                <td class="fw-normal d-flex align-items-center justify-content-between">Location
                                  <button
                                    v-if="!loginUser?.state_insert"
                                    @click="setModal('locations',item?.id)"
                                      type="button"
                                      class="btn btn-dark btn-sm"
                                      data-bs-toggle="modal" :data-bs-target="`#StateModal${index}`"
                                      :data-target="`#location-modal${index}`"
                                      title="Edit"
                                    >
                                      <i class="fa fa-pencil"></i>
                                    </button>

                                    <div
                                      class="modal fade bd-example-modal-lg"
                                      tabindex="-1"
                                      role="dialog"
                                      aria-labelledby="mySmallModalLabel"
                                      aria-hidden="true"
                                      :id="`StateModal${index}`"
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

                                            <button @click="saveSelectedLocations(item?.id,index)" class="btn btn-dark my-3">Save changes</button>

                                          </div>
                                        </div>
                                      </div>
                                    </div>


                                </td>
                                <!-- <td v-if="item?.locations.length > 0">
                                  <span v-for="(location, locationIndex) in item?.locations" :key="locationIndex" >{{ location?.title}} <span v-if="locationIndex < item?.locations.length - 1">, </span></span>
                                </td> -->
                                <!-- <td v-else></td> -->
                                <td>
                                  <div v-if="item?.locations.length > 0">
                                    <span v-for="(location, locationIndex) in item?.locations" :key="locationIndex">
                                      {{ location.title }}<span v-if="locationIndex < item?.locations.length - 1">, </span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </details>
                      </td>

                      <td class="text-end button-width">
                        <div  class="mb-1">
                           {{ capitalizeFirstLetter(item?.admin_approval) }}<span v-if="item?.admin_approval == 'approve'">d</span>
                           <span v-if="item?.admin_approval == 'reject'">ed</span> at {{ formatCreatedAt(item.approved_timestamp) }}
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
      </div>
    </div>



    </div>
        <div class="footer">
            <MainFooter />
        </div>
  </div>
</template>
<script>
import AdminHeader from "./Header.vue";
import MainFooter from "../../components/global/MainFooter.vue";
import api from '@/config/api';
import $ from 'jquery';
window.$ = window.jQuery = $;
export default {
  components: {
    AdminHeader,
    MainFooter
  },

  data() {
    return {
      pageStatus: "pending",
      // openJobs: [],
      endpoint: "/admin/all-lawyers",
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

  // mounted() {
  //   this.fetchOptions();
  //   this.fetchOptions_locations();
  // },

  // async mounted() {
  //   window.addEventListener("scroll", () => {
  //     console.log('handle scroll: ', this.currentPage);
  //     console.log('handle 2: ', window.innerHeight + window.scrollY);
  //     // console.log('handle 3: ', document.body.offsetHeight - scrollThreshold);
  //     // You can customize the scroll position threshold as needed
  //     const scrollThreshold = 100;
  //     // Check if the user has scrolled to the bottom of the page
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - scrollThreshold &&
  //       this.openJobs.length > 0 && this.currentPage != this.lastPage
  //     ) {
  //       document.getElementById('loadMoreButton').click();
  //       console.log('handle 3 : ' , this.currentPage);
  //     }
  //   });
  // },
  // beforeUnmount() {
  //   // Remove the scroll event listener when the component is destroyed
  //   window.removeEventListener("scroll", this.handleScroll(this.pageStatus));
  // },

  methods: {

    setModalData(keyName, value, user_id) {

      // if (Array.isArray(keyName)) {
      //   keyName.forEach(element => {
      //     if (this.form[element] != null && this.form[element] !== "") {
      //       form[element] = this.form[element];
      //     }
      //   });
      // } else {
      this.form[keyName] = value;
      // }
      this.form.user_id = user_id;
      console.log(this.form);
    },

    setModal(type, user_id) {
      this.form.user_id = user_id;
      if (type == "fields") {
        this.fetchOptions();
        this.selectedOptionIds = this.selectedOptionIdsShow;
        console.log('idssss ::::: ', this.selectedOptionIdsShow);
      } else if (type == "locations") {
        this.fetchOptions_locations();
        this.selectedOptionIds_locations = this.selectedOptionIdsShow_locations;
      }
    },


    async fetchOptions() {
      try {
        const response = await api.get(`/get-active-fields?user_id=${this.form.user_id}`);
        console.log('sundak  :::: ', this.form.user_id, response?.data?.myFields);
        this.options = response?.data?.allFields;
        this.selectedOptionIds = response?.data?.myFields ?? [];
        this.selectedOptionIdsShow = response?.data?.myFields ?? [];
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },

    // locations
    async fetchOptions_locations() {
      try {
        const response = await api.get(`/get-active-locations?user_id=${this.form.user_id}`);
        console.log('sundak  :::: ', response?.data);
        this.options_locations = response?.data?.allLocations;
        this.selectedOptionIds_locations = response?.data?.myLocations ?? [];
        this.selectedOptionIdsShow_locations = response?.data?.myLocations ?? [];
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },

    // fields
    saveSelectedFields(user_id, index) {
      console.log('Selected Option IDs:', this.selectedOptionIds);
      if (this.selectedOptionIds.length == 0) {
        return false;
      }
      try {
        api.post('/admin/update-fields', { "user_id": user_id, "ids": this.selectedOptionIds, "is_admin": true }).then((res) => {
          this.$swal("", "Fields updated successfully", "success");
          this.closeModal(`#AreaModal${index}`);
          if (this.openJobs.length > 0) {
            const openJobsIndex = this.openJobs.findIndex(
              (user) => user.email === res?.data?.data?.email
            );
            if (openJobsIndex !== -1) {
              this.openJobs[openJobsIndex].fields = [...this.selectedOptionIds];
            }
          }

          //       this.fetchOptions();
          // this.fetchUserData();


        }).catch((error) => this.$swal("", error?.response?.data?.error, "error"));
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error")
        // console.error('Error uploading image', error);
      }
    },


    // locations
    saveSelectedLocations(user_id, index) {
      console.log('Selected Option IDs:', this.selectedOptionIds_locations);
      if (this.selectedOptionIds_locations.length == 0) {
        return false;
      }
      try {
        api.post('/admin/update-locations', { "user_id": user_id, "ids": this.selectedOptionIds_locations, "is_admin": true }).then((res) => {
          this.$swal("", "Locations updated successfully", "success");
          // this.fetchOptions_locations();
          // this.fetchUserData();
          this.closeModal(`#StateModal${index}`);
          console.log('loc ::::: ', this.openJobs);
          if (this.openJobs.length > 0) {
            console.log('index ::::: ', this.openJobs);
            console.log('index ::::: ', res);
            const openJobsIndex = this.openJobs.findIndex(
              (user) => user.email === res?.data?.data?.email
            );
            if (openJobsIndex !== -1) {
              this.openJobs[openJobsIndex].locations = [...this.selectedOptionIds_locations];
            }
          }

        }).catch((error) => this.$swal("", error?.response?.data?.error, "error"));
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error")
        // console.error('Error uploading image', error);
      }
    },


    async setStatus(status) {
      this.pageStatus = status;
      await this.loadMore(status, true)
    },
    approve(id, index) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: `Are you sure you want to approve this lawyer profile ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, Approve`,
        }).then((result) => {
          if (result.isConfirmed) {
            api
              .post("/admin/approve-reject-users", { user_id: id, status: 'approve' })
              .then(() => {
                this.$swal(
                  "",
                  `This lawyer is now approved.`,
                  "success"
                ).then(async () => {
                  this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
                });
              })
              .catch((error) => {
                console.log("error : ", error);
              });
          }
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },


    reject(id, index) {

      console.log(id, index);


      this.$swal.fire({
        title: 'Type reason here:',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: async (inputValue) => {
          try {
            // Call your API here
            const response = await api.post("/admin/approve-reject-users", {
              user_id: id,
              status: 'reject',
              reason: inputValue,
            });

            // Handle the API response as needed
            console.log('API Response:', response.data);

            // Return the input value if needed
            return inputValue;
          } catch (error) {
            // Handle API errors
            console.error('API Error:', error);

            // Show an error message in SweetAlert2
            this.$swal.showValidationMessage('API Error');
          }
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {

          if (result.isConfirmed) {
            this.$swal(
              "",
              `Lawyer has been rejected successfully`,
              "success"
            ).then(async () => {
              this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
            });
          }

          // Do something with the input value
          // Swal.fire(`You entered: ${result.value}`);
        }
      });

      // this.$swal.fire({
      //   title: 'Type reason here:',
      //   input: 'text',
      //   inputAttributes: {
      //     autocapitalize: 'off',
      //   },
      //   showCancelButton: true,
      //   confirmButtonText: 'Submit',
      //   showLoaderOnConfirm: true,
      //   preConfirm: (inputValue) => {
      //     // Process the input value (validate, submit, etc.)
      //     return new Promise((resolve) => {
      //       // Simulate an asynchronous operation (e.g., API call)
      //       setTimeout(() => {
      //         if (inputValue) {
      //           resolve(inputValue);
      //         } else {
      //           this.$swal.showValidationMessage('Please enter something');
      //         }
      //       }, 1000);
      //     });
      //   },
      //   allowOutsideClick: () => !this.$swal.isLoading(),
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     this.$swal(
      //             "",
      //             `Lawyer has been rejected successfully`,
      //             "success"
      //           ).then(async () => {
      //             this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
      //           });
      //   }
      // });



      // try {
      //   this.$swal({
      //     title: "Are you sure?",
      //     text: `Are you sure you want to reject this lawyer ?`,
      //     icon: "warning",
      //     showCancelButton: true,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: `Yes, Reject`,
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       api
      //         .post("/admin/approve-reject-users", { user_id: id, status: 'reject' })
      //         .then(() => {
      //           this.$swal(
      //             "",
      //             `Lawyer has been rejected successfully`,
      //             "success"
      //           ).then(async () => {
      //             this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
      //           });
      //         })
      //         .catch((error) => {
      //           console.log("error : ", error);
      //         });
      //     }
      //   });
      // } catch (error) {
      //   console.error("Error fetching options:", error);
      // }
    },

    closeModal(modalId) {
      $(modalId).modal('hide');
    },

  },
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
  width: 330px;
}

/* .hello {} */
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

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
  color: white;
  background-color: #000000;
}

.nav-pills .nav-link,
.nav-link:focus,
.nav-link:hover {
  color: #000000;
}

.text-left {
  text-align: left;
}

.button-width {
  width: 12%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
