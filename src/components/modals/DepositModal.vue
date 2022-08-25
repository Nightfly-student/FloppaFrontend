<template>
  <div class="modal text-dark fade" :id="'D' + account.iban">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Deposit</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Current Balance: &euro; {{ account.balance.toFixed(2) }}</p>
          <input type="number" :max="account.balance" min="1" v-model="value" />
          <p class="text-danger">{{ errorMsg }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            id="closeDeposit"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" @click="depositMoney" class="btn btn-primary">
            Deposit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DepositModal",
  props: {
    account: Object,
  },
  data() {
    return {
      value: 1,
      errorMsg: "",
      holdAccount: this.account,
    };
  },
  methods: {
    depositMoney() {
      var value;

      if (this.value != this.account.balance) {
        value = this.value;
      }

      if (this.value <= 0) {
        this.errorMsg = "Unlogical Amount";
        return;
      }
      axios
        .post(`/api/v1/transactions/${this.account.iban}/deposit`, {
          amount: this.value,
        })
        .then((res) => {
          this.value = this.account.balance + value;
          value && (this.holdAccount.balance = this.value);
          this.$notify({
            text: "Deposit succesful",
            type: "success",
          });
          document.getElementById("closeDeposit").click();
          this.value = 1;
          this.$emit("updateAccount", this.holdAccount);
        })
        .catch((err) => {
          this.errorMsg = err.response.data.error_message;
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
