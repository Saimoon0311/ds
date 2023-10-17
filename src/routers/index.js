import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutUsPage from "@/components/About.vue";
import NotFound from "@/components/NotFound.vue";
import NeedLawyer from "@/pages/forms/NeedLawyer.vue";
import FindClient from "@/pages/forms/FindClient.vue";
import LoginForm from "@/pages/forms/LoginForm.vue";
import AdminLogin from "@/pages/admin/Login.vue";
import AdminLawyer from "@/pages/admin/Lawyers.vue";
import AdminJobs from "@/pages/admin/Jobs.vue";
import AdminClients from "@/pages/admin/Clients.vue";
import ClientProfile from "@/pages/client/Profile.vue";
import privacyPolicy from "@/pages/privacy-policy.vue";
import termsOfUse from "@/pages/terms-of-use.vue";
import PlatForm from "@/components/PlatForm.vue";
import ClientLoginForm from "@/pages/client/Login.vue";
import ClientRegister from "@/pages/client/Register.vue";
import LawyerLoginForm from "@/pages/lawyer/Login.vue";
import LawyerRegister from "@/pages/lawyer/Register.vue";
import LawyerDashboard from "@/pages/lawyer/Dashboard.vue";
import LawyerBids from "@/pages/lawyer/Bids.vue";
import LawyerProfile from "@/pages/lawyer/Profile.vue";
import LawyerAccount from "@/pages/lawyer/Account.vue";
import LawyerSubscribe from "@/pages/lawyer/Subscribe.vue";
import LawyerBidding from "@/pages/lawyer/Bidding.vue";
import RequestInfo from "@/pages/lawyer/RequestInfo.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/platform",
    component: PlatForm,
  },
  {
    path: "/client-login",
    component: ClientLoginForm,
  },
  {
    path: "/client-register",
    component: ClientRegister,
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
  },
  {
    path: "/admin-login",
    component: AdminLogin,
  },
  // {
  //   path: "/admin-dashboard",
  //   component: AdminDashboard,
  // },
  {
    path: "/admin-dashboard",
    component: AdminLawyer,
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
    path: "/client-profile",
    component: ClientProfile,
  },
  {
    path: "/privacy-policy",
    component: privacyPolicy,
  },
  {
    path: "/terms-of-use",
    component: termsOfUse,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
