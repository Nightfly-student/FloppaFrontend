<template>
    <div class="modal text-dark fade" :id="'EmployeeSendModal'">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-center">
                <div class="modal-header">
                    <h5 class="modal-title">Perform transaction</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Balance from-account: <strong></strong>&euro; {{ fromBalance.toFixed(2) }}</p>
                    <hr />
                    <p v-if="!fromSelected || toSelected">Search From-Account</p>
                    <p v-else-if="!toSelected">Search To-Account</p>
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
                    <table>
                        <tr>
                            <td class="text-start px-2">From:</td>
                            <td><strong v-if="fromSelected">{{ fromIban }}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-start px-2">To:</td>
                            <td><strong v-if="toSelected">{{ toIban }}</strong></td>
                        </tr>
                    </table>
                    <hr />
                    <p>Amount Send</p>
                    <input type="number" :max="fromBalance" min="1" v-model="value" />
                    <p class="text-danger">{{ errorMsg }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeSendEmp" class="btn btn-secondary" data-bs-dismiss="modal">
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
    name: "EmployeeSendModal",
    props: {
        user: Object,
        accountArray: {
            type: Array,
        }
    },
    data() {
        return {
            user: this.user,
            value: 1,
            errorMsg: "",
            accounts: [],
            limit: 10,
            offset: 0,
            q: "",
            searched: false,
            fromSelected: false,
            toSelected: false,
            fromIban: "",
            toIban: "",
            fromAccount: "",
            fromBalance: 0,
            toAccount: "",
            userAccounts: this.accountArray,
        };
    },
    methods: {
        findAccounts() {
            this.userAccounts.forEach((acc, i) => {
                if (acc.iban == this.fromIban) this.fromAccount = acc;
                else this.toAccount = acc;
            })
            this.searched = false;
            axios
                .get(`/api/v1/accounts/?limit=${this.limit}&offset=${this.offset}&q=${this.q.toUpperCase()}`)
                .then((res) => {
                    console.log(res.data);

                    res.data.forEach((acc, i) => {
                        
                        if (acc.user_id != this.user.id) {
                            if (!this.fromSelected && acc.active || acc.iban != this.fromIban && acc.active) {
                                if (this.fromSelected && acc.iban != this.fromIban || !this.fromSelected) {
                                    if (acc.iban != "NL01INHO0000000001") {
                                        if (this.fromSelected && this.fromAccount.accountType == "regular" && acc.accountType == "savings" && acc.user_id == this.fromAccount.userId ||
                                            this.fromSelected && this.fromAccount.accountType == "regular" && acc.accountType == "regular" ||
                                            this.fromSelected && this.fromAccount.accountType == "savings" && acc.user_id == this.fromAccount.userId || !this.fromSelected) {
                                            if (this.fromSelected && this.fromAccount.accountType == "savings" && acc.user_id == this.fromAccount.userId || !this.fromSelected) {
                                                this.accounts.push(acc);
                                            } else if (this.fromSelected && this.fromAccount.accountType == "regular" || !this.fromSelected) {
                                                this.accounts.push(acc);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })

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
            if (this.toSelected) {
                this.fromSelected = false;
                this.toSelected = false;
                this.fromAccount = "";
                this.toAccount = "";
                this.fromIban = "";
                this.toIban = "";
            }
            this.findAccounts();
        },
        onClick(iban) {
            this.userAccounts.forEach((acc, i) => {
                if (acc.iban == iban) {
                    if (!this.fromSelected) this.fromAccount = acc;
                    else this.toAccount = acc;
                }
            })
            if (!this.fromSelected) this.fromIban = iban;
            else this.toIban = iban;

            if (this.fromAccount == "" || this.toAccount == "") {
                axios
                    .get(`/api/v1/accounts/${iban}`)
                    .then((res) => {
                        if (!this.fromSelected) this.fromAccount = res.data;
                        else this.toAccount = res.data;

                        if (this.fromSelected) this.toSelected = true;
                        this.fromSelected = true;
                        this.fromBalance = this.fromAccount.balance;
                    }).catch((err) => {
                        console.log(err);
                        this.$notify({
                            text: err.response,
                            type: "error",
                        });
                        return;
                    });
            }

            this.searched = false;
            this.accounts = [];
        },
        sendMoney() {
            this.userAccounts.forEach((acc, i) => {
                if (acc.iban == this.fromIban) this.fromAccount = acc;
                else this.toAccount = acc;
            })

            var value;

            if (this.value != this.fromAccount.balance) {
                value = this.value;
            }

            if (!this.fromSelected || !this.toSelected) {
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
                    from: this.fromIban,
                    to: this.toIban,
                    userPerforming: this.$store.state.user.username,
                })
                .then((res) => {
                    this.value = this.fromAccount.balance - value;
                    value && (this.fromAccount.balance = this.value);
                    this.value = this.toAccount.balance + value;
                    value && (this.toAccount.balance = this.value);

                    console.log(this.fromAccount.iban + " new balance = " + this.fromAccount.balance);
                    console.log(this.toAccount.iban + " new balance = " + this.toAccount.balance);

                    this.$notify({
                        text: res.data,
                        type: "success",
                    });
                    document.getElementById('closeSendEmp').click();
                    this.value = 1;
                    this.fromAccount = "";
                    this.fromSelected = false;
                    this.fromIban = "";
                    this.toAccount = "";
                    this.toSelected = false;
                    this.toIban = "";
                    this.fromBalance = 0;
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

.trans-iban {
    font-style: normal;
    display: inline-block;
    width: 52px;
}
</style>
