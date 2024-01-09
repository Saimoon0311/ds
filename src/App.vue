<template>
  <router-view></router-view>
  <LoadingIndicator />
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { messaging } from "@/config/firebaseConfig";
import { onMessage } from "firebase/messaging";


export default {
  name: 'App',
  components: {
    LoadingIndicator
  },
  created() {

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.$store.commit('SET_NOTI', payload);
    });

    if (this.$store.getters.loginUser == null || this.$store.getters.loginUser == "") {
      const loginUser = JSON.parse(localStorage.getItem('loginUser'));
      this.$store.commit('SET_LOGIN_USER', loginUser);
    }
    if (this.$store.getters.jobData == null || this.$store.getters.jobData == "") {
      const item = JSON.parse(localStorage.getItem('jobData'));
      this.$store.commit('SET_JOB_DATA', item);
    }
    if (this.$store.getters.jobId == null || this.$store.getters.jobId == "") {
      this.$store.commit('SET_JOB_ID', localStorage.getItem('jobId'));
    }
    if (this.$store.getters.otpEmail == null || this.$store.getters.otpEmail == "") {
      this.$store.commit('SET_OTP_EMAIL', localStorage.getItem('otpEmail'));
    }
    if (this.$store.getters.userType == null || this.$store.getters.userType == "") {
      this.$store.commit('SET_USER_TYPE', localStorage.getItem('userType'));
    }
    if (this.$store.getters.replacePaymentMethod == null || this.$store.getters.replacePaymentMethod == "" || this.$store.getters.replacePaymentMethod == false) {
      this.$store.commit('SET_REPLACE_PAYMENT_METHOD', localStorage.getItem('replacePaymentMethod'));
    }
    if (this.noti_msg == null || this.noti_msg == 0) {
      this.$store.commit('SET_NOTI_COUNT_MSG', localStorage.getItem('noti_count_msg'));
    }
    if (this.noti_job == null || this.noti_job == 0) {
      this.$store.commit('SET_NOTI_COUNT_JOB', localStorage.getItem('noti_count_job'));
    }
    if(this.$store.getters.isNotHeaderChat == null && localStorage.getItem('isNotHeaderChat')){
      this.$store.commit('SET_IS_NOT_HEADER_CHAT',localStorage.getItem('isNotHeaderChat'));
    }
    // console.log('app vue mes : ' , messaging);
    // messaging.onBackgroundMessage((payload) => {
    //     console.log('Message received:', payload);
    // });
  },

  watch: {
    // Watch for changes in the 'noti' property in the Vuex store
    '$store.state.noti': {
      handler(newValue) {
        if (newValue) {
          // Handle the changes, for example, display a notification
          console.log('noti changed:', newValue);
          // this.$swal(newValue?.notification?.title, newValue?.notification?.body, 'success');

          this.$swal({
            title: newValue?.notification?.title,
            text: "",
            icon: 'info',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });

          const noti = JSON.parse(newValue?.data?.payload);
          console.log(noti);
          if (noti?.noti_status == "message") {
            console.log('if');
            this.$store.commit('SET_NOTI_COUNT_MSG', ++this.noti_msg);
          } else {
            console.log('else');
            this.$store.commit('SET_NOTI_COUNT_JOB', ++this.noti_job);
          }

        }
      },
      immediate: true, // Trigger the handler immediately when the component is created
    },
  },

  computed: {
    noti_msg() {
      return this.$store.state.noti_count_msg;
    },
    noti_job() {
      return this.$store.state.noti_count_job;
    },
    firebaseNoti() {
      return this.$store.state.noti;
    },
  }

}
</script>

<style>
@import "vue-select/dist/vue-select.css";

/* profile image circle  */
.circular-container {
  width: 100px; /* Set the width and height to control the size of the circular div */
  height: 100px;
  border-radius: 50%; /* Make it circular by setting border-radius to 50% */
  overflow: hidden; /* Hide overflow content */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* Set a background color for the circular div */
}

.circular-image {
  width: 100%; /* Make the image fill the circular div */
  height: 100%;
  border-radius: 50%; /* Match the border-radius of the container */
  object-fit: cover; /* Ensure the image covers the container */
}
/* profile image circle end */


.count_btn{
  position: relative;
}

span.countmsg {
    font-weight: bold !important;
    border-radius: 50%;
    background: red;
    width: 15px;
    position: absolute;
    height: 15px;
    text-align: center;
    font-size: 10px;
    font-weight: 500;
    color: white;
    top: -5px;
    right: 1px;
}
.navbar-nav .left-menu a.nav-link {
  position: relative;
}
.forgetp {
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
  text-decoration: underline;
  background: no-repeat;
  border: none;
}

.custom-button {
  color: white !important;
  background-color: #000000 !important;
  z-index: 1 !important;
}

.dynamicTable th,
.dynamicTable td {
  font-size: 1rem;
}
</style>
