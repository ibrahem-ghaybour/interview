export const useApiUrl = (): string => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || "http://localhost:5000";
};
