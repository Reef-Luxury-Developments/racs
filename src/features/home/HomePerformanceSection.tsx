import { AnimatedMetric } from '@/components/common/AnimatedMetric';

const benefits = [
  'Energy-efficient systems',
  'Long-term maintenance support',
  'Engineered for extreme heat',
  'Fast installation',
];

const metrics = [
  { end: 300, suffix: '+ KTR', label: 'Cooling Delivered' },
  { end: 30, suffix: '+', label: 'Projects Completed' },
  { end: 15000, suffix: '+ M2', label: 'Sqm Outdoor Area Cooled' },
  { end: 30, suffix: '+', label: 'Engineers & Project Management' },
  { end: 10, label: 'Simulation Experts' },
];

export const HomePerformanceSection = (): JSX.Element => {
  return (
    <section className="home-performance" aria-label="Performance highlights">
      <div className="home-performance-benefits">
        {benefits.map((benefit) => (
          <div key={benefit} className="home-performance-benefit-row">
            <div className="container">
              <p>{benefit}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="container home-performance-stats">
        {metrics.map((metric) => (
          <article key={metric.label} className="home-performance-stat-card">
            <h3>
              <AnimatedMetric end={metric.end} prefix={metric.prefix} suffix={metric.suffix} />
            </h3>
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
