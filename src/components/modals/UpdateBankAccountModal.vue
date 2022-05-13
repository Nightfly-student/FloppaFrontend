<template>
  <div class="modal text-dark fade" :id="'SS' + account.iban">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Bank Account Settings</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mt-2">
            <label>Change Account Type</label>
            <select v-model="value" class="form-select">
              <option value="regular">Regular</option>
              <option value="savings">Savings</option>
            </select>
          </div>
          <div class="form-group mt-2">
            <label>Change Transaction Limit</label>
            <input
              type="number"
              class="form-control"
              min="50"
              max="5000"
              v-model="transactionLimit"
              placeholder="Enter New Transaction limit"
            />
          </div>
          <div class="form-group mt-2">
            <label for="exampleInputEmail1">Freeze Account</label>
            <input
              type="checkbox"
              v-model="freeze"
              class="form-check-input ms-2"
              placeholder="Enter first name"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" data-bs-dismiss="modal" @click="onUpdate" class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateBankAccountModal",
  props: {
    account: Object,
  },
  data() {
    return {
      value: this.account.accountType,
      transactionLimit: this.account.transactionLimit,
      freeze: this.account.active ? false : true,
      holdFreeze: this.account.active ? false : true,
      holdAccount: this.account,
    };
  },
  methods: {
    onUpdate() {
      var type;
      var limit;
      var fr;

      if (this.value != this.account.accountType) {
        if (this.value.includes("regular")) {
          type = "1";
        }
        if (this.value.includes("savings")) {
          type = "0";
        }
      }
      if (this.transactionLimit != this.account.transactionLimit) {
        limit = this.transactionLimit;
      }
      if (this.freeze != this.holdFreeze) {
        fr = this.freeze ? false : true;
        console.log("hi");
      }
      if (type === null && limit === null && fr === null) {
        return;
      }
      var data = {};

      type && (data.accountType = parseInt(type));
      limit && (data.transactionLimit = limit);
      fr != null && (data.active = fr);
      axios
        .patch(`/api/v1/accounts/${this.account.iban}`, data)
        .then((res) => {
          type && (this.holdAccount.accountType = this.value);
          limit && (this.holdAccount.transactionLimit = limit);
          fr != null && (this.holdAccount.active = fr);
          this.$notify({
            text: "Updated Bank Account Settings",
            type: "success",
          });
          this.$emit("updateAccount", this.holdAccount);
        })
        .catch((err) => {
          this.$notify({
            text: err.response.data,
            type: "error",
          });
        });
    },
  },
};
</script>

<style></style>
