import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routers";
import store from "./store";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";

/* add icons to the library */
library.add(faUserSecret);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(store);

app.mount("#app");
