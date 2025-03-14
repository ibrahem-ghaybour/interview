export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;
  const token = import.meta.client ? localStorage.getItem("token") : null;
  if (!token && to.path !== "/login") {
    console.log("1.");

    return navigateTo("/login");
  } else if (
    (token && to.path === "/login") ||
    (token && to.path === "/signup")
  ) {
    console.log("2");

    return navigateTo("/");
  } else if (token) {
    const auth = useAuthStore();
    auth.token = token;
    auth.getUserProfile();
    console.log("3");
    // return navigateTo("/");
  }
});
