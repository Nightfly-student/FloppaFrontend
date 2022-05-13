<template>
  <div class="modal text-dark fade" id="askPassModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Password confirmation</h5>
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
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  v-model="pass"
                />
              </div>
            </div>
          </div>
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
            @click="confirm"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AskPassModal",
  props: {
    storeEvent: String
  },
  data() {
    return {
      pass: "",
    };
  },
  methods: {
    cancel() {},
    confirm() {
      console.warn(this.storeEvent)
      this.$store.state.modalPassword = this.pass;

      this.$store
        .dispatch(this.storeEvent)
        .then((message) => {
          this.$notify({
            text: message,
            type: "success",
          });
        })
        .catch((message) => {
          this.$notify({
            text: message,
            type: "error",
          });
        })
        .finally(() => {
          this.$store.state.modalPassword = null;
          this.pass = "";
        })

      //this.$store.state.modalPassword = null
    },
  },
};
</script>


<style>
</style>
