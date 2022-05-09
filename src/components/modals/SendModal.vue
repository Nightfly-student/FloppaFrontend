<template>
  <div class="modal text-dark fade" :id="'S' + account.iban">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Send Money</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Available Balance: &euro; {{ account.balance.toFixed(2) }}</p>
          <hr />
          <p>Search For Account</p>
          <input
            type="text"
            v-model="q"
            @change="onChange()"
            placeholder="Iban"
          />
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
                  <tr
                    v-for="acc in accounts"
                    :key="acc.iban"
                    @click="onClick(acc.iban)"
                  >
                    <th scope="row">{{ acc.iban }}</th>
                    <td>{{ acc.accountType }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p v-if="searched && accounts.length === 0">No Bank Accounts Found</p>
          <p v-if="selected">Selected: <strong>{{ selectedIban }}</strong></p>
          <hr />
          <p>Amount Send</p>
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
          <button type="button" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
export default {
  name: "SendModal",
  props: {
    account: Object,
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
    };
  },
  methods: {
    findAccounts() {
      this.searched = false;
      this.selected = false;
      axios
        .get(
          `/api/v1/accounts/?limit=${this.limit}&offset=${this.offset}&q=${this.q}`,
          { headers: authHeader() }
        )
        .then((res) => {
          console.log(res.data);
          this.accounts = res.data;
          this.searched = true;
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
  },
};
</script>

<style scoped>
.table {
  overflow: auto;
}
.table-height {
  height: 75px;
  overflow: auto;
}
</style>
