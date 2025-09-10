<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();


const showPassword = ref(false)



const onSubmit = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch {}
};
</script>


<template>
    <main class="min-h-dvh grid place-items-center bg-slate-100 p-4 font-sans">
        <section class="w-full max-w-md rounded-md border border-slate-200 bg-white shadow-xs">
            <div class="p-8">
        <div class="flex items-center justify-center"> 
          <img src="@/assets/logo6.png" alt="Logo" class="w-35 h-35" />
        </div>

            
                <p class="mt-1 text-center text-md text-slate-500">Bienvenido de nuevo</p>


                <form class="mt-6 space-y-4 md:space-y-6" @submit="onSubmit">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"> Nombre de Usuario</label>
                        <input type="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:ring-aiuris focus:border-aiuris block w-full p-2.5" placeholder="nombre@gmail.com" required >
                    </div>


                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                        <div class="relative"> 
                        <input :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5 ">
                                      <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M3 3l18 18M10.58 10.58a2 2 0 0 0 2.84 2.84M9.88 5.09A9.96 9.96 0 0 1 12 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 0 1-4.132 5.225M6.1 6.1A9.956 9.956 0 0 0 2.458 12c1.274 4.057 5.065 7 9.542 7 1.032 0 2.027-.156 2.96-.445"
                  />
                </svg>
                </button>
              </div>
                    </div>



                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input type="checkbox" aria-describedby="remember" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500">Recordarme</label>
                            </div>
                        </div>
                        <a href="#" class="text-sm font-medium text-aiuris hover:underline">¿Olvidó su contraseña?</a>
                    </div>
                    <button :disabled="auth.loading" class="w-full text-white bg-aiuris hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center  ">Iniciar Sesion</button>
                </form>

                <p class="mt-6 text-center text-sm  text-gray-500">¿Nuevo en AIURIS? <a href="#" class="font-medium text-aiuris hover:underline">Crear una cuenta</a>
                </p>

            </div>

        </section>

    </main>
</template>



<!-- <p v-if="auth.error" class="text-sm text-red-600">{{ auth.error }}</p>

      <button :disabled="auth.loading" class="w-full rounded bg-black text-white py-2">
        {{ auth.loading ? "Entrando..." : "Entrar" }} -->