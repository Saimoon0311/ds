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

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* add icons to the library */
library.add(faUserSecret);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.mixin({
    data() {
        return {
            clear: false,
            searchQuery: '',
            openJobs: [],
            closeJobs: [],
            currentPage: 0,
            lastPage: 0,
        }
    },
    watch: {
          searchQuery(newQuery) {
            if (newQuery == "" && !this.clear) {
              this.openJobs = [];
              this.currentPage = 0;
              this.lastPage = 0;
              this.loadMore();
            }
          }
        },

    methods: {
        setUserInStateAndLocalStorage(res) {
            console.log('new func : ', res?.data?.data?.link);
            const userData = {
                "first_name": res?.data?.data?.first_name,
                "last_name": res?.data?.data?.last_name,
                "email": res?.data?.data?.email,
                "type": res?.data?.data?.type,
                "phone": res?.data?.data?.phone,
                "job_title": res?.data?.data?.job_title,
                "law_firm": res?.data?.data?.law_firm,
                "link": res?.data?.data?.link,
                "about": res?.data?.data?.about,
            }
            if (localStorage.getItem('loginUser')) {
                localStorage.removeItem('loginUser');
            }
            localStorage.setItem("loginUser", JSON.stringify(userData));
            this.$store.commit('SET_LOGIN_USER', userData);
        },

        // this function is to store user in state and localstorage after login then redirect to dashboard
        setUserAndRedirect(res, path) {
            console.log('single a : ', res?.data?.data?.law_firm);
            if (!localStorage.getItem('token')) {
                localStorage.setItem("token", res.data?.data?.api_token);
            }
            this.setUserInStateAndLocalStorage(res);
            this.$store.commit('SET_AUTHENTICATED', true);
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

        submitSignupForm(formData, userType, dashboardUrl) {
            try {
                formData.type = userType;
                api.post('/signup', formData)
                    .then(res => {
                        this.setUserAndRedirect(res, dashboardUrl);
                    })
                    .catch(error => {
                        alert('Invalid Credentials');
                        console.log("getResults : ", error)
                    });
            } catch (error) {
                console.error('API request error:', error);
            }
        },

        goToForgetPasswordPage(url) {
            localStorage.setItem('backUrl', url);
            this.$router.push({ path: '/forget-password' });
        },

        submitLoginForm(formData, userType, dashboardUrl) {
            try {
                formData.type = userType;
                api.post('/login', formData)
                    .then(res => {
                        this.setUserAndRedirect(res, dashboardUrl);
                    })
                    .catch(error => {
                        alert('Invalid Credentials');
                        console.log("getResults : ", error)
                    });
                console.log(formData);
            } catch (error) {
                console.error('API request error:', error);
            }
        },

        logoutProcess(redirectUrl) {
            localStorage.removeItem('token');
            this.$store.commit('SET_AUTHENTICATED', false);
            localStorage.removeItem("loginUser");
            this.$store.commit('SET_LOGIN_USER', null);
            this.$store.commit('SET_SUB_STATUS', null);
            this.$store.commit('SET_SUB_CANCEL_STATUS', false);
            this.$store.commit('SET_APPROVAL_STATUS', null);
            this.$store.commit('SET_SUBSCRIPTION_DATA', null);
            this.$router.push({ path: redirectUrl });
        },

        logout(redirectUrl) {
            try {
                api.get('/logout')
                    .then(() => {
                        this.logoutProcess(redirectUrl);
                    })
                    .catch(error => console.log("getResults : ", error));
            } catch (error) {
                console.error('API request error:', error);
            }
        },


        // loadmore pagination and search functions start

        async search() {
            if (this.searchQuery == "") return false;
            const response = await api.get(this.endpoint_search, {
                params: { query: this.searchQuery }
            });
            this.currentPage = 1;
            this.lastPage = response?.data?.last_page;
            this.openJobs = response?.data?.data;
            // console.log(response?.data);
            console.log('last page : ', this.lastPage);
            console.log('curr search : ', this.currentPage);
        },

        async loadMore() {
            this.currentPage++;
            let url = null;
            if (this.searchQuery != "") {
                url = `${this.endpoint}?query=${this.searchQuery}&page=${this.currentPage}`;
            } else {
                url = `${this.endpoint}?page=${this.currentPage}`;
            }
            const response = await this.fetchData(url);
            console.log('pagin : ', response);
            console.log('curr : ', this.currentPage);
            this.lastPage = response?.last_page;
            this.openJobs = this.openJobs.concat(response?.data);
        },
        async clearSearch() {
            if (this.searchQuery == "") return false;
            this.clear = true;
            this.openJobs = [];
            this.searchQuery = '';
            this.currentPage = 1;
            this.lastPage = 0;
            const url = `${this.endpoint}?page=${this.currentPage}`;
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



    }
});


app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(VueSweetalert2);

app.component("v-select", VueSelect)
app.component("MultiSelectPrime", MultiSelect);
app.use(ToastService);
app.mount("#app");
