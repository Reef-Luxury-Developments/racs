import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import coolingIcon from "@/assets/icons/services/cooling.svg";
import buildingIcon from "@/assets/icons/services/building.svg";
import arrowIcon from "@/assets/icons/projects/arrow.svg";
import arrowDownRightIcon from "@/assets/icons/projects/arrow-down-right.svg";

type InfoColumns = {
  applications: string[];
  keyBenefits: string[];
  approach: string[];
};

type SubService = {
  id: string;
  title: string;
  description: string;
  columns: InfoColumns;
};

type ServiceData = {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  description: string[];
  columns?: InfoColumns;
  subServices?: SubService[];
};

const services: ServiceData[] = [
  {
    id: "outdoor-cooling",
    title: "OUTDOOR COOLING\nDESIGN AND BUILD",
    icon: coolingIcon,
    description: [
      "Outdoor climate control has become increasingly essential as rising temperatures make open-air environments more difficult to enjoy. At Reef RACS, we are pioneers and the market leader in outdoor cooling solutions, combining exclusive methodologies, advanced engineering tools, and specialized expertise developed over years of continuous innovation. Our highly efficient cooling systems leverage reliability and commitment to friendly cooling technologies to create conditions that surpass industry standards for comfort, efficiency, and sustainability.",
      "We differentiate ourselves through accurate performance simulations using highly precise and up-to-date weather data, data-driven design optimization, and the ability to tailor cooling strategies to each site\u2019s unique climate and operational requirements. This precision-driven approach ensures every solution delivers optimal comfort with minimum resource consumption.",
      "Our outdoor cooling services span the entire project lifecycle: feasibility, climate and weather analysis, advanced simulation and modeling, custom system design, comfort optimization, power consumption reduction, complete system execution, training, and commissioning. Each solution is engineered to deliver maximum performance, sustainable environmental impact, and long-term value for clients and end users.",
      "Our engineering approach combines rigorous analysis, inclusive consulting, and strict adherence to comfort, environmental, and regulatory requirements, ensuring expert-led teams manage every detail to achieve optimal results while ensuring superior comfort conditions that end-users truly experience.",
      "Through innovation, technical excellence, and a relentless commitment to quality and customer value, Reef RACS aims to set the benchmark for outdoor cooling solutions across the region.",
    ],
    columns: {
      applications: [
        "Outdoor sports facilities",
        "Residential terraces and balconies",
        "Hospitality outdoor spaces",
        "Retail and commercial outdoor areas",
        "Parks, resorts, and public spaces",
      ],
      keyBenefits: [
        "Enhanced people wellbeing",
        "Reduced electricity costs",
        "Increased property and development value",
        "Improved profitability",
        "Lower peak electrical demand",
      ],
      approach: [
        "Initial feasibility study & concept design",
        "Micro-thermal and CFD simulations",
        "Detailed system design",
        "Procurement and construction",
        "Testing, commissioning, and optimization",
      ],
    },
  },
  {
    id: "engineering-services",
    title: "ENGINEERING SERVICES",
    subtitle: "For existing buildings",
    icon: buildingIcon,
    description: [],
    subServices: [
      {
        id: "energy-efficiency-retrofit",
        title: "ENERGY EFFICIENCY RETROFIT",
        description:
          "Our Energy Efficiency Services provide comprehensive, end-to-end solutions designed to optimize building performance and reduce operational costs. Our process begins with ASHRAE Level 1, 2, and 3 energy audits, supported by engineering Measurement and Verification (M&V) plan in compliance with IPMVP standards. Based on each audit outcome, we deliver optimized engineering design, detailed construction and commissioning and monitoring, and periodic ongoing ASHRAE retro-commissioning. We further support clients with continuous energy management to ensure sustained performance and long-term energy savings.",
        columns: {
          applications: [
            "Residential",
            "Commercial",
            "Hospitality",
            "Institutional",
            "Industrial",
          ],
          keyBenefits: [
            "Reduced electricity and water costs",
            "Lower operational costs",
            "Reduced carbon emissions",
            "Improved building efficiency",
          ],
          approach: [
            "Detailed energy audit",
            "Engineering design",
            "Construction and commissioning",
            "Measurement & verification",
            "Continuous energy management",
          ],
        },
      },
      {
        id: "t-delta-optimization",
        title: "T-DELTA OPTIMIZATION",
        description:
          "Our T-Delta Optimization service focuses on maximizing the temperature differential across chilled water systems to improve overall cooling efficiency. By analyzing and optimizing the delta-T across coils, chillers, and distribution networks, we help reduce pumping energy, improve chiller performance, and lower operational costs across the entire HVAC system.",
        columns: {
          applications: [
            "Commercial buildings",
            "District cooling networks",
            "Industrial facilities",
            "Healthcare campuses",
            "Mixed-use developments",
          ],
          keyBenefits: [
            "Improved chiller efficiency",
            "Reduced pumping energy",
            "Lower operational costs",
            "Extended equipment lifespan",
          ],
          approach: [
            "System performance assessment",
            "Data collection and analysis",
            "Optimization strategy development",
            "Implementation support",
            "Performance verification",
          ],
        },
      },
      {
        id: "mep-design-peer-review",
        title: "MEP DESIGN PEER REVIEW",
        description:
          "Our MEP Design Peer Review service provides independent, expert evaluation of mechanical, electrical, and plumbing designs to ensure compliance with industry standards, codes, and best practices. Our team identifies design gaps, inefficiencies, and potential risks before construction, helping clients avoid costly rework and ensure optimal system performance.",
        columns: {
          applications: [
            "New construction projects",
            "Major renovations",
            "Design-build projects",
            "Government and institutional facilities",
            "High-rise developments",
          ],
          keyBenefits: [
            "Risk mitigation",
            "Code compliance assurance",
            "Design optimization",
            "Cost avoidance",
          ],
          approach: [
            "Design document review",
            "Standards compliance check",
            "Performance analysis",
            "Recommendations report",
            "Follow-up consultation",
          ],
        },
      },
      {
        id: "iaq-thermal-comfort",
        title: "INDOOR AIR QUALITY (IAQ) & THERMAL COMFORT ASSESSMENT",
        description:
          "Our IAQ and Thermal Comfort Assessment service evaluates indoor environmental conditions to ensure healthy, comfortable, and productive spaces. We measure key parameters including temperature, humidity, CO\u2082 levels, particulate matter, and airflow patterns, providing actionable recommendations aligned with ASHRAE 62.1 and ASHRAE 55 standards.",
        columns: {
          applications: [
            "Office buildings",
            "Healthcare facilities",
            "Educational institutions",
            "Hospitality venues",
            "Residential complexes",
          ],
          keyBenefits: [
            "Improved occupant health",
            "Enhanced productivity",
            "Regulatory compliance",
            "Reduced absenteeism",
          ],
          approach: [
            "Environmental monitoring",
            "Data analysis and benchmarking",
            "Root cause identification",
            "Improvement recommendations",
            "Post-implementation verification",
          ],
        },
      },
      {
        id: "cooling-load-evaluation",
        title: "COOLING LOAD EVALUATION",
        description:
          "Our Cooling Load Evaluation service provides precise calculation and analysis of building cooling requirements using advanced simulation tools and real-world data. We help clients right-size their cooling systems, avoid over-engineering, and optimize energy consumption while maintaining occupant comfort.",
        columns: {
          applications: [
            "New buildings",
            "Building retrofits",
            "System replacements",
            "Capacity planning",
            "Energy optimization studies",
          ],
          keyBenefits: [
            "Right-sized equipment",
            "Reduced capital costs",
            "Lower energy consumption",
            "Improved system performance",
          ],
          approach: [
            "Building envelope analysis",
            "Load simulation modeling",
            "Peak and part-load analysis",
            "System sizing recommendations",
            "Energy impact assessment",
          ],
        },
      },
      {
        id: "chilled-water-optimization",
        title: "CHILLED WATER OPTIMIZATION",
        description:
          "Our Chilled Water Optimization service maximizes the efficiency of chilled water plant operations through advanced analysis, control strategy development, and system-level optimization. We address the full chilled water loop from chillers to end-use, delivering measurable energy savings and improved reliability.",
        columns: {
          applications: [
            "District cooling plants",
            "Commercial complexes",
            "Industrial cooling systems",
            "Data centers",
            "Hospital campuses",
          ],
          keyBenefits: [
            "Reduced energy consumption",
            "Improved plant efficiency",
            "Lower maintenance costs",
            "Enhanced system reliability",
          ],
          approach: [
            "Plant performance audit",
            "Hydraulic analysis",
            "Control strategy optimization",
            "Implementation and tuning",
            "Ongoing monitoring and reporting",
          ],
        },
      },
      {
        id: "metering-submetering",
        title: "METERING AND SUBMETERING INFRASTRUCTURE",
        description:
          "Our Metering and Submetering Infrastructure service designs and implements comprehensive energy and utility monitoring systems. We enable granular tracking of energy, water, and gas consumption across buildings and portfolios, supporting informed decision-making, cost allocation, and sustainability reporting.",
        columns: {
          applications: [
            "Multi-tenant buildings",
            "Mixed-use developments",
            "Industrial complexes",
            "Government facilities",
            "Retail portfolios",
          ],
          keyBenefits: [
            "Transparent cost allocation",
            "Enhanced energy visibility",
            "Regulatory compliance",
            "Data-driven decisions",
          ],
          approach: [
            "Metering strategy design",
            "Hardware specification",
            "Installation oversight",
            "Data platform integration",
            "Reporting and analytics setup",
          ],
        },
      },
    ],
  },
];

interface ArrowIconProps {
  isOpen?: boolean;
}

const ArrowIcon = ({ isOpen = false }: ArrowIconProps): JSX.Element => (
  <img
    src={isOpen ? arrowIcon : arrowDownRightIcon}
    alt=""
    aria-hidden="true"
    className="arrow-icon"
  />
);

const ColumnsBlock = ({ columns }: { columns: InfoColumns }): JSX.Element => (
  <div className="services-columns">
    <div className="services-column">
      <h3 className="services-column-title">APPLICATIONS</h3>
      <ul className="services-column-list">
        {columns.applications.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="services-column">
      <h3 className="services-column-title">KEY BENEFITS</h3>
      <ul className="services-column-list">
        {columns.keyBenefits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="services-column">
      <h3 className="services-column-title">APPROACH</h3>
      <ul className="services-column-list">
        {columns.approach.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export const ServicesPage = (): JSX.Element => {
  const [openSubId, setOpenSubId] = useState<string>(
    "energy-efficiency-retrofit",
  );

  const toggleSub = (id: string): void => {
    setOpenSubId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="services-page">
      <section
        className="services-hero bg-racs-services-hero"
        aria-labelledby="services-hero-title"
      >
        <div className="services-hero-inner">
          <h1 id="services-hero-title" className="services-hero-title">
            SERVICES
          </h1>
        </div>
      </section>

      <div className="services-body">
        {services.map((service) => (
          <section
            key={service.id}
            className="services-section"
            aria-labelledby={`service-${service.id}`}
          >
            <div className="services-section-inner">
              <header className="services-section-header">
                <div className="services-section-icon-wrap">
                  <img
                    src={service.icon}
                    alt=""
                    aria-hidden="true"
                    className="services-section-icon"
                  />
                </div>
                <div className="services-section-header-text">
                  <h2
                    id={`service-${service.id}`}
                    className="services-section-title"
                  >
                    {service.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < service.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                  {service.subtitle && (
                    <p className="services-section-subtitle">
                      {service.subtitle}
                    </p>
                  )}
                </div>
              </header>

              {service.description.length > 0 && (
                <div className="services-section-body">
                  {service.description.map((paragraph, i) => (
                    <p key={i} className="services-section-desc">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {service.columns && <ColumnsBlock columns={service.columns} />}

              {service.subServices && service.subServices.length > 0 && (
                <div className="services-sub-list">
                  {service.subServices.map((sub) => {
                    const isOpen = sub.id === openSubId;

                    return (
                      <div
                        key={sub.id}
                        className={
                          isOpen
                            ? "services-sub-item is-open"
                            : "services-sub-item"
                        }
                      >
                        <button
                          type="button"
                          className="services-sub-trigger"
                          aria-expanded={isOpen}
                          onClick={() => toggleSub(sub.id)}
                        >
                          <span className="services-sub-trigger-icon">
                            <ArrowIcon isOpen={isOpen} />
                          </span>
                          <span className="services-sub-trigger-title">
                            {sub.title}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              className="services-sub-content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                            >
                              <div className="services-sub-content-inner">
                                <p className="services-sub-desc">
                                  {sub.description}
                                </p>
                                <ColumnsBlock columns={sub.columns} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
