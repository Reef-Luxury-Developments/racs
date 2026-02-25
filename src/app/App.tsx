import { AppLayout } from '@/components/layout/AppLayout';
import { AppRoutes } from '@/routes/AppRoutes';

export const App = (): JSX.Element => {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
};
