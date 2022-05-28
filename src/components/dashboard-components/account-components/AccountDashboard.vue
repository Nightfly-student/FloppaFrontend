<template>
  <div class="card shadow" @click="$emit('selectedAccount', account)">
    <div class="p-2">
      <div class="row">
        <div class="col-sm-8 col-7 col-lg-9">
          <p class="tiny">IBAN {{ account.iban }}</p>
        </div>
        <div class="col-sm-4 col-5 col-lg-3">
          <p>{{ account.accountType }}</p>
        </div>
      </div>
      <h2 v-if="account.balance >= 0">&euro; {{account.balance.toFixed(2)}}</h2>
      <h2 v-else class="text-danger">&euro; {{account.balance.toFixed(2)}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountDashboard",
  props: {
    account: Object,
  },
};
</script>

<style scoped>
.card {
  background: rgb(36, 36, 36) !important;
  transition: 10ms ease-in-out;
}
.card:hover {
    cursor: pointer;
    transform: scale(1.03);
}
.tiny {
    font-size: 12px;
}
</style>
