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
                <label>First name</label>
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
                <label>Last name</label>
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
                <label>Email address</label>
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
                <label>Address</label>
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
                <label>Postal code</label>
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
                <label>Username</label>
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
                <label>Date of birth</label>
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
              <div class="form-group">
                <label>Daily Limit</label>
                <input
                    type="number"
                    class="form-control"
                    v-model="daily_limit"
                    placeholder="Set a Daily Limit"
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
              @click="update"
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

import axios from "axios";
import Multiselect from "@vueform/multiselect";
export default {
  name: "UpdateUserModal",
  components: { Multiselect },
  props: {
    user: Object,
  },
  data() {
    return {
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      address: this.user.address,
      postalcode: this.user.postalcode,
      username: this.user.username,
      dob: this.user.dob,
      daily_limit: this.user.daily_limit,
      //selectedRoles: this.user.selectedRoles,
      is_active: this.user.is_active,
      holdUser: this.user.user,
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

    update(){
      var data = {
        "id" : this.id,
        "firstname":this.firstname,
        "lastname":this.lastname,
        "email":this.email,
        "address":this.address,
        "postalcode":this.postalcode,
        "username":this.username,
        //"roles": this.selectedRoles,
        "daily_limit": this.daily_limit,
        "is_active": this.is_active,
        "dob":this.dob
      }

      console.log(data)

      this.$store.dispatch("updateUserAccountAsEmployee", data)
      .then(() => {
        this.$notify({
          text: "Updated account succesfully",
          type: "success",
        });
      })
      .catch((message) => {
        this.$notify({
          text: message,
          type: "error",
        });
      })

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
