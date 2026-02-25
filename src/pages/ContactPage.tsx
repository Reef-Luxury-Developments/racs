import { Header } from '@/components/layout/Header';

export const ContactPage = (): JSX.Element => {
  return (
    <>
      <Header contactColor="#0f4c81" />

      <section className="container page">
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s Talk</h2>
        <p className="lead">Contact form and details can be added here.</p>
      </section>
    </>
  );
};
