<template>
  <div class="modal text-dark fade" :id="'EC' + user.id">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create New Bank Account for {{user.firstname}} {{user.lastname}}</h5>
          <button
            id="closer"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <select
            v-model="value"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected value="">Select Account Type</option>
            <option value="regular">Regular</option>
            <option value="savings">Savings</option>
          </select>
          <p class="text-danger pt-2 m-0" v-if="errorMsg != ''">{{errorMsg}}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" @click="addAccount" class="btn btn-primary">
            Create Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AddAccountAsEmployee",
  props:{
    user: Object
  },
  data() {
    return {
      value: "",
      errorMsg: '',
    };
  },
  methods:{

    addAccount(){

      if(this.value == ""){
        this.$notify({
          text: "Select a valid account type",
          type: "error",
        });
        return;
      }


      var data = {
        userId: this.user.id,
        type: this.value
      }

      this.$store.dispatch('registerUserAccount', data)
      .then((data) => {
        document.getElementById("closer").click();
        this.$notify({
          text: "Successfully Added a New Account",
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
  }
};
</script>

<style></style>
