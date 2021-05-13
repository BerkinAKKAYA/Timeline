import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { auth } from "./firebase";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).mount("#app");
  }
});
