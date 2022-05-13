<template>
  <div>
    <div>
      <Form
        class="card card-white p-3 shadow"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <h2 class="text-center">Reset password</h2>
        <!-- Email input -->
        <div class="form-outline mb-4">
          <Field
            v-model="email"
            type="text"
            name="identifier"
            id="identifier"
            class="form-control form-control-lg"
          />
          <label class="form-label" for="identifier">Email address</label>
          <ErrorMessage class="form-label text-danger float-end" name="identifier" />
        </div>

        <div
          class="d-flex justify-content-around align-items-center mb-4"
        ></div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-lg btn-block w-100" @click="resetPass">
            Reset password
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
  name: "ForgotPassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required(),
      password: yup.string().required("No password provided."),
    });
    return {
      schema,
      email: ""
    };
  },
  methods: {
    login(){
      this.$store.dispatch("setHomePageComponent", "");
    },
    resetPass(){
      this.$store.dispatch("resetPassword", this.email)
      .then((message) => {
        this.$notify({
          text: message,
          type: "success",
        });
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
