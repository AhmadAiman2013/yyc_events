// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
const  WebinarHome = () => import('./components/WebinarList.vue');
const WebinarView = () =>  import('./components/WebinarView.vue');


const routes = [
  {
    path: '/',
    name: 'WebinarHome',
    component: WebinarHome,
  },
  {
    path: '/events/:id',
    name: 'WebinarView',
    component: WebinarView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
