import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Floppa Home",
        metaTags: [
          {
            name: "description",
            content: "Floppa Floppa...",
          },
        ],
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: userRoute,
      meta: {
        title: "Dashboard - Floppa",
        metaTags: [
          {
            name: "description",
            content: "Dashboard Floppa...",
          },
        ],
      },
    },
  ],
});

function userRoute(to, from, next) {
  var isAuthenticated = false;
  if (store.getters.isLogged) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

export default router;
