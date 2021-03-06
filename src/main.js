import { createApp } from "vue";
import BootstrapVue3 from 'bootstrap-vue-3'
import App from "./App.vue";
import router from "./router";
import "./assets/theme.scss";
import store from "./store";
import Notifications from "@kyvg/vue3-notification";
import setupInterceptors from './helpers/Interceptor';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

setupInterceptors();

const app = createApp(App);
app.use(router);
app.use(Notifications);
app.use(store);
app.use(BootstrapVue3)

app.mount("#app");
