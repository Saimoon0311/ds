import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import AboutUsPage from '@/components/About.vue';
import NotFound from '@/components/NotFound.vue';
import NeedLawyer from '@/components/NeedLawyer.vue';
import FindClient from '@/components/FindClient.vue';

const routes = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/about',
    component: AboutUsPage,
  },
  {
    path: '/need-lawyer',
    component: NeedLawyer,
  },
  {
    path: '/find-client',
    component: FindClient,
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