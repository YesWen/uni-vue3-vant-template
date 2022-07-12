import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";
import common from "@/common/index";

export function createApp() {
    const app = createSSRApp(App);
    app.use(Vant).use(store).use(common);
    return {
        app,
    };
}
