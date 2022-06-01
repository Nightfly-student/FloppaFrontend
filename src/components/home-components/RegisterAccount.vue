<template>
  <div>
    <div>
      <Form
        class="card card-white p-3 shadow"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <h2 class="text-center">Create account</h2>

        <div class="row mt-2">
            <div class="col">
                <label class="form-label" for="firstname">firstname</label>
                <Field
                    v-model="firstname"
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="form-control"
                />
                <ErrorMessage class="form-label text-danger float-end" name="firstname" />
            </div>
            <div class="col">
                <label class="form-label" for="lastname">lastname</label>
                <Field
                    v-model="lastname"
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="form-control"
                />
                <ErrorMessage class="form-label text-danger float-end" name="lastname" />
            </div>
        </div>

        <div class="row mt-2">
            <div class="col">
                <label class="form-label" for="email">Email address</label>
                <Field
                    v-model="email"
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                />
                <ErrorMessage class="form-label text-danger float-end" name="email" />
            </div>
        </div>

        <div class="row mt-2">
            <div class="col">
                <label class="form-label" for="address">Address</label>
                <Field
                    v-model="address"
                    type="text"
                    name="address"
                    id="address"
                    class="form-control "
                />
                <ErrorMessage class="form-label text-danger float-end" name="address" />
            </div>
            <div class="col">
                <label class="form-label" for="postal">Postal code</label>
                <Field
                    v-model="postalcode"
                    type="text"
                    name="postal"
                    id="postal"
                    class="form-control "
                />
                <ErrorMessage class="form-label text-danger float-end" name="postal" />
            </div>
        </div>

        <div class="row mt-2">
            <div class="col">
                <label class="form-label" for="username">Username</label>
                <Field
                    v-model="username"
                    type="text"
                    name="username"
                    id="username"
                    class="form-control "
                />
                <ErrorMessage class="form-label text-danger float-end" name="username" />
            </div>
            <div class="col">
                <label class="form-label" for="dob">Date of birth</label>
                <Field
                    v-model="dob"
                    type="date"
                    name="dob"
                    id="dob"
                    class="form-control "
                />
                <ErrorMessage class="form-label text-danger float-end" name="dob" />
            </div>
        </div>

        <div class="row mt-2">
            <div class="col">
                <label class="form-label" for="password">Password</label>
                <Field
                    v-model="password"
                    type="password"
                    name="password"
                    id="password"
                    class="form-control "
                />
                <ErrorMessage class="form-label text-danger float-end" name="password" />
            </div>
            <div class="col">
                <label class="form-label" for="repeatPassword">Repeat password</label>
                <Field
                    v-model="repeatPassword"
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    class="form-control"
                />
                <ErrorMessage class="form-label text-danger float-end" name="repeatPassword" />
            </div>
        </div>

        

        <div class="form-outline" v-if="error !== null">
          <p class="text-danger">{{error}}</p>
        </div>

        <div
          class="d-flex justify-content-around align-items-center mb-4"
        ></div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
            Register
          </button>
          <div class="d-flex justify-content-around align-items-center p-4">
            <router-link to="/" @click="login">Remember password?</router-link>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "RegisterAccount",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      password: yup.string().required("No password provided").matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/g,
      "Password must contain at least 8 characters, one uppercase, one number and two special case characters"
    ),
      repeatPassword: yup.string().required("No password provided.")
      .test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.password === value
      }),
    });
    return {
      schema,
      error: null,
      
      firstname: "Sjef",
      lastname: "Hannes",
      email: "sjefhannes@gmail.com",
      address: "Voorburg 15",
      postalcode: "1455DD",
      username: "sjeffie",
      dob: "2000-10-10",
      password: "@Welkom123!",
      repeatPassword: "@Welkom123!"
    };
  },
  methods: {
    login(){
      this.$store.dispatch("setHomePageComponent", "");
    },

    forgot(){
      this.$store.dispatch("setHomePageComponent", "reset")
    },

    onSubmit(values) {

      var data = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        username: values.username,
        password: values.password,
        repeatPassword: values.repeatPassword,
        address: values.address,
        postalcode: values.postal,
        dob: values.dob,
        roles: []
      }

      this.$store.dispatch("registerUser", data)
      .then((newUser) => {
        this.$notify({
          text: "Successfully registered new account, please login",
          type: "success",
        });
        this.$store.dispatch("setHomePageComponent", "")
      })
      .catch((err) => {
        this.$notify({
          text: err,
          type: "error",
        });
      })
    
      
    }
  },

};
</script>

<style></style>
