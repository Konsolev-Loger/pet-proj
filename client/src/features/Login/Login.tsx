import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import UserApi from '../UserApi';
import { setAccessToken } from '../../axios/AxiosInstance';
import type { LoginFormData, UserState } from '../../shared/types';

export type LoginProps = {
   setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

export default function Login({ setUser }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // ======================================================================
  const registrationHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await UserApi.login(formData);
      setUser({ status: 'logged', data: response.data.user });
      setAccessToken(response.data.accessToken);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="register-container">
        <form className="register-form" onSubmit={registrationHandle}>
          <h2>Авторизация</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            required
            onChange={handleChange}
          />

          <button type="submit">Войти</button>
          <p className="login-link">
            Нет аккаунта? <a href="/registration">Зарегистрироваться</a>
          </p>
        </form>
      </div>
    </>
  );
}
