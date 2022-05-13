<template>
  <div>
    <div>
      <Form
        class="card card-white p-3 shadow"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <h2 class="text-center">Reset password</h2>

        <div class="form-outline mb-4">
          <Field
            v-model="password"
            type="password"
            name="password"
            id="password"
            class="form-control form-control-lg"
          />
          <label class="form-label" for="password">Password</label>
          <ErrorMessage class="form-label text-danger float-end" name="password" />
        </div>

        <div class="form-outline mb-4">
          <Field
            v-model="repeatPassword"
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            class="form-control form-control-lg"
          />
          <label class="form-label" for="repeatPassword">Repeat password</label>
          <ErrorMessage class="form-label text-danger float-end" name="repeatPassword" />
        </div>

        <div class="form-outline" v-if="error !== null">
          <p class="text-danger">{{error}}</p>
        </div>

        <div
          class="d-flex justify-content-around align-items-center mb-4"
        ></div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
            Update password
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
  name: "ResetConfirm",
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
      password: "",
      repeatPassword: "",
      email: "",
      link: ""
    };
  },
  mounted(){
    var user = this.$route.query.u;
    var link = this.$route.query.link;

    this.link = link
    this.email = user

    this.$store.dispatch("getPasswordResetRequest", link)
    .then((response) => {
      console.warn("valid link")
    })
    .catch((message) => {
      this.$notify({
        text: "Invalid link",
        type: "error",
      });
      this.$store.dispatch("setHomePageComponent", "")
    })

  },
  methods: {
    login(){
      this.$store.dispatch("setHomePageComponent", "");
    },

    onSubmit(values) {

      var data = {
        password: values.password,
        repeatPassword: values.repeatPassword,
        requestLink: this.link,
        email: this.email
      }
      
      this.$store.dispatch("updatePassword", data)
      .then((data) => {
        this.$notify({
          text: "Successfully updated password",
          type: "success",
        });
        this.$store.dispatch("setHomePageComponent", "");
      })
      .catch((message) => {
        this.$notify({
          text: message,
          type: "error",
        });
      })
      
    }
  },

};
</script>

<style></style>
