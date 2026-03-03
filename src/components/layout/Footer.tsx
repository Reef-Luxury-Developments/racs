import { Link } from 'react-router-dom';

import footerLogo from '@/assets/icons/footer-logo.svg';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'FAQ', to: '/#faq' },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-col site-footer-brand">
          <Link to="/" className="site-footer-logo-link" aria-label="RACS home">
            <img src={footerLogo} alt="RACS logo" className="site-footer-logo" />
          </Link>
        </div>

        <div className="site-footer-col site-footer-links">
          <p className="site-footer-heading">Quick links</p>
          <nav className="site-footer-nav" aria-label="Footer navigation">
            {quickLinks.map(({ label, to }) => (
              <Link key={to} to={to} className="site-footer-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer-col site-footer-contact">
          <p className="site-footer-heading">Contact US</p>
          <div className="site-footer-contact-info">
            <a href="mailto:info@reefacs.ae">info@reefacs.ae</a>
            <a href="tel:+971506575254">+971 50 657 5254</a>
            <address className="site-footer-address">
              Office no.401/402,<br />
              Ibn Battuta Gate Office Dubai, UAE
            </address>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p className="site-footer-copyright">© {new Date().getFullYear()} - REEF ACS. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
