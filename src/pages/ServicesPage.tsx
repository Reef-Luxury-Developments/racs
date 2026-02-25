import { Header } from '@/components/layout/Header';

export const ServicesPage = (): JSX.Element => {
  return (
    <>
      <Header contactColor="#0f4c81" />

      <section className="container page">
        <p className="eyebrow">Services</p>
        <h2>Our Services</h2>
        <p className="lead">Service details can be added here.</p>
      </section>
    </>
  );
};
