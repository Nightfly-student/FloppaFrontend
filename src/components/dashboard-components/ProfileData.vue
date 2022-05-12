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
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Postal code</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Roles</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Date of birth</label>
            <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileData",

  data(){
    return{
      id: null,
      firstname: "asd"
    }
  },

  watch:{
    loggedInUser:{
      handler(data){
        console.warn('asdads')
        this.firstname = data.firstname
      }
    }
  },

  computed:{
    loggedInUser(){
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
  .data{
    max-width: 800px;
    margin: auto;
  }
</style>