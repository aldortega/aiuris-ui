import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const themeStore = useThemeStore(pinia);
themeStore.initialize();

const authStore = useAuthStore(pinia);
authStore.restoreSession();

app.mount("#app");
