import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import project1 from "@/assets/icons/projects/al-maryah-waterfront.jpg";
import project2 from "@/assets/icons/projects/vip place.jpg";
import project3 from "@/assets/icons/projects/othaim-mall.jpg";
import project4 from "@/assets/icons/projects/Al Hamza mall.jpg";
import allProjectsBg from "@/assets/images/all-projects-bg.png";

type ProjectSlide = {
  id: string;
  sideLabel: string;
  title: string;
  image: string;
  description: string;
  services: string;
  area: string;
  location: string;
  isCta?: boolean;
};

const slides: ProjectSlide[] = [
  {
    id: "al-mariah-waterfront",
    sideLabel: "The Village Mall",
    title: "Al Mariah Waterfront",
    image: project1,
    description: "Outdoor Cooling System",
    services: "Design and Build",
    area: "8,000 m.",
    location: "Al Mariah Island- UAE, Abu Dhabi",
  },
  {
    id: "vip-palace",
    sideLabel: "VIP Palace",
    title: "VIP Palace",
    image: project2,
    description: "Luxury Outdoor Comfort",
    services: "Design and Build",
    area: "5,500 m.",
    location: "Riyadh, Saudi Arabia",
  },
  {
    id: "othaim-park-mall",
    sideLabel: "Othaim Park Mall",
    title: "Othaim Park Mall",
    image: project3,
    description: "Outdoor Cooling System",
    services: "Retrofit and Optimization",
    area: "11,000 m.",
    location: "Dammam, Saudi Arabia",
  },
  {
    id: "al-hazm-mall",
    sideLabel: "Al Hazm Mall",
    title: "Al Hazm Mall",
    image: project4,
    description: "Mixed-use Cooling Solution",
    services: "Engineering and Delivery",
    area: "9,300 m.",
    location: "Doha, Qatar",
  },
  {
    id: "cta",
    sideLabel: "",
    title: "VIEW ALL PROJECTS",
    image: "",
    description: "",
    services: "",
    area: "",
    location: "",
    isCta: true,
  },
];

const SLIDE_COUNT = slides.length;

export const HomeProjectsSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.max(Math.floor(latest * SLIDE_COUNT), 0),
      SLIDE_COUNT - 1,
    );
    setActiveIndex(index);
  });

  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollRange = container.scrollHeight - window.innerHeight;
    const targetProgress = (index + 0.1) / SLIDE_COUNT;
    window.scrollTo({
      top: containerTop + targetProgress * scrollRange,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const el = centerRef.current;
    if (!el) return;

    const onScroll = (): void => {
      const children = el.children;
      if (!children.length) return;
      const firstChild = children[0] as HTMLElement;
      const childWidth = firstChild.offsetWidth;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
      const step = childWidth + gap;
      const index =
        step > 0
          ? Math.min(Math.round(el.scrollLeft / step), SLIDE_COUNT - 1)
          : 0;
      setMobileIndex(index);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToMobileDot = useCallback((index: number): void => {
    const el = centerRef.current;
    if (!el || !el.children[index]) return;
    const child = el.children[index] as HTMLElement;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  return (
    <div ref={containerRef} className="home-projects-scroll-container">
      <section className="home-projects" aria-label="Projects">
        <div className="home-projects-heading-wrap">
          <div className="container home-projects-heading-content">
            <h2 className="home-projects-title">PROJECTS</h2>
          </div>
        </div>

        <div className="home-projects-frame">
          {/* Left sidebars — previously visited projects */}
          <div className="home-projects-sidebars">
            {slides.map((slide, index) => {
              if (slide.isCta) return null;
              const isVisible = index < activeIndex;

              return (
                <motion.div
                  key={`left-${slide.id}`}
                  initial={false}
                  animate={{
                    width: isVisible ? 60 : 0,
                    opacity: isVisible ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="home-projects-sidebar-strip"
                >
                  <button
                    type="button"
                    className="home-projects-sidebar-btn"
                    onClick={() => scrollToSlide(index)}
                  >
                    <span className="home-projects-sidebar-label home-projects-sidebar-label--left">
                      {slide.sideLabel || slide.title}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Center content — active slide */}
          <div ref={centerRef} className="home-projects-center">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              if (slide.isCta) {
                return (
                  <motion.div
                    key={`center-${slide.id}`}
                    className="home-projects-slide home-projects-slide--cta"
                    initial={{ opacity: 0, visibility: "hidden" as const }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      visibility: isActive ? "visible" : "hidden",
                      zIndex: isActive ? 10 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div
                      className="home-projects-cta"
                      style={{ backgroundImage: `url(${allProjectsBg})` }}
                    >
                      <a href="/projects" className="home-projects-cta-link">
                        <span className="home-projects-cta-link-text">View All Projects</span>
                      </a>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={`center-${slide.id}`}
                  className="home-projects-slide"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 10 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ pointerEvents: isActive ? "auto" : "none" }}
                >
                  <div className="home-projects-main">
                    <div className="home-projects-details">
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={
                          isActive
                            ? { y: 0, opacity: 1 }
                            : { y: 20, opacity: 0 }
                        }
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {slide.title}
                      </motion.h3>

                      <div className="home-projects-meta-grid">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={
                            isActive
                              ? { y: 0, opacity: 1 }
                              : { y: 10, opacity: 0 }
                          }
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <h4>Project Description</h4>
                          <p>{slide.description}</p>
                        </motion.div>
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={
                            isActive
                              ? { y: 0, opacity: 1 }
                              : { y: 10, opacity: 0 }
                          }
                          transition={{ delay: 0.35, duration: 0.5 }}
                        >
                          <h4>Services</h4>
                          <p>{slide.services}</p>
                        </motion.div>
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={
                            isActive
                              ? { y: 0, opacity: 1 }
                              : { y: 10, opacity: 0 }
                          }
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <h4>Outdoor Area</h4>
                          <p>{slide.area}</p>
                        </motion.div>
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={
                            isActive
                              ? { y: 0, opacity: 1 }
                              : { y: 10, opacity: 0 }
                          }
                          transition={{ delay: 0.45, duration: 0.5 }}
                        >
                          <h4>Location</h4>
                          <p>{slide.location}</p>
                        </motion.div>
                      </div>
                    </div>

                    <div className="home-projects-image-wrap">
                      <motion.div
                        className="home-projects-image-inner"
                        initial={{ scale: 1.1 }}
                        animate={isActive ? { scale: 1 } : { scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {slide.image ? (
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="home-projects-image"
                          />
                        ) : null}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right sidebars — upcoming projects */}
          <div className="home-projects-sidebars">
            {slides.map((slide, index) => {
              if (slide.isCta) return null;
              const isVisible = index > activeIndex;

              return (
                <motion.div
                  key={`right-${slide.id}`}
                  initial={false}
                  animate={{
                    width: isVisible ? 60 : 0,
                    opacity: isVisible ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="home-projects-sidebar-strip home-projects-sidebar-strip--right"
                >
                  <button
                    type="button"
                    className="home-projects-sidebar-btn"
                    onClick={() => scrollToSlide(index)}
                  >
                    <span className="home-projects-sidebar-label">
                      {slide.sideLabel || slide.title}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile dot indicators */}
        <div className="home-projects-dots" aria-label="Slide indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={
                index === mobileIndex
                  ? "home-projects-dot is-active"
                  : "home-projects-dot"
              }
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollToMobileDot(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
