import { useCallback, useMemo, useRef, useState } from 'react';
import type { WheelEvent } from 'react';

import project1 from '@/assets/icons/projects/1.png';
import project2 from '@/assets/icons/projects/2.png';
import project3 from '@/assets/icons/projects/3.png';
import project4 from '@/assets/icons/projects/4.png';

type ProjectItem = {
  id: string;
  sideLabel: string;
  title: string;
  image: string;
  description: string;
  services: string;
  area: string;
  location: string;
};

const projects: ProjectItem[] = [
  {
    id: 'al-mariah-waterfront',
    sideLabel: 'The Village Mall',
    title: 'Al Mariah Waterfront',
    image: project1,
    description: 'Outdoor Cooling System',
    services: 'Design and Build',
    area: '8,000 m.',
    location: 'Al Mariah Island- UAE, Abu Dhabi',
  },
  {
    id: 'vip-palace',
    sideLabel: 'VIP Palace',
    title: 'VIP Palace',
    image: project2,
    description: 'Luxury Outdoor Comfort',
    services: 'Design and Build',
    area: '5,500 m.',
    location: 'Riyadh, Saudi Arabia',
  },
  {
    id: 'othaim-park-mall',
    sideLabel: 'Othaim Park Mall',
    title: 'Othaim Park Mall',
    image: project3,
    description: 'Outdoor Cooling System',
    services: 'Retrofit and Optimization',
    area: '11,000 m.',
    location: 'Dammam, Saudi Arabia',
  },
  {
    id: 'al-hazm-mall',
    sideLabel: 'Al Hazm Mall',
    title: 'Al Hazm Mall',
    image: project4,
    description: 'Mixed-use Cooling Solution',
    services: 'Engineering and Delivery',
    area: '9,300 m.',
    location: 'Doha, Qatar',
  },
];

const WHEEL_STEP_COOLDOWN = 520;

export const HomeProjectsSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSummary, setIsSummary] = useState(false);
  const [visitedIndices, setVisitedIndices] = useState<number[]>([0]);
  const lastWheelTimeRef = useRef(0);

  const activeProject = useMemo(() => projects[activeIndex], [activeIndex]);

  const viewedProjects = useMemo(() => {
    return visitedIndices
      .slice()
      .sort((a, b) => a - b)
      .map((index) => projects[index]);
  }, [visitedIndices]);

  const markVisited = useCallback((index: number): void => {
    setVisitedIndices((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }, []);

  const handleScrollStep = useCallback(
    (direction: 1 | -1): void => {
      if (direction === 1) {
        if (isSummary) return;

        if (activeIndex < projects.length - 1) {
          const nextIndex = activeIndex + 1;
          setActiveIndex(nextIndex);
          markVisited(nextIndex);
          return;
        }

        setIsSummary(true);
        return;
      }

      if (isSummary) {
        setIsSummary(false);
        setActiveIndex(projects.length - 1);
        return;
      }

      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    },
    [activeIndex, isSummary, markVisited],
  );

  const onProjectsWheel = (event: WheelEvent<HTMLDivElement>): void => {
    if (window.innerWidth <= 960) return;

    const now = performance.now();
    if (now - lastWheelTimeRef.current < WHEEL_STEP_COOLDOWN) {
      event.preventDefault();
      return;
    }

    if (Math.abs(event.deltaY) < 10) return;

    event.preventDefault();
    lastWheelTimeRef.current = now;
    handleScrollStep(event.deltaY > 0 ? 1 : -1);
  };

  return (
    <section className="home-projects" aria-label="Projects">
      <div className="home-projects-heading-wrap">
        <div className="container home-projects-heading-content">
          <h2 className="home-projects-title">PROJECTS</h2>
          <a href="#" className={isSummary ? 'home-projects-heading-link is-visible' : 'home-projects-heading-link'}>
            VIEW OUR PROJECTS
          </a>
        </div>
      </div>

      <div
        className={isSummary ? 'home-projects-frame home-projects-frame--summary' : 'home-projects-frame'}
        onWheel={onProjectsWheel}
      >
        <div className="home-projects-rail home-projects-rail--left">
          {isSummary
            ? viewedProjects.map((project) => (
                <span key={project.id} className="home-projects-rail-item home-projects-rail-item--summary">
                  {project.sideLabel}
                </span>
              ))
            : (
              <span className="home-projects-rail-item home-projects-rail-item--active">{activeProject.sideLabel}</span>
              )}
        </div>

        {isSummary ? (
          <div className="home-projects-summary">
            <h3>
              <span>READY TO SEE MORE?</span>
            </h3>
            <p>Explore our complete portfolio of projects across the region.</p>
            <a href="#" className="home-projects-summary-button">
              VIEW ALL PROJECTS
            </a>
          </div>
        ) : (
          <div className="home-projects-main" key={activeProject.id}>
            <div className="home-projects-details">
              <h3>{activeProject.title}</h3>

              <div className="home-projects-meta-grid">
                <div>
                  <h4>Project Description</h4>
                  <p>{activeProject.description}</p>
                </div>
                <div>
                  <h4>Services</h4>
                  <p>{activeProject.services}</p>
                </div>
                <div>
                  <h4>Outdoor Area</h4>
                  <p>{activeProject.area}</p>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>{activeProject.location}</p>
                </div>
              </div>
            </div>

            <div className="home-projects-image-wrap">
              <img src={activeProject.image} alt={activeProject.title} className="home-projects-image" />
            </div>
          </div>
        )}

        {!isSummary ? (
          <div className="home-projects-rail home-projects-rail--right" aria-label="Project list">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <span
                  key={project.id}
                  className={isActive ? 'home-projects-rail-item home-projects-rail-item--active' : 'home-projects-rail-item'}
                >
                  {project.title}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};
