<template>
  <div class="modal text-dark fade" :id="'S' + account.iban">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Send Money</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Available Balance: &euro; {{ account.balance.toFixed(2) }}</p>
          <hr />
          <p>Search For Account</p>
          <input type="text" v-model="q" @change="onChange()" placeholder="Iban" />
          <button class="btn-secondary" @click="onChange()">Search</button>
          <div v-if="accounts.length != 0">
            <p class="mt-2">Found Iban Accounts</p>
            <div class="table-height">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">IBAN</th>
                    <th scope="col">TYPE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="acc in accounts" :key="acc.iban" @click="onClick(acc.iban)">
                    <th scope="row">{{ acc.iban }}</th>
                    <td>{{ acc.accountType }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p v-if="searched && accounts.length === 0">No Bank Accounts Found</p>
          <p v-if="selected">
            Selected: <strong>{{ selectedIban }}</strong>
          </p>
          <hr />
          <p>Amount Send</p>
          <input type="number" :max="account.balance" min="1" v-model="value" />
          <p class="text-danger">{{ errorMsg }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" id="closeSend" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" @click="sendMoney" class="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getUserName } from "../../helpers/authHeader";
export default {
  name: "SendModal",
  props: {
    account: Object,
    accountArray: {
      type: Array,
    },
  },
  data() {
    return {
      value: 1,
      errorMsg: "",
      accounts: [],
      limit: 10,
      offset: 0,
      q: "",
      searched: false,
      selected: false,
      selectedIban: "",
      holdAccount: this.account,
      userAccounts: this.accountArray,
      toAccount: "",
    };
  },
  methods: {
    findAccounts() {
      this.holdAccount = this.account;
      this.searched = false;
      this.selected = false;
      axios
        .get(
          `/api/v1/accounts/?limit=${this.limit}&offset=${this.offset
          }&q=${this.q.toUpperCase()}`
        )
        .then((res) => {
          console.log(res.data);

          res.data.forEach((acc, i) => {
            if (acc.iban != this.account.iban && acc.active) {
              if (acc.iban != "NL01INHO0000000001") {
                if (
                  (this.account.accountType == "regular" &&
                    acc.accountType == "savings" &&
                    acc.user_id == this.account.userId) ||
                  (this.account.accountType == "regular" &&
                    acc.accountType == "regular") ||
                  (this.account.accountType == "savings" &&
                    acc.user_id == this.account.userId)
                ) {
                  if (
                    this.account.accountType == "savings" &&
                    acc.user_id == this.account.userId
                  ) {
                    this.accounts.push(acc);
                  } else if (this.account.accountType == "regular") {
                    this.accounts.push(acc);
                  }
                }
              }
            }
          });

          if (this.accounts.length == 1) {
            this.onClick(this.accounts[0].iban);
          } else {
            this.searched = true;
          }
        });
    },
    onChange() {
      if (this.q.length <= 1) {
        return;
      }
      this.findAccounts();
    },
    onClick(iban) {
      this.selectedIban = iban;
      this.searched = false;
      this.accounts = [];
      this.selected = true;
    },
    sendMoney() {
      this.userAccounts.forEach((acc, i) => {
        if (acc.iban == this.selectedIban) {
          this.toAccount = acc;
        }
      });

      var value;

      if (this.value != this.account.balance) {
        value = this.value;
      }

      if (!this.selectedIban) {
        this.errorMsg = "No IBAN selected";
        return;
      }
      if (this.value <= 0) {
        this.errorMsg = "Unlogical Amount";
        return;
      }
      axios
        .post(`/api/v1/transactions/transfer`, {
          amount: this.value,
          from: this.account.iban,
          to: this.selectedIban,
          userPerforming: this.$store.state.user.username,
        })
        .then((res) => {
          this.value = this.account.balance - value;
          value && (this.holdAccount.balance = this.value);
          this.value = this.toAccount.balance + value;
          value && (this.toAccount.balance = this.value);

          this.$notify({
            text: res.data,
            type: "success",
          });
          document.getElementById("closeSend").click();
          this.value = 1;
          this.selected = false;
          this.selectedIban = "";
          this.$emit("updateAccount", this.holdAccount);
        })
        .catch((err) => {
          console.log(err);
          this.errorMsg = err.response.data;
          return;
        });
    },
  },
};
</script>

<style scoped>
.table {
  overflow: auto;
}

.table-height {
  height: 125px;
  overflow: auto;
}
</style>
