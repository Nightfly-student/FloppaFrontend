<template>
  <div class="modal text-dark fade" id="CreateUser">
    <div class="modal-dialog modal-dialog-centered">
      <Form :validation-schema="schema" @submit="onSubmit">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register New User</h5>
            <button
              id="closer"
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
                  <label class="form-label" for="firstname">First name</label>
                  <Field
                    v-model="firstname"
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="form-control"
                  />
                  <ErrorMessage
                    class="form-label text-danger"
                    name="firstname"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label class="form-label" for="lastname">Last name</label>
                  <Field
                    v-model="lastname"
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="form-control"
                  />
                  <ErrorMessage
                    class="form-label text-danger"
                    name="lastname"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <div class="form-group">
                  <label class="form-label" for="email">Email address</label>
                  <Field
                    v-model="email"
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                  />
                  <ErrorMessage class="form-label text-danger" name="email" />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label class="form-label" for="username">Username</label>
                  <Field
                    v-model="username"
                    type="text"
                    name="username"
                    id="username"
                    class="form-control"
                  />
                  <ErrorMessage
                    class="form-label text-danger"
                    name="username"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <div class="form-group">
                  <label class="form-label" for="address">Address</label>
                  <Field
                    v-model="address"
                    type="text"
                    name="address"
                    id="address"
                    class="form-control"
                  />
                  <ErrorMessage class="form-label text-danger" name="address" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label class="form-label" for="postal">Postal code</label>
                  <Field
                    v-model="postalcode"
                    type="text"
                    name="postal"
                    id="postal"
                    class="form-control"
                  />
                  <ErrorMessage class="form-label text-danger" name="postal" />
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <div class="form-group">
                  <label class="form-label" for="dob">Date of birth</label>
                  <Field
                    v-model="dob"
                    type="date"
                    name="dob"
                    id="dob"
                    class="form-control"
                  />
                  <ErrorMessage class="form-label text-danger" name="dob" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label class="form-label" for="dailyLimit">Daily limit</label>
                  <Field
                    v-model="dailyLimit"
                    type="number"
                    name="dailyLimit"
                    id="dailyLimit"
                    class="form-control"
                  />
                  <ErrorMessage
                    class="form-label text-danger"
                    name="dailyLimit"
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
            <button type="submit" class="btn btn-primary">Create User</button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Multiselect from "@vueform/multiselect";
import * as yup from "yup";

export default {
  name: "AddUserModal",
  components: {
    Multiselect,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      email: yup.string().email().required(),
      address: yup.string().required(),
      postal: yup.string().required(),
      username: yup.string().required(),
      dob: yup.date().required().typeError('you must specify a valid date'),
      dailyLimit: yup.number().typeError('you must specify a daily limit')
                        .min(100, 'Min value 100.')
                        .max(5000, 'Max value 5000.')
    });

    return {
      schema,
      error: null,

      value: "",
      errorMsg: "",

      firstname: "sjonny",
      lastname: "heinis",
      email: "sjonnyheinis@gmail.com",
      address: "voortreft 11",
      postalcode: "5166DD",
      username: "sjonny55",
      dob: "1990-01-01",
      selectedRoles: [],
      dbRoles: [],
      createdRoles: [],
      dailyLimit: 1000,
    };
  },
  computed: {
    loadedRoles() {
      var loadedRoles = this.$store.state.roles;

      var roles = [];

      if (loadedRoles != null) {
        this.dbRoles = loadedRoles;
        loadedRoles.map((role) => {
          var roleItem = { label: role.name, value: role };
          roles.push(roleItem);
        });
      }

      this.createdRoles = roles;

      return roles;
    },
  },
  watch: {
    dbRoles: {
      handler(newValue, oldValue) {
        if (this.dbRoles.length >= 1) {
          console.warn("setting ", this.dbRoles[0]);
          this.selectedRoles[0] = this.dbRoles[0];
        }
      },
      deep: true,
    },
  },

  methods: {
    onSubmit(values) {
      console.warn(values)
      var user = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        address: values.address,
        postalcode: values.postal,
        username: values.username,
        dob: values.dob,
        dailyLimit: values.dailyLimit,
        roles: this.selectedRoles,
      };

      this.$store
        .dispatch("registerAsEmployeeUser", user)
        .then((newUser) => {
          document.getElementById("closer").click();
          this.$notify({
            text: "Registered new user successfully",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            text: err,
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
  background: #126ef8;
}
.is-selected {
  background: #126ef8;
}
</style>
