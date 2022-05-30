<template>
  <div class="mb-5">
    <h2 class="text-center">{{ account.iban }}</h2>
    <h1 v-if="account.balance >= 0" class="text-center py-3">&euro; {{ account.balance.toFixed(2) }}</h1>
    <h1 v-else class="text-center py-3 text-danger">&euro; {{ account.balance.toFixed(2) }}</h1>
    <div class="text-center">
      <button :data-bs-target="'#W' + account.iban" data-bs-toggle="modal" class="btn btn-primary m-3 fs-4">
        Withdraw
      </button>
      <WithdrawModal :account="account" @updateAccount="updatedAccount"/>

      <button :data-bs-target="'#S' + account.iban" data-bs-toggle="modal" class="btn btn-primary m-3 fs-4">
        Send Money
      </button>
      <SendModal :account="account" :accountArray="accounts" @updateAccount="updatedAccount"/>

      <!--<button class="btn btn-primary m-3 fs-4">Deposit</button>-->

      <button :data-bs-target="'#D' + account.iban" data-bs-toggle="modal" class="btn btn-primary m-3 fs-4">
        Deposit
      </button>
      <DepositModal :account="account" @updateAccount="updatedAccount"/>
      <button :data-bs-target="'#SS' + account.iban" data-bs-toggle="modal" class="btn btn-primary m-3 fs-4">
        Settings
      </button>
      <UpdateBankAccountModal :account="account" @updateAccount="updatedAccount" />
    </div>
    <hr />
    <div>
      <h2 class="text-center">Transactions</h2>
    </div>
    <hr />
  </div>
</template>

<script>
import WithdrawModal from "../../modals/WithdrawModal.vue";
import SendModal from "../../modals/SendModal.vue";
import DepositModal from "../../modals/DepositModal.vue";
import UpdateBankAccountModal from "../../modals/UpdateBankAccountModal.vue";
export default {
  name: "SelectedAccount",
  components: {
    WithdrawModal,
    SendModal,
    DepositModal,
    UpdateBankAccountModal,
  },
  props: {
    account: Object,
    accounts: {
      type: Array
    }
  },
  methods: {
    updatedAccount(account) {
      this.$emit("updateAccount", account);
    },
  },
};
</script>

<style>
</style>
