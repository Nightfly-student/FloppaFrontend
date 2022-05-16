<template>
  <div class="container-xl">
    <div class="d-flex mb-2 justify-content-between">
      <div class="entries d-flex justify-content-between gap-2">
        <span>Showing</span>
        <select name="" id="" v-model="limit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <span>Accounts of {{accountsCount}}</span>
      </div>
      <div class="search d-flex gap-2">
        <Label>Search by</Label>
        <input type="" id="" name="" v-model="filter"/>
      </div>
    </div>
    <table class="table table-striped table-dark">
      <thead>
      <tr>
        <th scope="col">IBAN</th>
        <th scope="col">User ID</th>
        <th scope="col">Account Type</th>
        <th scope="col">Balance</th>
        <th scope="col">Absolute Limit</th>
        <th scope="col">Transaction Limit</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="account in accounts" :key="account.id">
        <td>{{ account.iban }}</td>
        <td>{{ account.userId }}</td>
        <td>{{ account.accountType }}</td>
        <td>{{ account.balance }}</td>
        <td>{{ account.absoluteLimit }}</td>
        <td>{{ account.transactionLimit }}</td>

        <td v-if="account.active"><button type="button" data-bs-dismiss="modal" @click="changeStatus(account)" class="btn btn-primary active">
          Active
        </button></td>
        <td v-else><button type="button" data-bs-dismiss="modal" @click="changeStatus(account)" class="btn btn-primary deactive">Not Active</button></td>
        <td><button
            :data-bs-target="'#SS' + account.iban"
            data-bs-toggle="modal"
            class="btn btn-primary">
          Edit
        </button><UpdateBankAccountModal :account="account" @updateAccount="updatedAccount" />
        </td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between">
      <!-- <button
          :data-bs-target="'#CreateAccount'"
          data-bs-toggle="modal"
          class="btn btn-primary">
        Add Account
      </button>
      <AddUserModal /> -->
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import UpdateBankAccountModal from "../modals/UpdateEmployeeBankAccountModal.vue";
import SelectedAccountModal from "./account-components/SelectedAccount.vue";
export default {
  name: "AccountManagement",
  components: {
    UpdateBankAccountModal,
    SelectedAccountModal

  },
  data() {
    return {
      currentPage: 1,
      filter: "",
      limit: 5,
    };
  },
  methods: {
    loadAccounts() {
      var offset = this.$store.state.accounts.length;
      var limit = this.limit;
      var filter = this.filter;
      console.warn(`Filtering with limit ${limit}, offset ${offset}, filter ${filter}`)
      this.$store.dispatch("loadAccounts", { offset: 0, limit: limit, filter: filter });
    },

    changeStatus(account) {
      var fr = account.active ? false : true;
      fr != null && (account.active = fr);
      this.$store.dispatch("updateAccount", account)
          .then(() => {
            fr != null && (account.active = fr);
            this.$notify({
              text: "Updated Account: " + account.active,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify({
              text: err.response.data,
              type: "error",
            });
          });
    },
  },
  watch:{
    filter(){
      this.loadAccounts();
    },
    limit(){
      this.loadAccounts();
    }
  },
  mounted() {
    this.$store.dispatch("loadAccounts", { offset: 0, limit: 5 });
  },
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
    accountsCount(){
      return this.$store.state.totalAccountsCount;
    }
  },
};
</script>

<style>
.active{
  background-color: #090;
}
.deactive{
  background-color: #900;
}
</style>
