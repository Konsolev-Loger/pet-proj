import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}


const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

let accessToken = '';

function setAccessToken(newToken: string) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  // interceptors-перехватывает запросы
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const prevRequest: ExtendedInternalAxiosRequestConfig | undefined = error.config;
    if (error && prevRequest && error.response!.status  === 403 && !prevRequest.sent) {
      const response = await axiosInstance('/users/refreshTokens');
      accessToken = response.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export { setAccessToken };

export default axiosInstance;
