import { Link } from 'react-router-dom';

export const NotFoundPage = (): JSX.Element => {
  return (
    <section className="container page">
        <p className="eyebrow">404</p>
        <h2>Page not found.</h2>
        <p className="lead">
          The page you requested does not exist. Go back to the <Link to="/">home page</Link>.
        </p>
    </section>
  );
};
