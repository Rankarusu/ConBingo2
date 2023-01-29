import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PlayPage from '@/views/PlayPage.vue';
import EditPage from '@/views/EditPage.vue';
import SavedSheetsPage from '@/views/SavedSheetsPage.vue';
import AboutPage from '@/views/AboutPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/play',
  },
  {
    path: '/play',
    component: PlayPage,
  },
  {
    path: '/edit',
    component: EditPage,
  },
  {
    path: '/saved-sheets',
    component: SavedSheetsPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
