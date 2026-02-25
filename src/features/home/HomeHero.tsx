import { Header } from '@/components/layout/Header';

import bgImage from '@/assets/images/bg.png';

export const HomeHero = (): JSX.Element => {
  return (
    <section className="home-hero" style={{ backgroundImage: `url(${bgImage})` }}>
      <Header className="site-header--hero" contactColor="#ffffff" />

      <div className="container home-hero-content">
        <h1 className="home-hero-title">
          RACS TURNS EVERY <strong>OUTDOOR SPACE</strong> INTO
          <br />
          A YEAR-ROUND <strong>COMFORT ZONE</strong> THROUGH
          <br />
          ADVANCED OUTDOOR COOLING.
        </h1>

        <p className="home-hero-description">
          We design, install, and maintain high-performance
          <br />
          cooling systems for villas, restaurants, hotels, and
          <br />
          large outdoor spaces, engineered for extreme Gulf
          <br />
          weather conditions.
        </p>

        <a className="home-hero-cta" href="#company-profile">
          Download Company Profile
        </a>
      </div>

      <section className="container trusted-section trusted-section--hero" id="company-profile">
        <h2>
          TRUSTED BY <strong>PROPERTY OWNERS,</strong>
          <br />
          <strong>HOSPITALITY LEADERS & DEVELOPERS</strong>
        </h2>
      </section>
    </section>
  );
};
