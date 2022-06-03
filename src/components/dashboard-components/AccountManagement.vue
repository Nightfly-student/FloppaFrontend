<template>
  <div class="container-xl">
    <div class="d-flex mb-2 justify-content-between">
      <div class="entries d-flex justify-content-between gap-2">
        <span>Showing</span>
        <select name="" id="" v-model="limit" @change="offset=0; currentPage=1; filter='';">
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
        <input type="" id="" name="" v-model="filter" @change="offset=0; currentPage=1; loadAccounts();"/>
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
        <td>
          <span v-if="account.active">Active</span>
          <span v-else>Inactive</span>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Actions
            </button>
            <div class="dropdown-menu">

              <button v-if="account.active"
                      type="button"
                      data-bs-dismiss="modal"
                      @click="changeStatus(account)"
                      class="dropdown-item">
                Set Inactive
              </button>
              <button v-else
                      type="button"
                      data-bs-dismiss="modal"
                      @click="changeStatus(account)"
                      class="dropdown-item"
              >
                Set Active
              </button>

              <button
                  :data-bs-target="'#SS' + account.iban"
                  data-bs-toggle="modal"
                  class="dropdown-item">
                Edit Account
              </button>

            </div>
          </div>

          <!-- MODALS -->
          <UpdateBankAccountModal :account="account"/>

        </td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between">
      <nav aria-label="...">
        <ul class="pagination" >
          <li v-if="(offset - limit) < 0" class="page-item disabled"><button class="page-link">Previous</button></li>
          <li v-else class="page-item"><button class="page-link" @click="changeOffset((-limit), accountsCount, false, currentPage, false); loadAccounts();">Previous</button></li>
          <li v-if="currentPage > 1" class="page-item"><button class="page-link" @click="changeOffset(limit, accountsCount, false, 1, true); loadAccounts();">1</button></li>
          <li v-if="currentPage > 1" class="page-item disabled"><a class="page-link">...</a></li>
          <li class="page-item active">
            <a class="page-link" >{{ currentPage }}</a>
          </li>
          <li v-if="(offset + limit) < accountsCount" class="page-item disabled"><a class="page-link">...</a></li>
          <li v-if="(offset + limit) < accountsCount" class="page-item"><button class="page-link" @click="changeOffset(limit, accountsCount, true, Math.ceil(accountsCount / limit), true); loadAccounts();">{{ Math.ceil(accountsCount / limit) }}</button></li>
          <li v-if="(offset + limit) >= accountsCount" class="page-item disabled"><button class="page-link" >Next</button></li>
          <li v-else class="page-item"><button class="page-link" @click="changeOffset(limit, accountsCount, true, currentPage, false); loadAccounts();" >Next</button></li>
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
      offset: 0,
    };
  },
  methods: {
    loadAccounts() {
      var offset = this.offset;//this.$store.state.accounts.length;
      var limit = this.limit;
      var filter = this.filter;
      console.warn(`Filtering with limit ${limit}, offset ${offset}, filter ${filter}`)
      this.$store.dispatch("loadAccounts", { offset: offset, limit: limit, filter: filter });
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
    changeOffset(limit, count, goForward, pageNumber, shortCut){
      limit = parseInt(limit);
      this.limit = parseInt(this.limit);
      if(shortCut != true) {
        switch (goForward) {
          case true:
            if (this.offset < count && (this.offset + limit) >= 0) {
              this.offset = this.offset + limit;
              pageNumber++;
            }
            break;
          case false:
            if (this.offset >= count && (this.offset - limit) >= 0) {
              this.offset = this.offset + limit;
              pageNumber--;
            } else if ((this.offset + limit) >= 0) {
              this.offset = this.offset + limit;
              pageNumber--;
            }
            break;
        }
        this.currentPage = pageNumber;
      }if (shortCut != false){
        switch (goForward) {
          case true:
            this.offset = 5*(Math.round((count - limit)/5));
            this.currentPage = pageNumber;
            break;
          case false:
            this.offset = 0;
            this.currentPage = pageNumber;
            break;
        }
      }
    },
  },
  watch:{
    filter(){
      this.loadAccounts();
      this.offset = 0;
      this.currentPage = 1;
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
