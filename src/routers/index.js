import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutUsPage from "@/components/About.vue";
import NotFound from "@/components/NotFound.vue";
import NeedLawyer from "@/pages/forms/NeedLawyer.vue";
import FindClient from "@/pages/forms/FindClient.vue";
import LoginForm from "@/pages/forms/LoginForm.vue";
import AdminLogin from "@/pages/admin/Login.vue";
import AdminDashboard from "@/pages/admin/Dashboard.vue";
import AdminLawyer from "@/pages/admin/Lawyers.vue";
import AdminJobs from "@/pages/admin/Jobs.vue";
import AdminClients from "@/pages/admin/Clients.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
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
  {
    path: "/admin-dashboard",
    component: AdminDashboard,
  },
  {
    path: "/admin-lawyer",
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
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
