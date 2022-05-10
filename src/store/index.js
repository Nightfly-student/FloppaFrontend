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
  },
});

export default store;
