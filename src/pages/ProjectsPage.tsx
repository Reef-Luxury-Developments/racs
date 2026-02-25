import { Header } from '@/components/layout/Header';

export const ProjectsPage = (): JSX.Element => {
  return (
    <>
      <Header contactColor="#0f4c81" />

      <section className="container page">
        <p className="eyebrow">Projects</p>
        <h2>Our Projects</h2>
        <p className="lead">Project showcases can be added here.</p>
      </section>
    </>
  );
};
