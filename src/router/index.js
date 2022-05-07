import { createRouter, createWebHistory, useRoute } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import userManagement from "../views/UserManagement.vue"
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
        authorities:[
          "USER",
          "EMPLOYEE"
        ]
      },
    },
    {
      path: "/userManagement",
      name: "User management",
      component: userManagement,
      beforeEnter: userRoute,
      meta: {
        title: "User management - Floppa",
        metaTags: [
          {
            name: "description",
            content: "User management Floppa...",
          },
        ],
        authorities:[
          "EMPLOYEE"
        ]
      },
    }
  ],
});


router.beforeEach((to, from, next)=>{

  //get if the route is protected
  const authorities =  to.meta.authorities;

  //if unprotected, let the user pass
  if(!authorities){
    next()
    return
  } 

  var user = store.getters.getUser;
  var roles = user.roles;

  //check if user is empty or roles are empty, otherwise redirect to login
  if(!user || !roles){
    next("/")
    return
  }

  //check if user has the associated authorities
  authorities.map((auth) => {
    roles.map((role) => {
      if(auth == role.name){
        next()
        return
      }
    })
  })

  //user doesn't have the right role, redirect to login
  next("/")
  return

})


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
