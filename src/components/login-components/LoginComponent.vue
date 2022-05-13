<template>
  <div>
    <div>
      <Form
        class="card card-white p-3 shadow"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <h2 class="text-center">Banking Login</h2>
        <!-- Email input -->
        <div class="form-outline mb-4">
          <Field
            type="email"
            name="email"
            id="email"
            class="form-control form-control-lg"
          />
          <label class="form-label" for="email">Username</label>
          <ErrorMessage class="form-label text-danger float-end" name="email" />
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <Field
            type="password"
            id="password"
            class="form-control form-control-lg"
            name="password"
          />
          <label class="form-label" for="password">Password</label>
          <ErrorMessage
            class="form-label text-danger float-end"
            name="password"
          />
        </div>

        <div
          class="d-flex justify-content-around align-items-center mb-4"
        ></div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
            Sign in
          </button>
          <div class="d-flex justify-content-around align-items-center p-4">
            <router-link to="/forgot">Forgot password?</router-link>
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
  name: "LoginComponent",
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
    };
  },
  methods: {
    onSubmit(values) {
      this.$store
        .dispatch("login", { username: values.email, password: values.password })
        .then(() => {
          this.$router.push("/dashboard");
          this.$notify({
            text: "Successfully Logged In",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            text: err.response.data.message,
            type: "error",
          });
        });
    },
  },
};
</script>

<style></style>
