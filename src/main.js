import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "@maticbabnik/vue3-socket.io";
import SocketIO from 'socket.io-client'
import "./assets/tailwind.css";

const socketConnection = SocketIO('http://localhost:3000');

const app = createApp(App);
app.use(router);
app.use(
  new VueSocketIO({
    debug: false,
    connection: socketConnection,
  })
);
app.mount("#app");
