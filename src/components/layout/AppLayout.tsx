import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const AppLayout = (): JSX.Element => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="app-shell">
      <Header
        className={isHome ? 'site-header--hero' : 'site-header--overlay'}
        contactColor={isHome ? '#ffffff' : '#0f4c81'}
      />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
