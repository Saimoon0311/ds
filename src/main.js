import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routers";
import store from "./store";
import api from "@/config/api.js";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";

/* add icons to the library */
library.add(faUserSecret);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.mixin({
    methods: {
        // this function is to store user in state and localstorage after login then redirect to dashboard
        setUserAndRedirect(res, path) {
            const userData = {
                "first_name": res?.data?.data?.first_name,
                "last_name": res?.data?.data?.last_name,
                "email": res?.data?.data?.email,
            }
            localStorage.setItem("token", res.data?.data?.api_token);
            localStorage.setItem("loginUser", JSON.stringify(userData));
            this.$store.commit('SET_AUTHENTICATED', true);
            this.$store.commit('SET_LOGIN_USER', userData);
            this.$router.push({ path: path });
        },

        // check subscription status of login user
        checkSubscription() {
            try {
                api.get('/lawyer/check-subscription')
                    .then(res => {
                        this.$store.commit('SET_SUB_STATUS',res?.data?.status);
                    })
                    .catch(error => console.log("api error : ", error.message));
            } catch (error) {
                console.error('API request error:', error);
            }
        },

        // check admin approval for lawyer
        checkAdminApproval() {
            try {
                api.get('/lawyer/check-admin-approval')
                    .then(res => {
                        this.$store.commit('SET_APPROVAL_STATUS',res?.data?.status);
                    })
                    .catch(error => console.log("api error : ", error.message));
            } catch (error) {
                console.error('API request error:', error);
            }
        },
    }
});

app.use(router);
app.use(store);

app.mount("#app");
