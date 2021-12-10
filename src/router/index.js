import { createRouter, createWebHashHistory } from "vue-router";
import Login from "pages/login/index.vue";
import Index from "pages/index/index.vue";
import Star from "pages/star/index.vue";
const routes = [
  {
    path: "/",
    redirect: "/star",
  },
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/star",
    name: "Star",
    component: Star,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
