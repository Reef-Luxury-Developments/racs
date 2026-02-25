import { Link } from 'react-router-dom';

import { Header } from '@/components/layout/Header';

export const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <Header contactColor="#0f4c81" />

      <section className="container page">
        <p className="eyebrow">404</p>
        <h2>Page not found.</h2>
        <p className="lead">
          The page you requested does not exist. Go back to the <Link to="/">home page</Link>.
        </p>
      </section>
    </>
  );
};
