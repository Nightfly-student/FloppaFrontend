<template>
  <div>
    <notifications position="top right" />
    <MenuBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/style.css";

import MenuBar from "./components/layout/MenuBar.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    MenuBar,
    Footer,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 16px !important;
  color: #ffffff;
  text-align: center !important;
}
</style>
