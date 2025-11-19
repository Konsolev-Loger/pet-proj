import { useEffect, useState } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import { useParams } from 'react-router';
import type { Product, ServerResponseType, UserState } from '../../shared/types';
import './Morepage.css';

type MorepageProps = {
  user: UserState;
};

export default function Morepage({ user }: MorepageProps) {
  const [oneProduct, setOneProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  // ==============================================================
  const getOneProduct = async () => {
    try {
      const response = await axiosInstance.get<ServerResponseType<Product>>(
        `/product/${id}`,
      );
      const { data } = response.data;
      if (response.status === 200) {
        setOneProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ==============================================================
  const addCart = async (): Promise<void> => {
    if (user.status === 'guest') {
      alert('Пожалуйста, авторизуйтесь');
    }
    try {
      const response = await axiosInstance.post(`/cart/`, {
        productId: id,
        quantity: 1,
      });
      await getOneProduct();

      const { data } = response.data;
      if (response.status === 200 && data?.product?.stockCount !== undefined) {
        setOneProduct((prev) => ({
          ...prev!,
          stockCount: data.product.stockCount,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ==============================================================

  useEffect(() => {
    getOneProduct();
  }, [id]);
  return (
    <>
      <div className="morepage-container">
        <div className="morepage-card">
          <div className="morepage-image">
            <img
              src={`http://localhost:3000/${oneProduct?.img}`}
              alt={oneProduct?.name}
            />
          </div>
          <div className="morepage-info">
            <h1 className="morepage-title">{oneProduct?.name}</h1>
            <div className="morepage-price">{oneProduct?.price} ₽</div>
            <div className="morepage-stock">В наличии: {oneProduct?.stockCount} шт.</div>
            <div className="morepage-description">
              <h3>Описание</h3>
              <p>{oneProduct?.description}</p>
            </div>
            {oneProduct?.stockCount === 0 ? (
              <p>Товара нет в наличии</p>
            ) : (
              <button className="morepage-cart-btn" onClick={() => addCart()}>
                Добавить в корзину
              </button>
            )}

            {/* <button className="morepage-cart-btn">Добавить в корзину</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
