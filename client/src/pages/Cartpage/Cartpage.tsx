import { useEffect, useState } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import type { CartItem, CartResponse } from '../../shared/types';
import './Cartpage.css';
import { useNavigate } from 'react-router';

export default function Cartpage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const navigate = useNavigate();
  // =================================================
  const clearCart = async () => {
    try {
      const response = await axiosInstance.delete(`/cart/`);
      if (response.status === 200) {
        getCartItems();
      }
    } catch (error) {
      console.log();
    }
  };
  // =================================================
  const getCartItems = async () => {
    try {
      const response = await axiosInstance<CartResponse>('/cart');
      const { data } = response.data;
      if (response.status === 200 && data) {
        setCartItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // =================================================
  // const orderHandler = async () => {
  // };
  const orderHandler = async () => {
    try {
      const response = await axiosInstance.post('/order/', {
        items: cartItems.map((item) => ({
          productId: item.productId,
          title: item.Product.name,
          imgurl: item.Product.img,
          price: item.Product.price,
        })),
      });

      const { data } = response.data;
      if (response.status === 201) {
        setOrderId(data.id);
        setVisible(true);
        clearCart();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // =================================================
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      <div className="cart-container">
        {visible ? (
          <div className="order-success">
            <h2>Спасибо за заказ!</h2>
            <p>Ваш номер заказа: {orderId}</p>
            <p>С вами скоро свяжется наш оператор для подтверждения заказа.</p>
            <button
              className="back-button"
              onClick={() => {
                navigate('/');
              }}
            >
              Вернуться к покупкам
            </button>
          </div>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <p className="empty-cart">Корзина пуста</p>
            ) : (
              <>
                {cartItems.map((item) => {
                  const product = item.Product;
                  return (
                    <div key={item.productId} className="cart-item">
                      <div className="cart-item-image">
                        <img
                          src={`http://localhost:3000/${product.img}`}
                          alt={product.name}
                          className="product-image"
                        />
                      </div>
                      <div className="cart-item-details">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="price-info">
                          <span className="price">Цена: {product.price} ₽</span>
                          <span className="quantity">Количество: {item.quantity}</span>
                          <span className="total">
                            Сумма: {product.price * item.quantity} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="cart-footer">
                  <div className="cart-total">
                    Итого:
                    {cartItems.reduce(
                      (sum, item) => sum + item.Product.price * item.quantity,
                      0,
                    )}
                    ₽
                  </div>
                  <button className="delete-button" onClick={clearCart}>
                    Очистить корзину
                  </button>
                  <button className="checkout-button" onClick={orderHandler}>
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
