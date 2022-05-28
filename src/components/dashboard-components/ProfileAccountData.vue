<template>
  <div class="container-xl">
    <div class="data">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">IBAN</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="iban">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">User ID</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="userId">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">accountType</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="accountType">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">balance</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="balance">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">absoluteLimit</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="absoluteLimit">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">transactionLimit</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="transactionLimit">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">active</label>
            <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="active">
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col d-flex justify-content-around">

          <button
              @click="setUpdateAccountData"
              :data-bs-target="'#askPassModalUserUpdate'"
              data-bs-toggle="modal"
              class="btn btn-primary">
            Update account data
          </button>
          <AskPassModal
              dialogId="askPassModalUserUpdate"
              storeEvent="updateUser"
              dialogTitle="Updating user credentials"
              dialogMessage="Please enter your password to update your account"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AskPassModal from "../modals/AskPassModal.vue";

export default {
  name: "ProfileAccountData",
  methods: {
    setUpdateAccountData(){
      var updated = {
        iban: this.iban,
        userId: this.userId,
        accountType: this.accountType,
        balance: this.balance,
        absoluteLimit: this.absoluteLimit,
        transactionLimit: this.transactionLimit,
        active: this.active
      };
      this.$store.state.updatedAccountData = updated
    },
  },
  data() {
    return {
      iban: null,
      userId: null,
      accountType: null,
      balance: null,
      absoluteLimit: null,
      transactionLimit: null,
      active: null
    };
  },
  watch: {
    loggedInUser: {
      handler(data) {
      }
    }
  },
  computed: {
    /*loggedInUser() {
      var data = this.$store.state.user;
      this.id = data.id;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.address = data.address;
      this.postalcode = data.postalcode;
      this.email = data.email;
      this.username = data.username;
      this.dob = data.dob;
      var userRoles = data.roles;
      userRoles.forEach((role, i) => {
        this.roles += role.name;
        if (i < userRoles.length - 1)
          this.roles += ", ";
      });
    }*/
  },
  components: { AskPassModal }
}
</script>

<style scoped>
.data{
  max-width: 800px;
  margin: auto;
}
</style>