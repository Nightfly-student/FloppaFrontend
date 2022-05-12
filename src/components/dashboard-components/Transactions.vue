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
        <span>transactions of {{transactionsCount}}</span>
      </div>
      <div class="search d-flex gap-2">
        <Label>Search by</Label>
        <input type="" id="" name="" v-model="filter"/>
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
            <i v-else-if="transaction.from_account.userId != getUserId()" class="float-end text-success">
            + {{ roundDecimals(transaction.amount) }} 
            </i>
            <i v-else-if="transaction.to_account.userId != getUserId()" class="float-end text-danger">
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

          <!--
          <td v-if="user.roles.length > 1">Employee</td>
          <td v-else>User</td>
          
          <td>2</td>
          <td>Action</td>-->
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between">
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
import moment from 'moment';
import { getUserId } from "../../helpers/authHeader";
export default {
  name: "Transactions",
  data() {
    return {
      currentPage: 1,
      filter: "",
      limit: 5
    };
  },
  methods: {
    loadTransactions() {
      var offset = this.$store.state.transactions.length;
      var limit = this.limit;
      var filter = this.filter;
      console.warn(`Filtering with limit ${limit}, offset ${offset}, filter ${filter}`)
      this.$store.dispatch("loadTransactions", { offset: 0, limit: limit, filter: filter });
    },
    getUserId() {
        return getUserId();
    },
    roundDecimals(amount) {
      return amount.toFixed(2);
    },
    formatTime(time) {
      return moment(String(time)).format("DD-MM-YYYY HH:mm");
    }
  },
  watch:{
    filter(){ 
      this.loadTransactions();
    },
    limit(){
      this.loadTransactions();
    }
  },
  mounted() {
    this.$store.dispatch("loadTransactions", { offset: 0, limit: 5 });
  },
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
    transactionsCount() {
      return this.$store.state.totalTransactionsCount;
    }
  },
};
</script>

<style></style>
