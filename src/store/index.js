import { createStore } from "vuex";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const store = createStore({
  state() {
    return {
      user: user ? user : null,
      token: token ? token : null,
      isAuthenticated: token ? true : null,
      users: null,
      totalUsersCount: null,
      roles: null
    };
  },
  getters: {
    isLogged(state) {
      return state.isAuthenticated;
    },
    getId(state) {
      return state.user._id;
    },
    getUser(state) {
      return state.user;
    },
    getUsers(state){
      return state.users;
    },
    getUsersCount(state){
      return state.totalUsersCount
    },
    getRoles(state){
      return state.roles
    }
  },
  mutations: {
    loginSuccesful(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    tokenAdded(state, payload) {
      state.token = payload;
    },
    userLoaded(state, payload){
      state.users = payload.users;
      state.totalUsersCount = payload.totalCount;
    },
    rolesLoaded(state, payload){
      state.roles = payload.roles
    },
    updateUserDetails(state, payload){

    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/v1/auth/login", {
            username: username,
            password: password,
          })
          .then((res) => {
            localStorage.setItem("token", JSON.stringify(res.data));
            commit("tokenAdded", res.data);
            axios
              .get(`/api/v1/auth/user`, {
                headers: authHeader(),
              })
              .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                commit("loginSuccesful", response.data);
                resolve();
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      commit("logout");
    },

    loadUsers({commit}, {limit, offset, filter}){

      var url = `/api/v1/users?limit=${limit}&offset=${offset}`;

      if(filter != undefined)url += `&filter=${filter}`; this.state.filtered = true;

      axios.get(url)
        .then((response) =>{
          console.warn(response.data)
          commit("userLoaded",response.data)
        })
        .catch((err) => {
          console.warn(err)
        })
    },

    registerUser({commit}, user){

      return new Promise((resolve, reject) => {
        axios.post('/api/v1/users/', user, {headers: authHeader()})
        .then((response) => {
          console.warn(response.data)
          resolve(response.data)
        })
        .catch((err) => {
          console.warn(err)
          reject(err)
        })
      })
      
    },

    updateUser({commit}, user){

      return new Promise((resolve, reject) =>{
        axios.put(`/api/v1/users/`+user.id, user)
        .then((response) =>{
          console.warn(response.data)
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
      })

    },


    loadRoles({commit}, {limit, offset}){
      axios.get(`/api/v1/roles?limit=${limit}&offset=${offset}`)
      .then((response) =>{
        console.warn("Loaded roles" + response.data.roles)
        commit("rolesLoaded", response.data)
      })
      .catch((err) =>{
        console.warn(err)
      })
    }
    // autoLogin({ commit }) {
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   if (user) {
    //     axios
    //       .get("/api/users/autologin", {
    //         headers: authHeader(),
    //       })
    //       .then((res) => {
    //         commit("loginSuccesful", user);
    //       })
    //       .catch((err) => {
    //         localStorage.removeItem("user");
    //         commit("logout");
    //       });
    //   }
    // },
  },
});

export default store;
