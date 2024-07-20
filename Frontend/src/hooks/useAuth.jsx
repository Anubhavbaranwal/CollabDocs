import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode } from "jwt-decode";
import AuthService from "../../Service/AuthService";
import {
  setAccessToken,
  setIsAuthenticated,
  setLoading,
  setLoadingAuth,
  setErrors,
  setUserId,
  setEmail,
} from "../Store/Slice/authSlice";
import useLocalStorage from "./useLocalStrorage";

const useAuth = () => {
  const dispatch = useDispatch();

  const {
    accessToken,
    isAuthenticated,
    loading,
    loadingAuth,
    errors,
    userId,
    email,
  } = useSelector((state) => state.auth);

  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);

  const login = (accesstoken, refreshtoken) => {
    const { exp, id, email } = jwtDecode(accesstoken);
    silentRefresh(exp);
    dispatch(setUserId(id));
    dispatch(setEmail(email));
    dispatch(setAccessToken(accesstoken));
    setRefreshToken(refreshtoken);
    dispatch(setIsAuthenticated(true));
  };

  const logout = async () => {
    if (!accessToken) return;
    try {
      await AuthService.logout(accessToken);
    } catch {
    } finally {
      destroyAuth();
    }
  };

  const silentRefresh = (exp) => {
    const msExpiration = Math.abs(
      new Date().getTime() - new Date(exp * 1000).getTime()
    );

    setTimeout(() => {
      refreshAccessToken();
    }, msExpiration);
  };

  const destroyAuth = () => {
    setRefreshToken(null);
    dispatch(setAccessToken(null));
    dispatch(setUserId(null));
    dispatch(setEmail(null));
    dispatch(setIsAuthenticated(false));
  };

  const refreshAccessToken = async () => {
    if (refreshToken === null) {
      destroyAuth();
      dispatch(setLoadingAuth(false));
      return;
    }
    try {
      const response = await AuthService.refreshToken({ token: refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      login(newAccessToken, newRefreshToken);
    } catch (error) {
      destroyAuth();
    } finally {
      dispatch(setLoadingAuth(false));
    }
  };

  useEffect(() => {
    if (accessToken) {
      const { exp } = jwtDecode(accessToken);
      silentRefresh(exp);
    } else {
      dispatch(setLoadingAuth(false));
    }
  }, [accessToken, dispatch]);

  return {
    accessToken,
    isAuthenticated,
    loading,
    loadingAuth,
    errors,
    userId,
    email,
    login,
    logout,
    refreshAccessToken,
  };
};

export default useAuth;
