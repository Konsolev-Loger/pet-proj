import { useEffect, useRef } from 'react';
import type { News, Product } from '../../../shared/types';
import { useNavigate } from 'react-router';
import './Mainpage.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import LocalMallIcon from '@mui/icons-material/LocalMall';

export type MainpageProps = {
  newsSectionRef: React.RefObject<HTMLDivElement | null>;
  getAllProduct: () => Promise<void>;
  getNews: () => Promise<void>;
  product: Product[];
  news: News[];
};

export default function Mainpage({
  newsSectionRef,
  getAllProduct,
  product = [],
  getNews,
  news,
}: MainpageProps) {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null); // Реф для секции с товарами
  // ======================================================================

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 350;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 350;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };
  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // или 'center', 'end'
      });
    }
  };
  // ======================================================================
  useEffect(() => {
    getAllProduct();
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ПАРАЛЛАКС */}
      <section className="parallax-section">
        <div className="parallax-bg"></div>
        <div className="hero-content">
          <h1>GRAFF</h1>
          <p>ГРАФФИТИ · УЛИЦА · СВОБОДА</p>
          <button onClick={scrollToProducts}>СМОТРЕТЬ НОВИНКИ</button>
        </div>
      </section>

      <div className="products-grid" ref={productsSectionRef}>
        <button className="scroll-left" onClick={scrollLeft}>
          <ArrowBackIosIcon />
        </button>
        <button className="scroll-right" onClick={scrollRight}>
          <ArrowForwardIosIcon />
        </button>

        <div className="products-scroll-container" ref={scrollContainerRef}>
          {product.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/more/${item.id}`)}
            >
              <img src={`http://localhost:3000/${item.img}`} alt={item.name || 'Товар'} />
              <h3>{item.name}</h3>
              <p>{item.price} ₽</p>
              <p className="stock">В наличии: {item.stockCount} шт.</p>
              {/* <LocalMallIcon className="cart-icon" /> */}
            </div>
          ))}
        </div>
      </div>

      <div className="news-section" ref={newsSectionRef}>
        <div className="div-news">
          <img src="/news.png" alt="Новости" />
        </div>
        <div className="news-container">
          {news.map((item) => (
            <div key={item.id} className="news-card">
              <img
                src={`http://localhost:3000/${item.imgurl}`}
                alt={item.title || 'Новость'}
              />
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
