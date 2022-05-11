<template>
  <div class="container-xl">
    <div class="d-flex mb-2 justify-content-between">
      <div class="entries d-flex justify-content-between gap-2">
        <span>Showing</span>
        <select name="" id="" @change="loadUsers($event)">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <span>Users of {{usersCount}}</span>
      </div>
      <div class="search d-flex gap-2">
        <Label>Search</Label>
        <input type="" id="" name="" />
      </div>
    </div>
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
          <th scope="col">email</th>
          <th scope="col">role</th>
          <th scope="col">Accounts</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>

          <td v-if="user.roles.length > 1">Employee</td>
          <td v-else>User</td>
          
          <td>2</td>
          <td>Action</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between">
      <button 
        :data-bs-target="'#CreateAccount'"
        data-bs-toggle="modal"
        class="btn btn-primary">
        Add user
      </button>
      <AddUserModal />
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import AddUserModal from "../modals/AddUserModal.vue";
export default {
  name: "UserManagement",
  components: { AddUserModal },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    loadUsers(event) {
      var offset = this.$store.state.users.length;
      var limit = event.target.value;
      this.$store.dispatch("loadUsers", { offset: 0, limit: limit });
    },
  },
  mounted() {
    this.$store.dispatch("loadUsers", { offset: 0, limit: 5 });
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    usersCount(){
      return this.$store.state.totalUsersCount;
    }
  },
};
</script>

<style></style>
