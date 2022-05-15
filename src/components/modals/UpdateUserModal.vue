<template>
  <div class="modal text-dark fade" :id="'SS' + user.id">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update User</h5>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="">First name</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="firstname"
                    placeholder="Enter first name"
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="">Last name</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="lastname"
                    placeholder="Enter last name"
                />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <div class="form-group">
                <label for="">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    v-model="email"
                    placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <div class="form-group">
                <label for="">Address</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="address"
                    placeholder="Enter address"
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="">Postal code</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="postalcode"
                    placeholder="Enter postal code"
                />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <div class="form-group">
                <label for="">Username</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="username"
                    placeholder="Enter username"
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="">Date of birth</label>
                <input
                    type="date"
                    class="form-control"
                    v-model="dob"
                    placeholder="Enter date of birth"
                />
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col">
              <label>Roles</label>
              <multiselect
                  mode="tags"
                  v-model="selectedRoles"
                  :options="loadedRoles"
                  class="multiselect-yellow mt-1"
              />
            </div>
          </div>

          <p class="text-danger pt-2 m-0" v-if="errorMsg != ''">
            {{ errorMsg }}
          </p>
        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
              type="button"
              @click="updateUser"
              data-bs-dismiss="modal"
              class="btn btn-primary"
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
import Multiselect from "@vueform/multiselect";
import axios from "axios";

export default {
  name: "UpdateUserModal",
  components: { Multiselect },
  props: {
    user: Object,
  },
  data() {
    return {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      address: this.user.address,
      postalcode: this.user.postalcode,
      username: this.user.username,
      dob: this.user.dob,
      selectedRoles: this.user.roles,
    };
  },
  mounted(){
    this.$store.dispatch("loadRoles", {limit: 5, offset: 0})
  },
  computed:{
    loadedRoles(){
      var loadedRoles = this.$store.state.roles;

      var roles = [];

      if(loadedRoles != null){
        loadedRoles.map((role) => {
          var roleItem = {label: role.name, value: role}
          roles.push(roleItem)
        })
      }

      return roles

    }
  },
  methods: {
    updateUser(){
      var user = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        address: this.address,
        postalcode: this.postalcode,
        username: this.username,
        dob: this.dob,
        roles: this.selectedRoles
      }

      this.$store.dispatch("updateUser", user)
          .then((newUser) => {
            this.$notify({
              text: "Updated user successfully",
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify({
              text: err.response.data,
              type: "error",
            });
            console.log(err);
          })

    }
  },
};
*/
import axios from "axios";
export default {
  name: "UpdateUserModal",
  props: {
    user: Object,
  },
  data() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      address: this.address,
      postalcode: this.postalcode,
      username: this.username,
      dob: this.dob,
      selectedRoles: [],
      holdUser: this.user,
    };
  },
  methods: {
    onUpdate() {
      var first;
      var last;
      var em;
      var add;
      var pc;
      var un;
      var dateob;
      /*
      var roles;

      if (this.value != this.account.accountType) {
        if (this.value.includes("regular")) {
          type = "1";
        }
        if (this.value.includes("savings")) {
          type = "0";
        }
      }*/
      if (this.firstname != this.user.firstname) {
        first = this.firstname;
      }
      if (this.lastname != this.user.lastname) {
        last = this.lastname;
      }
      if (this.email != this.user.email) {
        em = this.email;
      }
      if (this.address != this.user.address) {
        add = this.address;
      }
      if (this.postalcode != this.user.postalcode) {
        pc = this.postalcode;
      }
      if (this.username != this.user.username) {
        un = this.username;
      }
      if (this.dob != this.user.dob) {
        dateob = this.dob;
      }
      /*
      if (this.transactionLimit != this.account.transactionLimit) {
        limit = this.transactionLimit;
      }
      if (this.freeze != this.holdFreeze) {
        fr = this.freeze ? false : true;
        console.log("hi");
      }*/
      if (first === null && last === null && em === null && add === null && pc === null && em === null && un === null && dateob === null) {
        return;
      }
      var data = {};

      //type && (data.accountType = parseInt(type));
      first && (data.firstname = first);
      last && (data.lastname = last);
      em && (data.email = em);
      add && (data.address = add);
      pc && (data.postalcode = pc);
      un && (data.username = un);
      dateob && (data.dob = dateob);
      //fr != null && (data.active = fr);
      axios
          .patch(`/api/v1/users/${this.user.userId}`, data)
          .then((res) => {
            //type && (this.holdUser.accountType = this.value);
            first && (this.holdUser.firstname = first);
            last && (this.holdUser.lastname = last);
            em && (this.holdUser.email = em);
            add && (this.holdUser.address = add);
            pc && (this.holdUser.postalcode = pc);
            un && (this.holdUser.username = un);
            dateob && (this.holdUser.dob = dateob);
            //fr != null && (this.holdAccount.active = fr);
            this.$notify({
              text: "Updated User Settings",
              type: "success",
            });
            this.$emit("updateUser", this.holdUser);
          })
          .catch((err) => {
            this.$notify({
              text: err.response.data,
              type: "error",
            });
          });
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.multiselect-tag {
  background: #126EF8;
}
.is-selected {
  background: #126EF8;
}
</style>
