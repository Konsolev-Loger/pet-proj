import { BrowserRouter, Route, Routes } from 'react-router';
import axiosInstance, { setAccessToken } from './axios/AxiosInstance';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Mainpage from './pages/Mainpage/main/Mainpage';
import type {
  News,
  NewsResponse,
  Product,
  ProductResponse,
  RefreshTokensResponse,
  UserState,
} from '../src/shared/types';
import Registration from './features/Registration/Registration';
import Login from './features/Login/Login';
import Morepage from './pages/Morepage/Morepage';
import Cartpage from './pages/Cartpage/Cartpage';
import Profilepage from './pages/Profilepage/Profilepage';

function App() {
  const [user, setUser] = useState<UserState>({ status: 'logged', data: null });
  const [product, setProduct] = useState<Product[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const newsSectionRef = useRef<HTMLDivElement>(null);
  // ==============================================================
  const scrollToNews = () => {
    newsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // ==============================================================
  useEffect(() => {
    const refreshTokens = async () => {
      try {
        const res = await axiosInstance<RefreshTokensResponse>('/users/refreshTokens');
        setUser({ status: 'logged', data: res.data.user });
        setAccessToken(res.data.accessToken);
      } catch (error) {
        console.log(error);
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      }
    };
    refreshTokens();
  }, []);
  // ==============================================================
  const getAllProduct = async () => {
    try {
      const response = await axiosInstance<ProductResponse>('/product');
      const { data } = response.data;
      if (response.status === 200) {
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ==============================================================
  const getNews = async () => {
    try {
      const response = await axiosInstance<NewsResponse>('/news');
      const { data } = response.data;
      if (response.status === 200) {
        setNews(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ==============================================================

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout setUser={setUser} user={user} scrollToNews={scrollToNews} />}
          >
            <Route
              index
              element={
                <Mainpage
                  newsSectionRef={newsSectionRef}
                  getAllProduct={getAllProduct}
                  product={product}
                  getNews={getNews}
                  news={news}
                />
              }
            />
            <Route path="/registration" element={<Registration setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/more/:id" element={<Morepage user={user} />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route
              path="/profile"
              element={<Profilepage user={user} setUser={setUser} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
