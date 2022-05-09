<template>
  <div class="modal text-dark fade" id="CreateAccount">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create New Bank Account</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <select
            v-model="value"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected value="">Select Account Type</option>
            <option value="1">Regular</option>
            <option value="0">Savings</option>
          </select>
          <p class="text-danger pt-2 m-0" v-if="errorMsg != ''">{{errorMsg}}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" @click="createAccount" data-bs-dismiss="modal" class="btn btn-primary">
            Create Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
export default {
  name: "AddAccountModal",
  data() {
    return {
      value: "",
      errorMsg: '',
    };
  },
  methods: {
    createAccount() {
      if (this.value == "1" || this.value == "0") {
        axios
          .post(
            `/api/v1/accounts/`,
            { accountType: parseInt(this.value) },
            { headers: authHeader() }
          )
          .then((res) => {
            this.$notify({
              text: "Successfully Added a New Account",
              type: "success",
            });
            this.$emit('createdAccount', res.data);
          })
          .catch((err) => {
            this.$notify({
              text: err,
              type: "error",
            });
          });
      } else {
        this.errorMsg = 'No Account Type Selected'; 
      }
    },
  },
};
</script>

<style></style>
