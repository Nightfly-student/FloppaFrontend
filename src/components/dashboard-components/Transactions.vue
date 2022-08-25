<template>
  <div class="container-xl">
    <div class="d-flex mb-2 justify-content-between">
      <div class="entries d-flex justify-content-between gap-2">

        <button v-if="user.roles.some(e => e.name === 'EMPLOYEE')" :data-bs-target="'#EmployeeSendModal'"
          data-bs-toggle="modal" class="btn btn-primary me-5">
          Perform transaction
        </button>
        <EmployeeSendModal :user="user" :accountArray="accounts" />


        <span class="mt-2">Showing</span>
        <select name="" class="m-1" v-model="limit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <span class="mt-2">transactions of {{ transactionsCount }}</span>
      </div>
      <div class="search d-flex gap-2">
        <label class="w-100 mt-2">Filter by</label>
        <select v-model="filterMode" class="form-select my-1" aria-label="Default select example">
          <option selected value="amount">Amount</option>
          <option value="from">From IBAN</option>
          <option value="to">To IBAN</option>
          <option value="time">Datetime</option>
        </select>

        <select v-if="filterMode == 'amount'" v-model="filterAmountType" class="rounded my-1"
          aria-label="Default select example">
          <option selected value="greater">></option>
          <option value="less">&lt;</option>
          <option value="equal">=</option>
        </select>

        <input v-if="filterMode == 'amount'" type="number" min="0" max="999999999" class="rounded my-1" v-model="amount"
          @change="offset = 0; currentPage = 1;" />

        <input v-else-if="filterMode == 'from' || filterMode == 'to'" maxlength="18" class="rounded my-1"
          v-model="filterIBAN" @change="offset = 0; currentPage = 1;" />

        <label v-else-if="filterMode == 'time'" class="mt-2">From</label>
        <input v-if="filterMode == 'time'" type="datetime-local" class="rounded my-1 w-100" v-model="filterStartDate"
          @change="offset = 0; currentPage = 1;" />

        <label v-if="filterMode == 'time'" class="mt-2">To</label>
        <input v-if="filterMode == 'time'" type="datetime-local" class="rounded my-1 w-100" v-model="filterEndDate"
          @change="offset = 0; currentPage = 1;" />

        <button class="btn btn-secondary my-1 rounded" @click="onChange()">Search</button>
      </div>

    </div>
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Amount</th>
          <th scope="col">Transaction-type</th>
          <th scope="col">From account</th>
          <th scope="col">To account</th>
          <th scope="col">Performed by</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>
            €<i v-if="transaction.to_account.iban == 'NL01INHO0000000001'" class="float-end text-danger">
              - {{ roundDecimals(transaction.amount) }}
            </i>
            <i v-else-if="transaction.from_account.iban == 'NL01INHO0000000001'" class="float-end text-success">
              + {{ roundDecimals(transaction.amount) }}
            </i>
            <i v-else-if="transaction.from_account.user.id != getUserId()" class="float-end text-success">
              + {{ roundDecimals(transaction.amount) }}
            </i>
            <i v-else-if="transaction.to_account.user.id != getUserId()" class="float-end text-danger">
              - {{ roundDecimals(transaction.amount) }}
            </i>
            <i v-else class="float-end">
              {{ roundDecimals(transaction.amount) }}
            </i>
          </td>

          <td v-if="transaction.to_account.iban == 'NL01INHO0000000001'">Withdrawal</td>
          <td v-else-if="transaction.from_account.iban == 'NL01INHO0000000001'">Deposit</td>
          <td v-else>Transferral</td>

          <td v-if="transaction.from_account.iban == 'NL01INHO0000000001'">Cash</td>
          <td v-else>{{ transaction.from_account.iban }}</td>
          <td v-if="transaction.to_account.iban == 'NL01INHO0000000001'">Cash</td>
          <td v-else>{{ transaction.to_account.iban }}</td>
          <td>{{ transaction.user_performing }}</td>
          <td>{{ formatTime(transaction.transaction_date) }}</td>

        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between float-end">

      <nav aria-label="...">
        <ul class="pagination">
          <li v-if="offset - limit < 0" class="page-item disabled">
            <button class="page-link">Previous</button>
          </li>
          <li v-else class="page-item">
            <button class="page-link" @click="c
              hangeOffset(-limit, transactionsCount, false, currentPage, false);
loadTransactions();
            ">
              Previous
            </button>
          </li>
          <li v-if="currentPage > 1" class="page-item">
            <button class="page-link" @click="
  changeOffset(limit, transactionsCount, false, 1, true);
loadTransactions();
            ">
              1
            </button>
          </li>
          <li v-if="currentPage > 1" class="page-item disabled">
            <a class="page-link">...</a>
          </li>
          <li class="page-item active">
            <a class="page-link">{{ currentPage }}</a>
          </li>
          <li v-if="offset + limit < transactionsCount" class="page-item disabled">
            <a class="page-link">...</a>
          </li>
          <li v-if="offset + limit < transactionsCount" class="page-item">
            <button class="page-link" @click="
  changeOffset(limit, transactionsCount, true, transactionsCount / limit, true);
loadTransactions();
            ">
              {{ Math.ceil(transactionsCount / limit) }}
            </button>
          </li>
          <li v-if="offset + limit >= transactionsCount" class="page-item disabled">
            <button class="page-link">Next</button>
          </li>
          <li v-else class="page-item">
            <button class="page-link" @click="
  changeOffset(limit, transactionsCount, true, currentPage, false);
loadTransactions();
            ">
              Next
            </button>
          </li>
        </ul>
      </nav>

    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getUserId } from "../../helpers/authHeader";
import EmployeeSendModal from "../modals/EmployeeSendModal.vue";
export default {
  name: "Transactions",
  components: {
    EmployeeSendModal,
  },
  data() {
    return {
      accounts: [],
      currentPage: 1,
      amount: 0,
      limit: 5,
      offset: 0,
      filterMode: "amount",
      filterAmountType: "greater",
    };
  },
  methods: {
    getAllAccounts() {
      axios
        .get(`/api/v1/users/${getUserId()}/accounts`, { headers: authHeader() })
        .then((res) => {
          this.accounts = res.data;
          this.calculateTotal();
          this.mounted = true;
        });
    },
    loadTransactions() {
      var offset = this.offset;
      var limit = this.limit;

      console.log("filter = " + filter);

      if (this.filterMode == "from" && this.filterIBAN != undefined && this.filterIBAN != "") var filter = this.filterMode + ",," + this.filterIBAN.toUpperCase();
      else if (this.filterMode == "to" && this.filterIBAN != undefined && this.filterIBAN != "") var filter = this.filterMode + ",," + this.filterIBAN;
      else if (this.filterMode == "amount" && this.amount != "") var filter = this.filterMode + ",," + this.amount + ",," + this.filterAmountType;
      else if (this.filterMode == "time" && this.filterStartDate != undefined && this.filterEndDate != undefined) var filter = this.filterMode + ",," + this.filterStartDate + ",," + this.filterEndDate;
      else if (this.filterMode == "time" && this.filterStartDate != undefined && this.filterEndDate == undefined) var filter = this.filterMode + ",," + this.filterStartDate + ",,now";
      else if (this.filterMode == "time" && this.filterEndDate != undefined && this.filterStartDate == undefined) var filter = this.filterMode + ",,now,," + this.filterEndDate;


      console.warn(`Filtering with limit ${limit}, offset ${offset}, filter ${filter}`)
      this.$store.dispatch("loadTransactions", { offset: offset, limit: limit, filter: filter });
    },
    changeOffset(limit, count, goForward, pageNumber, shortCut) {
      limit = parseInt(limit);
      this.limit = parseInt(this.limit);
      if (shortCut != true) {
        switch (goForward) {
          case true:
            if (this.offset < count && this.offset + limit >= 0) {
              this.offset = this.offset + limit;
              pageNumber++;
            }
            break;
          case false:
            if (this.offset >= count && this.offset - limit >= 0) {
              this.offset = this.offset + limit;
              pageNumber--;
            } else {
              this.offset = this.offset + limit;
              pageNumber--;
            }
            break;
        }
        this.currentPage = pageNumber;
      }
      if (shortCut != false) {
        switch (goForward) {
          case true:
            this.offset = count - limit;
            this.currentPage = pageNumber;
            break;
          case false:
            this.offset = 0;
            this.currentPage = pageNumber;
            break;
        }
      }
    },
    getUserId() {
      return getUserId();
    },
    roundDecimals(amount) {
      return amount.toFixed(2);
    },
    formatTime(time) {
      return moment(String(time)).format("DD-MM-YYYY HH:mm");
    },
    resetFilter() {
      this.filter = "";
    },
    onChange() {
      this.loadTransactions();
      this.offset = 0;
      this.currentPage = 1;
    },
  },
  watch: {
    limit() {
      this.loadTransactions();
    }
  },
  mounted() {
    this.$store.dispatch("loadTransactions", { offset: 0, limit: 5 });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    errorMsg() {
      return "";
    },
    transactions() {
      return this.$store.state.transactions;
    },
    transactionsCount() {
      return this.$store.state.totalTransactionsCount;
    }
  },
};
</script>

<style>
</style>
