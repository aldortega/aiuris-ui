<template>
  <!-- <CHANGE> Updated container to use full screen height -->
  <div class="min-h-screen bg-gray-300 flex items-center justify-center">
    <div
      class="border border-white w-full max-w-6xl h-screen max-h-[600px] bg-gray-200 rounded-2xl shadow-2xl overflow-hidden flex"
    >
      <!-- Left Section - AI Branding -->
      <div
        class="flex-1 bg-gradient-to-tr from-blue-900 via-sky-800 to-zinc-800 text-white p-5 flex flex-col justify-between relative mb-3 mt-3 ml-3 rounded-xl"
      >
        <!-- Logo -->

        <!-- Main Content -->
        <div class="flex-1 flex flex-col justify-center">
          <h1
            class="text-2xl md:text-5xl font-bold leading-tight mb-6 text-center bg-gradient-to-bl from-blue-600 via-neutral-200 to-gray-400 bg-clip-text text-transparent"
          >
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p
            class="bg-gradient-to-bl from-blue-600 via-neutral-200 to-gray-400 bg-clip-text text-transparent text-lg mb-8 text-center"
          >
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>

        <!-- Search Bar -->
      </div>

      <!-- Right Section - Login Form -->
      <div class="flex-1 p-5 flex flex-col m-3 bg-white rounded-xl border border-gray-300">
        <!-- Language Selector -->

        <!-- Login Form -->
        <div class="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <!-- User Icon -->
          <div class="flex justify-center mb-8">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                class="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <!-- Form Header -->
          <div class="text-center mb-8">
            <h2
              class="text-2xl font-bold bg-gradient-to-tr from-blue-900 via-sky-800 to-zinc-800 bg-clip-text text-transparent mb-2"
            >
              Accede a tu cuenta
            </h2>
            <p class="text-gray-600">Ingresa tus credenciales</p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  placeholder="nombre@gmail.com"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Contrasena
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Recordame
                </label>
              </div>
              <a href="#" class="text-sm text-gray-900 hover:underline">
                Olvidaste tu contrasena?
              </a>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              class="w-full bg-gradient-to-tr from-blue-900 via-sky-800 to-zinc-800 to-gray-400 text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all font-medium"
            >
              Ingresar
            </button>
          </form>

          <!-- Social Login -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Form data
const email = ref('asdasda@gmail.com')
const password = ref('asdasdasd')
const rememberMe = ref(false)
const showPassword = ref(false)

// Form handlers
const handleLogin = () => {
  console.log('Login attempt:', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  })
}
</script>
