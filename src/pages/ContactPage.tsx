import { useState } from 'react';
import { Header } from '@/components/layout/Header';

import coolingIcon from '@/assets/icons/services/cooling.svg';
import buildingIcon from '@/assets/icons/services/building.svg';
import serviceIcon from '@/assets/icons/services/service.svg';
import districtIcon from '@/assets/icons/services/district.svg';
import leafCycleIcon from '@/assets/icons/services/leaf-cycle.svg';
import modelingIcon from '@/assets/icons/services/modeling.svg';
import sustainabilityIcon from '@/assets/icons/services/sustainability.svg';
import digitalIcon from '@/assets/icons/services/digital.svg';
import datacenterIcon from '@/assets/icons/services/datacenter.svg';

type ServiceCard = {
  id: string;
  title: string;
  icon: string;
};

const services: ServiceCard[] = [
  { id: 'outdoor-cooling', title: 'OUTDOOR COOLING\nDESIGN AND BUILD', icon: coolingIcon },
  { id: 'engineering-services', title: 'ENGINEERING SERVICES FOR\nEXISTING BUILDINGS', icon: buildingIcon },
  { id: 'mep-services', title: 'MEP SERVICES\nFOR NEW BUILDINGS', icon: serviceIcon },
  { id: 'district-cooling', title: 'DISTRICT\nCOOLING SOLUTIONS', icon: districtIcon },
  { id: 'cooling-as-service', title: 'COOLING\nAS A SERVICE', icon: leafCycleIcon },
  { id: 'modeling', title: 'MODELING\nSERVICES', icon: modelingIcon },
  { id: 'sustainability', title: 'SUSTAINABILITY &\nDECARBONIZATION', icon: sustainabilityIcon },
  { id: 'digitalization', title: 'DIGITALIZATION\n& SMART SYSTEMS', icon: digitalIcon },
  { id: 'data-centers', title: 'DATA CENTERS: SPECIFIC\nSERVICES', icon: datacenterIcon },
];

export const ContactPage = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedService, setSelectedService] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      relatedService: formData.get('relatedService'),
    };

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Request failed');

      setSubmitStatus('success');
      setSelectedService('');
      form.reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Header contactColor="#0f4c81" />

      <section className="contact-hero bg-racs-contact-hero" aria-labelledby="contact-hero-title">
        <div className="contact-hero-inner">
          <h1 id="contact-hero-title" className="contact-hero-title">
            CONTACT US
          </h1>
        </div>
      </section>

      <section className="contact-services" aria-labelledby="contact-services-subtitle">
        <div className="contact-services-inner">
          <h2 id="contact-services-subtitle" className="contact-services-subtitle">
            Solutions Across Multiple Applications
          </h2>
          <p className="contact-services-desc">
            Our solutions support a wide range of projects and services, including:
          </p>

          <div className="contact-services-grid">
            {services.map((service) => (
              <div key={service.id} className="contact-service-card">
                <h3 className="contact-service-card-title">
                  {service.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < service.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <div className="contact-service-card-icon">
                  <img src={service.icon} alt="" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-touch bg-racs-contact-touch" aria-labelledby="contact-touch-title">
        <div className="contact-touch-inner">
          <div className="contact-touch-info">
            <h2 id="contact-touch-title" className="contact-touch-title">
              GET IN TOUCH
            </h2>
            <p className="contact-touch-desc">
              Please share a few details about your request and our team will get back to you shortly.
            </p>
          </div>

          <div className="contact-touch-form-wrap">
            <form className="contact-touch-form" onSubmit={handleSubmit}>
              <label>
                <input type="text" name="name" placeholder="Name" required />
              </label>

              <label>
                <input type="text" name="company" placeholder="Company" />
                <span className="optional">optional</span>
              </label>

              <label>
                <input type="email" name="email" placeholder="Email" required />
              </label>

              <label>
                <input type="tel" name="phone" placeholder="Mobile" required />
              </label>

              <label className="contact-touch-select-label">
                <select
                  name="relatedService"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className={selectedService ? 'has-value' : ''}
                  required
                >
                  <option value="" disabled>
                    Related Services
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title.replace('\n', ' ')}
                    </option>
                  ))}
                </select>
              </label>

              <div className="contact-touch-form-bottom">
                <p>
                  By submitting, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
                </p>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Submit'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <p className="contact-touch-form-status contact-touch-form-status--success">
                  Thank you. We will contact you shortly.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="contact-touch-form-status contact-touch-form-status--error">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
