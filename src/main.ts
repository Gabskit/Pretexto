// FlyonUI
import "flyonui/flyonui";
import Waves from "node-waves";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./Style.css";
import "./jquery.mobile-1.3.2.min.css";

const app = createApp(App);
// Waves Initialization
app.use(router);
Waves.init();
Waves.attach(".waves");

app.mount("#app");
