import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

type HeaderLink = {
  label: string;
  to: string;
};

interface HeaderProps {
  links?: HeaderLink[];
  contactColor?: string;
  className?: string;
}

const defaultLinks: HeaderLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

export const Header = ({ links = defaultLinks, contactColor = '#ffffff', className = '' }: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMobileMenuOpen);

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${className}`.trim()} style={{ '--contact-color': contactColor } as CSSProperties}>
      <div className="container header-content">
        <NavLink to="/" className="brand-link" aria-label="RACS home">
          <img src={logo} alt="RACS logo" className="brand-logo" />
        </NavLink>

        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav-links nav-links--desktop" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="contact-link">
          Contact
        </NavLink>
      </div>

      <div
        id="mobile-nav-panel"
        className={isMobileMenuOpen ? 'mobile-nav-panel is-open' : 'mobile-nav-panel'}
        onClick={closeMobileMenu}
      >
        <div className="mobile-nav-drawer" onClick={(event) => event.stopPropagation()}>
          <div className="mobile-nav-top">
            <NavLink to="/" className="brand-link" aria-label="RACS home" onClick={closeMobileMenu}>
              <img src={logo} alt="RACS logo" className="brand-logo" />
            </NavLink>

            <button type="button" className="mobile-close-button" aria-label="Close menu" onClick={closeMobileMenu}>
              Close
            </button>
          </div>

          <nav className="nav-links nav-links--mobile" aria-label="Mobile navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'nav-item nav-item--mobile active' : 'nav-item nav-item--mobile')}
                onClick={closeMobileMenu}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/contact" className="contact-link contact-link--mobile" onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
