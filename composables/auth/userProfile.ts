interface UserProfile {
    name?: string;
    image?: string;
  }
  export const updateProfileApi = async ({ name, image }: UserProfile = {}) => {
    const authStore = useAuthStore();
    const { token, user } = storeToRefs(authStore);
    if (!user.value?._id) return { error: "User is not defined." };
    const { success, data, error } = await useApiRequest({
      method: "PATCH",
      endpoint: `auth/profile/${user.value?._id}`,
      body: { name, image },
      token: token.value as string,
    });
    return success ? { user: data } : { error: error.message };
  };
  export const getUserProfileApi = async (token: string) => {
    if (!token) return { error: "User is not defined." };
    const { success, data, error } = await useApiRequest({
      method: "GET",
      endpoint: `auth/profile`,
      token,
    });
    return success ? { user: data } : { error: error.message };
  };
  