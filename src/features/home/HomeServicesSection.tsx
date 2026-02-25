import buildingIcon from '@/assets/icons/services/building.svg';
import coolingIcon from '@/assets/icons/services/cooling.svg';
import datacenterIcon from '@/assets/icons/services/datacenter.svg';
import digitalIcon from '@/assets/icons/services/digital.svg';
import districtIcon from '@/assets/icons/services/district.svg';
import leafCycleIcon from '@/assets/icons/services/leaf-cycle.svg';
import modelingIcon from '@/assets/icons/services/modeling.svg';
import serviceIcon from '@/assets/icons/services/service.svg';
import sustainabilityIcon from '@/assets/icons/services/sustainability.svg';

type ServiceCard = {
  title: string;
  icon: string;
};

const serviceCards: ServiceCard[] = [
  { title: 'Outdoor Cooling Design and Build', icon: coolingIcon },
  { title: 'Engineering Services for Existing Buildings', icon: buildingIcon },
  { title: 'MEP Services for New Buildings', icon: serviceIcon },
  { title: 'District-Cooling Solutions', icon: districtIcon },
  { title: 'Cooling as a Service', icon: leafCycleIcon },
  { title: 'Modeling Services', icon: modelingIcon },
  { title: 'Sustainability & Decarbonization', icon: sustainabilityIcon },
  { title: 'Digitalization & Smart Systems', icon: digitalIcon },
  { title: 'Data Centers-Specific Services', icon: datacenterIcon },
];

export const HomeServicesSection = (): JSX.Element => {
  return (
    <section className="home-services" aria-label="Our services">
      <div className="container home-services-content">
        <h2 className="home-services-title">OUR SERVICES</h2>

        <div className="home-services-grid">
          {serviceCards.map((card) => (
            <article key={card.title} className="home-services-card">
              <h3>{card.title}</h3>
              <img src={card.icon} alt="" aria-hidden="true" className="home-services-icon" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
