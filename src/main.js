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

import { getToken } from "firebase/messaging";
import { messaging } from "@/config/firebaseConfig";
import { deleteToken } from "firebase/messaging";

import Papa from "papaparse";

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
      baseUrl:
        process.env.NODE_ENV === "production"
          ? "https://virtualrealitycreators.com/law-backend/"
          : "http://127.0.0.1:8000/",
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
    noti_job() {
      return this.$store.state.noti_count_job;
    },
    noti_msg() {
      return this.$store.state.noti_count_msg;
    },
    loadMorePrevData() {
      return this.$store.state.loadMorePrevData;
    },
    loginUserEmail() {
      return this.$store.getters?.loginUser?.email;
    },
    loginUserId() {
      return this.$store.getters?.loginUser?.id;
    },
    loginUser() {
      return this.$store.getters?.loginUser;
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

    async uploadImage() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      try {
        api.post("/upload-image", formData).then((res) => {
          this.$swal(
            "",
            "You have successfully uploaded your profile picture.",
            "success"
          ).then(() => {
            this.image = this.baseUrl + "storage/images/" + res?.data?.image;
            console.log(res);
            console.log("loginUser : " + res?.data?.image);
            fileInput.value = "";
          });
        });
      } catch (error) {
        this.$swal("", error?.response?.data?.error, "error");
        // console.error('Error uploading image', error);
      }
    },

    changeAccountStatus(id, type, status, pageStatus) {
      this.$swal({
        title: "Are you sure?",
        text: `Are you sure you want to ${
          status == "block" ? "unblock" : "block"
        } this user ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .post("/admin/block-unblock-user", { id, type, status })
            .then(() => {
              this.$swal(
                "",
                `This user is now ${
                  status == "block" ? "unblock" : "block"
                }ed.`,
                "success"
              ).then(async () => {
                await this.loadMore(pageStatus, true);
                // this.fixLoadMoreAfterDeleteRecord(index, this.pageStatus);
              });
            })
            .catch((error) => {
              console.log("error : ", error);
            });
        }
      });
    },

    generateCsv(type) {
      api
        .get(`/admin/users-data/${type}`)
        .then((res) => {
          const data = res?.data;
          const csv = Papa.unparse(data);

          // Create a Blob with the CSV data
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

          // Create a download link and trigger the download
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", `${type}s.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // convert numbers in currency format
    formatNumber(number) {
      // Ensure that the input is a number
      console.log("number to formate : ", number);
      // if (typeof number !== 'number') {
      //   return number;
      // }
      if (!this.isNumericString(number)) {
        return number;
      }

      number = parseFloat(number);

      // Use a custom function to format the number with space as a thousands separator
      const parts = number.toFixed(2).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    },

    goToMessagePage(item = null, type = null, reset = false) {
      if (item) {
        this.saveJobInfo(item);
        this.saveLoadMoreData();

        this.$store.commit("SET_JOBIDTOCHAT", item?.id);
        this.$store.commit("SET_DATATAB", this.tab);

        if (type == "lawyer") {
          this.$store.commit("SET_USERTOCHAT", item?.owner);
          if (item?.lawyer_chat == null) {
            this.$store.commit("SET_CHATSTATUS", "new");
          } else {
            this.$store.commit("SET_CHATSTATUS", "old");
          }
        }
      }

      if (item == null) {
        console.log("else else else");
        this.saveJobInfo(null, reset);
        this.saveLoadMoreData(reset);
        this.$store.commit("SET_JOBIDTOCHAT", null);
        this.$store.commit("SET_DATATAB", null);
        this.$store.commit("SET_USERTOCHAT", null);
        this.$store.commit("SET_CHATSTATUS", null);
      }
      this.$store.commit("SET_IS_NOT_HEADER_CHAT", true);
      // this.$router.push({ path: "/messages" });
      this.$router.push({
        path: "/messages-history",
        query: { job: item?.id },
      });
    },

    getLastPartOfUrl() {
      const currentUrl = window.location.href;
      // Extract the last part of the URL (after the last slash)
      return currentUrl.split("/").pop();
    },

    saveJobInfo(item = null, reset = false) {
      if (reset) {
        this.$store.commit("SET_JOB_DATA", null);
        localStorage.removeItem("jobData");
      } else {
        console.log("save jbo index , ", item);
        this.$store.commit("SET_JOB_DATA", item);
        localStorage.setItem("jobData", JSON.stringify(item));
      }
    },

    // save load more pagination data
    saveLoadMoreData(reset = false) {
      if (reset) {
        this.$store.commit("SET_LOADMOREPREVDATA", null);
      } else {
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

    async updateProfile(keyName, modalId = null, keyName2 = "Profile") {
      console.log("response after update 1", keyName);
      if (modalId == "#ConsultationModal" && Array.isArray(keyName)) {
        this.form.consultation_type = this.form.consultation_type2;
        this.form.consultation_amount = this.form.consultation_amount2;
        this.form.consultation_time = this.form.consultation_time2;

        keyName = [
          "consultation_type",
          "consultation_amount",
          "consultation_time",
        ];

        console.log(keyName.length);
        if (keyName.length == 3) {
          console.log(keyName[0], keyName[2]);
          if (
            this.form[keyName[0]] == "free" &&
            this.form[keyName[2]] == null
          ) {
            return false;
          }
          console.log(keyName[0], keyName[1], keyName[2]);
          if (
            this.form[keyName[0]] == "discounted" &&
            (this.form[keyName[1]] == null || this.form[keyName[2]] == null)
          ) {
            return false;
          }
        }
      }
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

          let msg = null;
          if(keyName == "first_name_verify" && this.loginUser?.admin_approval == 'approve'){
              msg = `First Name will be updated after admin verification`;
          }
          else if(keyName == "last_name_verify" && this.loginUser?.admin_approval == 'approve'){
              msg = `Last Name will be updated after admin verification`;
          }else{
             msg = `${keyName2} updated successfully`;
          }
          
          

          this.$swal("", msg, "success").then(
            () => {
              // for multiple profiles edit from admin panel
              if (this.loginUserId != res?.data?.data?.id) {
                // if (this.loginUserEmail != res?.data?.data?.email) {
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
            }
          );
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
      console.log("new func : ", res?.data?.data);
      const userData = {
        id: res?.data?.data?.id,
        first_name: res?.data?.data?.first_name,
        last_name: res?.data?.data?.last_name,
        email: res?.data?.data?.email,
        type: res?.data?.data?.type,
        phone: res?.data?.data?.phone,
        address: res?.data?.data?.address,
        job_title: res?.data?.data?.job_title,
        law_firm: res?.data?.data?.law_firm,
        link: res?.data?.data?.link,
        is_subscribed_first: res?.data?.data?.is_subscribed_first,
        about: res?.data?.data?.about,
        area_insert: res?.data?.data?.area_insert,
        state_insert: res?.data?.data?.state_insert,
        image: res?.data?.data?.image,
        consultation_type: res?.data?.data?.consultation_type,
        consultation_amount: res?.data?.data?.consultation_amount,
        consultation_time: res?.data?.data?.consultation_time,
        remote_consultation:
        res?.data?.data?.remote_consultation == 1 ? true : false,
        mobile_friendly: res?.data?.data?.mobile_friendly == 1 ? true : false,
        fields: res?.data?.data?.fields,
        locations: res?.data?.data?.locations,
        admin_approval: res?.data?.data?.admin_approval,
        suburb: res?.data?.data?.suburb
      };

      if (localStorage.getItem("loginUser") && removeFromLocalStorage) {
        localStorage.removeItem("loginUser");
      }
      localStorage.setItem("loginUser", JSON.stringify(userData));
      this.$store.commit("SET_LOGIN_USER", userData);
    },

    setUserStatus(result) {
      if (
        result?.data?.subscription != null &&
        (result?.data?.subscription?.subscription_status == "trialing" ||
          result?.data?.subscription?.subscription_status == "active")
      ) {
        store.commit("SET_SUB_STATUS", "subscribed");
        store.commit(
          "SET_SUB_CANCEL_STATUS",
          result?.data?.subscription?.is_cancel
        );
      } else if (
        result?.data?.subscription != null &&
        result?.data?.subscription?.subscription_status != "trialing" &&
        result?.data?.subscription?.subscription_status != "active"
      ) {
        store.commit("SET_SUB_STATUS", "incomplete");
        store.commit("SET_SUB_CANCEL_STATUS", false);
      } else {
        store.commit("SET_SUB_STATUS", null);
        store.commit("SET_SUB_CANCEL_STATUS", false);
      }

      if (result?.data?.data?.admin_approval == "approve") {
        store.commit("SET_APPROVAL_STATUS", result?.data?.data?.admin_approval);
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

    sendOtp(email = null) {
      console.log("user email : ", email);
      if (email == null) {
        email = "admin@mailinator.com";
      }
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

            if (email == "admin@mailinator.com") {
              this.$router.push({ path: "/otp-verification" });
            } else {
              this.$router.push({ path: "/otp" });
            }
          });

          // this.setUserAndRedirect(res, dashboardUrl);
        })
        .catch((error) => {
          this.$swal("", error?.response?.data?.error, "error");

          // alert("Invalid Credentials");
          console.log("getResults : ", error);
        });
    },

    chargeType(type) {
      if (type) {
        let selectedOptionForSummary = "";
        switch (type) {
          case "Fixed":
            selectedOptionForSummary = "Fixed fee";
            break;
          case "Hourly":
            selectedOptionForSummary = "Hourly rate";
            break;
          case "Daily":
            selectedOptionForSummary = "Daily rate";
            break;
          case "Item":
            selectedOptionForSummary = "Item by item for specific tasks";
            break;
          case "Retainer":
            selectedOptionForSummary = "Retainer";
            break;
          case "Success":
            selectedOptionForSummary = "Success fee";
            break;
          case "Pro":
            selectedOptionForSummary = "Pro bono";
            break;
        }
        return selectedOptionForSummary;
      }
    },

    goToViewProposals(data) {
      let id = data?.id;
      // this.$store.commit('SET_LOADMOREPREVDATA',{'currentPage' : this.currentPage, 'lastPage' : this.lastPage, 'openJobs' : this.openJobs});
      // console.log('curr : ' , this.currentPage)
      // console.log('last : ' , this.lastPage)
      this.saveLoadMoreData();
      this.$store.commit("SET_JOB_ID", id);
      localStorage.setItem("jobId", id);
      this.$store.commit("SET_DATATAB", this.tab);
      this.saveJobInfo(data);
      this.$router.push({ path: "/view-proposals" });
    },

    // reset notification count
    resetCount(type) {
      let count;
      if (this.noti_msg > 0 && type == "message") {
        count = this.noti_msg;
        this.$store.commit("SET_NOTI_COUNT_MSG", 0);
        localStorage.setItem("noti_count_msg", 0);
      }
      if (this.noti_job > 0 && type == "job") {
        count = this.noti_job;
        this.$store.commit("SET_NOTI_COUNT_JOB", 0);
        localStorage.setItem("noti_count_job", 0);
      }
      // console.log(this.noti_job);
      if (count > 0) {
        api2
          .post("/notification-seen", {
            noti_status: type,
            count: count,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // this function is to store user in state and localstorage after login then redirect to dashboard
    setUserAndRedirect(res, path) {
      console.log("single a : ", res?.data);
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", res.data?.data?.api_token);
      }
      this.$store.commit("SET_NOTI_COUNT_MSG", res?.data?.noti_msg);
      localStorage.setItem("noti_count_msg", res?.data?.noti_msg);
      this.$store.commit("SET_NOTI_COUNT_JOB", res?.data?.noti_job);
      localStorage.setItem("noti_count_job", res?.data?.noti_job);

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

      if (path != "admin-dashboard") {
        this.requestNotificationPermission();
        this.$router.push({ path: path });
      } else {
        this.sendOtp(null);
      }
    },

    openJobDetailModal(data, removeArea = false) {
      let newData = {};
      if (data && typeof data === "object") {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            let value = data[key];
            if (
              value !== null &&
              typeof value !== undefined &&
              // key != "id" &&
              // key != "field_id" &&
              // key != "location_id" &&
              // key != "status" &&
              // key != "owner_id" &&
              // key != "accessibility_requirements" &&
              // key != "created_at" &&
              // key != "chats" &&
              // key != "updated_at" &&
              // key != "lawyer_chat" &&
              // key != "client_chat" &&
              // key != "owner" &&
              // key != "requirement" &&
              // key != "proposal" && key != "proposals" &&
              // key != "assigned_lawyer_id" && key != "assigned_lawyer"
              (key == "title" ||
                key == "description" ||
                key == "field" ||
                key == "location" ||
                key == "city" ||
                key == "identity" ||
                key == "owner")
            ) {
              let objKey = key;
              objKey = objKey.replace(/_/g, " ");
              if (key == "field") {
                objKey = "Areas of Practice";
              }
              if (key == "location") {
                objKey = "State/territory";
              }
              if (key == "city") {
                objKey = "City/suburb";
              }
              if (key == "identity") {
                objKey = "Job no";
              }
              if (key == "owner") {
                objKey = "Client details";
                value = `<b>Name : </b>${value?.first_name} ${value?.last_name}, <b>Email : </b>${value?.email}`;
              }
              newData[objKey] = value;
              if (key == "field" || key == "location") {
                newData[objKey] = value?.title;
              }
            }
          }
        }
        if (removeArea) {
          delete newData["Areas of Practice"];
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
            `<div class="wrapper" v-if="value != null"><h6><b style="text-transform: capitalize;">${key}: </b><span>${value}</span></h6></div>`
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

    checkObjKeyValue(obj, key) {
      return obj[key] !== null && obj[key] !== undefined && obj[key] !== 0;
    },

    moveKeyToIndex(obj, keyToMove, targetIndex) {
      const entries = Object.entries(obj);

      // Find the index of the key to move
      const currentIndex = entries.findIndex(([key]) => key === keyToMove);

      // If the key is found, remove it from the array
      if (currentIndex !== -1) {
        const [removed] = entries.splice(currentIndex, 1);

        // Insert the removed key-value pair at the target index
        entries.splice(targetIndex, 0, removed);
      }

      // Create a new object from the modified entries
      const newObj = Object.fromEntries(entries);
      return newObj;
    },

    // for lawyer and client details both
    openLawyerDetailsModal(data, showSecretInfo = false) {
      console.log("lawyer data : ", data);

      // key == "consultation_type" ||
      // key == "consultation_time" || key == "consultation_amount"

      let newData = {};
      if (data && typeof data === "object") {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            let value = data[key];
            if (showSecretInfo) {
              if (
                value !== null &&
                value != 0 &&
                // key == "first_name" ||
                // key == "last_name" ||
                (key == "image" ||
                key == "job_title" || 
                key == "email" ||
                  key == "address" ||
                  key == "phone" ||
                  key == "link" ||
                  key == "job_title" ||
                  key == "law_firm" ||
                  key == "suburb" ||
                  key == "remote_consultation" ||
                  key == "mobile_friendly")
              ) {
                let objKey = key;
                objKey = objKey.replace(/_/g, " ");
                if (key == "link") {
                  objKey = "Website";
                }
                if (key == "remote_consultation") {
                  objKey = "<i class='fa fa-check-square fa1'></i>";
                  value = "<b>Remote Consultations</b>";
                }
                if (key == "mobile_friendly") {
                  objKey = "<i class='fa fa-check-square fa2'></i>";
                  value = "<b>Mobile-Friendly</b>";
                }
                newData[objKey] = value;
              }
            } else {
              if (
                value !== null &&
                value != 0 &&
                (key == "first_name" ||
                  key == "job_title" ||
                  key == "law_firm" ||
                  key == "link"
                  )
              ) {
                let objKey = key;
                objKey = objKey.replace(/_/g, " ");
                if (key == "link") {
                  objKey = "Website";
                }
                newData[objKey] = value;
              }
            }
          }
        }
      }
      // let job_firm = "";
      let title = "";
      if (showSecretInfo) {
        title = `${this.capitalizeFirstLetter(
          data?.first_name
        )} ${this.capitalizeFirstLetter(data?.last_name)}`;

        // if type lawyer than show consultation info
        if (data?.type == "lawyer") {
          console.log('check cehck : ' , data);


          // if (data?.job_title != null && data?.law_firm != null){
          //   job_firm = `${data?.job_title} at ${data?.law_firm}`;
          //   console.log('111111 : ' , job_firm);
          // }else if(data?.job_title != null){
          //   console.log('222222');
          //   job_firm = `${data?.job_title}`;
          // }else if(data?.law_firm != null){
          //   console.log('33333');
          //   job_firm `${data?.law_firm}`;
          // }
         

          let consultation_content = "";

          if (
            this.checkObjKeyValue(data, "consultation_type") &&
            data?.consultation_type &&
            data?.consultation_type == "discounted"
          ) {
            consultation_content = `<span>
                  ${this.capitalizeFirstLetter(
                    data?.consultation_type
                  )} - $${this.formatNumber(data?.consultation_amount)}/${
              data?.consultation_time
            } mins
                </span>`;
          }

          if (
            this.checkObjKeyValue(data, "consultation_amount") &&
            data?.consultation_type &&
            data?.consultation_type == "free"
          ) {
            consultation_content = ` <span>
                  ${this.capitalizeFirstLetter(data?.consultation_type)} - ${
              data?.consultation_time
            } mins
                </span>`;
          }

          if (
            this.checkObjKeyValue(data, "consultation_time") &&
            data?.consultation_type &&
            data?.consultation_type == "no"
          ) {
            consultation_content = ` <span>
                  ${this.capitalizeFirstLetter(data?.consultation_type)}
                </span>`;
          }

          newData["Initial Consultation"] = consultation_content;
          console.log('this data : ' , newData);

          newData = this.moveKeyToIndex(newData, "image", 0);
          // newData = this.moveKeyToIndex(newData, "address", -2);
          // newData = this.moveKeyToIndex(newData, "suburb", -4);
          // newData = this.moveKeyToIndex(newData, "Initial Consultation", -1);
          
          console.log('this data : ' , newData);

        }
      } else {
        title = `${this.capitalizeFirstLetter(data?.type)} Details`;
      }

      console.log("new new data data : ", newData);

      const htmlContent = Object.entries(newData)
        .map(([key, value]) => {
          if (key == "image" && value != null) {
            return `<div v-if="image" class="circular-container popup-image me-2 "><img src="${this.createImage(
              value
            )}" alt="User Image" class="circular-image"></div><div>`;
          }
          // else if(key == "job_title" && job_firm != ''){
          //   return `<div>${job_firm} aaaaa</div>`;
          // }
          else {
            return `<div class="wrapper" v-if="value != null">
            <h6><b style="text-transform: capitalize;">${key}
            ${
              value == "<b>Mobile-Friendly</b>" ||
              value == "<b>Remote Consultations</b>"
                ? ""
                : ":"
            } </b><span>${value}</span></h6></div>` ;
          }
        })
        .join("");

      //   <div v-if="image" class="circular-container">
      //   <img :src="image" alt="User Image" class="circular-image">
      // </div>

      // Use dynamic HTML inside SweetAlert2 modal
      this.$swal.fire({
        title: title,
        html: `<div class="table-wrap ${data?.type == "lawyer" ? 'd-flex' : ''} justify-content-center align-items-start" style="text-align:left !important;">${htmlContent}</div></div>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: "my-swal-container", // You can define your custom class for styling
        },
      });
    },

    createImage(value) {
      return this.baseUrl + "storage/images/" + value;
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

    // goToChatsPage() {
    //   this.$router.push({ path: "/messages-history" });
    // },

    // async requestNotificationPermission() {
    //   // const messaging = firebase.messaging();

    //   try {
    //     // Get the current FCM token
    //     const currentToken = await messaging.getToken();

    //     // Handle token refresh events
    //     messaging.onTokenRefresh(() => {
    //       messaging.getToken()
    //         .then((refreshedToken) => {
    //           console.log('Token refreshed:', refreshedToken);
    //           // Handle refreshed token (e.g., update server or application state)
    //         })
    //         .catch((err) => {
    //           console.error('Unable to retrieve refreshed token:', err);
    //         });
    //     });

    //     if (currentToken) {
    //       const permission = await Notification.requestPermission();
    //       console.log('Check notification permission:', permission);
    //       console.log('Current FCM token:', currentToken);

    //       if (permission === 'granted') {
    //         // Send the token to your server for handling subscriptions
    //         api.post('/save-fcm-token', { currentToken })
    //           .then((res) => {
    //             console.log('Save token response:', res);
    //           })
    //           .catch((error) => {
    //             console.log('Error while saving token:', error);
    //           });
    //       } else {
    //         console.error('Notification permission denied.');
    //       }
    //     } else {
    //       console.log('No registration token available. Request permission to generate one.');
    //       // ...
    //     }
    //   } catch (err) {
    //     console.log('An error occurred while retrieving token:', err);
    //     // ...
    //   }
    // },

    async requestNotificationPermission() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );

            getToken(messaging)
              .then(async (currentToken) => {
                if (currentToken) {
                  const permission = await Notification.requestPermission();
                  console.log("check notification 1 permission : ", permission);
                  console.log("check notification 2 token : ", currentToken);
                  if (permission === "granted") {
                    // console.log('mess :: ' , currentToken);
                    // console.log('Notification permission granted. Token:', currentToken);
                    api
                      .post("/save-fcm-token", { currentToken })
                      .then((res) => {
                        console.log("save token response : ", res);
                      })
                      .catch((error) => {
                        // this.$swal("", error?.response?.data?.error, "error");
                        console.log("error while saving token : ", error);
                      });

                    // Send the token to your server for handling subscriptions
                  } else {
                    console.error("Notification permission denied.");
                  }
                } else {
                  // Show permission request UI
                  console.log(
                    "No registration token available. Request permission to generate one."
                  );
                  // ...
                }
              })
              .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
                // ...
              });
          })
          .catch((error) => {
            console.error("Error registering Service Worker:", error);
          });
      }
    },

    // async requestNotificationPermission() {
    //   try {
    //     // Get the current FCM token
    //     const currentToken = await getToken(messaging);
    //     console.log('old token : ' , messaging);

    //     // Clear the existing token
    //     await messaging.deleteToken(currentToken);

    //     // Request permission for notifications
    //     const permission = await Notification.requestPermission();

    //     if (permission === "granted") {
    //       // Get a new FCM token
    //       const newToken = await getToken(messaging);
    //       console.log('old token : ' , newToken)
    //       // Save the new token to the server
    //       api.post("/save-fcm-token", { currentToken: newToken })
    //         .then((res) => {
    //           console.log("save token response: ", res);
    //         })
    //         .catch((error) => {
    //           console.log("error while saving token: ", error);
    //         });
    //     } else {
    //       console.error("Notification permission denied.");
    //     }
    //   } catch (err) {
    //     console.log("An error occurred while handling FCM token: ", err);
    //   }
    // },

    // add three dots after some words
    generateExcerpt(text) {
      if (!text) return ""; // Handle cases where text is null or undefined
      if (text.length > 15) {
        const words = text.split(" ");
        const excerpt = words.slice(0, 15).join(" ");
        return `${excerpt}...`;
      } else {
        return text;
      }
    },

    // check if string is number
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
              key != "updated_at" &&
              key != "show" &&
              key != "description" &&
              key != "lawyer" &&
              key != "job" &&
              key != "status"
            ) {
              let objKey = key;
              objKey = objKey.replace(/_/g, " ");

              if (key == "specific_tasks") {
                specificTasks = [...value];
              } else if (key == "disbursements") {
                disbursements = [...value];
              } else if (key == "fee_earners" && value != "me") {
                feeEarners = [...value];
              } else {
                if (objKey == "lawyer" && value != null) {
                  newData["lawyer email"] = value?.email;
                } else if (key == "charge_type") {
                  newData[objKey] = this.chargeType(value);
                } else {
                  value = this.isNumericString(value)
                    ? "$" + this.formatNumber(value)
                    : value;
                  newData[objKey] = value;
                }
              }
            }
          }
        }
      }

      console.log("fee earners 1-1 : ", feeEarners);

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
          specificTasks,
          renderAsHtml
        );
      }

      if (disbursements.length > 0) {
        disbursementsTable = this.createTableHtml(
          "Disbursements",
          disbursements,
          renderAsHtml
        );
      }

      if (feeEarners.length > 0) {
        console.log("fee earners : : ", feeEarners);
        feeEarnersTable = this.createTableHtmlFeeEarners(
          "Fee Earners",
          feeEarners,
          renderAsHtml
        );
      }

      const swalHtmlContent = `
        <div class="table-wrap" style="text-align: left !important;">${mainHtmlContent}</div>
        ${specificTasksTable}
        ${disbursementsTable}
        ${feeEarnersTable}
      `;
      console.log("dis bur sement : ", swalHtmlContent);
      // Use dynamic HTML inside SweetAlert2 modal

      if (renderAsHtml) {
        return [disbursementsTable, feeEarnersTable, specificTasksTable];
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

    createTableHtml(title, dataArray, renderAsHtml = false) {
      console.log("create table dis : ", dataArray);
      const total = dataArray.reduce(
        (total, row) => total + parseFloat(row.cost ?? row.costAud) || 0,
        0
      );
      const tableContent = dataArray
        .map(
          (item) => `
            <tr>
              <td class='border'>${item.task ?? item.itemDisbursement}</td> 
              <td class='border'>$${this.formatNumber(
                item.cost ?? item.costAud
              )}${item.gst_not_applicable ? "*" : ""}</td>
            </tr>
          `
        )
        .join("");

      return `
        <div class="table-title">${!renderAsHtml ? title : ""}</div>
        <table class='table dynamicTable'>
          <thead>
            <tr class='border'>
              <th class='border'>Task</th>
              <th class='border'>Cost</th>
            </tr>
          </thead>
          <tbody>
            ${tableContent}
          </tbody>
          <tfoot>
            <tr >
              <td class='bg-dark text-white'>Total</td>
              <td class='bg-dark text-white'>$${this.formatNumber(total)}</td>
            </tr>
            <tr v-if="title == 'Disbursements'">
              <td class="border-0"><small>*GST Not Applicable</small></td>
            </tr>
          </tfoot>
        </table>
      `;
    },

    createTableHtmlFeeEarners(title, dataArray, renderAsHtml = false) {
      console.log("fee1 : ", dataArray);
      // const total = dataArray.reduce(
      //   (total, row) => total + parseFloat(row.hourlyRate * row.estimatedHours) || 0,
      //   0
      // );
      let grandTotal = 0;
      const tableContent = dataArray
        .map((item) => {
          const subTotal =
            (item.hourly_rate ?? item.hourlyRate) *
            (item.hours ?? item.estimatedHours);
          grandTotal += subTotal;
          return `
            <tr>
              <td class='border'>${
                item.title
              }</td> <!-- Replace with actual properties -->
              <td class='border'>$${this.formatNumber(
                item.hourly_rate ?? item.hourlyRate
              )}</td>
              <td class='border'>${item.hours ?? item.estimatedHours}</td>
              <td class='border'>$${this.formatNumber(subTotal)}</td>
            </tr>
          `;
        })
        .join("");

      return `
        <div class="table-title">${!renderAsHtml ? title : ""}</div>
        <table class='table dynamicTable'>
          <thead>
            <tr>
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
              <td class='bg-dark text-white'>Total</td><td class='bg-dark'></td><td class='bg-dark'></td>
              <td class='bg-dark text-white'>$${this.formatNumber(
                grandTotal
              )}</td>
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

      if (error?.response?.data?.errors) {
        // Iterate through the errors and collect them in an array
        for (const key in error.response.data.errors) {
          if (
            Object.prototype.hasOwnProperty.call(
              error?.response?.data?.errors,
              key
            )
          ) {
            const errorArray = error?.response?.data?.errors[key];
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

    async submitLoginForm(formData, userType, dashboardUrl) {
      try {
        formData.type = userType;
        api
          .post("/login", formData)
          .then((res) => {
            this.setUserAndRedirect(res, dashboardUrl);
          })
          .catch((error) => {
            // console.log('error : ' , error)
            if (
              error?.response?.data?.error == "blocked" &&
              error.response.status === 401
            ) {
              // Unauthorized (blocked)
              this.$swal(
                "",
                "Account is blocked. Please contact support.",
                "error"
              );
            } else {
              // Other errors
              this.$swal("", "Incorrect email or password.", "error");
            }
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

      localStorage.removeItem("jobData");
      localStorage.removeItem("noti_count_job");
      localStorage.removeItem("noti_count_msg");
      this.$store.commit("SET_JOB_DATA", null);
      this.$store.commit("SET_NOTI_COUNT_MSG", 0);
      this.$store.commit("SET_NOTI_COUNT_JOB", 0);

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

    async logout(redirectUrl, redirection = true) {
      // logout() {
      // logout() {
      deleteToken(messaging)
        .then((res) => {
          console.log("res , ", res);
        })
        .catch(function (error) {
          console.error("Error deleting FCM token:", error);
        });

      // getToken(messaging)
      //   .then(async (currentToken) => {
      //     if (currentToken) {
      //       console.log('token : ' , currentToken);
      //       messaging.unsubscribeFromTopic(currentToken)
      //       .then((response) => {
      //         console.log('Successfully unsubscribed from topic:', response);
      //       })
      //       .catch((error) => {
      //         console.log('Error unsubscribing from topic:', error);
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log('Error token :', error);
      //   });

      // const registrationTokens = ['abc'];

      //

      // const deleteRequest = indexedDB.deleteDatabase("firebase-messaging-database");
      // deleteRequest.onsuccess = () => {
      //   console.log("Database deleted successfully");
      // };
      // deleteRequest.onerror = (event) => {
      //   console.error("Error deleting database", event);
      // };
      try {
        api
          .get("/logout")
          .then(() => {
            // this.deleteIndexedDB();
            this.logoutProcess(redirectUrl, redirection);
          })
          .catch((error) => console.log("getResults : ", error));
      } catch (error) {
        console.error("API request error:", error);
      }
    },

    deleteIndexedDB() {
      // const databaseName1 = "firebase-heartbeat-database"
      // const databaseName2 = "firebase-installations-database"
      const databaseName3 = "firebase-messaging-database";
      try {
        // indexedDB.deleteDatabase(databaseName1);
        // indexedDB.deleteDatabase(databaseName2);
        const deleteRequest = indexedDB.deleteDatabase(databaseName3);
        deleteRequest.onsuccess = () => {
          console.log("Database deleted successfully");
        };
        deleteRequest.onerror = (event) => {
          console.error("Error deleting database", event);
        };
      } catch (error) {
        console.error("An error occurred:", error);
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

    async loadMore(status = null, reset = null,increment_page = true) {
      this.$store.commit("SET_ENDOFRESULT", false);
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
      if(increment_page){
        this.currentPage++;
      }
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
      try {
        const response = await this.fetchData(url);

        this.lastPage = response?.last_page;
        let jobsData = this.openJobs.concat(response?.data);
        let uniqueObjects = new Map();
        jobsData.forEach((obj) => {
          uniqueObjects.set(obj.id, obj);
        });
        let uniqueArray = Array.from(uniqueObjects.values());
        this.openJobs = uniqueArray;
        if (this.currentPage == this.lastPage) {
          this.$store.commit("SET_ENDOFRESULT", true);
        }
      } catch (error) {
        console.error("API request error:", error);
      }

      // console.log("pagin : ", response);
      // console.log("curr : ", this.currentPage);
    },

    async fixLoadMoreAfterDeleteRecord(index, status = null) {
      if(index != null){
        this.openJobs.splice(index, 1);
      }
      console.log('before first if', this.currentPage , this.lastPage);
      if (this.currentPage < this.lastPage) {
        console.log('under first if');
        this.currentPage--;
        if (status) {
          console.log('under nested if');
          await this.loadMore(status);
        } else {
          console.log('under nested else');
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
      try {
        const response = await this.fetchData(url);
        this.lastPage = response?.last_page;
        this.openJobs = response?.data;
        this.clear = false;
      } catch (error) {
        console.error("API request error:", error);
      }
    },
    async fetchData(url) {
      let response = null;
      if (this.openJobs.length > 0) {
        response = await api2.get(url);
      } else {
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
