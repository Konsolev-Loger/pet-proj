import { useEffect, useRef } from 'react';
import './Map.css';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MapModal({ isOpen, onClose }: MapModalProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && mapRef.current) {
      // Инициализация карты
      // @ts-ignore
      const map = new ymaps.Map(mapRef.current, {
        center: [60.015515, 30.397246], // Координаты проспект Науки, 51
        zoom: 16,
      });

      // Добавление метки
      // @ts-ignore
      const placemark = new ymaps.Placemark([60.015515, 30.397246], {
        hintContent: 'Магазин GRAFF',
        balloonContent: `
          <strong>Магазин GRAFF</strong><br>
          Санкт-Петербург, пр. Науки, 51<br>
          Телефон: 8 800 555-44-24
        `,
      });

      map.geoObjects.add(placemark);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Адрес нашего магазина</h2>
        <div ref={mapRef} className="map-container"></div>
        <div className="address-info">
          <p><strong>Адрес:</strong> Санкт-Петербург, проспект Науки, 51</p>
          <p><strong>Время работы:</strong> Ежедневно 11:00-21:00</p>
          <p><strong>Телефон:</strong> 8 800 555-35-35</p>
          <p><strong>Метро:</strong> Академическая, Гражданский проспект</p>
        </div>
      </div>
    </div>
  );
}