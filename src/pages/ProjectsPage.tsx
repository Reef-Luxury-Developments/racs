import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from '@/components/layout/Header';

import project1 from '@/assets/icons/projects/1.png';
import project2 from '@/assets/icons/projects/2.png';
import project3 from '@/assets/icons/projects/3.png';
import project4 from '@/assets/icons/projects/4.png';
import arrowIcon from '@/assets/icons/projects/arrow.svg';
import arrowDownRightIcon from '@/assets/icons/projects/arrow-down-right.svg';
import ongoingReef1000 from '@/assets/icons/projects/comming-reef-1000.webp';
import ongoingReef999 from '@/assets/icons/projects/comming-reef-999.webp';
import ongoingReef998 from '@/assets/icons/projects/comming-reef-998.webp';

type ProjectStat = {
  value: string;
  unit: string;
  label: string;
};

type ProjectData = {
  id: string;
  title: string;
  category: string;
  locationShort: string;
  image: string;
  overview: {
    category: string;
    location: string;
    clientType: string;
    servicesDelivered: string;
  };
  stats: [ProjectStat, ProjectStat, ProjectStat];
  challenge: string;
  solution: string;
  results: string[];
};

const projects: ProjectData[] = [
  {
    id: 'the-village-mall',
    title: 'THE VILLAGE MALL',
    category: 'Outdoor Cooling',
    locationShort: 'Dama St., Seeb, Muscat – Oman',
    image: project1,
    overview: {
      category: 'Outdoor Cooling',
      location: 'Dama St., Seeb, Muscat – Oman',
      clientType: 'Commercial Developer',
      servicesDelivered: 'Outdoor Cooling Design and Build',
    },
    stats: [
      { value: '13.5', unit: 'K m²', label: 'OUTDOOR COVERED AREA' },
      { value: '11', unit: 'K m²', label: 'TOTAL DESIGN SCOPE' },
      { value: '2.5', unit: 'K m²', label: 'TOTAL BUILD AREA' },
    ],
    challenge:
      "The client required an outdoor cooling solution to enhance visitor comfort across large open areas while maintaining energy efficiency in a hot and humid climate. The solution needed to integrate seamlessly with the mall's architecture and operate reliably during peak conditions.",
    solution:
      "RACS delivered a full design-and-build outdoor cooling solution tailored to the site's climate and layout. Advanced analysis and engineering design were used to optimize coverage, airflow, and system efficiency while minimizing visual impact.",
    results: [
      'Improved thermal comfort across all outdoor areas.',
      'Enhanced visitor experience and dwell time.',
      'Efficient system operation adapted to local climate conditions.',
    ],
  },
  {
    id: 'al-mariah-waterfront',
    title: 'AL MARIAH WATERFRONT',
    category: 'Outdoor Cooling',
    locationShort: 'Al Mariah Island – UAE, Abu Dhabi',
    image: project2,
    overview: {
      category: 'Outdoor Cooling',
      location: 'Al Mariah Island – UAE, Abu Dhabi',
      clientType: 'Mixed-use Developer',
      servicesDelivered: 'Design and Build',
    },
    stats: [
      { value: '8', unit: 'K m²', label: 'OUTDOOR COVERED AREA' },
      { value: '6.5', unit: 'K m²', label: 'TOTAL DESIGN SCOPE' },
      { value: '3.2', unit: 'K m²', label: 'TOTAL BUILD AREA' },
    ],
    challenge:
      'The waterfront development required a cooling system capable of operating in high-humidity coastal conditions while covering expansive open-air retail and leisure zones. The system had to maintain aesthetics and minimize energy consumption.',
    solution:
      'RACS engineered a comprehensive outdoor cooling network designed for coastal climate conditions. The system uses advanced misting and forced-air technologies optimized for humidity control and energy efficiency across the waterfront promenade.',
    results: [
      'Year-round outdoor comfort in coastal conditions.',
      'Seamless integration with waterfront architecture.',
      'Significant reduction in peak energy consumption.',
    ],
  },
  {
    id: 'vip-palace',
    title: 'VIP PALACE',
    category: 'Outdoor Cooling',
    locationShort: 'Riyadh, Saudi Arabia',
    image: project3,
    overview: {
      category: 'Luxury Outdoor Comfort',
      location: 'Riyadh, Saudi Arabia',
      clientType: 'Private Residence',
      servicesDelivered: 'Design and Build',
    },
    stats: [
      { value: '5.5', unit: 'K m²', label: 'OUTDOOR COVERED AREA' },
      { value: '4.8', unit: 'K m²', label: 'TOTAL DESIGN SCOPE' },
      { value: '2.1', unit: 'K m²', label: 'TOTAL BUILD AREA' },
    ],
    challenge:
      'A high-profile private residence required a bespoke outdoor cooling solution for extensive garden and entertainment areas in extreme desert heat. The system needed to deliver premium comfort while remaining completely invisible within the landscape design.',
    solution:
      'RACS delivered a fully concealed cooling system integrated into the landscape architecture. Custom engineering ensured uniform temperature distribution across gardens, terraces, and outdoor entertainment zones with zero visual impact.',
    results: [
      'Premium outdoor comfort in 50°C+ conditions.',
      'Invisible integration with luxury landscape design.',
      'Quiet, energy-efficient operation throughout.',
    ],
  },
  {
    id: 'al-hazm-mall',
    title: 'AL HAZM MALL',
    category: 'Mixed-use Cooling',
    locationShort: 'Doha, Qatar',
    image: project4,
    overview: {
      category: 'Mixed-use Cooling Solution',
      location: 'Doha, Qatar',
      clientType: 'Commercial Developer',
      servicesDelivered: 'Engineering and Delivery',
    },
    stats: [
      { value: '9.3', unit: 'K m²', label: 'OUTDOOR COVERED AREA' },
      { value: '7.8', unit: 'K m²', label: 'TOTAL DESIGN SCOPE' },
      { value: '4.1', unit: 'K m²', label: 'TOTAL BUILD AREA' },
    ],
    challenge:
      'A luxury Italian-style shopping gallery required a mixed-use cooling solution spanning indoor-outdoor transition zones. The design had to preserve the architectural character while ensuring consistent comfort across diverse retail environments.',
    solution:
      'RACS engineered a hybrid cooling approach combining precision air-conditioning for semi-enclosed galleries with outdoor cooling for open courtyards. The system adapts dynamically to occupancy levels and ambient conditions.',
    results: [
      'Consistent comfort across indoor-outdoor zones.',
      'Adaptive system responding to real-time conditions.',
      'Preserved architectural integrity of the gallery design.',
    ],
  },
];

type OngoingProjectScope = {
  description: string;
  services: string;
  location: string;
  outdoorScopeArea: { value: string; unit: string; label: string };
};

type OngoingProjectData = {
  id: string;
  title: string;
  category: string;
  locationShort: string;
  image: string;
  scope?: OngoingProjectScope;
};

const ongoingProjects: OngoingProjectData[] = [
  {
    id: 'reef-1000',
    title: 'REEF 1000 BUILDING',
    category: 'Design and Build',
    locationShort: 'Dubai Land – UAE, Dubai',
    image: ongoingReef1000,
    scope: {
      description: '125 Outdoor Balconies',
      services: 'Design and Build',
      location: 'Dubai Land – UAE, Dubai',
      outdoorScopeArea: { value: '600', unit: 'm²', label: 'OUTDOOR SCOPE AREA' },
    },
  },
  {
    id: 'reef-999',
    title: 'REEF 999 BUILDING',
    category: 'Design and Build',
    locationShort: 'Al-Farjan – UAE, Dubai',
    image: ongoingReef999,
    scope: {
      description: '164 Outdoor Balconies - 24 Outdoor Winter Garden',
      services: 'Design and Build',
      location: 'Al-Farjan – UAE, Dubai',
      outdoorScopeArea: { value: '2', unit: 'K m²', label: 'OUTDOOR SCOPE AREA' },
    },
  },
  {
    id: 'reef-998',
    title: 'REEF 998 BUILDING',
    category: 'Design and Build',
    locationShort: 'Dubai Land – UAE, Dubai',
    image: ongoingReef998,
    scope: {
      description: 'Outdoor Balconies & Winter Garden',
      services: 'Design and Build',
      location: 'Dubai Land – UAE, Dubai',
      outdoorScopeArea: { value: '1.5', unit: 'K m²', label: 'OUTDOOR SCOPE AREA' },
    },
  },
];

interface ArrowIconProps {
  isOpen?: boolean;
}

const ArrowIcon = ({ isOpen = false }: ArrowIconProps): JSX.Element => (
  <img src={isOpen ? arrowIcon : arrowDownRightIcon} alt="" aria-hidden="true" className="arrow-icon" />
);

export const ProjectsPage = (): JSX.Element => {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? '');
  const [ongoingActiveId, setOngoingActiveId] = useState<string>('');

  return (
    <div className="projects-page">
      <Header contactColor="#0f4c81" />

      <section className="projects-hero bg-racs-projects-hero" aria-labelledby="projects-hero-title">
        <div className="projects-hero-inner">
          <h1 id="projects-hero-title" className="projects-hero-title">
            OUR
            <br />
            PROJECTS
          </h1>
        </div>
      </section>

      <section className="projects-list" aria-label="Project list">
        <div className="projects-list-inner">
          {projects.map((project) => {
            const isActive = project.id === activeId;

            return (
              <div key={project.id} className={isActive ? 'projects-list-block is-open' : 'projects-list-block'}>
                <button
                  type="button"
                  className={isActive ? 'projects-list-item is-active' : 'projects-list-item'}
                  onClick={() => setActiveId((prev) => (prev === project.id ? '' : project.id))}
                >
                  <span className="projects-list-arrow">
                    <ArrowIcon isOpen={isActive} />
                  </span>
                  <span className="projects-list-text">
                    <span className="projects-list-title">{project.title}</span>
                    <span className="projects-list-subtitle">
                      {project.category} &bull; {project.locationShort}
                    </span>
                  </span>
                  <span className="projects-list-thumb">
                    <img src={project.image} alt={project.title} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.article
                      className="project-detail"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      layout
                    >
                    <div className="project-detail-inner">
                      <header className="project-header">
                        <div />
                      </header>

                      <div className="project-hero-image-wrap">
                        <img src={project.image} alt={project.title} className="project-hero-image" />
                      </div>

                      <div className="project-sections">
                        {/* OVERVIEW */}
                        <div className="project-row">
                          <div className="project-row-label">
                            <h3>OVERVIEW</h3>
                          </div>
                          <div className="project-row-content">
                            <dl className="project-overview-dl">
                              <div>
                                <dt>Category</dt>
                                <dd>{project.overview.category}</dd>
                              </div>
                              <div>
                                <dt>Location</dt>
                                <dd>{project.overview.location}</dd>
                              </div>
                              <div>
                                <dt>Client Type</dt>
                                <dd>{project.overview.clientType}</dd>
                              </div>
                              <div>
                                <dt>Services Delivered</dt>
                                <dd>{project.overview.servicesDelivered}</dd>
                              </div>
                            </dl>
                          </div>
                          <div className="project-row-stat">
                            <span className="project-stat-value">
                              {project.stats[0].value}
                              <span className="project-stat-unit">{project.stats[0].unit}</span>
                            </span>
                            <span className="project-stat-label">{project.stats[0].label}</span>
                          </div>
                        </div>

                        {/* THE CHALLENGE */}
                        <div className="project-row">
                          <div className="project-row-label">
                            <h3>THE CHALLENGE</h3>
                          </div>
                          <div className="project-row-content">
                            <p>{project.challenge}</p>
                          </div>
                          <div className="project-row-stat">
                            <span className="project-stat-value">
                              {project.stats[1].value}
                              <span className="project-stat-unit">{project.stats[1].unit}</span>
                            </span>
                            <span className="project-stat-label">{project.stats[1].label}</span>
                          </div>
                        </div>

                        {/* THE RACS SOLUTION */}
                        <div className="project-row">
                          <div className="project-row-label">
                            <h3>THE RACS SOLUTION</h3>
                          </div>
                          <div className="project-row-content">
                            <p>{project.solution}</p>
                          </div>
                          <div className="project-row-stat">
                            <span className="project-stat-value">
                              {project.stats[2].value}
                              <span className="project-stat-unit">{project.stats[2].unit}</span>
                            </span>
                            <span className="project-stat-label">{project.stats[2].label}</span>
                          </div>
                        </div>

                        {/* RESULTS & IMPACT */}
                        <div className="project-row project-row--last">
                          <div className="project-row-label">
                            <h3>RESULTS &amp; IMPACT</h3>
                          </div>
                          <div className="project-row-content">
                            <ul className="project-results-list">
                              {project.results.map((result) => (
                                <li key={result}>{result}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="project-row-stat project-row-stat--cta">
                            <a href="/contact" className="project-consult-btn">
                              REQUEST A CONSULTATION
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    </motion.article>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="projects-ongoing bg-racs-projects-ongoing" aria-labelledby="projects-ongoing-title">
        <div className="projects-ongoing-inner">
          <h2 id="projects-ongoing-title" className="projects-ongoing-title">
            ONGOING
            <br />
            PROJECTS
          </h2>

          <div className="projects-ongoing-list">
            {ongoingProjects.map((project) => {
              const isActive = project.id === ongoingActiveId;

              return (
                <div key={project.id} className={isActive ? 'projects-ongoing-block is-open' : 'projects-ongoing-block'}>
                  <button
                    type="button"
                    className={isActive ? 'projects-ongoing-item is-active' : 'projects-ongoing-item'}
                    onClick={() => setOngoingActiveId((prev) => (prev === project.id ? '' : project.id))}
                  >
                    <span className="projects-ongoing-arrow">
                      <ArrowIcon isOpen={isActive} />
                    </span>
                    <span className="projects-ongoing-text">
                      <span className="projects-ongoing-title-item">{project.title}</span>
                      <span className="projects-ongoing-subtitle">
                        {project.category} &bull; {project.locationShort}
                        <span className="projects-ongoing-tag">ONGOING</span>
                      </span>
                    </span>
                    <span className="projects-ongoing-thumb">
                      <img src={project.image} alt={project.title} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.article
                        className="project-detail project-detail--ongoing"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        layout
                      >
                        <div className="project-detail-inner">
                          {project.scope ? (
                            <>
                              <div className="project-hero-image-wrap project-hero-image-wrap--ongoing">
                                <img src={project.image} alt={project.title} className="project-hero-image" />
                              </div>
                              <div className="project-ongoing-row">
                                <div className="project-ongoing-row-label">
                                  <h3>PROJECT<br />SCOPE</h3>
                                </div>
                                <div className="project-ongoing-row-content">
                                  <dl className="project-ongoing-scope-dl">
                                    <div>
                                      <dt>Description</dt>
                                      <dd>{project.scope.description}</dd>
                                    </div>
                                    <div>
                                      <dt>Services</dt>
                                      <dd>{project.scope.services}</dd>
                                    </div>
                                    <div>
                                      <dt>Location</dt>
                                      <dd>{project.scope.location}</dd>
                                    </div>
                                  </dl>
                                  <a href={`/projects#${project.id}`} className="project-ongoing-cta-btn">
                                    VIEW FULL PROJECT PAGE
                                  </a>
                                </div>
                                <div className="project-ongoing-row-stat">
                                  <span className="project-ongoing-stat-value">
                                    {project.scope.outdoorScopeArea.value}{' '}
                                    <span className="project-ongoing-stat-unit">{project.scope.outdoorScopeArea.unit}</span>
                                  </span>
                                  <span className="project-ongoing-stat-label">{project.scope.outdoorScopeArea.label}</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <p className="projects-ongoing-coming">Project details coming soon.</p>
                          )}
                        </div>
                      </motion.article>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="projects-cta" aria-label="Speak to an expert">
        <p className="projects-cta-text">LOOKING TO ENHANCE OUTDOOR COMFORT IN YOUR PROJECT?</p>
        <a href="/contact" className="projects-cta-btn">SPEAK TO AN EXPERT</a>
      </section>
    </div>
  );
};
