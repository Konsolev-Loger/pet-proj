import { Outlet } from 'react-router';
import type { UserState } from '../shared/types';
import Header from '../widgets/header/Header';

export type LayoutProps = {
  setUser: React.Dispatch<React.SetStateAction<UserState>>
  user: UserState;
  scrollToNews: () => void
};

export default function Layout({setUser, user, scrollToNews}: LayoutProps) {
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);

  // const openRegisterModal = () => setShowRegister(true);
  // const closeRegisterModal = () => setShowRegister(false);

  // const openLoginModal = () => setShowLoginModal(true);
  // const closeLoginModal = () => setShowLoginModal(false);

  // ==============================================================
  // ==============================================================
  return (
    <>
      <Header setUser={setUser} user={user} scrollToNews={scrollToNews}/>
      <Outlet />
    </>
  );
}
