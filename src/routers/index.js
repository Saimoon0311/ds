import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutUsPage from "@/components/About.vue";
// import NotFound from "@/components/NotFound.vue";
import NeedLawyer from "@/pages/forms/NeedLawyer.vue";
import FindClient from "@/pages/forms/FindClient.vue";
import LoginForm from "@/pages/forms/LoginForm.vue";
import AdminLogin from "@/pages/admin/Login.vue";
import AdminDashboard from "@/pages/admin/Dashboard.vue";
import AdminLawyer from "@/pages/admin/Lawyers.vue";
import AdminJobs from "@/pages/admin/Jobs.vue";
import AdminClients from "@/pages/admin/Clients.vue";
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

const routes = [
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

  // {
  //     path: '/',
  //     // component: layout,
  //     meta: {
  //       requiresAuth: true
  //     },
  //     children: [
  //       {
  //         path: "/",
  //         component: HelloWorld,
  //       },
  //     ]
  // },
  
  
  // {
  //   path: "/:catchAll(.*)",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.NODE_ENV === 'production' ? '/law-frontend/' : '/',
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
