import { setAccessToken } from '../../axios/AxiosInstance';
import { useState } from 'react';
import type { FormData, UserState } from '../../shared/types';
import { useNavigate } from 'react-router';
import './Registration.css';
import UserApi from '../UserApi';

export type RegistrationProps = {
   setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

export default function Registration({ setUser }: RegistrationProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // ======================================================================
  const registrationHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await UserApi.signup(formData);
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
          <h2>Регистрация</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Имя"
            required
            // value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            // value={formData.email}
            onChange={handleChange}
          />
            <input
            type="phone"
            name="phone"
            placeholder="Телефон"
            required
            // value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="passwordd"
            placeholder="Пароль"
            required
            // value={formData.password}
            onChange={handleChange}
          />


          <button type="submit">Создать аккаунт</button>

          <p className="login-link">
            Уже есть аккаунт? <a href="/login">Войти</a>
          </p>
        </form>
      </div>
    </>
  );
}
