<template>
  <div>
    <header
      class="w-100 vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="container-xl">
        <div class="m-auto row justify-content-center align-items-center g-5 w-100">
          <div class="col-xl-8 col-md-6 col-sm-12 col-12">
            <div class="float-start">
              <h2 class="fs-1 text-light font-weight-bold">
                High Society Banking at Floppa
              </h2>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-sm-12 col-12">
            <LoginComponent v-if="!this.$store.getters.isLogged"/>
          </div>
        </div>
      </div>
    </header>
    <div class="container-xl">
      <h1 class="text-center m-5">Join the High Society Bank</h1>
      <div class="row mt-5 mb-5 g-0 display-flex">
        <div class="col-12 col-sm-6">
          <img class="img-fluid img-settings" src="/images/home-1.jpg" />
        </div>
        <div class="col-12 col-sm-6 bg-dark text-light">
          <h2 class="text-center pt-3">High Roll Bank</h2>
          <p class="p-4">
            We are an amazing bank that offers the best for the high society.
            People who are rich should put their money here. Because we offer
            the best rates in the world.
          </p>
        </div>
        <div class="col-12 col-sm-6 bg-dark text-light order-last order-sm-0">
          <h2 class="text-center pt-3">High Roll Bank</h2>
          <p class="p-4">
            We are an amazing bank that offers the best for the high society.
            People who are rich should put their money here. Because we offer
            the best rates in the world.
          </p>
        </div>
        <div class="col-12 col-sm-6">
          <img class="img-fluid img-settings" src="/images/home-2.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginComponent from "../components/login-components/LoginComponent.vue";
export default {
  name: "Home",
  components: {
    LoginComponent,
  },
};
</script>

<style scoped>
header {
  background-image: url("/images/banner-img.jpg"),
    linear-gradient(rgba(0, 0, 0, 0.095), rgba(0, 0, 0, 0.095));
  background-size: cover;
  background-blend-mode: overlay;
}
.img-settings {
  height: 400px;
  width: 800px;
  object-fit: cover;
}
.row.display-flex {
  display: flex;
  flex-wrap: wrap;
}
.row.display-flex > [class*="col-"] {
  display: flex;
  flex-direction: column;
}
</style>
