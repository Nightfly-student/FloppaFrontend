<template>
  <div class="container-xl">
    <div class="d-flex mb-2 justify-content-between">
      <div class="entries d-flex justify-content-between gap-2">
        <span>Showing</span>
        <select
          name=""
          id=""
          v-model="limit"
          @change="
            offset = 0;
            currentPage = 1;
            filter = '';
          "
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <span>Users of {{ usersCount }}</span>
      </div>

      <div class="search d-flex gap-5">
        <div class="div d-flex">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              v-model="noAccountsOnly"
            />
            <label class="form-check-label" for="flexCheckDefault">
              No account filter
            </label>
          </div>
        </div>

        <div class="search d-flex gap-2">
          <Label>Search by</Label>
          <input
            type=""
            id=""
            name=""
            v-model="filter"
            @change="
              offset = 0;
              currentPage = 1;
              loadUsers();
            "
          />
        </div>
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
          <td>{{ user.accounts.length }}</td>
          <td>
            <span v-if="user.is_active">Active</span>
            <span v-else>Inactive</span>
          </td>

          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Actions
              </button>
              <div class="dropdown-menu">

              <button v-if="user.is_active"
                type="button"
                data-bs-dismiss="modal"
                @click="changeActive(user)"
                class="dropdown-item">
                Set Inactive
              </button>
              <button v-else
                type="button"
                data-bs-dismiss="modal"
                @click="changeActive(user)"
                class="dropdown-item"
              >
              Set Active
              </button>

              <button
                v-if="user.is_active"
                :data-bs-target="'#EC' + user.id"
                data-bs-toggle="modal"
                class="dropdown-item">
                Create account
              </button>

              <button
                :data-bs-target="'#SS' + user.id"
                data-bs-toggle="modal"
                class="dropdown-item">
                Edit User
              </button>

              </div>
            </div>

          <!-- MODALS -->
          <UpdateUserModal :user="user"/>
          <AddAccountAsEmployee :user="user" />

          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between">
      <button
        :data-bs-target="'#CreateUser'"
        data-bs-toggle="modal"
        class="btn btn-primary"
      >
        Add user
      </button>
      <AddUserModal />

      <nav aria-label="...">
        <ul class="pagination">
          <li v-if="offset - limit < 0" class="page-item disabled">
            <button class="page-link">Previous</button>
          </li>
          <li v-else class="page-item">
            <button
              class="page-link"
              @click="
                changeOffset(-limit, usersCount, false, currentPage, false);
                loadUsers();
              "
            >
              Previous
            </button>
          </li>
          <li v-if="currentPage > 1" class="page-item">
            <button
              class="page-link"
              @click="
                changeOffset(limit, usersCount, false, 1, true);
                loadUsers();
              "
            >
              1
            </button>
          </li>
          <li v-if="currentPage > 1" class="page-item disabled">
            <a class="page-link">...</a>
          </li>
          <li class="page-item active">
            <a class="page-link">{{ currentPage }}</a>
          </li>
          <li v-if="offset + limit < usersCount" class="page-item disabled">
            <a class="page-link">...</a>
          </li>
          <li v-if="offset + limit < usersCount" class="page-item">
            <button
              class="page-link"
              @click="
                changeOffset(limit, usersCount, true, Math.ceil(usersCount / limit), true);
                loadUsers();
              "
            >
              {{ Math.ceil(usersCount / limit) }}
            </button>
          </li>
          <li v-if="offset + limit >= usersCount" class="page-item disabled">
            <button class="page-link">Next</button>
          </li>
          <li v-else class="page-item">
            <button
              class="page-link"
              @click="
                changeOffset(limit, usersCount, true, currentPage, false);
                loadUsers();
              "
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import AddUserModal from "../modals/AddUserModal.vue";
import UpdateUserModal from "../modals/UpdateUserModal.vue";
import AddAccountModal from "../modals/AddAccountModal.vue";
import AddAccountAsEmployee from "../modals/AddAccountAsEmployee.vue";
export default {
  name: "UserManagement",
  components: {
    AddUserModal,
    UpdateUserModal,
    AddAccountModal,
    AddAccountAsEmployee,
},
  data() {
    return {
      currentPage: 1,
      filter: "",
      noAccountsOnly: false,
      limit: 5,
      offset: 0,
    };
  },
  methods: {
    loadUsers() {
      var offset = this.offset; //this.$store.state.users.length;
      var limit = this.limit;
      var filter = this.filter;
      var NoAccountsOnly = this.noAccountsOnly;
      console.warn(
        `Filtering with limit ${limit}, offset ${offset}, filter ${filter}`
      );
      this.$store.dispatch("loadUsers", {
        offset: offset,
        limit: limit,
        filter: filter,
        noAccountsOnly: NoAccountsOnly,
      });
    },

    changeActive(user) {
      var fr = user.is_active ? false : true;
      fr != null && (user.is_active = fr);
      this.$store
        .dispatch("updateUserAccountAsEmployee", user)
        .then(() => {
          fr != null && (user.is_active = fr);
          this.$notify({
            text:
              "Updated User Status",
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

    changeOffset(limit, count, goForward, pageNumber, shortCut) {
      limit = parseInt(limit);
      this.limit = parseInt(this.limit);
      if (shortCut != true) {
        switch (goForward) {
          case true:
            if (this.offset < count && this.offset + limit >= 0) {
              this.offset = this.offset + limit;
              pageNumber++;
            }
            break;
          case false:
            if (this.offset >= count && this.offset - limit >= 0) {
              this.offset = this.offset + limit;
              pageNumber--;
            } else {
              this.offset = this.offset + limit;
              pageNumber--;
            }
            break;
        }
        this.currentPage = pageNumber;
      }
      if (shortCut != false) {
        switch (goForward) {
          case true:
            this.offset = count - limit;
            this.currentPage = pageNumber;
            break;
          case false:
            this.offset = 0;
            this.currentPage = pageNumber;
            break;
        }
      }
    },
  },
  watch: {
    noAccountsOnly() {
      this.loadUsers();
    },
    filter() {
      this.loadUsers();
      this.offset = 0;
      this.currentPage = 1;
    },
    limit() {
      this.loadUsers();
    },
  },
  mounted() {
    this.$store.dispatch("loadUsers", { offset: 0, limit: 5 });
    this.$store.dispatch("loadRoles", { offset: 0, limit: 5 });
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    usersCount() {
      return this.$store.state.totalUsersCount;
    },
  },
};
</script>

<style></style>
