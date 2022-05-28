<template>
  <div class="w-100 bg-dark text-light">
    <div class="container-fluid">
      <div class="row m-auto h-100 pb-4">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark mt-menu">
          <div
            class="
              d-flex
              flex-column
              align-items-center align-items-sm-start
              px-3
              pt-2
              text-white
              min-vh-100
            "
          >
            <a
              href="/"
              class="
                d-flex
                align-items-center
                pb-3
                mb-md-0
                me-md-auto
                text-white text-decoration-none
              "
            >
              <span class="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul
              class="
                nav nav-pills
                flex-column
                mb-sm-auto mb-0
                align-items-center align-items-sm-start
              "
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

              <li v-if="loggedInUser.roles.some(e => e.name === 'EMPLOYEE')">
                <a
                  href="#"
                  class="nav-link px-0 align-middle"
                  @click="onClick('userManagement'), (namePage = 'User management')"
                  :class="{ activeLink: userManagement }"
                >
                  <BIconPersonPlus class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">User management</span></a
                >
              </li>

              <li v-if="loggedInUser.roles.some(e => e.name === 'EMPLOYEE')">
                <a
                    href="#"
                    class="nav-link px-0 align-middle"
                    @click="onClick('accountManagement'), (namePage = 'Account management')"
                    :class="{ activeLink: accountManagement }"
                >
                  <BIconPersonPlus class="fs-4" />
                  <span class="ms-1 d-none d-sm-inline">Account management</span></a
                >
              </li>

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
                      @click="onClick('profileData'), (namePage='Profile data')"
                      :class="{ activeLink: profileData }"
                    >
                      <span class="d-none d-sm-inline">Profile</span></a
                    >
                  </li>
                  <li>

     
                      <span 
                        class="d-none d-sm-inline"
                        :data-bs-target="'#askPassModalDeactivation'"
                        data-bs-toggle="modal">
                        Deactivate account
                      </span>

                    <AskPassModal
                      dialogId="askPassModalDeactivation" 
                      storeEvent="deactivateUser"
                      dialogTitle="Account deactivation"
                      redirectUrl="/"
                      dialogMessage="This action will deactivate your account including all the associated bank accounts. You will be logged out and you will not be able to login back into your account. Please provide your password if you want to do this"
                    />

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
            <Transactions v-if="transactions" />
            <Usermanagement v-if="userManagement" />
            <Accountmanagement v-if="accountManagement" />
            <ProfileData v-if="profileData" />
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
  BIconPersonFill,
} from "bootstrap-icons-vue";

import DashboardHome from "../components/dashboard-components/DashboardHome.vue";
import Transactions from "../components/dashboard-components/Transactions.vue";
import Usermanagement from "../components/dashboard-components/UserManagement.vue";
import Accountmanagement from "../components/dashboard-components/AccountManagement.vue";
import ProfileData from "../components/dashboard-components/ProfileData.vue";
import AskPassModal from "../components/modals/AskPassModal.vue";

export default {
  name: "Dashboard",
  components: {
    BIconHouseDoor,
    BIconSpeedometer2,
    BIconPersonPlus,
    BIconColumnsGap,
    BIconDiagram2,
    BIconPersonFill,
    DashboardHome,
    Transactions,
    Usermanagement,
    Accountmanagement,
    ProfileData,
    AskPassModal
},
  methods: {
    onClick(value) {
      this.home = false;
      this.transactions = false;
      this.settings = false;
      this.userManagement = false;
      this.accountManagement = false;
      this.profileData = false;
      this[value] = true;
    },
  },
  data() {
    return {
      home: true,
      transactions: false,
      settings: false,
      userManagement: false,
      accountManagement: false,
      namePage: "Dashboard",
    };
  },
  computed:{
    loggedInUser(){
      return this.$store.state.user;
    }
  }
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
