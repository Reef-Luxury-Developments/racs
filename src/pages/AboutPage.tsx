import { useEffect } from "react";
import { Link } from "react-router-dom";

import aboutSymbolBlur from "@/assets/images/about/about-symbol-blur.svg";
import ceoImage from "@/assets/images/about/CEO.svg";
import leftQutation from "@/assets/images/about/left-qutation.svg";
import rightQutation from "@/assets/images/about/right-qutation.svg";

export const AboutPage = (): JSX.Element => {
  useEffect(() => {
    const previousTitle = document.title;

    const setMeta = (selector: string, content: string): (() => void) => {
      const element = document.querySelector(
        selector,
      ) as HTMLMetaElement | null;
      if (!element) return () => undefined;

      const previous = element.getAttribute("content");
      element.setAttribute("content", content);

      return () => {
        if (previous === null) {
          element.removeAttribute("content");
          return;
        }
        element.setAttribute("content", previous);
      };
    };

    document.title = "About RACS | Outdoor Cooling Engineering Services";

    const restoreDescription = setMeta(
      'meta[name="description"]',
      "Learn about RACS, a leader in outdoor cooling engineering services across the GCC, delivering tailored end-to-end solutions for outdoor areas and energy management.",
    );
    const restoreOgTitle = setMeta(
      'meta[property="og:title"]',
      "About RACS | Outdoor Cooling Engineering Services",
    );
    const restoreOgDescription = setMeta(
      'meta[property="og:description"]',
      "RACS provides advanced outdoor cooling engineering, design, and implementation services for residential, hospitality, and large-scale developments.",
    );
    const restoreTwitterTitle = setMeta(
      'meta[name="twitter:title"]',
      "About RACS | Outdoor Cooling Engineering Services",
    );
    const restoreTwitterDescription = setMeta(
      'meta[name="twitter:description"]',
      "Explore RACS expertise in outdoor cooling systems, specialized services, and energy-focused project delivery.",
    );

    return () => {
      document.title = previousTitle;
      restoreDescription();
      restoreOgTitle();
      restoreOgDescription();
      restoreTwitterTitle();
      restoreTwitterDescription();
    };
  }, []);

  return (
    <div className="about-page">
      <section
        className="container about-hero"
        aria-labelledby="about-hero-title"
      >
        <img
          src={aboutSymbolBlur}
          alt=""
          aria-hidden="true"
          className="about-hero-symbol"
        />

        <div className="about-hero-grid">
          <div className="about-hero-main">
            <h1 id="about-hero-title" className="about-hero-title">
              ABOUT US
            </h1>

            <p className="about-hero-lead">
              Reef Advanced Cooling Services (RACS) is an engineering company
              specializing in tailor-made, end-to-end solutions in the fields of
              outdoor area cooling, specialized cooling services, and energy
              management.
              <br />
              <br />
              RACS is a leader in outdoor innovative air-conditioning solutions,
              including the design and implementation of the world&apos;s first
              cooling system for outdoor balconies and gardens in residential
              buildings and villas. Our solutions create comfortable conditions,
              enabling residents to enjoy these spaces even during the hot Gulf
              summer season.
            </p>
          </div>
        </div>

      </section>

      <section
        className="container about-values"
        aria-label="Our mission and vision"
      >
        <article className="about-values-row">
          <h2>
            Our
            <br />
            Mission
          </h2>
          <p>
            We are committed to safely delivering world-class projects by
            providing integrated design and engineering solutions in outdoor
            cooling systems, district cooling, cooling-as-a-service, energy
            management, water, and power. Our mission is guided by our core
            values, emphasizing environmental protection and sustainable
            community development.
          </p>
        </article>

        <article className="about-values-row">
          <h2>
            Our
            <br />
            Vision
          </h2>
          <p>
            RACS envisions transforming how people interact with cooling
            solutions by setting new industry standards through smart
            technologies. By bridging the gaps between design, construction, and
            operations, we empower stakeholders to make informed decisions,
            enhance efficiency, and foster collaboration and innovation. We
            foresee a future where every asset operates as an intelligent,
            interconnected environment, promoting sustainability, safety, and
            productivity throughout its lifecycle.
          </p>
        </article>
      </section>

      <section className="container about-ceo" aria-label="CEO message">
        <div className="about-ceo-grid">
          <div className="about-ceo-image-wrap">
            <img
              src={ceoImage}
              alt="Sufian Majed, CEO of REEF ADVANCE COOLING SERVICES"
              className="about-ceo-image"
            />
          </div>

          <article className="about-ceo-content">
            <h2>CEO&apos;S MESSAGE</h2>
            <img
              src={leftQutation}
              alt=""
              aria-hidden="true"
              className="about-ceo-quote about-ceo-quote--left"
            />
            <img
              src={rightQutation}
              alt=""
              aria-hidden="true"
              className="about-ceo-quote about-ceo-quote--right"
            />

            <p className="about-ceo-message">
              Dear Valued Stakeholders, At REEF ADVANCE COOLING SERVICES (RACS),
              our mission is to redefine outdoor comfort through innovation,
              sustainability, and excellence. By integrating design,
              engineering, and execution under one roof, we deliver tailored,
              cost-effective solutions that meet the evolving needs of our
              clients. As we grow, we remain committed to creating value for our
              customers, employees, and communities while driving sustainable
              practices and technological advancements. Together, we are shaping
              a future where comfort and efficiency go hand in hand. Thank you
              for your trust and support.
            </p>

            <p className="about-ceo-signoff">
              Sufian Majed - CEO,
              <br />
              REEF ADVANCE COOLING SERVICES (RACS)
            </p>
          </article>
        </div>
      </section>

      <section
        className="container about-cta"
        aria-labelledby="about-cta-title"
      >
        <h2 id="about-cta-title" className="about-cta-title">
          Looking to <strong>Enhance</strong> Outdoor Comfort in{" "}
          <strong>Your Project</strong>?
        </h2>
        <Link to="/contact" className="about-cta-button">
          Speak to an Expert
        </Link>
      </section>

    </div>
  );
};
