import { defineStore } from "pinia";
import {
  loginResponse,
  signupResponse,
} from "~/composables/auth/authorization";
import {
  getUserProfileApi,
  updateProfileApi,
} from "~/composables/auth/userProfile";
interface AuthState {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
}
interface createUser {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | AuthState,
    token: null as null | string,
    message: null as null | string,
  }),
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      const { user, message, token } = await loginResponse({ email, password });
      this.user = user;
      this.message = message;
      this.token = token;
      localStorage.setItem("token", token);
    },

    async signup({ name, email, password }: createUser) {
      const { user, message, token } = await signupResponse({
        name,
        email,
        password,
      });
      this.user = user;
      this.message = message;
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout() {
      this.user = null;
      this.token = null;
    },
    async updateProfile({
      name,
      image,
    }: { name?: string; image?: string } = {}) {
      const { user, error } = await updateProfileApi({
        name,
        image,
      });
      !error ? (this.user = { ...user, ...this.user }) : (this.message = error);
    },
    async getUserProfile() {
      const { user, error } = await getUserProfileApi(this.token as string);
      console.log(error);
      !error ? (this.user = { ...user, ...this.user }) : (this.message = error);
    },
  },
  getters: {
    // isAuthenticated: (state) => !!state.token,
  },
});
