<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-primary p-8 rounded-md shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold text-white text-center mb-2">
        Create an Account
      </h1>
      <p class="text-[#B5BAC1] text-center mb-8">Join our community today</p>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <CoreInput
          v-model="dataUser.name"
          :for-id="'usernamecreateUser'"
          :label="'Username'"
          :forId="'username'"
        />
        <CoreInput
          v-model="dataUser.email"
          :for-id="'emailcreateUser'"
          :label="'Email'"
          :forId="'email'"
          :type-input="'email'"
        />
        <CoreInput
          v-model="dataUser.password"
          :for-id="'passwordcreateUser'"
          :label="'Password'"
          :forId="'password'"
          :type-input="'password'"
        />
        <CoreInput
          v-model="confirmPassword"
          :for-id="'confirmPasswordcreateUser'"
          :label="'Confirm Password'"
          :forId="'confirmPassword'"
          :type-input="'password'"
        />
        <CoreButton :color-button="'#5865F2'" class="w-full" type="submit"
          ><span class="!text-center block py-1">Sign Up</span></CoreButton
        >
      </form>

      <p class="mt-6 text-center text-[#B5BAC1]">
        Already have an account?
        <NuxtLink
          to="/login"
          class="text-[#5865F2] font-medium hover:underline"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const confirmPassword = ref("");
const dataUser = ref({});
const useAuth = useAuthStore();
const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  useAuth.signup({ ...dataUser.value });
};
</script>
