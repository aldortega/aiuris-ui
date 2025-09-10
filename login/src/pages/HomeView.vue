<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.replace("/login"); // replace para que no pueda volver con “atrás”
};



</script>



<template>
  <section class="p-6 space-y-4">
    <h1 class="text-2xl font-bold">Home</h1>
    <p>Hola, <strong>{{ auth.user?.email }}</strong></p>
    <button class="rounded border px-3 py-1" @click="handleLogout">Cerrar sesión</button>
  </section>
</template>
