<template>
  <div class="modal text-dark fade" id="UpdateAccount">
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
                <label for="exampleInputEmail1">First name</label>
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
                <label for="exampleInputEmail1">Last name</label>
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
                <label for="exampleInputEmail1">Email address</label>
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
                <label for="exampleInputEmail1">Address</label>
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
                <label for="exampleInputEmail1">Postal code</label>
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
                <label for="exampleInputEmail1">Username</label>
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
                <label for="exampleInputEmail1">Date of birth</label>
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

import Multiselect from "@vueform/multiselect";

export default {
  name: "UpdateUserModal",
  components: { Multiselect },
  data() {
    return {
      value: "",
      errorMsg: "",
      firstname: "Henk",
      lastname: "Jansen",
      email: "lol@gmail.com",
      address: "kaasweg 11",
      postalcode: "6969DD",
      username: "henkjans55",
      dob: "",
      selectedRoles: [],
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
