import { createApp } from "vue";

import App from "./App.vue";
import router from "@/routers";
import store from "./store";
import api from "@/config/api.js";
import api2 from "@/config/api2.js";

import VueSelect from "vue-select";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
// import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons

import MultiSelect from "primevue/multiselect";
import ToastService from "primevue/toastservice";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

/* add icons to the library */
library.add(faUserSecret);

// import { firebaseApp } from '@/config/firebaseConfig';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCYtz53UDjnL1Sxvvvj0trjYpkYu2yc_8w",
//   authDomain: "simplawfy-eb7b9.firebaseapp.com",
//   projectId: "simplawfy-eb7b9",
//   storageBucket: "simplawfy-eb7b9.appspot.com",
//   messagingSenderId: "121685485242",
//   appId: "1:121685485242:web:4668ea675f42110f49c483"
// };
// // initializeApp(firebaseConfig);
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

// app.config.globalProperties.$db = db;

app.mixin({
  data() {
    return {
      clear: false,
      searchQuery: "",
      searchQueryNumberPagination: "",
      openJobs: [],
      closeJobs: [],
      currentPage: 0,
      lastPage: 0,

      data_paginated: [],
      admin_approval: "pending",
    };
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery == "" && !this.clear) {
        this.openJobs = [];
        this.currentPage = 0;
        this.lastPage = 0;
        let status = this.admin_approval;
        if (typeof this.pageStatus !== undefined) {
          status = this.pageStatus;
        }
        this.loadMore(status, true);
      }
    },

    searchQueryNumberPagination(newQuery) {
      if (newQuery == "" && !this.clear) {
        this.data_paginated = [];
        this.$store.commit("SET_PAGINATION_LAST", 0);
        this.getPaginatedData();
      }
    },
  },

  computed: {
    loadMorePrevData() {
      return this.$store.state.loadMorePrevData;
    },
    loginUserEmail() {
      return this.$store.getters?.loginUser?.email;
    },

    currentPaginationPage() {
      console.log("computed run");
      return this.$store.state.currentPaginationPage;
    },
    paginationEndpoint() {
      return this.$store.state.paginationEndpoint;
    },
  },

  methods: {

    goToMessagePage(item = null,type = null,reset = false) {
      if(item){
        this.saveJobInfo(item);
        this.saveLoadMoreData();

        this.$store.commit("SET_JOBIDTOCHAT", item?.id);
        this.$store.commit("SET_DATATAB", this.tab);

        if(type == 'lawyer'){
          this.$store.commit("SET_USERTOCHAT", item?.owner);
          if (item?.lawyer_chat == null) {
            this.$store.commit("SET_CHATSTATUS", "new");
          } else {
            this.$store.commit("SET_CHATSTATUS", "old");
          }
        }
      }
      
      if(item == null){
        console.log('else else else');
        this.saveJobInfo(null,reset);
        this.saveLoadMoreData(reset);
        this.$store.commit("SET_JOBIDTOCHAT", null);
        this.$store.commit("SET_DATATAB", null);
        this.$store.commit("SET_USERTOCHAT", null);
        this.$store.commit("SET_CHATSTATUS", null);
      }
      this.$router.push({ path: "/messages" });
    },

    saveJobInfo(item = null,reset = false) {
      if(reset){
        this.$store.commit("SET_JOB_DATA", null);
        localStorage.removeItem("jobData");
      }else{
        this.$store.commit("SET_JOB_DATA", item);
        localStorage.setItem("jobData", JSON.stringify(item));
      }
    },

    // save load more pagination data
    saveLoadMoreData(reset = false) {
      if(reset){
        this.$store.commit("SET_LOADMOREPREVDATA", null);
      }else{
        this.$store.commit("SET_LOADMOREPREVDATA", {
          currentPage: this.currentPage,
          lastPage: this.lastPage,
          openJobs: this.openJobs,
        });
      }
      
      console.log("curr : ", this.currentPage);
      console.log("last : ", this.lastPage);
    },

    goToLoginPage(type) {
      this.$store.commit("SET_USER_TYPE", type);
      localStorage.setItem("userType", type);
      this.$router.push("/login");
    },

    async updateProfile(keyName, modalId = null) {
      let formDataObject = {};
      if (Array.isArray(keyName)) {
        keyName.forEach((element) => {
          if (this.form[element] != null && this.form[element] !== "") {
            formDataObject[element] = this.form[element];
          }
        });
      } else {
        if (this.form[keyName] == null || this.form[keyName] === "") {
          return false;
        }
        formDataObject[keyName] = this.form[keyName];
      }
      formDataObject["user_id"] = this.form["user_id"];
      // if(user_id){
      //   formDataObject[keyName] = user_id;
      // }
      console.log("formDataObject:", formDataObject);
      try {
        api.post("/update-profile", formDataObject).then((res) => {
          console.log("chk res : ", res);
          if (modalId) {
            this.closeModal(modalId);
          }
          this.$swal("success", "Profile updated successfully", "").then(() => {
            // for multiple profiles edit from admin panel
            if (this.loginUserEmail != res?.data?.data?.email) {
              if (this.openJobs.length > 0) {
                const openJobsIndex = this.openJobs.findIndex(
                  (user) => user.email === res?.data?.data?.email
                );
                if (openJobsIndex !== -1) {
                  this.openJobs[openJobsIndex] = res?.data?.data;
                }
              }
            } else {
              this.setUserInStateAndLocalStorage(res);
            }
          });
        });
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error");
      }
    },

    // number pagination data
    async getPaginatedData() {
      console.log("func run");
      api
        .get(`${this.paginationEndpoint}?page=${this.currentPaginationPage}`)
        .then((res) => {
          this.data_paginated = res?.data?.data;
          console.log("last api : ", this.data_paginated);
          this.$store.commit("SET_PAGINATION_LAST", res?.data?.last_page);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //number pagination data search
    async searchNumberPaginationData(status = null) {
      if (this.searchQueryNumberPagination == "") return false;
      let obj = { query: this.searchQueryNumberPagination };
      if (status) obj.admin_approval = status;
      console.log(obj);
      const response = await api.get(this.paginationEndpoint, {
        params: obj,
      });
      // this.currentPage = 1;
      this.$store.commit("SET_PAGINATION_LAST", response?.data?.last_page);
      this.data_paginated = response?.data?.data;
      // console.log(response?.data);
      // console.log("last page : ", this.lastPage);
      // console.log("curr search : ", this.currentPage);
    },

    setUserInStateAndLocalStorage(res, removeFromLocalStorage = true) {
      console.log("new func : ", res?.data?.data?.link);
      const userData = {
        id: res?.data?.data?.id,
        first_name: res?.data?.data?.first_name,
        last_name: res?.data?.data?.last_name,
        email: res?.data?.data?.email,
        type: res?.data?.data?.type,
        phone: res?.data?.data?.phone,
        job_title: res?.data?.data?.job_title,
        law_firm: res?.data?.data?.law_firm,
        link: res?.data?.data?.link,
        about: res?.data?.data?.about,
        area_insert: res?.data?.data?.area_insert,
        state_insert: res?.data?.data?.state_insert,
        consultation_type: res?.data?.data?.consultation_type,
        consultation_amount: res?.data?.data?.consultation_amount,
        consultation_time: res?.data?.data?.consultation_time,
        remote_consultation:
          res?.data?.data?.remote_consultation == 1 ? true : false,
        mobile_friendly: res?.data?.data?.mobile_friendly == 1 ? true : false,
        fields: res?.data?.data?.fields,
        locations: res?.data?.data?.locations,
      };

      if (localStorage.getItem("loginUser") && removeFromLocalStorage) {
        localStorage.removeItem("loginUser");
      }
      localStorage.setItem("loginUser", JSON.stringify(userData));
      this.$store.commit("SET_LOGIN_USER", userData);
    },


    setUserStatus(result){
      if (
        result?.data?.subscription != null && 
        (result?.data?.subscription?.subscription_status == 'trialing' || 
        result?.data?.subscription?.subscription_status == 'active')
      ) 
      {
          store.commit("SET_SUB_STATUS", "subscribed");
          store.commit(
            "SET_SUB_CANCEL_STATUS",
            result?.data?.subscription?.is_cancel
          );
      }
      else if(
        result?.data?.subscription != null && 
        result?.data?.subscription?.subscription_status != 'trialing' && 
        result?.data?.subscription?.subscription_status != 'active'
      )
      {
        store.commit("SET_SUB_STATUS", "incomplete");
        store.commit("SET_SUB_CANCEL_STATUS",false);
      }
      else{
        store.commit("SET_SUB_STATUS", null);
        store.commit("SET_SUB_CANCEL_STATUS",false);
      }

      if (result?.data?.data?.admin_approval == "approve") {
        store.commit(
          "SET_APPROVAL_STATUS",
          result?.data?.data?.admin_approval
        );
      }

      store.commit("SET_SUBSCRIPTION_DATA", result?.data?.subscription);
    },

    fetchUserData() {
      api
        .get("/verify")
        .then((res) => {
          this.setUserInStateAndLocalStorage(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sendOtp(email) {
      console.log("user email : ", email);
      api
        .post("/generate-send-otp", { email })
        .then(() => {
          this.$swal(
            "",
            "Please check the email address you provided us for a verification code.",
            "success"
          ).then(() => {
            this.$store.commit("SET_OTP_EMAIL", email);
            localStorage.setItem("otpEmail", email);
            this.$router.push({ path: "/otp" });
          });

          // this.setUserAndRedirect(res, dashboardUrl);
        })
        .catch((error) => {
          this.$swal("", error?.response?.data?.error, "error");

          // alert("Invalid Credentials");
          console.log("getResults : ", error);
        });
    },

    // this function is to store user in state and localstorage after login then redirect to dashboard
    setUserAndRedirect(res, path) {
      console.log("single a : ", res?.data?.data);
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", res.data?.data?.api_token);
      }
      this.setUserInStateAndLocalStorage(res);
      this.$store.commit("SET_AUTHENTICATED", true);
      if (!path) {
        if (res?.data?.data?.type == "client") {
          path = "client-dashboard";
        } else if (res?.data?.data?.type == "lawyer") {
          console.log("len of fields : ", res?.data?.data?.fields.length);
          console.log("len of locations : ", res?.data?.data?.locations.length);
          if (
            res?.data?.data?.fields.length > 0 &&
            res?.data?.data?.locations.length > 0 &&
            res?.data?.data?.admin_approval == "approve"
          ) {
            path = "lawyer-dashboard";
          } else {
            path = "lawyer-profile";
          }
        }
      }
      this.$router.push({ path: path });
    },



    openJobDetailModal(data) {
      let newData = {};
      if (data && typeof data === "object") {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (
              value !== null &&
              key != "id" &&
              key != "field_id" &&
              key != "location_id" &&
              key != "status" &&
              key != "owner_id" &&
              key != "accessibility_requirements" &&
              key != "created_at" &&
              key != "chats" &&
              key != "updated_at"
            ) {
              let objKey = key;
              objKey = objKey.replace(/_/g, " ");
              newData[objKey] = value;

              if(key == 'field' || key == 'location'){
                newData[objKey] = value?.title;
              }
            }
          }
        }
      }
      const htmlContent = Object.entries(newData)
        .map(
          ([key, value]) =>
            `<div class="wrapper" v-if="value != null"><h6><b style="text-transform: capitalize;">${key}: </b><span>${value}</span></h6></div><br />`
        )
        .join("");

      // Use dynamic HTML inside SweetAlert2 modal
      this.$swal.fire({
        title: "Job Details",
        html: `<div class="table-wrap" style="text-align:left !important;">${htmlContent}</div>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: "my-swal-container", // You can define your custom class for styling
        },
      });
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
              let objKey = key;
              objKey = objKey.replace(/_/g, " ");
              newData[objKey] = value;
            }
          }
        }
      }
      const htmlContent = Object.entries(newData)
        .map(
          ([key, value]) =>
            `<div class="wrapper" v-if="value != null"><h6><b style="text-transform: capitalize;">${key}: </b><span>${value}</span></h6></div><br />`
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

    // for lawyer and client details both
    openLawyerDetailsModal(data) {
      let newData = {};
      if (data && typeof data === "object") {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (
              value !== null &&
              value != 0 &&
              key != "id" &&
              key != "admin_approval" &&
              key != "otp_verified" &&
              key != "area_insert" &&
              key != "state_insert" &&
              key != "is_subscribed_first" &&
              key != "followup_email_status_two" &&
              key != "api_token" &&
              key != "created_at" &&
              key != "type" && key != "status" && key != "hear_about_us" && key != 'approved_timestamp' &&
              key != "updated_at"
            ) {
              let objKey = key;
              objKey = objKey.replace(/_/g, " ");
              newData[objKey] = value;
            }
          }
        }
      }
      const htmlContent = Object.entries(newData)
        .map(
          ([key, value]) =>
            `<div class="wrapper" v-if="value != null"><h6><b style="text-transform: capitalize;">${key}: </b><span>${value}</span></h6></div>`
        )
        .join("");

      // Use dynamic HTML inside SweetAlert2 modal
      this.$swal.fire({
        title: `${this.capitalizeFirstLetter(data?.type)} Details`,
        html: `<div class="table-wrap" style="text-align:left !important;">${htmlContent}</div>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: "my-swal-container", // You can define your custom class for styling
        },
      });
    },

   

    // openProposalDetailsModal(data) {
    //   console.log('proposal details : ' , data);
    //   let newData = {};
    //   let specificTasks = [];
    //   let disbursements = [];
    //   let feeEarners = [];
    //   if (data && typeof data === 'object') {
    //     for (const key in data) {
    //       if (Object.prototype.hasOwnProperty.call(data, key)) {
    //         const value = data[key];
    //         if (value !== null
    //           && key != 'id'
    //           && key != 'lawyer_id'
    //           && key != 'job_id'
    //           && key != 'user_id'
    //           && key != 'created_at'
    //           && key != 'updated_at'
    //           ) {
    //             let objKey = key;
    //             objKey = objKey.replace(/_/g, " ");
    //             if(key == 'specific_tasks'){
    //               specificTasks = [...value];
    //             }
    //             else if(key == 'disbursements'){
    //               disbursements = [...value];
    //             }
    //             else if(key == 'fee_earners'){
    //               feeEarners = [...value];
    //             }
    //             else{
    //               if(objKey == "lawyer" && value != null){
    //                 newData["lawyer email"] = value?.email;
    //               }else{
    //                 newData[objKey] = value;
    //               }
    //             }
    //         }
    //       }
    //     }
    //   }

    //   console.log(specificTasks);
    //   console.log(disbursements);
    //   console.log(feeEarners);

    //   const htmlContent = Object.entries(newData)
    //     .map(([key, value]) => `<div class="wrapper" v-if="value != null"><h6><b>${key}: </b><span>${value}</span></h6></div>`)
    //     .join('');

    //   // Use dynamic HTML inside SweetAlert2 modal
    //   this.$swal.fire({
    //     title: 'Proposal Details',
    //     html: `<div class="table-wrap" style="text-align:left !important;">${htmlContent}</div>`,
    //     showCloseButton: true,
    //     showConfirmButton: false,
    //     customClass: {
    //       container: 'my-swal-container', // You can define your custom class for styling
    //     },
    //   });
    // },


    isNumericString(value) {
      // Regular expression to check if the string contains only digits or decimals
      var numericRegex = /^[0-9]+(\.[0-9]+)?$/;
    
      return numericRegex.test(value);
    },

    // disbursementsOrTasksTotal(data) {
    //   return this.data.reduce(
    //     (total, row) => total + parseFloat(row.costAud) || 0,
    //     0
    //   );
    // },

    // // additional fee earner
    // feeEarnersTotal(data) {
    //   return this.data.reduce(
    //     (total, row) => total + parseFloat(row.hourlyRate * row.estimatedHours) || 0,
    //     0
    //   );
    // },

    openProposalDetailsModal(data, renderAsHtml = false) {
      console.log("proposal details:", data);
      let newData = {};
      let specificTasks = [];
      let disbursements = [];
      let feeEarners = [];

      if (data && typeof data === "object") {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            let value = data[key];
            if (
              value !== null &&
              key != "id" &&
              key != "lawyer_id" &&
              key != "job_id" &&
              key != "user_id" &&
              key != "created_at" &&
              key != "updated_at" && key != "show" && key != "description" && key != "lawyer" && key != "job"
              && key != "status"
            ) {
              let objKey = key;
              objKey = objKey.replace(/_/g, " ");

              if (key == "specific_tasks") {
                specificTasks = [...value];
              } else if (key == "disbursements") {
                disbursements = [...value];
              } else if (key == "fee_earners") {
                feeEarners = [...value];
              } else {
                if (objKey == "lawyer" && value != null) {
                  newData["lawyer email"] = value?.email;
                } else {
                  value = (this.isNumericString(value)) ? '$'+value : value;  
                  newData[objKey] = value;
                }
              }
            }
          }
        }
      }
      const mainHtmlContent = Object.entries(newData)
        .map(
          ([key, value]) =>
            `<div class="wrapper" v-if="value != null"><h6"><b style="text-transform: capitalize;">${key}:</b> <span>${value}</span></h6></div><br />`
        )
        .join("");

      let specificTasksTable = "<span></span>";
      let disbursementsTable = "<span></span>";
      let feeEarnersTable = "<span></span>";
      if (specificTasks.length > 0) {
        specificTasksTable = this.createTableHtml(
          "Specific Tasks",
          specificTasks
        );
      }
      if (disbursements.length > 0) {
        disbursementsTable = this.createTableHtml(
          "Disbursements",
          disbursements
        );
      }
      console.log('dis 1 : ' , disbursementsTable);
      if (feeEarners.length > 0) {
        feeEarnersTable = this.createTableHtmlFeeEarners(
          "Fee Earners",
          feeEarners
        );
      }

      const swalHtmlContent = `
        <div class="table-wrap" style="text-align: left !important;">${mainHtmlContent}</div>
        ${specificTasksTable}
        ${disbursementsTable}
        ${feeEarnersTable}
      `;

      // Use dynamic HTML inside SweetAlert2 modal

      if (renderAsHtml) {
        return [disbursementsTable,feeEarnersTable,specificTasksTable];
      } else {
        this.$swal.fire({
          title: "Proposal Details",
          html: swalHtmlContent,
          showCloseButton: true,
          showConfirmButton: false,
          customClass: {
            container: "my-swal-container", // You can define your custom class for styling
          },
        });
      }
    },


    

    createTableHtml(title, dataArray) {
      const total = dataArray.reduce(
        (total, row) => total + parseFloat(row.cost ?? row.costAud) || 0,
        0
      );
      const tableContent = dataArray
        .map(
          (item, index) => `
            <tr>
              <td class='border'>${index + 1}</td>
              <td class='border'>${item.task ?? item.itemDisbursement}</td> 
              <td class='border'>$${item.cost ?? item.costAud}</td>
            </tr>
          `
        )
        .join("");

      return `
        <div class="table-title"><h5 style="text-align:left !important">${title} : </h5></div>
        <table class='table dynamicTable'>
          <thead>
            <tr class='border'>
              <th class='border'>#</th>
              <th class='border'>Task</th>
              <th class='border'>Cost</th>
            </tr>
          </thead>
          <tbody>
            ${tableContent}
          </tbody>
          <tfoot>
            <tr >
              <td class='bg-dark text-white'>Total</td><td class='bg-dark'></td>
              <td class='bg-dark text-white'>$${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      `;
    },


    

    createTableHtmlFeeEarners(title, dataArray) {
      // const total = dataArray.reduce(
      //   (total, row) => total + parseFloat(row.hourlyRate * row.estimatedHours) || 0,
      //   0
      // );
      let grandTotal = 0;
      const tableContent = dataArray
        .map(
          (item, index) => {
            const subTotal = (item.hourly_rate ?? item.hourlyRate) * (item.hours ?? item.estimatedHours);
            grandTotal += subTotal;
            return `
            <tr>
              <td class='border'>${index + 1}</td>
              <td class='border'>${item.title}</td> <!-- Replace with actual properties -->
              <td class='border'>$${item.hourly_rate ?? item.hourlyRate}</td>
              <td class='border'>${item.hours ?? item.estimatedHours}</td>
              <td class='border'>$${subTotal.toFixed(2)}</td>
            </tr>
          `;
          }
        )
        .join("");

      return `
        <div class="table-title"><h5 style="text-align:left !important">${title} : </h5></div>
        <table class='table dynamicTable'>
          <thead>
            <tr>
              <th class='border'>#</th>
              <th class='border'>Title</th>
              <th class='border'>Hourly Rate</th>
              <th class='border'>Hours</th>
              <th class='border'>Total</th>
            </tr>
          </thead>
          <tbody>
            ${tableContent}
          </tbody>
          <tfoot>
            <tr>
              <td class='bg-dark text-white'>Total</td><td class='bg-dark'></td><td class='bg-dark'></td><td class='bg-dark'></td>
              <td class='bg-dark text-white'>$${grandTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      `;
    },

    // check subscription status of login user
    // checkSubscriptionAndAdminApproval() {
    //     try {
    //         api.get('/lawyer/subscription-admin-approval')
    //             .then(res => {
    //                 this.$store.commit('SET_SUB_STATUS',res?.data?.subscription_status);
    //                 this.$store.commit('SET_APPROVAL_STATUS',res?.data?.approve_status);
    //             })
    //             .catch(error => console.log("api error : ", error.message));
    //     } catch (error) {
    //         console.error('API request error:', error);
    //     }
    // },

    // check admin approval for lawyer
    // checkAdminApproval() {
    //     try {
    //         api.get('/lawyer/check-admin-approval')
    //             .then(res => {
    //                 this.$store.commit('SET_APPROVAL_STATUS',res?.data?.status);
    //             })
    //             .catch(error => console.log("api error : ", error.message));
    //     } catch (error) {
    //         console.error('API request error:', error);
    //     }
    // },

    submitSignupForm(formData, userType) {
      try {
        formData.type = userType;
        api
          .post("/signup", formData)
          .then((res) => {
            this.sendOtp(res?.data?.data?.email);
            // if (userType == "lawyer") {
            //   this.$swal({
            //     // title: 'Thank you for signing up.',
            //     text: "Thank you for signing up. Please complete your profile.",
            //     icon: "success",
            //     // showCancelButton: true,
            //     // confirmButtonColor: '#3085d6',
            //     // cancelButtonColor: '#d33',
            //     confirmButtonText: "Complete Your Profile",
            //   }).then((result) => {
            //     if (result.isConfirmed) {
            //       // this.setUserAndRedirect(res, dashboardUrl);
            //       this.sendOtp(res?.data?.data?.email);
            //     }
            //   });
            // } else {
            //   // this.setUserAndRedirect(res, dashboardUrl);
            //   this.sendOtp(res?.data?.data?.email);
            // }
          })
          .catch((error) => {
            // console.log('my : ' , error?.response.data?.errors.email);
            // if(typeof error?.response.data?.errors.email[0] != undefined){
            //   error = error?.response.data?.errors.email[0]
            // }else{
            //   error = error?.response?.data?.error;
            // }
            // this.$swal(
            //   "",
            //   error,
            //   "error"
            // );
            // console.log("getResults : ", error);

            this.showBackendErrors(error);
          });
      } catch (error) {
        console.error("API request error:", error);
      }
    },

    showBackendErrors(error) {
      // console.log("my : ", error?.response.data?.errors.email);

      let errorMessages = [];

      if (error?.response.data?.errors) {
        // Iterate through the errors and collect them in an array
        for (const key in error.response.data.errors) {
          if (
            Object.prototype.hasOwnProperty.call(
              error.response.data.errors,
              key
            )
          ) {
            const errorArray = error.response.data.errors[key];
            errorMessages = errorMessages.concat(errorArray);
          }
        }
      } else {
        // If there are no specific field errors, use a general error message
        errorMessages.push(
          error?.response?.data?.error || "An unknown error occurred."
        );
      }

      // Display the error messages
      this.$swal({
        title: "Error",
        text: errorMessages.join("\n"), // Display each error on a new line
        icon: "error",
      });
    },

    goToForgetPasswordPage(url) {
      localStorage.setItem("backUrl", url);
      this.$router.push({ path: "/forget-password" });
    },

    submitLoginForm(formData, userType, dashboardUrl) {
      try {
        formData.type = userType;
        api
          .post("/login", formData)
          .then((res) => {
            this.setUserAndRedirect(res, dashboardUrl);
          })
          .catch((error) => {
            // this.$swal("", error?.response?.data?.error, "error");
            this.$swal("", "Incorrect email or password.", "error");
            // alert("Invalid Credentials");
            console.log("getResults : ", error);
          });
        console.log(formData);
      } catch (error) {
        this.$swal("", "Incorrect email or password.", "error");
        // this.showBackendErrors(error);
        // console.error("API request error:", error);
      }
    },

    logoutProcess(redirectUrl, redirection = true) {
      localStorage.removeItem("token");
      this.$store.commit("SET_AUTHENTICATED", false);
      localStorage.removeItem("loginUser");
      this.$store.commit("SET_LOGIN_USER", null);
      this.$store.commit("SET_SUB_STATUS", null);
      this.$store.commit("SET_SUB_CANCEL_STATUS", false);
      this.$store.commit("SET_APPROVAL_STATUS", null);
      this.$store.commit("SET_SUBSCRIPTION_DATA", null);

      this.$store.commit("SET_DATATAB", null);
      this.$store.commit("SET_CHATSTATUS", null);
      this.$store.commit("SET_JOBIDTOCHAT", null);
      this.$store.commit("SET_USERTOCHAT", null);

      if (redirection) {
        this.$router.push({ path: redirectUrl });
      }
    },

    logout(redirectUrl, redirection = true) {
      try {
        api
          .get("/logout")
          .then(() => {
            this.logoutProcess(redirectUrl, redirection);
          })
          .catch((error) => console.log("getResults : ", error));
      } catch (error) {
        console.error("API request error:", error);
      }
    },

    // loadmore pagination and search functions start

    async search(status = null) {
      console.log(status);
      if (this.searchQuery == "") return false;
      let obj = { query: this.searchQuery };
      if (this.endpoint == "/admin/all-lawyers") {
        obj.admin_approval = status;
      }
      // if (status) obj.admin_approval = status;
      console.log(obj);
      const response = await api.get(this.endpoint, {
        params: obj,
      });
      this.currentPage = 1;
      this.lastPage = response?.data?.last_page;
      this.openJobs = response?.data?.data;
      // console.log(response?.data);
      console.log("last page : ", this.lastPage);
      console.log("curr search : ", this.currentPage);
    },

    async loadMore(status = null, reset = null) {
      console.log("check computed : ", this.loadMorePrevData);
      if (this.loadMorePrevData != null) {
        this.currentPage = this.loadMorePrevData.currentPage;
        this.lastPage = this.loadMorePrevData.lastPage;
        this.openJobs = this.loadMorePrevData.openJobs;
        this.$store.commit("SET_LOADMOREPREVDATA", null);
        return false;
      }
      console.log(status, "l1");
      // if (this.currentPage > this.lastPage) {
      //   return;
      // }

      if (reset) {
        this.searchQuery = "";
        this.clear = false;
        this.currentPage = 0;
        this.openJobs = [];
        this.lastPage = null;
      }
      this.currentPage++;
      let url = null;
      if (this.searchQuery != "") {
        url = `${this.endpoint}?query=${this.searchQuery}&page=${this.currentPage}`;
      } else {
        url = `${this.endpoint}?page=${this.currentPage}`;
      }
      console.log("url ::: ", url);

      if (this.endpoint == "/admin/all-lawyers") {
        url = url + `&admin_approval=${status}`;
      }

      console.log("url 2 ::: ", url);

      const response = await this.fetchData(url);
      // console.log("pagin : ", response);
      // console.log("curr : ", this.currentPage);
      this.lastPage = response?.last_page;
      let jobsData = this.openJobs.concat(response?.data);
      let uniqueObjects = new Map();
      jobsData.forEach((obj) => {
        uniqueObjects.set(obj.id, obj);
      });
      let uniqueArray = Array.from(uniqueObjects.values());
      this.openJobs = uniqueArray;
    },

    async fixLoadMoreAfterDeleteRecord(index, status = null) {
      this.openJobs.splice(index, 1);
      if (this.currentPage < this.lastPage) {
        this.currentPage--;
        if (status) {
          await this.loadMore(status);
        } else {
          await this.loadMore();
        }
      }
    },

    async clearSearch(status = null) {
      console.log(status);
      if (this.searchQuery == "") return false;
      this.clear = true;
      this.openJobs = [];
      this.searchQuery = "";
      this.currentPage = 1;
      this.lastPage = 0;

      let url = `${this.endpoint}?page=${this.currentPage}`;

      // if (status) {
      //   url = url + `&admin_approval=${status}`;
      // }
      if (this.endpoint == "/admin/all-lawyers") {
        url = url + `&admin_approval=${status}`;
      }

      const response = await this.fetchData(url);
      this.lastPage = response?.last_page;
      this.openJobs = response?.data;
      this.clear = false;
    },
    async fetchData(url) {
      let response = null;
      if(this.openJobs.length > 0){
        response = await api2.get(url);
      }else{
        response = await api.get(url);
      }
      return response?.data;
    },

    // load more pagination and search functions end

    // date time format function start

    formatCreatedAt(created_at) {
      const date = new Date(created_at);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
      let hours = date.getHours();
      // const minutes = date.getMinutes();
      // const period = hours < 12 ? "am" : "pm";

      // Adjust hours to 12-hour format
      if (hours > 12) {
        hours -= 12;
      }

      // Ensure leading zeros for single-digit day, month, hours, and minutes
      const formattedDay = day < 10 ? "0" + day : day;
      const formattedMonth = month < 10 ? "0" + month : month;
      // const formattedHours = hours < 10 ? "0" + hours : hours;
      // const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return `${formattedDay}/${formattedMonth}/${year}`;
      // return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}${period} AEST`;
    },

    // date time format function end

    capitalizeFirstLetter(status) {
      if (status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
      } else {
        return "N/A";
      }
    },
  },
});

app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(VueSweetalert2);

app.component("v-select", VueSelect);
app.component("MultiSelectPrime", MultiSelect);
app.use(ToastService);
app.mount("#app");
