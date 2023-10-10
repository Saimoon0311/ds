import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import AboutUsPage from '@/components/About.vue';
import NotFound from '@/components/NotFound.vue';

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
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;