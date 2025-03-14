export const loginResponse = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) =>
    {
      const { success, data, error } = await useApiRequest({
        method: "POST",
        endpoint: "auth/login",
        body: { email: email, password: password },
      });
      return success ? { ...data } : { message: error.message };
    };
  interface createUser {
    name: string;
    email: string;
    password: string;
  }
  export const signupResponse = async ({ name, email, password }: createUser) => {
    const { success, data, error } = await useApiRequest({
      method: "POST",
      endpoint: "auth/signup",
      body: { name, email, password },
    });
    return success ? { ...data } : { message: error.message };
  };
  