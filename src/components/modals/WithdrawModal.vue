<template>
  <div class="modal text-dark fade" :id="'W' + account.iban">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Withdraw</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Available Balance: &euro; {{ account.balance.toFixed(2) }}</p>
          <input type="number" :max="account.balance" min="1" v-model="value" />
          <p class="text-danger">{{ errorMsg }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" @click="withdrawMoney" class="btn btn-primary">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WithdrawModal",
  props: {
    account: Object,
  },
  data() {
    return {
      value: 1,
      errorMsg: "",
    };
  },
  methods: {
    withdrawMoney() {
      if (this.value > this.balance) {
        this.errorMsg = "Insufficient funds";
        return;
      } else if (this.value < 0) {
        this.errorMsg = "Unlogical Amount";
        return;
      } else {
        axios
          .post(`/api/v1/transactions/${this.account.iban}/withdraw`, {
            amount: this.value,
          })
          .then((res) => {
            this.$router.go();
            this.$notify({
              text: res.data,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify({
              text: err.response.data,
              type: "error",
            });
            console.log(err);
          });
      }
    },
  },
};
</script>

<style></style>
