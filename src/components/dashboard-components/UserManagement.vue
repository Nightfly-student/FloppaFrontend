<template>
  <div class="container-xl">
    <div class="d-flex mb-2 justify-content-between">
      <div class="entries d-flex justify-content-between gap-2">
        <span>Showing</span>
        <select name="" id="" v-model="limit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <span>Users of {{usersCount}}</span>
      </div>
      <div class="search d-flex gap-2">
        <Label>Search by</Label>
        <input type="" id="" name="" v-model="filter"/>
      </div>
    </div>
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
          <th scope="col">email</th>
          <th scope="col">role</th>
          <th scope="col">Daily Limit</th>
          <th scope="col">Accounts</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td v-if="user.roles.length > 1">Employee</td>
          <td v-else-if="user.roles.length == 1">User</td>
          <td v-else>No Roles</td>
          <td>{{ user.daily_limit }}</td>
          <td>{{ user.accountsCount }}</td>
          <td v-if="user.is_active"><button type="button" data-bs-dismiss="modal" @click="changeActive(user)" class="btn btn-primary">Active</button></td>
          <td v-else><button type="button" data-bs-dismiss="modal" @click="changeActive(user)" class="btn btn-primary deactive">Not Active</button></td>
          <td><button
              :data-bs-target="'#SS' + user.id"
              data-bs-toggle="modal"
              class="btn btn-primary">
              Edit
              </button>
              <UpdateUserModal :user="user"/>
          </td>
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
        <ul class="pagination" >
          <li v-if="(offset - limit) < 0" class="page-item disabled"><button class="page-link"  @click="changeOffset((-limit), usersCount, false); loadUsers();">Previous</button></li>
          <li v-else class="page-item"><button class="page-link" href="#" @click="changeOffset((-limit), usersCount, false); loadUsers();">Previous</button></li>
          <li v-if="currentPage > 1" class="page-item"><a class="page-link">1</a></li>
          <li v-if="currentPage > 1" class="page-item disabled"><a class="page-link">...</a></li>
          <li class="page-item active">
            <a class="page-link" >{{ currentPage }}</a>
          </li>
          <li v-if="(offset + limit) < usersCount" class="page-item disabled"><a class="page-link">...</a></li>
          <li v-if="(offset + limit) < usersCount" class="page-item"><a class="page-link">{{ usersCount / limit }}</a></li>
          <li v-if="(offset + limit) >= usersCount" class="page-item disabled"><button class="page-link"  @click="changeOffset(limit, usersCount, true); loadUsers();" >Next</button></li>
          <li v-else class="page-item"><button class="page-link" href="#" @click="changeOffset(limit, usersCount, true); loadUsers();" >Next</button></li>
        </ul>
      </nav>

      <nav aria-label="...">
        <ul class="pagination" >
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active">
            <a class="page-link" href="#" >2</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" tabindex="+1">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import AddUserModal from "../modals/AddUserModal.vue";
import UpdateUserModal from "../modals/UpdateUserModal.vue";
export default {
  name: "UserManagement",
  components: { 
    AddUserModal,
    UpdateUserModal
    
    },
  data() {
    return {
      currentPage: 1,
      filter: "",
      limit: 5,
      offset: 0,
    };
  },
  methods: {
    loadUsers() {
      var offset = this.offset;//this.$store.state.users.length;
      var limit = this.limit;
      var filter = this.filter;
      console.warn(`Filtering with limit ${limit}, offset ${offset}, filter ${filter}`)
      this.$store.dispatch("loadUsers", { offset: offset, limit: limit, filter: filter });
    },

    changeActive(user) {
      var fr = user.is_active ? false : true;
      fr != null && (user.is_active = fr);
      this.$store.dispatch("updateUserAccountAsEmployee", user)
          .then(() => {
            fr != null && (user.is_active = fr);
            this.$notify({
              text: "Updated User Status to Active / Not Active: " + user.is_active,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify({
              text: err.response.data,
              type: "error",
            });
          });
    },

    changeOffset(limit, count, goForward){
        switch (goForward) {
          case true:
            if(this.offset < count && (this.offset + limit) >= 0) {
              this.offset = this.offset + limit;
              this.currentPage++;
            }
            break;
          case false:
            if(this.offset >= count && (this.offset - limit) >= 0) {
              this.offset = this.offset + limit;
              this.currentPage--;
            }else if((this.offset + limit) >= 0){
              this.offset = this.offset + limit;
              this.currentPage--;
            }
            break;
        }
    },
  },
  watch:{
    filter(){ 
      this.loadUsers();
    },
    limit(){
      this.loadUsers();
    }
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
