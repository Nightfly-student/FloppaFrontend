import { createStore } from "vuex";
import axios from "axios";
import { authHeader, getUserId } from "../helpers/authHeader";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const store = createStore({
  state() {
    return {
      user: user ? user : null,
      token: token ? token : null,
      isAuthenticated: token ? true : null,
      users: null,
      accounts: null,
      totalUsersCount: null,
      totalAccountsCount: null,
      roles: null,
      modalPassword: null,
      updatedUserData: null,
      homeSelectedPage: null
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
    getAccounts(state){
      return state.accounts
    },
    getAccountsCount(state){
      return state.totalAccountsCount
    },
    getRoles(state){
      return state.roles
    },
    getSelectedPage(state){
      return state.homeSelectedPage
    }
  },
  mutations: {
    loginSuccesful(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
    accountLoaded(state, payload){
      state.accounts = payload.accountDTOList;
      state.totalAccountsCount = payload.count;
    },
    rolesLoaded(state, payload){
      state.roles = payload.roles
    },
    transactionLoaded(state, payload){
      state.transactions = payload.transactions;
      state.totalTransactionsCount = payload.totalCount;
    },
    updateUserDetails(state, payload){

    },
    updateTokens(state, payload){
      state.token = payload
    },
    updatePageParam(state, payload){
      state.homeSelectedPage = payload
    }
  },
  actions: {
    setHomePageComponent({commit}, param){
      commit("updatePageParam", param)
    },

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
            reject(error.response.data);
          });
      });
    },

    logout({ commit }) {
      commit("logout");
    },

    loadUsers({commit}, {limit, offset, filter, noAccountsOnly}){
      var url = `/api/v1/users?limit=${limit}&offset=${offset}`;

      if(filter != undefined)url += `&name=${filter}`; this.state.filtered = true;
      if(noAccountsOnly) url += '&noAccount=true'

      axios.get(url)
        .then((response) =>{
          console.warn(response.data)
          commit("userLoaded",response.data)
        })
        .catch((err) => {
          console.warn(err)
        })
    },

    loadAccounts({commit}, {limit, offset, filter}){
      var url = `/api/v1/accounts?limit=${limit}&offset=${offset}`;

      if(filter != undefined)url += `&filter=${filter}`; this.state.filtered = true;

      axios.get(url)
          .then((response) =>{
            console.warn(response.data)
            commit("accountLoaded",response.data)
          })
          .catch((err) => {
            console.warn(err)
          })
    },

    loadTransactions({commit}, {limit, offset}){
      axios.get(`/api/v1/transactions?limit=${limit}&offset=${offset}&userId=${getUserId()}`)
        .then((response) =>{
          console.warn(response.data)
          commit("transactionLoaded",response.data)
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
          reject(err.response.data)
        })
      })
    },

    registerUserAccount({commit}, data){
      return new Promise((resolve, reject) => {
        axios.post('/api/v1/employee/createAccount', data, {headers: authHeader()})
        .then((response) => {
          console.warn(response.data)
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response.data)
        })
      })
    },

    deactivateUser({commit}){
      var userId = this.state.user.id;
      return new Promise((resolve, reject) => {
        axios.put(`/api/v1/users/${userId}/deactivate`, {password: this.state.modalPassword}, {headers: authHeader()})
        .then((data) => {
          resolve("Account deactived successfully")
          commit("logout")
        })
        .catch((err) => {
          console.warn(err)
          reject(err)
        })
      })
    },

    updateUser({commit}){

      return new Promise((resolve, reject) =>{
        var user = this.state.updatedUserData
        user.password = this.state.modalPassword;
        console.warn(user)
        axios.put(`/api/v1/users/`+user.id, user)
        .then((response) =>{
          console.warn(response.data)

          //reload tokens and user data
          this.dispatch("refreshTokens");

          resolve("Updated account successfully")
        })
        .catch((err) => {
          reject(err, "errrrrrr")
        })
      })

    },

    refreshTokens({commit}){
      var token = this.state.token.refresh_token;

      if(!token){ console.error("Cant refresh token, it is missing"); return;}

      axios.post('/api/v1/auth/refresh/', {refreshToken: token})
      .then((response) => {
        commit("updateTokens", response.data)
        
        localStorage.setItem("token", JSON.stringify(response.data));
        this.dispatch("getAccountData", {access_token: response.data.access_token});
        console.warn(response.data)
      })
      .catch((err) => {
        console.warn(err)
      })
    },

    getAccountData({commit}, access_token){

      axios.get('/api/v1/auth/user', {headers: authHeader()})
      .then((response) => {
        console.warn(response.data)
        commit("loginSuccesful", response.data)
      })
      .catch((err) =>{
        console.warn(err)
        console.warn("Failed to reload user data")
      })

    },


    loadRoles({commit}, {limit, offset}){
      console.warn("loading roles")
      axios.get(`/api/v1/roles?limit=${limit}&offset=${offset}`)
      .then((response) =>{
        console.warn("Loaded roles" + response.data.roles)
        commit("rolesLoaded", response.data)
      })
      .catch((err) =>{
        console.warn(err)
      })
    },

    resetPassword({commit}, email){
      return new Promise((resolve, reject) => {
        axios.post('/api/v1/resetRequest/', {email: email})
        .then((response) => {
          resolve("Successfully send password reset link")
        })
        .catch((err) => {
          reject(err.response.data.message)
        })
      })
    },

    getPasswordResetRequest({commit}, link){
      return new Promise((resolve, reject) =>{
        axios.get(`/api/v1/resetRequest/${link}`)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.message)
        })
      })
    },

    updatePassword({commit}, data){
      return new Promise((resolve, reject) => {
        axios.put('/api/v1/users/updatePass', data)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
      })
    },

    updateUserAccountAsEmployee({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/v1/employee/editUserAccount/${data.id}`, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err.response.data.message)
        })
      })
    },

    updateAccount({commit}, data) {
      return new Promise((resolve, reject) => {
        data.accountType = parseInt(data.accountType);
        axios.patch(`/api/v1/accounts/${data.iban}`, data)
            .then((response) => {
              resolve(response.data)
            })
            .catch((err) => {
              reject(err.response.data.message)
            })
      })
    }

  },
});

export default store;
