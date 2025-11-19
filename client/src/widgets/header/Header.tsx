import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { UserState } from '../../shared/types';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MapModal from '../Map/Map';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

// ------------------------------------------------------------------
type HeaderProps = {
  scrollToNews: () => void;
  user: UserState;
};
// ------------------------------------------------------------------
export default function Header({ user, scrollToNews }: HeaderProps) {
  const navigate = useNavigate();
  const [isMapOpen, setIsMapOpen] = useState(false);
  // ====================================================
  const openMap = () => setIsMapOpen(true);
  const closeMap = () => setIsMapOpen(false);
  // ====================================================
  return (
    <>
      <div className="fixed-header-wrapper">
        <header className="header">
          <div
            className="logo"
            onClick={() => {
              navigate('./');
            }}
          >
            GRAFF
          </div>

          <nav className="nav-menu">
            <a href="#">Граффити</a>
            <a href="#">что то</a>
            <a href="#">что то</a>
            <a href="# " onClick={scrollToNews}>
              Новости
            </a>
          </nav>

          <div className="header-icons">
            <SearchIcon />
            {}
            <PersonIcon
              onClick={() => {
                if (user.status === 'logged') {
                  navigate('/profile');
                } else {
                  navigate('/registration');
                }
              }}
            />
            <LocalGroceryStoreIcon
              onClick={() => {
                navigate('/cart');
              }}
            />
            <FavoriteIcon />
          </div>
        </header>

        <div className="bottom-bar">
          <div className="location" onClick={openMap} style={{ cursor: 'pointer' }}>
            <PlaceIcon />
            АДРЕС МАГАЗИНА
          </div>
          <div className="phone">
            <LocalPhoneIcon />8 800 555-35-35
          </div>
          <div className="time">ЕЖЕДНЕВНО 11-21</div>
        </div>
      </div>
      <MapModal isOpen={isMapOpen} onClose={closeMap} />
    </>
  );
}
