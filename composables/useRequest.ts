interface propFetch {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    token?: string;
}const getHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    return headers;
  };
  export const useApiRequest = async (obj: propFetch) => {
    try {
      const URL_API_AUTH: string = useApiUrl();
      const headers = {
        ...getHeaders(),
        ...(obj.token && { Authorization: `Bearer ${obj.token}` }),
      };
  
      const response = await $fetch(`${URL_API_AUTH}/${obj.endpoint}`, {
        method: obj.method,
        headers,
        body: obj.body,
      });
      return { success: true, data: response };
    } catch (error: any) {
      return {
        success: false,
        error: error?.data || null,
      };
    }
  };
  