<template>
  <div class="w-100 bg-dark text-light">
    <div class="container-fluid">
      <div class="row m-auto h-100 pb-4">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark mt-menu">
          <div
            class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
          >
            <a
              href="/"
              class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span class="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul
              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link align-middle px-0"
                  @click="onClick('home'), (namePage = 'Dashboard')"
                  :class="{ activeLink: home }"
                >
                  <BIconHouseDoor class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="nav-link px-0 align-middle"
                  @click="onClick('transactions'), (namePage = 'Transactions')"
                  :class="{ activeLink: transactions }"
                >
                  <BIconSpeedometer2 class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Transactions</span></a
                >
              </li>
              <li></li>
              <li>
                <a
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  class="nav-link px-0 align-middle"
                >
                  <BIconPersonPlus class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Settings</span>
                </a>
                <ul
                  class="collapse nav flex-column ms-1"
                  id="submenu3"
                  data-bs-parent="#menu"
                >
                  <li class="w-100">
                    <a
                      href="#"
                      class="nav-link px-0"
                      @click="onClick('coupons')"
                      :class="{ activeLink: coupons }"
                    >
                      <span class="d-none d-sm-inline">Profile</span></a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="nav-link px-0"
                      @click="onClick('addProduct')"
                      :class="{ activeLink: addProduct }"
                    >
                      <span class="d-none d-sm-inline">Bank Account</span></a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9 col-8">
          <h2 class="text-center header-text">{{ namePage }}</h2>
          <div class="mt-5">
            <DashboardHome v-if="home" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconHouseDoor,
  BIconSpeedometer2,
  BIconPersonPlus,
  BIconColumnsGap,
  BIconDiagram2,
} from "bootstrap-icons-vue";

import DashboardHome from "../components/dashboard-components/DashboardHome.vue";

export default {
  name: "Dashboard",
  components: {
    BIconHouseDoor,
    BIconSpeedometer2,
    BIconPersonPlus,
    BIconColumnsGap,
    BIconDiagram2,
    DashboardHome,
  },
  methods: {
    onClick(value) {
      this.home = false;
      this.transactions = false;
      this.settings = false;

      this[value] = true;
    },
  },
  data() {
    return {
      home: true,
      transactions: false,
      settings: false,
      namePage: "Dashboard",
    };
  },
};
</script>

<style scoped>
.header-text {
  padding-top: 125px;
}
.nav-link {
  color: white !important;
}
.nav-link:hover {
  color: gainsboro !important;
}
.activeLink {
  color: #599afb !important;
}
.activeLink:hover {
  color: #307cee !important;
}
.mt-menu {
    margin-top: 150px;
}
</style>
