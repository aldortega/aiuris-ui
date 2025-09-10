import { defineStore } from "pinia";
import api from "@/api";

type User = { id: number; email: string } | null;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("access_token") || "",
    refreshToken: localStorage.getItem("refresh_token") || "",
    user: null as User,
    loading: false,
    error: "" as string | null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.accessToken,
  },
  actions: {
    async register(email: string, password: string) {
      this.error = null;
      await api.post("/auth/register", { email, password });
    },
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.post("/auth/login", { email, password });
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        localStorage.setItem("access_token", this.accessToken);
        localStorage.setItem("refresh_token", this.refreshToken);
        await this.fetchMe();
      } catch (e: any) {
        this.error = e?.response?.data?.detail ?? "Error de login";
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async refresh() {
      if (!this.refreshToken) return;
      try {
        const { data } = await api.post("/auth/refresh", this.refreshToken, {
          headers: { "Content-Type": "application/json" },
        });
        this.accessToken = data.access_token;
        localStorage.setItem("access_token", this.accessToken);
      } catch {
        this.logout();
      }
    },
    async fetchMe() {
      const { data } = await api.get("/me");
      this.user = data;
    },
    logout() {
      this.accessToken = "";
      this.refreshToken = "";
      this.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});
