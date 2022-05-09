<template>
  <div class="mb-5">
    <h2 class="text-center">{{ account.iban }}</h2>
    <h1 class="text-center py-3">&euro; {{ account.balance.toFixed(2) }}</h1>
    <div class="text-center">
      <button
        :data-bs-target="'#W' + account.iban"
        data-bs-toggle="modal"
        class="btn btn-primary m-3 fs-4"
      >
        Withdraw
      </button>
      <WihtdrawModal :account="account" />

      <button
        :data-bs-target="'#S' + account.iban"
        data-bs-toggle="modal"
        class="btn btn-primary m-3 fs-4"
      >
        Send Money
      </button>
      <SendModal :account="account" />
      <button class="btn btn-primary m-3 fs-4">Deposit</button>
    </div>
    <hr/>
    <div>
      <h2 class="text-center">Transactions</h2>
    </div>
    <hr/>
  </div>
</template>

<script>
import WihtdrawModal from "../../modals/WithdrawModal.vue";
import SendModal from "../../modals/SendModal.vue";
export default {
  name: "SelectedAccount",
  components: {
    WihtdrawModal,
    SendModal,
  },
  props: {
    account: Object,
  },
};
</script>

<style></style>
