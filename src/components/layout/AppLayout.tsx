import type { PropsWithChildren } from 'react';

import { Footer } from '@/components/layout/Footer';

export const AppLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className="app-shell">
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
};
