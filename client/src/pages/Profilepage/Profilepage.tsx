import { useEffect, useState } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import type { UserState, ServerResponseType, Order } from '../../shared/types';
import './Profilepage.css';
import { useNavigate } from 'react-router';
import UserApi from '../../features/UserApi';
import LogoutIcon from '@mui/icons-material/Logout';

type ProfileProps = {
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  user: UserState;
};

export default function Profilepage({ setUser }: ProfileProps) {
  const [myorder, setMyorder] = useState<Order[]>([]);
  // const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();

  // ====================================================================

  // const editUser = async (e: { target: HTMLFormElement | undefined }) => {
  //   const data = Object.fromEntries(new FormData(e.target));
  //   try {
  //     const response = await axiosInstance.put('/user', data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // ====================================================================
  const logoutHandler = async () => {
    try {
      await UserApi.logout();
      setUser({ status: 'not-logged', data: null });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  // ====================================================================

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance<ServerResponseType<Order[]>>('/order');
      const allOrders = response.data.data || [];
      const userOrders = allOrders.filter((order) => order.userId === user.data?.id);
      setMyorder(userOrders || []);
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
      setMyorder([]);
    }
  };
  // ====================================================================
  useEffect(() => {
    fetchOrders();
  }, [user]);
  // ====================================================================

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU');

  const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString('ru-RU');
  // ====================================================================

  return (
    <>
     {/* <Modaledit
     showEdit={showEdit}
     setShowEdit={setShowEdit}
     setUser={setUser}
     user={user}
      
      /> */}
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.data?.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2>{user.data?.fullName || 'Имя не указано'}</h2>
          <LogoutIcon className="logout" onClick={logoutHandler} />
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span>Email:</span>
            <span>{user.data?.email}</span>
          </div>
          <div className="info-row">
            <span>Телефон:</span>
            <span>{user.data?.phone || 'Не указан'}</span>
          </div>
          <div className="info-row">
            <span>Дата регистрации:</span>
            <span>
              {user.data?.createdAt ? formatDate(user.data.createdAt) : 'Неизвестно'}
            </span>
          </div>
          <div className="info-row">
            <span>Количество заказов:</span>
            <span className="bold">{myorder.length}</span>
          </div>
        </div>
      </div>

      <section className="orders-section">
        <h3>Мои заказы</h3>

        {myorder.length > 0 ? (
          <div className="orders-list">
            {myorder.map((order) => (
              <div key={order.id} className="order-item">
                <p className="order-id">Заказ №{order.id}</p>
                <p className="order-date">{formatDateTime(order.createdAt)}</p>

                {/* Выводим все товары заказа */}
                <div className="order-items-list">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="order-product-item"
                    >
                      <img
                        src={`http://localhost:3000/${item.imgurl}`}
                        alt={item.title}
                        className="product-image"
                      />
                      <div className="product-info">
                        <p className="product-title">{item.title}</p>
                        <p className="product-price">{item.price} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Общая сумма заказа */}
                <p className="order-total">
                  Итого: {order.items.reduce((sum, item) => sum + item.price, 0)} ₽
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-orders">У вас пока нет заказов</p>
        )}
      </section>
    </div>
    </>
  );
}
