import { createRouter, createWebHistory } from "vue-router";
// landing
import HelloWorld from "@/components/HelloWorld.vue";
import NeedLawyer from "@/pages/forms/NeedLawyer.vue";
import FindClient from "@/pages/forms/FindClient.vue";
import LoginForm from "@/pages/forms/LoginForm.vue";
// admin
import AdminLogin from "@/pages/admin/Login.vue";
import AdminLawyer from "@/pages/admin/Lawyers.vue";
import AdminJobs from "@/pages/admin/Jobs.vue";
import AdminClients from "@/pages/admin/Clients.vue";
import clientDashboard from "@/pages/client/Dashboard.vue";
import SubscriptionComponent from "@/pages/client/Subscription.vue";
import ForgetPassword from "@/pages/forms/ForgetPassword.vue";
import ResetPassword from "@/pages/forms/ResetPassword.vue";

import api from "../config/api.js"

// import ClientProfile from "@/pages/client/Profile.vue";
import PlatForm from "@/components/PlatForm.vue";
// client
import ClientLoginForm from "@/pages/client/Login.vue";
import ClientRegister from "@/pages/client/Register.vue";
import ClientAccount from "@/pages/client/Account.vue";
import PostingJob from "@/pages/client/PostingJob.vue";
import AreaOfLaw from "@/pages/client/AreaOfLaw.vue";
import ViewBids from "@/pages/client/ViewBids.vue";
import ReplyInfoRequest from "@/pages/client/ReplyInfoRequest.vue";

// lawyer
import LawyerLoginForm from "@/pages/lawyer/Login.vue";
import LawyerRegister from "@/pages/lawyer/Register.vue";
import LawyerDashboard from "@/pages/lawyer/Dashboard.vue";
import LawyerBids from "@/pages/lawyer/Proposals.vue";
import LawyerProfile from "@/pages/lawyer/Profile.vue";
import LawyerAccount from "@/pages/lawyer/Account.vue";
import LawyerSubscribe from "@/pages/lawyer/Subscribe.vue";
import LawyerBidding from "@/pages/lawyer/Proposal.vue";
import RequestInfo from "@/pages/lawyer/RequestInfo.vue";
// other
import privacyPolicy from "@/pages/privacy-policy.vue";
import termsOfUse from "@/pages/terms-of-use.vue";
import AboutUs from "@/pages/AboutUs.vue";
import HowSimplawfyWorks from "@/pages/HowSimplawfyWorks.vue";
import ContactUs from "@/pages/ContactUs.vue";
import Faqs from "@/pages/Faqs.vue";
import NotFound from "@/components/NotFound.vue";
import WizardForm from "../pages/WizardForm.vue";

import store from '../store';


function reverse_guard(to, from, next) {
  api.get("/verify")
    .then(() => {
      router.go(-1);
    })
    .catch(() => {
      next()
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


  // lawyer start
  {
    path: "/lawyer-login",
    component: LawyerLoginForm,
    beforeEnter: reverse_guard,
  },
  {
    path: "/lawyer-register",
    component: LawyerRegister,
  },
  {
    path: "/lawyer-dashboard",
    component: LawyerDashboard,
    meta: { requiresAuth: true, clientNotAllowed: true },
  },
  {
    path: "/lawyer-proposals",
    component: LawyerBids,
    meta: { requiresAuth: true, clientNotAllowed: true },
  },
  {
    path: "/lawyer-profile",
    component: LawyerProfile,
    meta: { requiresAuth: true, clientNotAllowed: true },
  },
  {
    path: "/lawyer-account",
    component: LawyerAccount,
    meta: { requiresAuth: true, clientNotAllowed: true },
  },
  {
    path: "/subscribe",
    component: LawyerSubscribe,
    meta: { requiresAuth: true, clientNotAllowed: true },
  },
  {
    path: "/replace-payment-method",
    component: LawyerSubscribe,
    meta: { requiresAuth: true, clientNotAllowed: true },
  },
  
  // lawyer end


  // client start

  //clients
  {
    path: "/client-login",
    component: ClientLoginForm,
    beforeEnter: reverse_guard,
  },
  {
    path: "/client-register",
    component: ClientRegister,
  },
  {
    path: "/client-account",
    component: ClientAccount,
    meta: { requiresAuth: true, lawyerNotAllowed: true },
  },
  {
    path: "/area-of-law",
    component: AreaOfLaw,
    meta: { requiresAuth: true, lawyerNotAllowed: true },
  },
  {
    path: "/posting-job",
    component: PostingJob,
    meta: { requiresAuth: true, lawyerNotAllowed: true },
  },

  // client end


  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/platform",
    component: PlatForm,
  },
  {
    path: "/proposal",
    component: LawyerBidding,
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
  // admin
  {
    path: "/admin-login",
    component: AdminLogin,
  },

  {
    path: "/",
    component: HelloWorld,
    meta: {
      requiresAuth: true
    },
  },


  {
    path: "/admin-dashboard",
    component: AdminLawyer,
  },

  {
    path: "/client-dashboard",
    component: clientDashboard,
    meta: { requiresAuth: true, lawyerNotAllowed: true },
  },

  {
    path: "/subscription",
    component: SubscriptionComponent,
    meta: { requiresAuth: true },
  },

  {
    path: "/job",
    component: AdminJobs,
  },
  {
    path: "/client",
    component: AdminClients,
  },

  {
    path: "/view-bids",
    component: ViewBids,
  },
  {
    path: "/reply-info-request",
    component: ReplyInfoRequest,
  },

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
    path: "/forget-password",
    component: ForgetPassword,
  },


  {
    path: "/reset-password/:email/:token",
    component: ResetPassword,
  },

  {
    path: "/about-us",
    component: AboutUs,
  },
  {
    path: "/how-simplawfy-works",
    component: HowSimplawfyWorks,
  },
  {
    path: "/faqs",
    component: Faqs,
  },
  {
    path: "/contact-us",
    component: ContactUs,
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
  history: createWebHistory(),
  // base: process.env.NODE_ENV === 'production' ? '/law-frontend/' : '/',
  routes
});


const isLoggedIn = async () => {
  return localStorage.getItem('token')
}

// if(result.status == 200){
//   next();
// }

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ path: '/' })
    } else {
      try {
        let result = await api.get('/verify');
        console.log('user all data ::: ', result.data);
        if (to.meta.clientNotAllowed && result.data.data.type != "lawyer") {
          router.go(-1);
          console.log('client access not allowed');
        } else if (to.meta.lawyerNotAllowed && result.data.data.type != "client") {
          router.go(-1);
          console.log('lawyer access not allowed');
        } else {
          console.log('cr' , to);
          console.log('cr 2' , from);
          if(result?.data?.subscription != null){
            store.commit('SET_SUB_STATUS','subscribed');
            store.commit('SET_SUB_CANCEL_STATUS',result?.data?.subscription.is_cancel);
          }
          if(result?.data?.data?.admin_approval == 'approve'){
            store.commit('SET_APPROVAL_STATUS',result?.data?.data?.admin_approval);
          }
          if(to?.fullPath == "/lawyer-account"){
            store.commit('SET_SUBSCRIPTION_DATA',result?.data?.subscription);
          }
          next();
        }
      } catch (e) {
        console.log('error from before : ' , e);
        // next({ path: '/' })
      }
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})



export default router;
