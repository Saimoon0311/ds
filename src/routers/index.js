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


function reverse_guard(to, from, next) {
  api.get("/verify")
      .then(() => {
          next('/');
      })
      .catch(() => {
        next()
      });
}


// {
//   path: '/',
//   component: layout,
//   meta: {
//     requiresAuth: true
//   },
//   children: [
// import ClientProfile from "@/pages/client/Profile.vue";
import PlatForm from "@/components/PlatForm.vue";
// client
import ClientLoginForm from "@/pages/client/Login.vue";
import ClientRegister from "@/pages/client/Register.vue";
import ClientAccount from "@/pages/client/Account.vue";

// lawyer
import LawyerLoginForm from "@/pages/lawyer/Login.vue";
import LawyerRegister from "@/pages/lawyer/Register.vue";
import LawyerDashboard from "@/pages/lawyer/Dashboard.vue";
import LawyerBids from "@/pages/lawyer/Bids.vue";
import LawyerProfile from "@/pages/lawyer/Profile.vue";
import LawyerAccount from "@/pages/lawyer/Account.vue";
import LawyerSubscribe from "@/pages/lawyer/Subscribe.vue";
import LawyerBidding from "@/pages/lawyer/Bidding.vue";
import RequestInfo from "@/pages/lawyer/RequestInfo.vue";
// other
import privacyPolicy from "@/pages/privacy-policy.vue";
import termsOfUse from "@/pages/terms-of-use.vue";
import AboutUsPage from "@/components/About.vue";
import NotFound from "@/components/NotFound.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/platform",
    component: PlatForm,
  },
  // lawyer
  {
    path: "/lawyer-login",
    component: LawyerLoginForm,
  },
  {
    path: "/lawyer-register",
    component: LawyerRegister,
  },
  {
    path: "/lawyer-dashboard",
    component: LawyerDashboard,
  },
  {
    path: "/lawyer-bids",
    component: LawyerBids,
  },
  {
    path: "/lawyer-profile",
    component: LawyerProfile,
  },
  {
    path: "/lawyer-account",
    component: LawyerAccount,
  },
  {
    path: "/subscribe",
    component: LawyerSubscribe,
  },
  {
    path: "/bidding",
    component: LawyerBidding,
  },
  {
    path: "/request-info",
    component: RequestInfo,
  },
  {
    path: "/about",
    component: AboutUsPage,
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
    meta: { requiresAuth: true },
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
  //clients
  {
    path: "/client-login",
    component: ClientLoginForm,
  },
  {
    path: "/client-register",
    component: ClientRegister,
  },
  {
    path: "/client-account",
    component: ClientAccount,
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
    path : "/forget-password",
    component: ForgetPassword,
  },

  {
    path : "/reset-password/:email/:token",
    component: ResetPassword,
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

router.beforeEach(async (to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ path: '/login' })
    } else {
      try{
        let result = await api.get('/verify');
        if(result.status == 200){
          next();
        }
      }catch(e){
        next({ path: '/login' })
      }
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})



export default router;
