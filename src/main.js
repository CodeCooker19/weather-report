import { createApp } from "vue/dist/vue.esm-bundler";
import { createHead } from "@unhead/vue";
import "./index.css";
import store from "./store";
import router from "./router";
import VueGtagPlugin from "vue-gtag";

import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(faGithub);

const gtagOpts = {
  config: {
    id: "G-XXXXXXXXXX",
    params: {
      anonymize_ip: true,
    },
  },
};
const head = createHead()

const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);
app.use(head)
app.use(VueGtagPlugin, gtagOpts);
app.use(router);
app.use(store);


app.mount("#app");
