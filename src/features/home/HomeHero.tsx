import { TemperatureWidget } from "@/components/common/TemperatureWidget";

import bgImage from "@/assets/images/hero-bg.png";

export const HomeHero = (): JSX.Element => {
  return (
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container home-hero-content">
        <h1 className="home-hero-title">
          RACS TURNS EVERY <strong>OUTDOOR SPACE</strong> INTO A YEAR-ROUND{" "}
          <strong>COMFORT ZONE</strong> THROUGH ADVANCED OUTDOOR COOLING.
        </h1>

        <p className="home-hero-description">
          We design, install, Test, commission​, and maintain high-performance
          cooling systems for villas, restaurants, hotels, and large outdoor
          spaces, engineered for extreme Gulf weather conditions.
        </p>

        <a
          className="home-hero-cta"
          href="/RACS-Company-Profile.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Company Profile
        </a>
      </div>

      <TemperatureWidget />
    </section>
  );
};
