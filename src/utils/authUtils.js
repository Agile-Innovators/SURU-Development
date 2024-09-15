import { useAuth } from "../global/AuthProvider.jsx";

export const useGetToken = () => {
  const { getAuthToken } = useAuth();
  return getAuthToken();
};

export const useSaveToken = () => {
  const { saveAuthToken } = useAuth();
  return saveAuthToken;
};

export const useRemoveToken = () => {
  const { saveAuthToken } = useAuth();
  return () => saveAuthToken(null);
};
