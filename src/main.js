import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/theme.scss";
import store from "./store";
import Notifications from "@kyvg/vue3-notification";
import setupInterceptors from './helpers/Interceptor';

setupInterceptors();

const app = createApp(App);
app.use(router);
app.use(Notifications);
app.use(store);
app.mount("#app");
