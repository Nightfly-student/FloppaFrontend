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
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="lastname">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="address">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Postal code</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="postalcode">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="username">
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Roles</label>
            <input disabled type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="roles">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label for="exampleInputEmail1">Date of birth</label>
            <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="dob">
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col d-flex justify-content-around">
          <button class="btn btn-primary" @click="update">Update account data</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProfileData",

  methods:{
    update(){

      var test = {
        id: 3,
        firstname : "Pietr",
        lastname : "Post",
        email : "pieterpost@gmail.com",
        username : "pietertje",
        address : "Langeweg 534",
        postalcode : "5124DD",
        dob : "2000-10-10"
      }

      this.$store.dispatch("updateUser", test)
      .then((data) => {
        console.warn(data)
      })
      .catch((err) => {
        console.warn(err)
      })

    }
  },

  data(){
    return{
      id: null,
      firstname: null,
      lastname: null,
      address: null,
      postalcode: null,
      email: null,
      username: null,
      dob: null,
      roles: []
    }
  },

  watch:{
    loggedInUser:{
      handler(data){
        
      }
    }
  },

  computed:{
    loggedInUser(){
      var data = this.$store.state.user
      this.firstname = data.firstname
      this.lastname = data.lastname
      this.address = data.address
      this.postalcode = data.postalcode
      this.email = data.email
      this.username = data.username
      this.dob = data.dob

      var userRoles = data.roles

      userRoles.forEach((role, i) => {
        this.roles += role.name
        if(i < userRoles.length - 1) this.roles += ", "
      });

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