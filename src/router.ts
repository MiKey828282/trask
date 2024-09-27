import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import TaskItem from './components/TaskItem.vue';
import { useUserStore } from '@/stores/userStore';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/taskitem', component: TaskItem, meta : { requiresAuth: true } },
  { path: '/dashboard', component: DashboardPage, meta : { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (!userStore.currentUser) {
        if (to.meta.requiresAuth && !userStore.currentUserId) {
          if (to.path !== '/login') {
            next('/login'); 
          } else {
            next(); 
          }
        } else {
          next(); 
        }
        next('/login');
      } else {
        next();
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
