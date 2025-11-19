import axiosInstance from '../axios/AxiosInstance';

export default class UserApi {
  static async signup(userData: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }) {
    const response = await axiosInstance.post('/users/registration', userData);
    return response;
  }

  static async login(userData: { email: string; password: string }) {
    const response = await axiosInstance.post('/users/login', userData);
    return response;
  }

  static async logout() {
    const response = await axiosInstance('/users/logout');
    return response;
  }
}
