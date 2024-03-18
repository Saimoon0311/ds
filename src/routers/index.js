import { createRouter, createWebHistory } from "vue-router";
// landing
// import HelloWorld from "@/components/HelloWorld.vue";
import NeedLawyer from "@/pages/forms/NeedLawyer.vue";
// import FindClient from "@/pages/forms/FindClient.vue";
import LoginForm from "@/pages/forms/LoginForm.vue";

import UserChats from "@/pages/UserChats.vue";

import FullChatLawyer from "@/pages/FullChatLawyer.vue";

// admin
import AdminLogin from "@/pages/admin/Login.vue";
import AdminLawyer from "@/pages/admin/Lawyers.vue";
import AdminJobs from "@/pages/admin/Jobs.vue";
import AdminProposals from "@/pages/admin/proposals.vue";

import AdminClients from "@/pages/admin/Clients.vue";
import AdminMain from "@/pages/admin/AdminMain.vue";
import clientDashboard from "@/pages/client/Dashboard.vue";
// import SubscriptionComponent from "@/pages/client/Subscription.vue";
import ForgetPassword from "@/pages/forms/ForgetPassword.vue";
import ResetPassword from "@/pages/forms/ResetPassword.vue";
import UpdateEmail from "@/pages/forms/UpdateEmail.vue";

import api from "../config/api.js";

// import ClientProfile from "@/pages/client/Profile.vue";
import PlatForm from "@/components/PlatForm.vue";
// client
// import ClientLoginForm from "@/pages/client/Login.vue";
import ClientRegister from "@/pages/client/clientRegister.vue";
import OTP from "@/pages/forms/OTP.vue";
import OTPAdmin from "@/pages/forms/OTPAdmin.vue";
import ClientAccount from "@/pages/client/Account.vue";

import AdminAccount from "@/pages/admin/Account.vue";

// import PostingJob from "@/pages/client/PostingJob.vue";
import PostingaJob from "@/pages/client/PostingaJob.vue";
import AreaOfLaw from "@/pages/client/AreaOfLaw.vue";
import ViewBids from "@/pages/client/ViewBids.vue";
import ReplyInfoRequest from "@/pages/client/ReplyInfoRequest.vue";
// import termsForClient from "@/pages/client/termsAndConditions.vue";

// lawyer
import LawyerLoginForm from "@/pages/lawyer/Login.vue";
import LawyerRegister from "@/pages/lawyer/Register.vue";
import LawyerDashboard from "@/pages/lawyer/Dashboard.vue";
import LawyerBids from "@/pages/lawyer/Proposals.vue";
import LawyerProfile from "@/pages/lawyer/Profile.vue";
import LawyerAccount from "@/pages/lawyer/Account.vue";
import LawyerSubscribe from "@/pages/lawyer/Subscribe.vue";
import Plans from "@/pages/lawyer/Plans.vue";
// import LawyerBidding from "@/pages/lawyer/Proposal.vue";
import LawyerBidding from "@/pages/lawyer/Proposal.vue";
import RequestInfo from "@/pages/lawyer/RequestInfo.vue";
import FindClient from "@/pages/lawyer/Register.vue";
// import termsForLawyer from "@/pages/lawyer/termsAndConditions.vue";

// other
import privacyPolicy from "@/pages/privacy-policy.vue";
import termsOfUse from "@/pages/terms-of-use.vue";
import termsLawyer from "@/pages/terms-lawyer.vue";
import termsClient from "@/pages/terms-client.vue";
// import AboutUs from "@/pages/AboutUs.vue";
import HowSimplawfyWorks from "@/pages/HowSimplawfyWorksClient.vue";
// import HowSimplawfyWorksLawyer from "@/pages/HowSimplawfyWorksLawyer.vue";
import unsubscribeEmailMarketing from "@/pages/Unsubscribe.vue";
import ContactUs from "@/pages/ContactUs.vue";
import ClientFaqs from "@/pages/ClientFaqs.vue";
import LawyerFaqs from "@/pages/LawyerFaqs.vue";
import NotFound from "@/components/NotFound.vue";
import WizardForm from "../pages/WizardForm.vue";
import NewLanding from "../pages/NewLanding.vue";
import InquiryPg from "../pages/InquiryPg.vue";

import store from "../store";



function reverse_guard(to, from, next) {
  api
    .get("/verify")
    .then((response) => {
      console.log("revers if");
      // next('/');
      // router.go -1

      const userData = response?.data?.data; // Assuming your API response contains user data, including the role

      if (userData.type === "lawyer") {
        next("/lawyer-dashboard");
      } else if (userData.type === "client") {
        next("/client-dashboard");
      } else if (userData.type === "admin") {
        next("/admin-dashboard");
      } else {
        // Handle other cases or roles as needed
        next();
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error.response);
      // console.log("revers catch 123" , error);
      //  const path = window.location.pathname;
      //   if ((path == "/" || path == "/lawyer-register" || path == "/lawyer-login" || path == "/client-register" ||
      //       path == "/client-login") && (localStorage.getItem('loginUser') || localStorage.getItem('token'))) {
      //       localStorage.removeItem('loginUser');
      //       localStorage.removeItem('token');
      //   }
      localStorage.removeItem("loginUser");
      localStorage.removeItem("token");
      next();
    });
}

// function client_not_allowed_guard(to,from,next) {
//   api.get("/verify")
//       .then(res => {
//         if(res.data.data.type != "lawyer")
//         {
//           next('/client-dashboard')
//         }else{
//            next();
//         }
//       })
//       .catch(() => {
//         console.log('error in guard verify');
//       });
// }

// function lawyer_not_allowed_guard(to, from, next) {
//   api.get("/verify")
//       .then(res => {
//         if(res.data.data.type != "client")
//         {
//           next('/lawyer-dashboard')
//         }else{
//           next();
//        }
//       })
//       .catch(() => {
//         console.log('error in guard verify');
//       });
// }

const routes = [

  {
    path: "/unsubscribe",
    component: unsubscribeEmailMarketing,
    // beforeEnter: reverse_guard,
  },

  {
    path: "/login",
    component: LawyerLoginForm,
    beforeEnter: reverse_guard,
    meta: {title: 'Simplawfy - Independent Australian Legal Marketplace'}
  },

  // lawyer start
  // {
  //   path: "/lawyer-login",
  //   component: LawyerLoginForm,
  //   beforeEnter: reverse_guard,
  // },

  {
    path: "/messages",
    component: UserChats,
    meta: { requiresAuth: true },
  },

  {
    path: "/messages-history",
    component: FullChatLawyer,
    meta: { requiresAuth: true },
  },

  {
    path: "/lawyer-register",
    component: LawyerRegister,
    beforeEnter: reverse_guard,
    meta: { title: 'Simplawfy - Find Clients for your Law Firm' },
  },
  {
    path: "/lawyer-dashboard",
    component: LawyerDashboard,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/lawyer-proposals",
    component: LawyerBids,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/lawyer-profile",
    component: LawyerProfile,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/lawyer-account",
    component: LawyerAccount,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/plans",
    component: Plans,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/subscribe/:plan",
    component: LawyerSubscribe,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/replace-payment-method",
    component: LawyerSubscribe,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },

  // lawyer end

  // client start

  //clients
  // {
  //   path: "/client-login",
  //   component: ClientLoginForm,
  //   beforeEnter: reverse_guard,
  // },
  {
    path: "/client-register",
    component: ClientRegister,
    beforeEnter: reverse_guard,
    meta: { title: 'Simplawfy - Find a Lawyer' },

  },
  {
    path: "/otp",
    component: OTP,
    beforeEnter: reverse_guard,
  },
  {
    path: "/otp-verification",
    component: OTPAdmin,
    // beforeEnter: reverse_guard,
  },
  {
    path: "/client-account",
    component: ClientAccount,
    meta: { requiresAuth: true, lawyerAndAdminNotAllowed: true },
  },
  {
    path: "/area-of-law",
    component: AreaOfLaw,
    meta: { requiresAuth: true, lawyerAndAdminNotAllowed: true },
  },
  // {
  //   path: "/postingjob",
  //   component: PostingJob,
  //   meta: { requiresAuth: true, lawyerAndAdminNotAllowed: true },
  // },
  {
    path: "/posting-job",
    component: PostingaJob,
    meta: { requiresAuth: true, lawyerAndAdminNotAllowed: true },
  },
  // client end

  {
    path: "/",
    // component: HelloWorld,
    component: PlatForm,
    beforeEnter: reverse_guard,
    meta: { title: 'Simplawfy - Independent Australian Legal Marketplace'},

  },
  // {
  //   path: "/platform",
  //   component: PlatForm,
  //   beforeEnter: reverse_guard,
  // },
  {
    path: "/proposal",
    component: LawyerBidding,
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/request-info",
    component: RequestInfo,
  },
  {
    path: "/need-lawyer",
    component: NeedLawyer,
  },
  {
    path: "/find-client",
    component: FindClient,
  },
  {
    path: "/login",
    component: LoginForm,
    beforeEnter: reverse_guard,
  },
  // {
  //   path: "/terms-and-conditions-for-lawyers",
  //   component: termsForLawyer,
  // },

  // admin
  {
    path: "/admin-login",
    component: AdminLogin,
    beforeEnter: reverse_guard,
  },

  // {
  //   path: "/",
  //   component: HelloWorld,
  //   meta: {
  //     requiresAuth: true
  //   },
  // },

  {
    path: "/proposals",
    component: AdminProposals,
    meta: { requiresAuth: true, clientAndlawyerNotAllowed: true },
  },

  {
    path: "/admin-account",
    component: AdminAccount,
    meta: { requiresAuth: true, clientAndlawyerNotAllowed: true },
  },

  {
    path: "/admin-dashboard",
    component: AdminMain,
    meta: { requiresAuth: true, clientAndlawyerNotAllowed: true },
  },

  {
    path: "/lawyer",
    component: AdminLawyer,
    meta: { requiresAuth: true, clientAndlawyerNotAllowed: true },
  },

  {
    path: "/client-dashboard",
    component: clientDashboard,
    meta: { requiresAuth: true, lawyerAndAdminNotAllowed: true },
  },

  // {
  //   path: "/subscription",
  //   component: SubscriptionComponent,
  //   meta: { requiresAuth: true },
  // },

  {
    path: "/job",
    component: AdminJobs,
    meta: { requiresAuth: true, clientAndlawyerNotAllowed: true },
  },

  

  {
    path: "/client",
    component: AdminClients,
    meta: { requiresAuth: true, clientAndlawyerNotAllowed: true },
  },

  {
    path: "/view-proposals",
    component: ViewBids,
  },
  {
    path: "/reply-info-request",
    component: ReplyInfoRequest,
  },
  // {
  //   path: "/terms-and-conditions-for-clients",
  //   component: termsForClient,
  // },
  // other
  {
    path: "/privacy-policy",
    component: privacyPolicy,
  },
  {
    path: "/terms-of-use",
    component: termsOfUse,
  },
  {
    path: "/terms-and-conditions-for-lawyers",
    component: termsLawyer,
  },
  {
    path: "/terms-and-conditions-for-clients",
    component: termsClient,
  },
  {
    path: "/forget-password",
    component: ForgetPassword,
    beforeEnter: reverse_guard,
  },

  {
    path: "/reset-password/:email/:token",
    component: ResetPassword,
    // beforeEnter: reverse_guard,
  },

  {
    path: "/update-email/:email/:token",
    component: UpdateEmail,
    // beforeEnter: reverse_guard,
  },

  // {
  //   path: "/about-us",
  //   component: AboutUs,
  // },
  {
    path: "/how-simplawfy-works",
    component: HowSimplawfyWorks,
    meta: {title: 'Simplawfy - What is a Legal Marketplace'},
  },
  {
    path: "/lp",
    component: InquiryPg,
  },
  {
    path: "/about-us",
    component: NewLanding,
    meta: { title: 'Simplawfy - Who Founded Simplawfy'},

  },
  {
    path: "/client-faqs",
    component: ClientFaqs,
    // meta: { requiresAuth: true },
    meta: { requiresAuth: true, lawyerAndAdminNotAllowed: true },
  },
  {
    path: "/lawyer-faqs",
    component: LawyerFaqs,
    // meta: { requiresAuth: true },
    meta: { requiresAuth: true, clientAndAdminNotAllowed: true },
  },
  {
    path: "/contact-us",
    component: ContactUs,
    meta: {title: 'Simplawfy - Contact Us'},
  },
  {
    path: "/wizard-form",
    component: WizardForm,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.NODE_ENV == 'production' ? '/app/' : '/',
  routes,
  scrollBehavior() {
    // Scroll to the top of the page when navigating to a new route
    return { top: 0 };
  },
});

router.beforeEach((to ) => {
  document.title = to.meta?.title ?? 'Simplawfy - Independent Australian Legal Marketplace';

});


const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  // console.log('not match ,,, ' , token);
  return token;
};

// if(result.status == 200){
//   next();
// }

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      console.log("not match");
      next({ path: "/" });
    } else {
      console.log("match else");
      try {
        console.log("match try");
        let result = await api.get("/verify");
        console.log("user all data ::: ", result?.data);
        if (
          to.meta.clientAndlawyerNotAllowed &&
          result?.data?.data?.type != "admin"
        ) {
          console.log("client and lawyer not allowed");
          const redirectUrl =
            result?.data?.data?.type == "lawyer"
              ? "/lawyer-dashboard"
              : "client-dashboard";
          next(redirectUrl);
        } else if (
          to.meta.clientAndAdminNotAllowed &&
          result.data.data.type != "lawyer"
        ) {
          const redirectUrl =
            result?.data?.data?.type == "client"
              ? "/client-dashboard"
              : "/admin-dashboard";
          next(redirectUrl);
          // router.go(-1);
          console.log("client access not allowed");
        } else if (
          to.meta.lawyerAndAdminNotAllowed &&
          result.data.data.type != "client"
        ) {
          const redirectUrl =
            result?.data?.data?.type == "lawyer"
              ? "/lawyer-dashboard"
              : "/admin-dashboard";
          next(redirectUrl);
          // router.go(-1);
          console.log("lawyer access not allowed");
        } else {
          if (
            result?.data?.data?.type == "admin" &&
            !result?.data?.data?.otp_verified
          ) {
            localStorage.removeItem("loginUser");
            localStorage.removeItem("token");
            next("/admin-login");
          }

          if (
            result?.data?.data?.type == "lawyer" ||
            result?.data?.data?.type == "client"
          ) {
            store.commit("SET_NOTI_COUNT_MSG", result?.data?.noti_msg);
            localStorage.setItem("noti_count_msg", result?.data?.noti_msg);
            store.commit("SET_NOTI_COUNT_JOB", result?.data?.noti_job);
            localStorage.setItem("noti_count_job", result?.data?.noti_job);
          }

          console.log("cr", to);
          console.log("cr 2", from);

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
            // const current_date = new Date();
            // const current_period_end = new Date(result?.data?.subscription?.current_period_end);
            // if(result?.data?.subscription.is_cancel && current_period_end >= current_date){
            //   store.commit("SET_SUB_STATUS", null);
            //   store.commit("SET_SUB_CANCEL_STATUS",false);
            // }
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
            store.commit(
              "SET_APPROVAL_STATUS",
              result?.data?.data?.admin_approval
            );
          }
          if (to?.fullPath == "/lawyer-account") {
            store.commit("SET_SUBSCRIPTION_DATA", result?.data?.subscription);
          }

          // if (localStorage.getItem("loginUser") === null) {

          // first_name: result?.data?.data?.first_name,
            // last_name: result?.data?.data?.last_name,
            // email: result?.data?.data?.email,
            // type: result?.data?.data?.type,
            // phone: result?.data?.data?.phone,
            // address: result?.data?.data?.address,
            // is_subscribed_first: result?.data?.data?.is_subscribed_first,
            // image: result?.data?.data?.image,
            // job_title: result?.data?.data?.job_title,
            // law_firm: result?.data?.data?.law_firm,
            // link: result?.data?.data?.link,
            // about: result?.data?.data?.about,
            // area_insert : result?.data?.data?.area_insert,
            // state_insert : result?.data?.data?.state_insert,


          const userData = {
            
            id: result?.data?.data?.id,
            first_name: result?.data?.data?.first_name,
            last_name: result?.data?.data?.last_name,
            email: result?.data?.data?.email,
            type: result?.data?.data?.type,
            phone: result?.data?.data?.phone,
            address: result?.data?.data?.address,
            job_title: result?.data?.data?.job_title,
            law_firm: result?.data?.data?.law_firm,
            link: result?.data?.data?.link,
            is_subscribed_first: result?.data?.data?.is_subscribed_first,
            about: result?.data?.data?.about,
            area_insert: result?.data?.data?.area_insert,
            state_insert: result?.data?.data?.state_insert,
            image: result?.data?.data?.image,
            consultation_type: result?.data?.data?.consultation_type,
            consultation_amount: result?.data?.data?.consultation_amount,
            consultation_time: result?.data?.data?.consultation_time,
            remote_consultation:
              result?.data?.data?.remote_consultation == 1 ? true : false,
            mobile_friendly:
              result?.data?.data?.mobile_friendly == 1 ? true : false,
            fields: result?.data?.data?.fields,
            locations: result?.data?.data?.locations,
            admin_approval: result?.data?.data?.admin_approval,
            suburb: result?.data?.data?.suburb
          };
          console.log('my daata : ' , userData);
          // setUserInStateAndLocalStorage
          localStorage.setItem("loginUser", JSON.stringify(userData));
          store.commit("SET_LOGIN_USER", userData);
          // }

          next();
        }
      } catch (e) {
        console.log("error from before Each", e);
        next(false);
        // localStorage.removeItem("loginUser");
        // localStorage.removeItem("token");
        // console.log("error from before : ", e);
        // next({ path: "/" });
      }
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
