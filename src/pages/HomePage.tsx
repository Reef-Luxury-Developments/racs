import { HomeHero } from '@/features/home/HomeHero';
import { HomeConsultSection } from '@/features/home/HomeConsultSection';
import { HomeFaqSection } from '@/features/home/HomeFaqSection';
import { HomePerformanceSection } from '@/features/home/HomePerformanceSection';
import { HomeProjectsSection } from '@/features/home/HomeProjectsSection';
import { HomeServicesSection } from '@/features/home/HomeServicesSection';

export const HomePage = (): JSX.Element => {
  return (
    <div className="home-page">
      <HomeHero />
      <div className="bg-racs-home-radial">
        <HomePerformanceSection />
        <HomeServicesSection />
        <HomeProjectsSection />
        <HomeConsultSection />
        <HomeFaqSection />
      </div>
    </div>
  );
};
