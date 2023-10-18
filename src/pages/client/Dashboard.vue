<template>
    <h1>Client Dashboard</h1>
    <h3 v-if="subscriptionStatus != null && subscriptionStatus == 'subscribed'">Subscribed</h3>
    <h3 v-if="subscriptionStatus != null && subscriptionStatus == 'not-subscribed'">You don't have subscription please subscribe to access it</h3>
    <h3 v-if="subscriptionStatus != null && subscriptionStatus == 'expired'">You don't have subscription now please resubscribe to access it</h3>
    <h1></h1>
    <button @click="logout()">Logout</button>
</template>
<script>
import api from "../../config/api.js";
export default {
    name: 'ClientDashboard',
    data(){
        return {
            subscriptionStatus : null
        }
    },
    created(){
        this.checkSubscription();
    },
    methods:{
        checkSubscription(){
            try {
                api.get(`/lawyer/check-subscription/${this.$store.getters.loginUser}`)
                    .then(res => {
                        this.subscriptionStatus = res.data.status;
                    })
                    .catch(error => console.log("getResults 1 : ", error.message));
            } catch (error) {
                console.error('API request error:', error);
            }
        },
        logout(){
            try {
                api.get('/logout')
                    .then(() => {
                        localStorage.removeItem('token');
                        this.$store.commit('SET_AUTHENTICATED', false);
                        localStorage.removeItem("loginUser");
                        this.$store.commit('SET_LOGIN_USER', null);
                        this.$router.push({ path: '/login' });
                    })
                    .catch(error => console.log("getResults : ", error));
                // console.log(formData);
            } catch (error) {
                console.error('API request error:', error);
            }
        }
    }
}
</script>