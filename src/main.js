import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routers";
import store from "./store";
import api from "@/config/api.js";

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

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.mixin({
  data() {
    return {
      clear: false,
      searchQuery: "",
      searchQueryNumberPagination : "",
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
          this.$swal("success", "Profile updated successfully", "success").then(
            () => {
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
            }
          );
        });
      } catch (error) {
        this.$swal("Error", "Something went wrong, please try again", "error");
      }
    },

   // number pagination data
    async getPaginatedData() {
      console.log("func run");
      api
        .get(`${this.paginationEndpoint}?page=${this.currentPaginationPage}`)
        .then((res) => {
          this.data_paginated = res?.data?.data;
          console.log("last api : ", res?.data?.last_page);
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


    


    setUserInStateAndLocalStorage(res) {
      console.log("new func : ", res?.data?.data?.link);
      const userData = {
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
      };

      if (localStorage.getItem("loginUser")) {
        localStorage.removeItem("loginUser");
      }
      localStorage.setItem("loginUser", JSON.stringify(userData));
      this.$store.commit("SET_LOGIN_USER", userData);
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
      if(!path){
        if(res?.data?.data?.type == 'client'){
          path = "client-dashboard";
        }else if(res?.data?.data?.type == 'lawyer'){
          path = "lawyer-profile";
        }
      }
      this.$router.push({ path: path });
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
            // alert("Invalid Credentials");
            // error?.response?.data?.error
            this.$swal(
              "Error",
              "Something went wrong, Please try again.",
              "error"
            );
            console.log("getResults : ", error);
          });
      } catch (error) {
        console.error("API request error:", error);
      }
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
            this.$swal(
              "Error",
              "Something went wrong, Please try again.",
              "error"
            );
            // alert("Invalid Credentials");
            console.log("getResults : ", error);
          });
        console.log(formData);
      } catch (error) {
        console.error("API request error:", error);
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
      if (this.searchQuery == "") return false;
      let obj = { query: this.searchQuery };
      if (status) obj.admin_approval = status;
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
      if (this.searchQuery == "") return false;
      this.clear = true;
      this.openJobs = [];
      this.searchQuery = "";
      this.currentPage = 1;
      this.lastPage = 0;

      let url = `${this.endpoint}?page=${this.currentPage}`;

      if (status) {
        url = url + `&admin_approval=${status}`;
      }

      const response = await this.fetchData(url);
      this.lastPage = response?.last_page;
      this.openJobs = response?.data;
      this.clear = false;
    },
    async fetchData(url) {
      const response = await api.get(url);
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
      const minutes = date.getMinutes();
      const period = hours < 12 ? "am" : "pm";

      // Adjust hours to 12-hour format
      if (hours > 12) {
        hours -= 12;
      }

      // Ensure leading zeros for single-digit day, month, hours, and minutes
      const formattedDay = day < 10 ? "0" + day : day;
      const formattedMonth = month < 10 ? "0" + month : month;
      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}${period} AEST`;
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
