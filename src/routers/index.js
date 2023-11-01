import { createRouter, createWebHistory } from "vue-router";
// landing
import HelloWorld from "@/components/HelloWorld.vue";
import NeedLawyer from "@/pages/forms/NeedLawyer.vue";
// import FindClient from "@/pages/forms/FindClient.vue";
import LoginForm from "@/pages/forms/LoginForm.vue";
// admin
import AdminLogin from "@/pages/admin/Login.vue";
import AdminLawyer from "@/pages/admin/Lawyers.vue";
import AdminJobs from "@/pages/admin/Jobs.vue";
import AdminClients from "@/pages/admin/Clients.vue";
// paltform
import PlatForm from "@/components/PlatForm.vue";
// client
import ClientLoginForm from "@/pages/client/Login.vue";
import ClientRegister from "@/pages/client/Register.vue";
import ClientAccount from "@/pages/client/Account.vue";
import ClientDashboard from "@/pages/client/Dashboard.vue";
import PostingJob from "@/pages/client/PostingJob.vue";
import PostingaJob from "@/pages/client/PostingaJob.vue";
import AreaOfLaw from "@/pages/client/AreaOfLaw.vue";
import ViewBids from "@/pages/client/ViewBids.vue";
import ReplyInfoRequest from "@/pages/client/ReplyInfoRequest.vue";
import termsForClient from "@/pages/lawyer/termsAndConditions.vue";

// lawyer
import LawyerLoginForm from "@/pages/lawyer/Login.vue";
import LawyerRegister from "@/pages/lawyer/Register.vue";
import LawyerDashboard from "@/pages/lawyer/Dashboard.vue";
import LawyerBids from "@/pages/lawyer/Proposals.vue";
import LawyerProfile from "@/pages/lawyer/Profile.vue";
import LawyerAccount from "@/pages/lawyer/Account.vue";
import LawyerSubscribe from "@/pages/lawyer/Subscribe.vue";
// import LawyerBidding from "@/pages/lawyer/Proposal.vue";
import LawyerBidding from "@/pages/lawyer/Proposal.vue";
import RequestInfo from "@/pages/lawyer/RequestInfo.vue";
import FindClient from "@/pages/lawyer/Register.vue";
import termsForLawyer from "@/pages/lawyer/termsAndConditions.vue";

// other
import privacyPolicy from "@/pages/privacy-policy.vue";
import termsOfUse from "@/pages/terms-of-use.vue";
import AboutUs from "@/pages/AboutUs.vue";
import HowSimplawfyWorks from "@/pages/HowSimplawfyWorks.vue";
import ContactUs from "@/pages/ContactUs.vue";
import Faqs from "@/pages/Faqs.vue";
import NotFound from "@/components/NotFound.vue";
import WizardForm from "../pages/WizardForm.vue";

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
    path: "/lawyer-proposals",
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
  },
  {
    path: "/terms-and-conditions-for-lawyers",
    component: termsForLawyer,
  },

  // admin
  {
    path: "/admin-login",
    component: AdminLogin,
  },
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
  {
    path: "/client-dashboard",
    component: ClientDashboard,
  },
  {
    path: "/area-of-law",
    component: AreaOfLaw,
  },
  {
    path: "/postingjob",
    component: PostingJob,
  },
  {
    path: "/posting-job",
    component: PostingaJob,
  },
  {
    path: "/view-proposals",
    component: ViewBids,
  },
  {
    path: "/reply-info-request",
    component: ReplyInfoRequest,
  },
  {
    path: "/terms-and-conditions-for-clients",
    component: termsForClient,
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
  routes,
  scrollBehavior() {
    // Scroll to the top of the page when navigating to a new route
    return { top: 0 };
  },
});

export default router;
