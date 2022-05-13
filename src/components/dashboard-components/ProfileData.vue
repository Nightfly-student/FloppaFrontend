<template>
  <div class="container-xl">
    <div class="data">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">First name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="firstname">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Last name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="lastname">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="address">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Postal code</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="postalcode">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="username">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Roles</label>
            <input disabled type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="roles">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Date of birth</label>
            <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="dob">
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col d-flex justify-content-around">

          <button
            @click="setUpdateUserData" 
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
    name: "ProfileData",
    methods: {
        setUpdateUserData(){
          var updated = {
                id: this.id,
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                username: this.username,
                address: this.address,
                postalcode: this.postalcode,
                dob: this.dob
          };
          this.$store.state.updatedUserData = updated
        },
    },
    data() {
        return {
            id: null,
            firstname: null,
            lastname: null,
            address: null,
            postalcode: null,
            email: null,
            username: null,
            dob: null,
            roles: []
        };
    },
    watch: {
        loggedInUser: {
            handler(data) {
            }
        }
    },
    computed: {
        loggedInUser() {
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
        }
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