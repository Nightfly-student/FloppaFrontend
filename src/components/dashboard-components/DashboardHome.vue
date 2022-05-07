<template>
  <div class="container-xl text-light">
    <p>Hi {{ userName() }}!</p>
    <div v-if="selected">
      <SelectedAccount v-if="mounted" :account="selectedAccount" />
    </div>
    <div class="row gy-4">
      <div
        class="col-12 col-sm-12 col-md-6"
        v-for="account in accounts"
        :key="account.id"
      >
        <AccountDashboard
          v-if="mounted"
          @selectedAccount="getSelectedAccount"
          :account="account"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader, getUserId, getUserName } from "../../helpers/authHeader";
import AccountDashboard from "./account-components/AccountDashboard.vue";
import SelectedAccount from "./account-components/SelectedAccount.vue";
export default {
  name: "DashboardHome",
  components: {
    AccountDashboard,
    SelectedAccount,
  },
  data() {
    return {
      accounts: [],
      mounted: false,
      selected: false,
      selectedAccount: {},
    };
  },
  methods: {
    getAllAccounts() {
      axios
        .get(`/api/v1/users/${getUserId()}/accounts`, { headers: authHeader() })
        .then((res) => {
          this.accounts = res.data;
          this.mounted = true;
          console.log(res.data);
        });
    },
    userName() {
      return getUserName();
    },
    getSelectedAccount(account) {
      if (!this.selected) {
        this.selectedAccount = account;
        this.selected = true;
      } else {
        if (this.selectedAccount.iban === account.iban) {
          this.selected = false;
        } else {
          this.selectedAccount = account;
        }
      }
      console.log(account);
    },
  },
  mounted() {
    this.getAllAccounts();
  },
};
</script>

<style></style>
