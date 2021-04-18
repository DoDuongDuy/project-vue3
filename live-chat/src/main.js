import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import store from './store'

import { projectAuth } from "./firebase/config.js";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  }
});
