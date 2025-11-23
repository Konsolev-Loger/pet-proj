import { Outlet } from 'react-router';
import type { UserState } from '../shared/types';
import Header from '../widgets/header/Header';

export type LayoutProps = {
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  user: UserState;
  scrollToNews: () => void;
};

export default function Layout({ user, scrollToNews }: LayoutProps) {
  return (
    <>
      <Header user={user} scrollToNews={scrollToNews} />
      <Outlet />
    </>
  );
}
