<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
    <div class="container">
      <a class="navbar-brand" id="navbar-brand" href="#">@Floppa</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        id="navbarCollapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="mx-auto"></div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-item nav-link nav-router text-white" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-item nav-link nav-router text-white" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-item nav-link nav-router text-white" to="/"
              >Home</router-link
            >
          </li>
          <li v-if="this.$store.getters.isLogged" class="nav-item">
            <router-link class="nav-item nav-link nav-router text-white" to="/dashboard"
              >Dashboard</router-link
            >
          </li>
          <li v-if="this.$store.getters.isLogged" class="nav-item ">
            <a
              class="nav-item nav-link nav-router text-white text-decoration-none"
              role="button"
              @click="
                this.$store.dispatch('logout');
                this.$router.push('/');
              "
              href="#"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MenuBar",
  data() {
    return {
      isSticky: false,
      activeClass: "text-dark",
      unActiveClass: "text-white",
    };
  },
  methods: {
    StickyNav() {
      var nav = document.querySelector("nav");
      var routers = document.getElementsByClassName("nav-router");

      window.addEventListener("scroll", function () {
        if (window.pageYOffset > 100) {
          nav.classList.add("bg-light", "shadow", "text-light");
          for (var i = 0; routers.length > i; i++) {
            routers[i].classList.add("text-dark");
            routers[i].classList.remove("text-white");
          }
          document.getElementById("navbar-brand").classList.add("text-dark");
        } else {
          nav.classList.remove("bg-light", "shadow");

          for (var i = 0; routers.length > i; i++) {
            routers[i].classList.remove("text-dark");
            routers[i].classList.add("text-white");
          }
          document.getElementById("navbar-brand").classList.remove("text-dark");
        }
      });
    },
  },
  mounted() {
    this.StickyNav();
  },
  watch: {
    $route() {
      document.getElementById("navbarCollapse").classList.remove("show");
    },
  },
};
</script>

<style scoped>
.activeClass {
  color: black;
}
.unActiveClass {
  color: white;
}
</style>
<script type="text/javascript"></script>
