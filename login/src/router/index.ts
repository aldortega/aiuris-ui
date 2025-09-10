import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes: RouteRecordRaw[] = [
  { path: "/login", component: () => import("../pages/LoginView.vue") },
  { path: "/", component: () => import("../pages/HomeView.vue"), meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // intenta refresh transparente
    await auth.refresh();
    if (!auth.isAuthenticated) return "/login";
  }
});

export default router;
