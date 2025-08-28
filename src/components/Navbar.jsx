import { useEffect, useState, useRef } from 'react';
import './Navbar.css';
const logo = '/fusionbots-logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveLink(current);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#products', label: 'Products' },
    { href: '#founders', label: 'Founders' },
    { href: '#goals', label: 'Goals' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    setActiveLink(href.substring(1));

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      <nav
        ref={navRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
        style={{ zIndex: 999 }}
      >
        <div className="nav-container">
          <div className="logo-section">
            <a href="https://fusionbots.myshopify.com/" className="logo-link">
              <div className="logo-wrapper">
                <img src={logo} alt="FusionBots Logo" className="logo-img" />
                <div className="logo-glow"></div>
              </div>
              <span className="logo-text">FusionBots</span>
            </a>
          </div>

          <div className="desktop-nav">
            <ul className="nav-links">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="nav-item">
                  <a
                    href={href}
                    className={`nav-link ${activeLink === href.substring(1) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(href);
                    }}
                  >
                    <span className="nav-label">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button
            className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content" style={{ paddingBottom: '80px', paddingTop: '30px' }}>
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`mobile-nav-link ${activeLink === href.substring(1) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(href);
                }}
              >
                <span className="mobile-nav-label">{label}</span>
                <span className="mobile-nav-arrow">→</span>
              </a>
            ))}

            <div className="mobile-cta">
              <a
                href="https://fusionbots.myshopify.com/"
                className="mobile-cta-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop Now
              </a>
            </div>

            <div className="mobile-social-icons" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <a
                href="https://www.linkedin.com/company/fusionbots"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/linkedin-icon.svg" alt="LinkedIn" className="mobile-social-icon" style={{ width: '30px', height: '30px' }} />
              </a>
              <a
                href="https://www.instagram.com/fusionbots1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/instagram-icon.svg" alt="Instagram" className="mobile-social-icon" style={{ width: '30px', height: '30px' }} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
