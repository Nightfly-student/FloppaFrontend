<template>
  <div class="container-xl text-light">
    <p>Hi {{ username }}!</p>
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
    <div class="text-center mt-4">
      <button
        :data-bs-target="'#CreateAccount'"
        data-bs-toggle="modal"
        class="btn btn-primary"
      >
        Create New Bank Account
      </button>
      <AddAccountModal @createdAccount="newAccount"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader, getUserId, getUserName } from "../../helpers/authHeader";
import AccountDashboard from "./account-components/AccountDashboard.vue";
import SelectedAccount from "./account-components/SelectedAccount.vue";
import AddAccountModal from "../modals/AddAccountModal.vue";
export default {
  name: "DashboardHome",
  components: {
    AccountDashboard,
    SelectedAccount,
    AddAccountModal,
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
    newAccount(account) {
      this.accounts.push(account);
      this.mounted = true;
    }
  },
  computed:{
    username(){
      return this.$store.state.user.username
    }
  },
  mounted() {
    this.getAllAccounts();
  },
};
</script>

<style></style>
