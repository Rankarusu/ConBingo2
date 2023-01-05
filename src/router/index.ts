import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/play',
  },
  {
    path: '/play',
    component: () => import('../views/PlayPage.vue'),
  },
  {
    path: '/edit',
    component: () => import('../views/EditPage.vue'),
  },
  {
    path: '/saved-sheets',
    component: () => import('../views/SavedSheetsPage.vue'),
  },
  {
    path: '/about',
    component: () => import('../views/AboutPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
