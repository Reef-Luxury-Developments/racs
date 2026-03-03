import buildingIcon from "@/assets/icons/services/building.svg";
import coolingIcon from "@/assets/icons/services/cooling.svg";
import datacenterIcon from "@/assets/icons/services/datacenter.svg";
import digitalIcon from "@/assets/icons/services/digital.svg";
import districtIcon from "@/assets/icons/services/district.svg";
import leafCycleIcon from "@/assets/icons/services/leaf-cycle.svg";
import modelingIcon from "@/assets/icons/services/modeling.svg";
import serviceIcon from "@/assets/icons/services/service.svg";
import sustainabilityIcon from "@/assets/icons/services/sustainability.svg";
import { CustomCursor } from "@/components/common/CustomCursor";

type ServiceCard = {
  title: string;
  icon: string;
};

const serviceCards: ServiceCard[] = [
  { title: "Outdoor Cooling<br>Design and Build", icon: coolingIcon },
  { title: "Engineering Services for Existing Buildings", icon: buildingIcon },
  { title: "MEP Services<br>for New Buildings", icon: serviceIcon },
  { title: "District<br>Cooling Solutions", icon: districtIcon },
  { title: "Cooling<br>as a Service", icon: leafCycleIcon },
  { title: "Modeling<br>Services", icon: modelingIcon },
  { title: "Sustainability &<br>Decarbonization", icon: sustainabilityIcon },
  { title: "Digitalization &<br> Smart Systems", icon: digitalIcon },
  { title: "Data Centers-Specific<br>Services", icon: datacenterIcon },
];

export const HomeServicesSection = (): JSX.Element => {
  return (
    <section className="home-services" aria-label="Our services">
      <CustomCursor targetSelector=".home-services-card" />
      <div className=" home-services-content">
        <h2 className="container home-services-title">OUR SERVICES</h2>

        <div className="home-services-grid">
          {serviceCards.map((card) => (
            <article key={card.title} className="home-services-card">
              <h3 dangerouslySetInnerHTML={{ __html: card.title }}></h3>
              <img
                src={card.icon}
                alt=""
                aria-hidden="true"
                className="home-services-icon"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
