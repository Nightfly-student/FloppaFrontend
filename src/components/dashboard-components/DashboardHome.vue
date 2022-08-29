<template>
  <div class="container-xl text-light">
    <p>Hi {{ username }}!
    <!-- <button v-if="user.roles.some(e => e.name === 'EMPLOYEE')" :data-bs-target="'#EmployeeSendModal'" data-bs-toggle="modal" class="btn btn-primary mx-5">
        Perform transaction
      </button>
      <EmployeeSendModal :user="user" :accountArray="accounts" /> -->
    </p>
    <div class="card shadow my-2">
      <div class="p-2">
        <h2 v-if="accountsBalance >= 0">
          Total: &euro; {{ accountsBalance.toFixed(2) }}
        </h2>
        <h2 v-else class="text-danger">
          &euro; {{ accountsBalance.toFixed(2) }}
        </h2>
      </div>
    </div>
    <div v-if="selected">
      <SelectedAccount
        v-if="mounted"
        :account="selectedAccount"
        :accounts="accounts"
        @updateAccount="updatedAccount"
      />
    </div>
    <div class="row gy-4">
      <div class="col-12 col-sm-12 col-md-6" v-for="account in accounts" :key="account.id">
        <AccountDashboard v-if="mounted" @selectedAccount="getSelectedAccount" :account="account" />
      </div>
    </div>
    <div v-if="accounts.length < 2" class="text-center mt-4">
      <button :data-bs-target="'#CreateAccount'" data-bs-toggle="modal" class="btn btn-primary">
        Create New Bank Account
      </button>
      <AddAccountModal @createdAccount="newAccount" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader, getUserId, getUserName } from "../../helpers/authHeader";
import AccountDashboard from "./account-components/AccountDashboard.vue";
import SelectedAccount from "./account-components/SelectedAccount.vue";
import EmployeeSendModal from "../modals/EmployeeSendModal.vue";
import AddAccountModal from "../modals/AddAccountModal.vue";
export default {
  name: "DashboardHome",
  components: {
    AccountDashboard,
    SelectedAccount,
    AddAccountModal,
    EmployeeSendModal,
  },
  data() {
    return {
      accounts: [],
      accountsBalance: 0,
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
          this.calculateTotal();
          this.mounted = true;
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
    },
    newAccount(account) {
      this.accounts.push(account);
      this.mounted = true;
    },
    updatedAccount(account) {
      console.log(account);
      this.accounts.forEach((acc) => {
        if (acc.iban === account.iban) {
          acc = account;
          this.calculateTotal();
        }
      });
    },
    calculateTotal() {
      this.accountsBalance = 0;
      this.accounts.forEach((acc) => {
        this.accountsBalance += acc.balance;
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    username() {
      return this.$store.state.user.username;
    },
  },
  mounted() {
    this.getAllAccounts();
  },
};
</script>

<style scoped>
.card {
  background: rgb(36, 36, 36) !important;
}
</style>
