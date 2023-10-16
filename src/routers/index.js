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
  {
    path: "/lawyer-login",
    component: LawyerLoginForm,
  },
  {
    path: "/lawyer-register",
    component: LawyerRegister,
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
    path: "/admin-job",
    component: AdminJobs,
  },
  {
    path: "/admin-client",
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
